class SolarSystemSVG {
    /**
     * Creates an instance of SolarSystemSVG.
     *
     * @param {string} svgId - The ID of the SVG element to draw into.
     * @param {object} [config={}] - Optional configuration overrides. Default
     *   is `{}`
     */
    constructor(svgId, config = {}) {
        this.svg = document.getElementById(svgId);
        if (!this.svg) {
            console.error(`SVG element with ID "${svgId}" not found.`);
            return;
        }
        const width = 600,
            height = 600;

        // --- Default Configuration ---
        const defaults = {
            sunRadius: 15,
            planetRadius: 5,
            labelOffset: 8,
            maxOrbitRadiusScale: 0.9, // Use 90% of available space for orbits
            moonOrbitRadiusAroundEarth: 35,
            zodiacRingOuterRadius: 180, // Define here for easier access
            zodiacRingInnerRadius: 160,
            zodiacTextRadius: 170,
            // Basic planet appearance (can be extended)
            planetConfig: {
                // Colors match RashiChakra for consistency
                sun: { color: "#e6ba19", radius: 20, isSun: true, order: 0 },
                mercury: { color: "#66b266", radius: 6, order: 1 },
                venus: { color: "#ff4d67", radius: 10, order: 2 },
                // Earth isn't usually shown in geocentric charts, but included for heliocentric example
                earth: { color: "#4682B4", radius: 10, order: 3 },
                moon: { color: "#909090", radius: 6, order: 3.5 }, // Often shown near Earth
                mars: { color: "#FF4500", radius: 10, order: 4 },
                jupiter: { color: "#cc7a00", radius: 14, order: 5 },
                saturn: { color: "#b08f8f", radius: 14, order: 6 },
                // Nodes aren't physical bodies, usually omitted in heliocentric views
                // rahu: { color: "#8A2BE2", radius: 4, order: 7 },
                // ketu: { color: "#4682B4", radius: 4, order: 8 }
                // Add Uranus, Neptune if needed
                uranus: { color: "#66ccff", radius: 12, order: 7 },
                neptune: { color: "#6666ff", radius: 12, order: 8 },
                pluto: { color: "#aaaaaa", radius: 3, order: 9 }, // If desired
            },
            // Define orbital radii (arbitrary for this example)
            // A more realistic approach would scale actual semi-major axes.
            orbitRadiiConfig: {
                // These are just example values, adjust as needed
                mercury: 30,
                venus: 60,
                earth: 120, // Moon will be placed near Earth's orbit
                mars: 180,
                jupiter: 220,
                saturn: 250,
                uranus: 270,
                neptune: 290,
                pluto: 310,
            },
            // orbitRadiiConfig: {
            //     mercury: 10,
            //     venus: 19,
            //     earth: 26, // Moon will be placed near Earth's orbit
            //     mars: 40,
            //     jupiter: 136,
            //     saturn: 250, // Fixed reference point
            //     uranus: 501,   // WARNING: Will likely exceed SVG bounds
            //     neptune: 786,  // WARNING: Will likely exceed SVG bounds
            //     pluto: 1030    // WARNING: Will likely exceed SVG bounds
            // }
        };

        // --- Merge Config ---
        this.config = { ...defaults, ...config };
        // Deep merge for planetConfig if provided
        if (config.planetConfig) {
            this.config.planetConfig = {
                ...defaults.planetConfig,
                ...config.planetConfig,
            };
        }
        if (config.orbitRadiiConfig) {
            this.config.orbitRadiiConfig = {
                ...defaults.orbitRadiiConfig,
                ...config.orbitRadiiConfig,
            };
        }

        this.center = {
            x: width / 2,
            y: height / 2,
        };
        this.maxRadius =
            Math.min(this.center.x, this.center.y) *
            this.config.maxOrbitRadiusScale;

        // --- State for Selection ---
        this.selectedPlanetId = null;
        this.selectionLinePlanet = null;
        this.selectionLineSun = null;
        this.angleTextElement = null; // To hold the angle text SVG element
        this.rawPlanetsData = []; // Store data used for the last draw, renamed for clarity
        this.earthCoords = null; // Store calculated Earth coordinates
        this.sunScreenCoords = null; // Store calculated Sun screen coordinates

        // Ensure viewBox is set
        this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        this.currentViewCenterTarget = "sun"; // 'sun' or 'earth'
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

    // Converts astronomical longitude (0=top, clockwise) to SVG coordinates
    _getCoordinates(radius, angleDegrees, centerPoint = this.center) {
        // Angle adjustment: SVG 0 is right, Astro 0 is top. Shift by -90 deg.
        const angleRad = ((angleDegrees - 90) * Math.PI) / 180;
        const x = centerPoint.x + radius * Math.cos(angleRad);
        const y = centerPoint.y + radius * Math.sin(angleRad); // SVG Y increases downwards
        return { x, y };
    }
    // Helper to create arc paths for text (needed by _drawZodiacRing)
    _describeArc(
        radius,
        startAngle,
        endAngle,
        sweepFlag = 1,
        centerPoint = this.center
    ) {
        const startCoords = this._getCoordinates(
            radius,
            startAngle,
            centerPoint
        );
        const endCoords = this._getCoordinates(radius, endAngle, centerPoint);
        const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

        // Path command: M(ove) startX startY A(rc) rx ry x-axis-rotation large-arc-flag sweep-flag endX endY
        return `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endCoords.x} ${endCoords.y}`;
    }

    // --- Drawing Methods (Internal) ---

    _drawSun(sunScreenX, sunScreenY) {
        // Accept screen coordinates
        const sunConfig = this.config.planetConfig.sun;
        this.svg.appendChild(
            this._createSVGElement("circle", {
                cx: sunScreenX,
                cy: sunScreenY,
                r: sunConfig.radius || this.config.sunRadius,
                fill: sunConfig.color || "#FFD700",
                class: "sun-body planet-clickable", // Make Sun clickable for selection
            })
        );
        this.svg.appendChild(
            this._createSVGElement("text", {
                x: this.center.x,
                y: this.center.y,
                class: "sun-label",
                "text-anchor": "middle",
                "dominant-baseline": "central",
                fill: "#000000", // Contrasting color for label
                "font-size": "10px",
            })
        ).textContent = "सूर्य"; // Sun symbol
    }

    _drawOrbits(planetsData, centerOfHeliocentricOrbits) {
        const orbitGroup = this._createSVGElement("g", {
            class: "orbit-group",
        });
        this.svg.appendChild(orbitGroup);

        // Get unique planet IDs that have orbit radii defined and are not the sun
        const planetsWithOrbits = planetsData
            .map(p => p.id)
            .filter(
                id =>
                    this.config.orbitRadiiConfig[id] &&
                    !this.config.planetConfig[id]?.isSun
            );

        // Sort planets by order defined in config for consistent orbit drawing
        const sortedPlanetIds = [...new Set(planetsWithOrbits)].sort((a, b) => {
            const orderA = this.config.planetConfig[a]?.order ?? Infinity;
            const orderB = this.config.planetConfig[b]?.order ?? Infinity;
            return orderA - orderB;
        });

        // Always draw heliocentric orbits around the Sun's current screen position
        sortedPlanetIds.forEach(planetId => {
            const radius = this.config.orbitRadiiConfig[planetId];
            if (radius > 0) {
                orbitGroup.appendChild(
                    this._createSVGElement("circle", {
                        cx: centerOfHeliocentricOrbits.x,
                        cy: centerOfHeliocentricOrbits.y,
                        r: radius,
                        class: `orbit orbit-${planetId}`,
                    })
                );
            }
        });
        // Moon's orbit is handled in _drawPlanets, always around Earth's screen position.
    }

    _drawPlanets(planetsData, actualSunScreenCoords, actualEarthScreenCoords) {
        const planetGroup = this._createSVGElement("g", {
            class: "planet-group",
        });
        // Insert moon orbit group *before* planets for better layering
        const moonOrbitGroup = this._createSVGElement("g", {
            class: "moon-orbit-group",
        });
        this.svg.insertBefore(moonOrbitGroup, this.svg.firstChild); // Draw orbits first
        this.svg.appendChild(planetGroup); // Planets drawn on top of orbits

        // actualEarthScreenCoords is the definitive screen position of Earth for this draw cycle.
        // actualSunScreenCoords is the definitive screen position of the Sun.

        // Sort planets for drawing order (optional, but can prevent overlap issues)
        const sortedPlanets = [...planetsData].sort((a, b) => {
            const orderA = this.config.planetConfig[a.id]?.order ?? Infinity;
            const orderB = this.config.planetConfig[b.id]?.order ?? Infinity;
            return orderA - orderB;
        });

        sortedPlanets.forEach(planet => {
            const pConfig = this.config.planetConfig[planet.id];
            if (!pConfig || pConfig.isSun) return; // Sun drawn by _drawSun, skip unknown

            let coords;
            let planetRadius = pConfig.radius || this.config.planetRadius;
            let groupClass = `planet planet-${planet.id}`; // Base class

            // --- Special Handling for the Moon ---
            if (planet.id === "moon") {
                if (
                    actualEarthScreenCoords &&
                    this.config.moonOrbitRadiusAroundEarth > 0
                ) {
                    // 1. Draw Moon's orbit around Earth's calculated position
                    moonOrbitGroup.appendChild(
                        this._createSVGElement("circle", {
                            cx: actualEarthScreenCoords.x,
                            cy: actualEarthScreenCoords.y,
                            r: this.config.moonOrbitRadiusAroundEarth,
                            class: "orbit orbit-moon-around-earth", // Specific class for styling
                        })
                    );

                    // 2. Calculate Moon's position relative to Earth
                    // Use planet.longitude for Moon as it's geocentric longitude
                    coords = this._getCoordinates(
                        this.config.moonOrbitRadiusAroundEarth,
                        planet.longitude, // Moon's geocentric longitude
                        actualEarthScreenCoords // Use Earth's screen position as the center
                    );
                    groupClass += " planet-clickable"; // Moon is clickable
                } else {
                    console.warn(
                        `Cannot draw Moon: Earth screen position (${actualEarthScreenCoords}) or moonOrbitRadiusAroundEarth (${this.config.moonOrbitRadiusAroundEarth}) invalid.`
                    );
                    return; // Skip drawing the moon if we can't place it
                }
                // --- End Special Handling for Moon ---
            } else if (planet.id === "earth") {
                coords = actualEarthScreenCoords; // Earth is drawn at its pre-calculated screen spot
                groupClass += " planet-earth planet-clickable"; // Earth is clickable to change view
            } else {
                // --- Other Planets (Mars, Jupiter, etc.) ---
                const positionRadius = this.config.orbitRadiiConfig[planet.id];
                if (!positionRadius) {
                    // Check if radius is defined
                    console.warn(
                        `Orbit radius not defined for ${planet.id}, cannot draw.`
                    );
                    return;
                }
                // Planets (other than Moon) are always positioned heliocentrically relative to the Sun's screen position.
                coords = this._getCoordinates(
                    positionRadius,
                    planet.positionAngle,
                    actualSunScreenCoords
                );
                groupClass += " planet-clickable"; // These planets are clickable for selection
            }

            // --- Draw Planet Body and Label ---
            const group = this._createSVGElement("g", { class: groupClass });

            // --- *** ADD CLICK LISTENER *** ---
            // Only add listener to clickable planets (not Earth or Sun)
            if (planet.id === "earth") {
                // Earth click toggles view
                group.addEventListener("click", () => {
                    this.currentViewCenterTarget =
                        this.currentViewCenterTarget === "sun"
                            ? "earth"
                            : "sun";
                    this.drawSystem(this.rawPlanetsData, this.ayanamsa); // Redraw with new view
                });
            } else if (groupClass.includes("planet-clickable")) {
                // Moon and other planets for selection
                group.addEventListener("click", () => {
                    if (this.selectedPlanetId === planet.id)
                        this.selectPlanet(null);
                    else this.selectPlanet(planet.id);
                });
            } // Sun's clickability is handled by its 'planet-clickable' class on its body in _drawSun

            group.appendChild(
                this._createSVGElement("circle", {
                    cx: coords.x,
                    cy: coords.y,
                    r: planetRadius,
                    fill: pConfig.color || "#FFFFFF",
                    class: "planet-body", // Add class to circle specifically if needed
                })
            );
            group.appendChild(
                this._createSVGElement("text", {
                    x: coords.x,
                    y: coords.y,
                    class: "planet-label",
                    "text-anchor": "middle",
                    "dominant-baseline": "central",
                    fill: "#000000",
                    "font-size": `${Math.max(8, planetRadius)}px`,
                })
            ).textContent = planet.retrograde
                ? planet.name + "*"
                : planet.name || "?";
            planetGroup.appendChild(group);
            // --- End Standard Planet Drawing ---
        });
    }

    _drawRashiChakra() {
        const zodiacGroup = this._createSVGElement("g", {
            class: "zodiac-ring-group",
        });
        this.svg.appendChild(zodiacGroup); // Draw zodiac last, on top

        // Ensure defs element exists for text paths
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this._createSVGElement("defs", {});
            this.svg.insertBefore(defs, this.svg.firstChild);
        }

        const rashiAngle = 30; // 360 / 12

        for (let i = 0; i < 12; i++) {
            const startAngle = -this.ayanamsa + i * rashiAngle;
            const midAngle = startAngle + rashiAngle / 2;
            const endAngle = -this.ayanamsa + (i + 1) * rashiAngle;
            // --- Divider Line ---
            const startCoordsDiv = this._getCoordinates(
                this.config.zodiacRingInnerRadius,
                startAngle,
                this.earthCoords
            );
            const endCoordsDiv = this._getCoordinates(
                this.config.zodiacRingOuterRadius,
                startAngle,
                this.earthCoords
            );
            zodiacGroup.appendChild(
                this._createSVGElement("line", {
                    x1: startCoordsDiv.x,
                    y1: startCoordsDiv.y,
                    x2: endCoordsDiv.x,
                    y2: endCoordsDiv.y,
                    class: "rashi-divider",
                })
            );

            // --- Arc Path for Text ---
            const arcPadding = rashiAngle * 0.05; // Small padding from dividers
            let arcStartAngle = startAngle + arcPadding;
            let arcEndAngle = endAngle - arcPadding;
            let sweepFlag = 1; // Clockwise text path

            // Reverse direction for text on the left side (90 to 270 degrees) to keep it upright
            if (midAngle > 90 && midAngle < 270) {
                sweepFlag = 0; // Counter-clockwise
                // Swap angles for reversed path
                [arcStartAngle, arcEndAngle] = [arcEndAngle, arcStartAngle];
            }

            const pathData = this._describeArc(
                this.config.zodiacTextRadius,
                arcStartAngle,
                arcEndAngle,
                sweepFlag,
                this.earthCoords
            );
            const pathId = `solarsystem-rashi-path-${i}`; // Unique ID
            defs.appendChild(
                this._createSVGElement("path", {
                    id: pathId,
                    d: pathData,
                    fill: "none", // Path itself is invisible
                    stroke: "none",
                })
            );

            // --- Text along Path ---
            const textElement = this._createSVGElement("text", {
                class: "zodiac-text",
            });
            const textPathElement = this._createSVGElement("textPath", {
                href: `#${pathId}`,
                startOffset: "50%", // Center text on the arc segment
                "text-anchor": "middle",
                class: "zodiac-text-path",
            });
            // Ensure rashiNames is available (might need to be passed or global)
            const rashiName =
                typeof rashiNames !== "undefined" ? rashiNames[i] : "?";
            textPathElement.textContent = rashiName; // Use Rashi name
            textElement.appendChild(textPathElement);
            zodiacGroup.appendChild(textElement);
        }

        // Optional: Draw outer boundary circle
        zodiacGroup.appendChild(
            this._createSVGElement("circle", {
                cx: this.earthCoords.x,
                cy: this.earthCoords.y,
                r: this.config.zodiacRingOuterRadius,
                class: "rashi-divider",
                fill: "none",
                "stroke-width": 0.5,
            })
        );
        //Optional: Draw inner boundary circle
        zodiacGroup.appendChild(
            this._createSVGElement("circle", {
                cx: this.earthCoords.x,
                cy: this.earthCoords.y,
                r: this.config.zodiacRingInnerRadius,
                class: "rashi-divider",
                fill: "none",
                "stroke-width": 0.5,
            })
        );
    }

