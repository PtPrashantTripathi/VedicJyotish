class RashiChakra {
    constructor(svgId) {
        this.grahaConfig = {
            sun: { color: "#e6ba19" },
            moon: { color: "#909090" },
            mars: { color: "#FF4500" },
            mercury: { color: "#66b266" },
            jupiter: { color: "#cc7a00" },
            venus: { color: "#ff4d67" },
            saturn: { color: "#b08f8f" },
            rahu: { color: "#8A2BE2" }, // Negative for retrograde
            ketu: { color: "#4682B4" },
        };
        this.svg = document.getElementById(svgId);
        if (!this.svg) {
            console.error(`SVG element with ID "${svgId}" not found.`);
            return;
        }

        // --- Configuration ---
        this.center = 600 / 2; // Assuming viewBox="0 0 600 600"
        this.outerRadius = this.center - 10;
        this.nakshatraTextRadius = this.outerRadius - 18;
        this.nakshatraCircleRadius = this.nakshatraTextRadius - 12;
        this.rashiTextRadius = this.nakshatraCircleRadius - 25;
        this.rashiCircleRadius = this.rashiTextRadius - 15;
        this.innerRadius = 5;

        // --- State ---
        this.selectedPlanetId = null;
        this.selectionLine = null;
        this.infoBoxGroup = null; // Reference to the info box SVG group
        this.grahaData = []; // Store the data used for the last draw

        // --- Info Box Config ---
        this.infoBoxConfig = {
            width: 40,
            height: 20,
            cornerRadius: 3,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            textColor: "#FFF",
            fontSize: "10px",
        };

        // Store references to arrays from panchang.js (assuming they are global)
        this.rashiNames =
            typeof rashiNames !== "undefined"
                ? rashiNames
                : Array(12).fill("?");
        this.nakshatraNames =
            typeof nakshatraNames !== "undefined"
                ? nakshatraNames
                : Array(27).fill("?");

        // Instantiate ZodiacBackgroundDrawer
        this.backgroundDrawer = new ZodiacBackgroundDrawer(
            this.svg,
            this.center,
            this.center,
            {
                radii: {
                    outer: this.outerRadius,
                    nakshatraText: this.nakshatraTextRadius,
                    nakshatraRing: this.nakshatraCircleRadius,
                    rashiText: this.rashiTextRadius,
                    rashiRing: this.rashiCircleRadius,
                    inner: this.innerRadius,
                },
                rashiNames: this.rashiNames,
                nakshatraNames: this.nakshatraNames,
            }
        );
    }

    // --- Helper Methods (Internal) ---
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
        // 0 degrees = Top, positive = CounterClockwise
        const angleRad = ((-angleDegrees - 90) * Math.PI) / 180; // Adjust for 0deg at top
        const x = this.center + radius * Math.cos(angleRad);
        const y = this.center + radius * Math.sin(angleRad); // Use + for SVG Y-down
        return { x, y };
    }

    _createSunSvg() {
        const sunGroup = this._createSVGElement("g", { class: "sun-icon" });
        const sunConfig = this.grahaConfig.sun;
        const sunColor = sunConfig ? sunConfig.color : "#FFD700"; // Default to yellow if not configured

        // Central body
        sunGroup.appendChild(
            this._createSVGElement("circle", {
                cx: 0,
                cy: 0,
                r: 7, // Radius of the sun's body
                fill: sunColor,
            })
        );

        // Rays
        const numRays = 8;
        const rayLength = 5; // Length of rays extending from the body
        const bodyRadius = 7;
        const rayInnerRadius = bodyRadius + 1; // Start rays slightly off the surface
        const rayOuterRadius = bodyRadius + rayLength;

        for (let i = 0; i < numRays; i++) {
            const angle = (i / numRays) * 360; // Angle for each ray
            // SVG 0 degrees is to the right, positive is clockwise.
            // To make the first ray point upwards from the center of the sun icon:
            const angleRad = ((angle - 90) * Math.PI) / 180;

            const x1 = rayInnerRadius * Math.cos(angleRad);
            const y1 = rayInnerRadius * Math.sin(angleRad);
            const x2 = rayOuterRadius * Math.cos(angleRad);
            const y2 = rayOuterRadius * Math.sin(angleRad);

            sunGroup.appendChild(
                this._createSVGElement("line", {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    stroke: sunColor,
                    "stroke-width": 1.5,
                })
            );
        }
        return sunGroup;
    }

    _drawPlanets(grahaData) {
        // Remove existing planet groups before redrawing
        this.svg
            .querySelectorAll('g[id^="planet-group-"]')
            .forEach(g => g.remove());

        grahaData.forEach((graha, index) => {
            const config = this.grahaConfig[graha.id];
            if (!config || isNaN(graha.longitude)) return; // Skip if no config or invalid longitude

            // Calculate radius for this specific planet based on its index
            // Ensure planets don't overlap too much, adjust spacing as needed
            const currentPlanetRadius = 30 + index * 20;

            // Store calculated coordinates on the planet object
            const coords = this._getCoordinates(
                currentPlanetRadius,
                graha.longitude
            );

            // Create a group for click handling
            const group = this._createSVGElement("g", {
                id: `planet-group-${graha.id}`,
                class: "planet-clickable",
                style: "cursor: pointer;",
            });
            group.addEventListener("click", () => {
                if (this.selectedPlanetId === graha.id) this.selectPlanet(null);
                else this.selectPlanet(graha.id);
            });

            if (graha.id === "sun") {
                const sunIcon = this._createSunSvg();
                // The sunIcon is drawn around its own (0,0). Translate it to the planet's coords.
                sunIcon.setAttribute(
                    "transform",
                    `translate(${coords.x}, ${coords.y})`
                );
                group.appendChild(sunIcon);

                // Text Label for Sun, adjusted for the larger icon size
                // Sun icon visual radius is approx 7 (body) + 5 (ray) = 12
                group.appendChild(
                    this._createSVGElement("text", {
                        x: coords.x + 15, // Offset text (12 for icon radius + 3 padding)
                        y: coords.y + 4, // Adjust vertical alignment
                        class: "planet-label sun-label", // Specific class for sun label
                        fill: config.color || "#FFF",
                    })
                ).textContent = graha.retrograde
                    ? graha.name + "*"
                    : graha.name || "?";
            } else {
                // Simple circle representation for other planets
                group.appendChild(
                    this._createSVGElement("circle", {
                        cx: coords.x,
                        cy: coords.y,
                        r: 7, // Fixed radius for the circle marker
                        fill: config.color || "#FFF", // Use configured color or default white
                    })
                );
                // Text Label next to the circle for other planets
                group.appendChild(
                    this._createSVGElement("text", {
                        x: coords.x + 10, // Offset text slightly
                        y: coords.y + 4, // Adjust vertical alignment
                        class: "planet-label",
                        fill: config.color || "#FFF",
                    })
                ).textContent = graha.retrograde
                    ? graha.name + "*"
                    : graha.name || "?";
            }

            this.svg.appendChild(group);
        });
    }

    // --- Public Methods ---

    /**
     * Draws the entire Rashi Chakra (background, divisions, planets).
     *
     * @param {object[]} grahaData - Array of planet objects, each with at least
     *   'id' and 'longitude'.
     */
    drawWheel(grahaData) {
        if (!this.svg) return;
        if (!grahaData || !Array.isArray(grahaData)) {
            console.error(
                "Invalid or missing planetsData passed to drawWheel."
            );
            return;
        }
        // Store data for selection/infobox use
        this.grahaData = grahaData;

        // Clear previous structural elements (keep defs if needed, or clear all)
        // Clearing all is safer if structure might change
        this.svg.innerHTML = "";

        const defs = this._createSVGElement("defs", {});
        this.svg.appendChild(defs);

        // Use the background drawer
        this.backgroundDrawer.draw(defs);
        this._drawPlanets(grahaData);

        // Re-apply selection and info box if a planet was selected before redraw
        if (this.selectedPlanetId) {
            // Temporarily store ID, selectPlanet will clear it
            const currentSelection = this.selectedPlanetId;
            this.selectedPlanetId = null; // Prevent selectPlanet from thinking it's already selected
            this.selectPlanet(currentSelection);
        } else {
            // Ensure no artifacts remain if nothing was selected
            this._removeSelectionLine();
            this._removeInfoBox();
        }
    }

    // --- Selection Line Methods ---
    _removeSelectionLine() {
        if (this.selectionLine && this.selectionLine.parentNode === this.svg) {
            this.svg.removeChild(this.selectionLine);
        }
        this.selectionLine = null;
    }

    _drawSelectionLine(planetData) {
        if (!planetData || isNaN(planetData.longitude)) {
            console.warn(
                "Cannot draw selection line for planet with invalid longitude:",
                planetData
            );
            return;
        }

        // Calculate end point slightly beyond the outer radius for visibility
        const lineEndCoords = this._getCoordinates(
            this.outerRadius + 5,
            planetData.longitude
        ); // Extend slightly

        this.selectionLine = this._createSVGElement("line", {
            x1: this.center,
            y1: this.center,
            x2: lineEndCoords.x,
            y2: lineEndCoords.y,
            class: "selection-line",
        });
        // Ensure line is drawn behind planets for better visibility
        const firstPlanetGroup = this.svg.querySelector(
            'g[id^="planet-group-"]'
        );
        if (firstPlanetGroup) {
            this.svg.insertBefore(this.selectionLine, firstPlanetGroup);
        } else {
            this.svg.appendChild(this.selectionLine); // Fallback
        }
    }

    // --- Info Box Methods ---
    _removeInfoBox() {
        if (this.infoBoxGroup && this.infoBoxGroup.parentNode === this.svg) {
            this.svg.removeChild(this.infoBoxGroup);
        }
        this.infoBoxGroup = null;
    }

    _drawInfoBox(graha) {
        if (!graha || isNaN(graha.longitude)) {
            console.warn(
                "Cannot draw info box for planet with invalid data:",
                graha
            );
            return;
        }

        // Position the info box near the center, e.g., slightly below the innermost circle
        const boxX = this.center - this.infoBoxConfig.width / 2;
        const boxY = this.center - this.infoBoxConfig.height / 2;

        this.infoBoxGroup = this._createSVGElement("g", {
            class: "info-box-group",
            // Prevent info box from capturing clicks meant for planets below
            style: "pointer-events: none;",
        });

        // Background rectangle
        this.infoBoxGroup.appendChild(
            this._createSVGElement("rect", {
                x: boxX,
                y: boxY,
                width: this.infoBoxConfig.width,
                height: this.infoBoxConfig.height,
                rx: this.infoBoxConfig.cornerRadius,
                ry: this.infoBoxConfig.cornerRadius,
                fill: this.infoBoxConfig.backgroundColor,
                class: "info-box-rect", // For CSS styling
            })
        );

        // Text showing longitude
        const textElement = this._createSVGElement("text", {
            x: boxX + this.infoBoxConfig.width / 2, // Center text horizontally
            y: boxY + this.infoBoxConfig.height / 2, // Center text vertically
            fill: this.infoBoxConfig.textColor,
            "font-size": this.infoBoxConfig.fontSize,
            "text-anchor": "middle",
            "dominant-baseline": "central", // Better vertical centering
            class: "info-box-text", // For CSS styling
        });
        textElement.textContent = `${graha.longitude.toFixed(2)}°`; // Format longitude
        this.infoBoxGroup.appendChild(textElement);

        // Append the info box group to the SVG (drawn on top)
        this.svg.appendChild(this.infoBoxGroup);
    }

    /**
     * Selects a planet, drawing a line from the center through it and showing
     * an info box, or deselects if planetId is null or invalid.
     *
     * @param {string | null} grahaId - The ID of the planet (e.g., 'sun',
     *   'moon') or null to deselect.
     * @returns {object | null} The selected planet data object or null if
     *   deselected/not found.
     */
    selectPlanet(grahaId) {
        // Remove highlight class from any previously selected planet group
        this.svg.querySelectorAll(".selected-planet").forEach(el => {
            el.classList.remove("selected-planet");
        });
        // Always remove previous selection artifacts first
        this._removeSelectionLine();
        this._removeInfoBox();

        // Remove previous text highlighting
        this.svg
            .querySelectorAll(`textPath.selected-rashi-text`)
            .forEach(tp => {
                tp.classList.remove("selected-rashi-text");
            });
        this.svg
            .querySelectorAll(`textPath.selected-nakshatra-text`)
            .forEach(tp => {
                tp.classList.remove("selected-nakshatra-text");
            });

        if (!grahaId) {
            this.selectedPlanetId = null;
            // console.log("Planet deselected.");
            return null; // Deselected
        }

        const grahaIndex = this.grahaData.findIndex(p => p.id === grahaId);
        const graha = this.grahaData[grahaIndex];
        this.selectedPlanetId = grahaId;

        // Draw new selection artifacts
        this._drawSelectionLine(graha);
        this._drawInfoBox(graha);
        // console.log(`Planet "${grahaId}" selected.`);
        // Add highlight class to the selected planet group
        const planetGroup = this.svg.querySelector(`#planet-group-${grahaId}`);
        if (planetGroup) {
            planetGroup.classList.add("selected-planet");
        } else {
            console.warn(
                `Could not find SVG group for planet ID "${grahaId}" to apply highlight.`
            );
        }

        // Highlight corresponding Rashi and Nakshatra text
        const rashiIndex = Math.floor(graha.longitude / 30);
        const nakshatraIndex = Math.floor(graha.longitude / (360 / 27));

        const rashiTextPath = this.svg.querySelector(
            `textPath[href="#zodiac-rashi-path-${rashiIndex}-${this.svg.id}"]`
        );
        if (rashiTextPath) {
            rashiTextPath.classList.add("selected-rashi-text");
        }

        const nakshatraTextPath = this.svg.querySelector(
            `textPath[href="#zodiac-nakshatra-path-${nakshatraIndex}-${this.svg.id}"]`
        );
        if (nakshatraTextPath) {
            nakshatraTextPath.classList.add("selected-nakshatra-text");
        }

        return graha; // Return the selected planet data
    }
}

/* --- Add corresponding CSS (example) ---

.info-box-rect {
    fill: rgba(0, 0, 0, 0.7);
    stroke: #555;
    stroke-width: 0.5;
}

.info-box-text {
    fill: #FFF;
    font-family: sans-serif;
    font-size: 10px;
    text-anchor: middle;
    dominant-baseline: central;
}

.selected-rashi-text {
    font-weight: bold;
    fill: #ff4500; / * Example highlight color * /
}

.selected-nakshatra-text {
    font-weight: bold;
    fill: #8a2be2; / * Example highlight color * /
}

.rashi-text, .nakshatra-text {
    font-family: sans-serif;
    font-size: 10px;
    fill: #AAA;
}
.wheel-background {
    fill: #111;
    stroke: #555;
    stroke-width: 1;
}

*/
