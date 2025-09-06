class ZodiacBackgroundDrawer {
    /**
     * @param {SVGElement} svgElement The SVG element to draw into.
     * @param {number} centerX The x-coordinate of the center.
     * @param {number} centerY The y-coordinate of the center.
     * @param {object} config Configuration for drawing.
     * @param {object} config.radii Radii for different elements. e.g., { outer,
     *   nakshatraText, nakshatraRing, rashiText, rashiRing, inner }
     * @param {string[]} config.rashiNames Array of Rashi names.
     * @param {string[]} [config.nakshatraNames] Array of Nakshatra names
     *   (optional).
     * @param {object} [config.options] Drawing options.
     * @param {boolean} [config.options.drawRashis=true] Whether to draw Rashi
     *   elements. Default is `true`
     * @param {boolean} [config.options.drawNakshatras=true] Whether to draw
     *   Nakshatra elements. Default is `true`
     * @param {boolean} [config.options.drawRashiRing=true] Whether to draw the
     *   rashi circle. Default is `true`
     * @param {boolean} [config.options.drawNakshatraRing=true] Whether to draw
     *   the nakshatra circle. Default is `true`
     * @param {boolean} [config.options.drawOuterRing=true] Whether to draw the
     *   outermost circle. Default is `true`
     * @param {boolean} [config.options.drawInnerRing=true] Whether to draw the
     *   innermost circle (center dot). Default is `true`
     */
    constructor(svgElement, centerX, centerY, config) {
        this.svg = svgElement;
        this.center = { x: centerX, y: centerY };
        this.config = {
            radii: {},
            rashiNames: Array(12).fill("?"),
            nakshatraNames: Array(27).fill("?"),
            options: {
                drawRashis: true,
                drawNakshatras: true,
                drawRashiRing: true,
                drawNakshatraRing: true,
                drawOuterRing: true,
                drawInnerRing: true,
            },
            ...config,
        };
        // Ensure nested objects are also merged properly
        if (config.radii)
            this.config.radii = { ...this.config.radii, ...config.radii };
        if (config.options)
            this.config.options = { ...this.config.options, ...config.options };

        // Default radii if not provided, to avoid errors if options are true but radii missing
        const r = this.config.radii;
        r.outer = r.outer ?? this.center.x - 10;
        r.nakshatraText = r.nakshatraText ?? r.outer - 18;
        r.nakshatraRing = r.nakshatraRing ?? r.nakshatraText - 12;
        r.rashiText = r.rashiText ?? r.nakshatraRing - 25;
        r.rashiRing = r.rashiRing ?? r.rashiText - 15;
        r.inner = r.inner ?? 5;
    }

    _createSVGElement(tag, attributes) {
        const element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    _getCoordinates(radius, angleDegrees) {
        const angleRad = ((-angleDegrees - 90) * Math.PI) / 180;
        const x = this.center.x + radius * Math.cos(angleRad);
        const y = this.center.y + radius * Math.sin(angleRad);
        return { x, y };
    }

    _describeArc(radius, startAngle, endAngle, sweepFlag = 1) {
        const startCoords = this._getCoordinates(radius, startAngle);
        const endCoords = this._getCoordinates(radius, endAngle);
        const largeArcFlag =
            Math.abs(-endAngle + startAngle) <= 180 ? "0" : "1";
        return `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endCoords.x} ${endCoords.y}`;
    }

    drawBaseRings() {
        if (this.config.options.drawOuterRing && this.config.radii.outer) {
            this.svg.appendChild(
                this._createSVGElement("circle", {
                    cx: this.center.x,
                    cy: this.center.y,
                    r: this.config.radii.outer,
                    class: "wheel-background zodiac-outer-ring",
                })
            );
        }
        if (
            this.config.options.drawNakshatraRing &&
            this.config.radii.nakshatraRing
        ) {
            this.svg.appendChild(
                this._createSVGElement("circle", {
                    cx: this.center.x,
                    cy: this.center.y,
                    r: this.config.radii.nakshatraRing,
                    class: "nakshatra-circle zodiac-nakshatra-ring",
                })
            );
        }
        if (this.config.options.drawRashiRing && this.config.radii.rashiRing) {
            this.svg.appendChild(
                this._createSVGElement("circle", {
                    cx: this.center.x,
                    cy: this.center.y,
                    r: this.config.radii.rashiRing,
                    class: "rashi-circle zodiac-rashi-ring",
                })
            );
        }
        if (this.config.options.drawInnerRing && this.config.radii.inner) {
            this.svg.appendChild(
                this._createSVGElement("circle", {
                    cx: this.center.x,
                    cy: this.center.y,
                    r: this.config.radii.inner,
                    class: "inner-circle zodiac-inner-ring",
                })
            );
        }
    }

    drawRashiLayer(defs) {
        if (
            !this.config.options.drawRashis ||
            !this.config.radii.rashiRing ||
            !this.config.radii.rashiText
        )
            return;

        const rashiAngle = 30;
        const rashiDividersStartRadius = this.config.radii.inner; // Rashi dividers usually go from inner to rashiRing or nakshatraRing
        const rashiDividersEndRadius =
            this.config.radii.nakshatraRing ?? this.config.radii.rashiRing; // End at nakshatra ring if present, else rashi ring

        for (let i = 0; i < 12; i++) {
            const startAngle = i * rashiAngle;
            const midAngle = startAngle + rashiAngle / 2;
            const endAngle = (i + 1) * rashiAngle;

            // Divider Line
            const startCoordsDiv = this._getCoordinates(
                rashiDividersStartRadius,
                startAngle
            );
            const endCoordsDiv = this._getCoordinates(
                rashiDividersEndRadius,
                startAngle
            );
            this.svg.appendChild(
                this._createSVGElement("line", {
                    x1: startCoordsDiv.x,
                    y1: startCoordsDiv.y,
                    x2: endCoordsDiv.x,
                    y2: endCoordsDiv.y,
                    class: "rashi-divider zodiac-rashi-divider",
                })
            );

            // Arc Path for Text
            const arcRadius = this.config.radii.rashiText;
            const arcPadding = rashiAngle * 0.05;
            let arcStartAngle = startAngle + arcPadding;
            let arcEndAngle = endAngle - arcPadding;
            let sweepFlag = 0;

            if (midAngle < 90 || midAngle > 270) {
                sweepFlag = 1;
                [arcStartAngle, arcEndAngle] = [arcEndAngle, arcStartAngle];
            }

            const pathData = this._describeArc(
                arcRadius,
                arcStartAngle,
                arcEndAngle,
                sweepFlag
            );
            const pathId = `zodiac-rashi-path-${i}-${this.svg.id}`; // Make path ID unique per SVG
            defs.appendChild(
                this._createSVGElement("path", {
                    id: pathId,
                    d: pathData,
                    fill: "none",
                    stroke: "none",
                })
            );

            const textElement = this._createSVGElement("text", {
                class: "rashi-text zodiac-rashi-text",
            });
            const textPathElement = this._createSVGElement("textPath", {
                href: `#${pathId}`,
                startOffset: "50%",
                "text-anchor": "middle",
            });
            textPathElement.textContent = this.config.rashiNames[i] || "?";
            textElement.appendChild(textPathElement);
            this.svg.appendChild(textElement);
        }
    }

    drawNakshatraLayer(defs) {
        if (
            !this.config.options.drawNakshatras ||
            !this.config.radii.nakshatraRing ||
            !this.config.radii.nakshatraText ||
            !this.config.radii.outer
        )
            return;

        const nakshatraAngle = 360 / 27;
        for (let i = 0; i < 27; i++) {
            const startAngle = i * nakshatraAngle;
            const midAngle = startAngle + nakshatraAngle / 2;
            const endAngle = (i + 1) * nakshatraAngle;

            // Divider Line
            const startCoordsDiv = this._getCoordinates(
                this.config.radii.nakshatraRing,
                startAngle
            );
            const endCoordsDiv = this._getCoordinates(
                this.config.radii.outer,
                startAngle
            );
            this.svg.appendChild(
                this._createSVGElement("line", {
                    x1: startCoordsDiv.x,
                    y1: startCoordsDiv.y,
                    x2: endCoordsDiv.x,
                    y2: endCoordsDiv.y,
                    class: "nakshatra-divider zodiac-nakshatra-divider",
                })
            );

            // Arc Path for Text
            const arcRadius = this.config.radii.nakshatraText;
            const arcPadding = nakshatraAngle * 0.05;
            let arcStartAngle = startAngle + arcPadding;
            let arcEndAngle = endAngle - arcPadding;
            let sweepFlag = 0;

            if (midAngle < 90 || midAngle > 270) {
                sweepFlag = 1;
                [arcStartAngle, arcEndAngle] = [arcEndAngle, arcStartAngle];
            }

            const pathData = this._describeArc(
                arcRadius,
                arcStartAngle,
                arcEndAngle,
                sweepFlag
            );
            const pathId = `zodiac-nakshatra-path-${i}-${this.svg.id}`; // Make path ID unique per SVG
            defs.appendChild(
                this._createSVGElement("path", {
                    id: pathId,
                    d: pathData,
                    fill: "none",
                    stroke: "none",
                })
            );

            const textElement = this._createSVGElement("text", {
                class: "nakshatra-text zodiac-nakshatra-text",
            });
            const textPathElement = this._createSVGElement("textPath", {
                href: `#${pathId}`,
                startOffset: "50%",
                "text-anchor": "middle",
            });
            textPathElement.textContent = this.config.nakshatraNames[i] || "?";
            textElement.appendChild(textPathElement);
            this.svg.appendChild(textElement);
        }
    }

    /**
     * Draws the complete zodiac background (rings, rashis, nakshatras) based on
     * configuration.
     *
     * @param {SVGDefsElement} defs - The <defs> element from the parent SVG for
     *   text paths.
     */
    draw(defs) {
        this.drawBaseRings();
        if (this.config.options.drawRashis) {
            this.drawRashiLayer(defs);
        }
        if (this.config.options.drawNakshatras) {
            this.drawNakshatraLayer(defs);
        }
    }
}