    // --- Selection Line Methods ---
    _removeSelectionLines() {
        if (
            this.selectionLinePlanet &&
            this.selectionLinePlanet.parentNode === this.svg
        ) {
            this.svg.removeChild(this.selectionLinePlanet);
        }
        this.selectionLinePlanet = null;

        if (
            this.selectionLineSun &&
            this.selectionLineSun.parentNode === this.svg
        ) {
            this.svg.removeChild(this.selectionLineSun);
        }
        this.selectionLineSun = null;
    }

    _removeAngleText() {
        if (
            this.angleTextElement &&
            this.angleTextElement.parentNode === this.svg
        ) {
            this.svg.removeChild(this.angleTextElement);
        }
        this.angleTextElement = null;
    }

    _drawSelectionLines(selectedPlanetData) {
        if (!this.earthCoords || !this.sunScreenCoords) {
            console.warn(
                "Cannot draw selection lines: Earth coordinates not available."
            );
            return;
        }
        if (!selectedPlanetData) {
            console.warn(
                "Cannot draw selection lines: Selected planet data not available."
            );
            return;
        }

        let planetCoords;
        const pConfig = this.config.planetConfig[selectedPlanetData.id];

        const planetData = this.rawPlanetsData.find(
            p => p.id === selectedPlanetData.id
        );
        // --- Calculate Selected Planet's Coordinates ---
        if (selectedPlanetData.id === "moon") {
            // Moon's position is relative to Earth, using its geocentric longitude
            if (this.config.moonOrbitRadiusAroundEarth > 0) {
                planetCoords = this._getCoordinates(
                    this.config.moonOrbitRadiusAroundEarth,
                    planetData.longitude, // Moon's geocentric longitude
                    this.earthCoords
                );
            } else {
                console.warn(
                    "Cannot draw selection line to Moon: moonOrbitRadiusAroundEarth is invalid."
                );
                return;
            }
        } else {
            // Other planets (including Sun if selected)
            const positionRadius =
                this.config.orbitRadiiConfig[selectedPlanetData.id];
            if (selectedPlanetData.id === "sun") {
                planetCoords = this.sunScreenCoords; // Sun is at its screen position
            } else if (!positionRadius) {
                console.warn(
                    `Cannot draw selection line to ${selectedPlanetData.id}: Orbit radius not defined.`
                );
                return;
            } else {
                // Other planets are positioned heliocentrically relative to the Sun's screen position
                planetCoords = this._getCoordinates(
                    positionRadius,
                    planetData.positionAngle,
                    this.sunScreenCoords
                );
            }
        }

        if (!planetCoords) {
            console.warn(
                `Cannot draw selection line to ${selectedPlanetData.id}: Could not determine coordinates.`
            );
            return;
        }

        // --- Draw Line: Earth to Sun ---
        this.selectionLineSun = this._createSVGElement("line", {
            x1: this.earthCoords.x,
            y1: this.earthCoords.y,
            x2: this.sunScreenCoords.x,
            y2: this.sunScreenCoords.y,
            class: "selection-line selection-line-sun",
        });

        // --- Draw Line: Earth through Planet to Zodiac ---
        const dx = planetCoords.x - this.earthCoords.x;
        const dy = planetCoords.y - this.earthCoords.y;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len === 0) {
            // Avoid division by zero if Earth and planet overlap
            console.warn(
                "Cannot draw Earth-Planet line: Earth and selected planet are at the same coordinates."
            );
            // Still draw Earth-Sun line if possible
            if (this.selectionLineSun)
                this.svg.insertBefore(
                    this.selectionLineSun,
                    this.svg.querySelector(".planet-group")
                );
            return;
        }

        const nx = dx / len; // Normalized direction vector x
        const ny = dy / len; // Normalized direction vector y

        // Calculate endpoint on the outer zodiac ring
        // Extend the line from Earth in the direction of the planet until it hits the zodiac radius
        const lineLengthToZodiac = this.config.zodiacRingOuterRadius * 3; // Extend well beyond
        const endX = this.earthCoords.x + nx * lineLengthToZodiac;
        const endY = this.earthCoords.y + ny * lineLengthToZodiac;

        this.selectionLinePlanet = this._createSVGElement("line", {
            x1: this.earthCoords.x,
            y1: this.earthCoords.y,
            x2: endX,
            y2: endY,
            class: "selection-line selection-line-planet",
        });

        // Insert lines before the planet group so planets are drawn on top
        const planetGroup = this.svg.querySelector(".planet-group");
        if (planetGroup) {
            this.svg.insertBefore(this.selectionLineSun, planetGroup);
            this.svg.insertBefore(this.selectionLinePlanet, planetGroup);
        } else {
            // Fallback if planet group isn't found (shouldn't happen in normal flow)
            this.svg.appendChild(this.selectionLineSun);
            this.svg.appendChild(this.selectionLinePlanet);
        }
    }

    _drawAngleText(selectedPlanetData) {
        if (!this.earthCoords) {
            console.warn(
                "Cannot draw angle text: Earth coordinates not available."
            );
            return;
        }
        if (
            !selectedPlanetData ||
            typeof selectedPlanetData.sunEarthObjectAngle !== "number" ||
            isNaN(selectedPlanetData.sunEarthObjectAngle)
        ) {
            console.warn(
                "Cannot draw angle text: Selected planet data or angle is missing/invalid.",
                selectedPlanetData
            );
            return;
        }

        const angleValue = selectedPlanetData.sunEarthObjectAngle;
        const textContent = `${angleValue.toFixed(1)}°`; // Format to one decimal place

        // Position the text slightly offset from Earth
        const textX = this.earthCoords.x + 15; // Adjust offset as needed
        const textY = this.earthCoords.y + 5; // Adjust offset as needed

        this.angleTextElement = this._createSVGElement("text", {
            x: textX,
            y: textY,
            class: "selection-angle-text", // Add a class for styling
            "text-anchor": "start", // Align text start at the coordinates
            "dominant-baseline": "central",
            "font-size": "10px",
        });
        this.angleTextElement.textContent = textContent;
        this.svg.appendChild(this.angleTextElement); // Add to SVG
    }

    // --- Public Methods ---

    /**
     * Clears the SVG and draws the entire solar system representation.
     *
     * @param {object[]} planetsData - Array of planet objects, each with 'id',
     *   'longitude' (geo), and 'positionAngle' (helio). Example: [{ id: 'mars',
     *   longitude: 123.45, positionAngle: 110.0 }, ...]
     */
    drawSystem(planetsData, ayanamsa) {
        this.rawPlanetsData = planetsData; // Store for view toggles and selections
        this.ayanamsa = ayanamsa;

        let calculatedSunScreenCoords, calculatedEarthScreenCoords;

        if (this.currentViewCenterTarget === "sun") {
            calculatedSunScreenCoords = this.center; // Sun is at SVG center

            const earthData = this.rawPlanetsData.find(p => p.id === "earth");
            if (earthData && this.config.orbitRadiiConfig["earth"]) {
                calculatedEarthScreenCoords = this._getCoordinates(
                    this.config.orbitRadiiConfig["earth"],
                    earthData.positionAngle, // Earth's heliocentric angle
                    calculatedSunScreenCoords // Relative to Sun (SVG center)
                );
            } else {
                calculatedEarthScreenCoords = {
                    x:
                        this.center.x -
                        (this.config.orbitRadiiConfig.earth || 100),
                    y: this.center.y,
                }; // Fallback
                console.warn(
                    "Earth data/orbit missing for heliocentric view coord calculation."
                );
            }
        } else {
            // currentViewCenterTarget === 'earth'
            calculatedEarthScreenCoords = this.center; // Earth is at SVG center

            const earthDataForSunCalc = this.rawPlanetsData.find(
                p => p.id === "earth"
            );
            if (earthDataForSunCalc && this.config.orbitRadiiConfig["earth"]) {
                // Sun's position relative to Earth: use Earth's orbit radius,
                // and an angle 180 degrees from Earth's heliocentric position.
                const sunGeoAngle =
                    (earthDataForSunCalc.positionAngle + 180) % 360;
                calculatedSunScreenCoords = this._getCoordinates(
                    this.config.orbitRadiiConfig["earth"], // Sun is at Earth's orbit distance from Earth
                    sunGeoAngle,
                    calculatedEarthScreenCoords // Relative to Earth (SVG center)
                );
            } else {
                calculatedSunScreenCoords = {
                    x:
                        this.center.x +
                        (this.config.orbitRadiiConfig.earth || 100),
                    y: this.center.y,
                }; // Fallback
                console.warn(
                    "Earth data/orbit missing for Sun's geocentric coord calculation."
                );
            }
        }

        // Store globally accessible screen coordinates for this draw cycle
        this.earthCoords = calculatedEarthScreenCoords;
        this.sunScreenCoords = calculatedSunScreenCoords;

        // Clear previous drawing
        this.svg.innerHTML = "";
        // Ensure defs for Rashi paths
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this._createSVGElement("defs", {});
            this.svg.insertBefore(defs, this.svg.firstChild);
        }

        // Draw components in order (background to foreground)
        this._drawOrbits(this.rawPlanetsData, this.sunScreenCoords); // Orbits always around Sun's screen pos
        this._drawSun(this.sunScreenCoords.x, this.sunScreenCoords.y); // Draw Sun at its screen pos
        this._drawPlanets(
            this.rawPlanetsData,
            this.sunScreenCoords,
            this.earthCoords
        );

        if (this.selectedPlanetId) {
            const currentSelection = this.selectedPlanetId;
            this.selectedPlanetId = null; // Force re-evaluation in selectPlanet
            this.selectPlanet(currentSelection); // This will also call _drawRashiChakra
        } else {
            this._drawRashiChakra(); // Draw Rashi chakra even if no selection
        }
    }

    /**
     * Selects a planet, drawing lines from Earth through it and to the Sun.
     *
     * @param {string | null} planetId - The ID of the planet (e.g., 'mars',
     *   'moon') or null to deselect.
     * @returns {object | null} The selected planet data object or null if
     *   deselected/not found/invalid.
     */
    selectPlanet(planetId) {
        this._removeSelectionLines(); // Always remove previous lines first
        this._removeAngleText(); // Remove previous angle text
        if (!planetId) {
            this.selectedPlanetId = null;
            console.log("Solar system planet deselected.");
            this._drawRashiChakra(); // Redraw zodiac without selection highlights if needed
            return null; // Deselected
        }
        const selectedPlanetData = this.rawPlanetsData.find(
            p => p.id === planetId
        );

        // Check if necessary angles are present
        const isMoon = selectedPlanetData.id === "moon";
        // Moon uses geocentric longitude for its position around Earth.
        // Sun is selectable.
        // Other planets use heliocentric positionAngle for their position around Sun.
        const hasAngle =
            (isMoon && !isNaN(selectedPlanetData.longitude)) ||
            selectedPlanetData.id === "sun" ||
            (!isMoon &&
                selectedPlanetData.id !== "sun" &&
                !isNaN(selectedPlanetData.positionAngle));

        if (!hasAngle) {
            console.warn(
                `Cannot select planet "${planetId}": Required angle (longitude for Moon, positionAngle for others) is missing or invalid.`
            );
            this.selectedPlanetId = null;
            return null;
        }

        this.selectedPlanetId = planetId;
        this._drawSelectionLines(selectedPlanetData); // Draw the new lines
        this._drawAngleText(selectedPlanetData); // Draw the angle text
        this._drawRashiChakra();
        console.log(`Solar system planet "${planetId}" selected.`);
        return selectedPlanetData; // Return the selected planet data
    }
}

// --- Example Usage (Add this to your main script or HTML) ---

/*
// Assuming you have an SVG element in your HTML: <svg id="solar-system-svg"></svg>
// And you have a GrahaManager instance named 'grahaManager'

const solarSystemView = new SolarSystemSVG('solar-system-svg');

function updateSolarSystemView() {
    const currentDate = new Date(); // Or get date from your UI
    // Choose calculation method:
    grahaManager.calculatePlanetPosition(currentDate); // Use Ephemeris (more accurate)
    // grahaManager.calculateSuryaSidhdhantaPosition(currentDate); // Use SS (approximate)

    const planetPositions = grahaManager.getPlanets(); // Get [{id: '...', longitude: ..., positionAngle: ...}, ...]

    solarSystemView.drawSystem(planetPositions);

    // Example: Automatically re-select if a planet was selected before update
    // const previouslySelected = solarSystemView.selectedPlanetId;
    // if (previouslySelected) {
    //     solarSystemView.selectPlanet(previouslySelected);
    // }
}

// Initial draw
updateSolarSystemView();

// Example: Update when a date changes (you'll need UI elements for this)
// document.getElementById('date-input').addEventListener('change', updateSolarSystemView);

// Example: Select Mars via code (e.g., from a button click)
// document.getElementById('select-mars-button').addEventListener('click', () => {
//     solarSystemView.selectPlanet('mars');
// });
// document.getElementById('deselect-button').addEventListener('click', () => {
//     solarSystemView.selectPlanet(null);
// });

*/
