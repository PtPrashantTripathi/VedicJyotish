/**
 * Represents a North Indian style Kundali (astrological chart) in SVG. This
 * version aims for a more traditional visual appearance.
 */
class KundaliSVG {
    /**
     * Creates an instance of KundaliSVG.
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
            padding: 60, // Reduced padding for a larger chart area
            ascendantMarker: "लग्न",
            // Planet configuration (symbols and colors)
            planetConfig: {
                sun: { name: "सूर्य", symbol: "सू", color: "#e6ba19" },
                moon: { name: "चंद्र", symbol: "चं", color: "#909090" },
                mars: { name: "मंगल", symbol: "मं", color: "#FF4500" },
                mercury: { name: "बुध", symbol: "बु", color: "#66b266" },
                jupiter: { name: "गुरु", symbol: "गु", color: "#cc7a00" },
                venus: { name: "शुक्र", symbol: "शु", color: "#ff4d67" },
                saturn: { name: "शनि", symbol: "श", color: "#b08f8f" },
                rahu: { name: "राहु", symbol: "रा", color: "#8A2BE2" },
                ketu: { name: "केतु", symbol: "के", color: "#4682B4" },
                uranus: { name: "अरुण", symbol: "अर", color: "#66ccff" },
                neptune: { name: "वरुण", symbol: "वर", color: "#6666ff" },
                pluto: { name: "यम", symbol: "यम", color: "#aaaaaa" },
            },
            // Default location (Ujjain) - Used for external Ascendant calculation
            defaultLocation: { lat: 23.1765, lon: 75.7885 },
        };

        // --- Merge Config ---
        this.config = { ...defaults, ...config };
        if (config.planetConfig) {
            this.config.planetConfig = {
                ...defaults.planetConfig,
                ...config.planetConfig,
            };
        }

        this.width = width;
        this.height = height;
        this.center = { x: width / 2, y: height / 2 };

        // --- State ---
        this.selectedPlanetId = null;
        this.currentPlanetsData = [];
        this.ascendantLongitude = NaN;
        this.housePoints = this._calculateHousePoints(); // Grid points remain the same geometrically

        this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
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

    // Calculate the corner points for the Kundali grid (Geometric basis)
    _calculateHousePoints() {
        const p = this.config.padding;
        const w = this.width;
        const h = this.height;
        const hw = w / 2;
        const hh = h / 2;

        // Outer square points (clockwise from top-left)
        const outerSquare = [
            { x: p, y: p }, // Top-Left
            { x: w - p, y: p }, // Top-Right
            { x: w - p, y: h - p }, // Bottom-Right
            { x: p, y: h - p }, // Bottom-Left
        ];

        // Center point
        const center = { x: hw, y: hh };

        // Inner diamond points (corners of the central houses 1, 4, 7, 10)
        // These are midpoints of the lines from center to outer corners
        const innerDiamond = [
            {
                x: (center.x + outerSquare[1].x) / 2,
                y: (center.y + outerSquare[1].y) / 2,
            }, // Top-Right corner (of house 1)
            {
                x: (center.x + outerSquare[2].x) / 2,
                y: (center.y + outerSquare[2].y) / 2,
            }, // Bottom-Right corner (of house 4)
            {
                x: (center.x + outerSquare[3].x) / 2,
                y: (center.y + outerSquare[3].y) / 2,
            }, // Bottom-Left corner (of house 7)
            {
                x: (center.x + outerSquare[0].x) / 2,
                y: (center.y + outerSquare[0].y) / 2,
            }, // Top-Left corner (of house 10)
        ];

        // The visual diamond uses the outer square corners and the center
        const outerDiamond = [
            { x: hw, y: p }, // Top
            { x: w - p, y: hh }, // Right
            { x: hw, y: h - p }, // Bottom
            { x: p, y: hh }, // Left
        ];

        // Return points needed for drawing
        return { outerSquare, center, innerDiamond, outerDiamond };
    }

    // Calculate key points within each house for consistent placement
    _getHouseAnchorPoints(houseNumber) {
        // Uses the geometric points calculated in _calculateHousePoints
        const { outerSquare, center, innerDiamond, outerDiamond } =
            this.housePoints;
        const labelOffset = 30; // Offset for Rashi label from corner/edge
        const planetCenterOffsetV = 15; // Vertical offset inwards for planet area center
        const planetCenterOffsetH = 5; // Horizontal offset inwards for planet area center
        const ascOffset = 18; // Additional offset for Asc marker

        let points = {
            rashiLabelPos: { x: 0, y: 0 },
            planetCenter: { x: 0, y: 0 },
            ascPos: null,
        };

        // Calculate points based on house number
        // Rashi labels often go near the 'outer' point of the triangle
        // Planet centers are roughly in the middle of the triangle
        switch (houseNumber) {
            // Top triangle (House 1)
            case 1:
                points.rashiLabelPos = {
                    x: center.x,
                    y: outerDiamond[0].y + labelOffset,
                }; // Top point, offset down
                points.planetCenter = {
                    x: center.x,
                    y:
                        (outerDiamond[0].y + innerDiamond[3].y) / 2 +
                        planetCenterOffsetV,
                };
                points.ascPos = {
                    x: center.x,
                    y: points.rashiLabelPos.y + ascOffset,
                }; // Below Rashi label
                break;
            // Top-left triangle (House 2)
            case 2:
                points.rashiLabelPos = {
                    x: innerDiamond[3].x,
                    y: outerDiamond[0].y + labelOffset * 0.7,
                };
                points.planetCenter = {
                    x: innerDiamond[3].x,
                    y: (outerDiamond[0].y + innerDiamond[3].y) / 2,
                };
                break;
            // Left-top triangle (House 3)
            case 3:
                points.rashiLabelPos = {
                    x: outerDiamond[3].x + labelOffset * 0.7,
                    y: (outerDiamond[0].y + innerDiamond[0].y) / 2,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[3].x + innerDiamond[3].x) / 2 -
                        planetCenterOffsetH,
                    y:
                        (outerDiamond[3].y +
                            outerDiamond[0].y +
                            innerDiamond[3].y) /
                        3,
                };
                break;
            // Left triangle (House 4)
            case 4:
                points.rashiLabelPos = {
                    x: outerDiamond[3].x + labelOffset,
                    y: center.y,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[3].x +
                            innerDiamond[2].x +
                            innerDiamond[3].x) /
                            3 +
                        planetCenterOffsetH,
                    y: center.y,
                };
                break;
            // Left-bottom triangle (House 5)
            case 5:
                points.rashiLabelPos = {
                    x: outerDiamond[3].x + labelOffset * 0.7,
                    y: (outerDiamond[2].y + innerDiamond[3].y) / 2,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[3].x + innerDiamond[3].x) / 2 -
                        planetCenterOffsetH,
                    y: (outerDiamond[1].y + outerDiamond[2].y) / 2,
                };
                break;
            // Bottom-left triangle (House 6)
            case 6:
                points.rashiLabelPos = {
                    x: innerDiamond[3].x,
                    y: outerDiamond[2].y - labelOffset * 0.5,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[2].x +
                            outerDiamond[3].x +
                            innerDiamond[2].x) /
                            3 -
                        planetCenterOffsetH,
                    y: (outerDiamond[2].y + innerDiamond[2].y) / 2,
                };
                break;
            // Bottom triangle (House 7)
            case 7:
                points.rashiLabelPos = {
                    x: center.x,
                    y: outerDiamond[2].y - labelOffset,
                };
                points.planetCenter = {
                    x: center.x,
                    y:
                        (outerDiamond[2].y +
                            innerDiamond[1].y +
                            innerDiamond[2].y) /
                            3 -
                        planetCenterOffsetV,
                };
                break;
            // Bottom-right triangle (House 8)
            case 8:
                points.rashiLabelPos = {
                    x: (outerDiamond[0].x + outerDiamond[1].x) / 2,
                    y: outerDiamond[2].y - labelOffset * 0.5,
                };
                points.planetCenter = {
                    x: (outerDiamond[0].x + outerDiamond[1].x) / 2,
                    y:
                        (outerDiamond[2].y + innerDiamond[1].y) / 2 -
                        planetCenterOffsetV,
                };
                break;
            // Right-bottom triangle (House 9)
            case 9:
                points.rashiLabelPos = {
                    x: outerDiamond[1].x - labelOffset,
                    y: (outerDiamond[2].y + innerDiamond[3].y) / 2,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[1].x + innerDiamond[1].x) / 2 -
                        planetCenterOffsetH,
                    y:
                        (outerDiamond[1].y +
                            outerDiamond[2].y +
                            innerDiamond[1].y) /
                        3,
                };
                break;
            // Right triangle (House 10)
            case 10:
                points.rashiLabelPos = {
                    x: outerDiamond[1].x - labelOffset,
                    y: center.y,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[1].x +
                            innerDiamond[0].x +
                            innerDiamond[1].x) /
                            3 -
                        planetCenterOffsetH,
                    y: center.y,
                };
                break;
            // Right-top triangle (House 11)
            case 11:
                points.rashiLabelPos = {
                    x: outerDiamond[1].x - labelOffset,
                    y: (outerDiamond[0].y + innerDiamond[0].y) / 2,
                };
                points.planetCenter = {
                    x:
                        (outerDiamond[1].x + innerDiamond[1].x) / 2 -
                        planetCenterOffsetH,
                    y: innerDiamond[0].y,
                };
                break;
            // Top-right triangle (House 12)
            case 12:
                points.rashiLabelPos = {
                    x: (outerDiamond[0].x + outerDiamond[1].x) / 2,
                    y: outerDiamond[0].y + labelOffset * 0.7,
                };
                points.planetCenter = {
                    x: (outerDiamond[1].x + center.x) / 2 + planetCenterOffsetH,
                    y: (outerDiamond[0].y + innerDiamond[3].y) / 2,
                };
                break;
            default: // Fallback
                points.planetCenter = this.center;
                points.rashiLabelPos = {
                    x: this.center.x,
                    y: this.center.y - 20,
                };
        }
        return points;
    }

    // --- Drawing Methods (Internal) ---

    _drawKundaliGrid() {
        const gridGroup = this._createSVGElement("g", {
            class: "kundali-grid",
        });
        this.svg.appendChild(gridGroup);
        const { outerSquare, center, innerDiamond } = this.housePoints;

        const mainStyle = {
            stroke: "#555",
            "stroke-width": 1,
            fill: "none",
        };
        const innerStyle = {
            stroke: "#555",
            "stroke-width": 1, // Thinner lines
            fill: "none",
        };

        // Draw outer square
        gridGroup.appendChild(
            this._createSVGElement("polygon", {
                points: outerSquare.map(p => `${p.x},${p.y}`).join(" "),
                ...mainStyle,
            })
        );

        // Draw main diagonals (X)
        gridGroup.appendChild(
            this._createSVGElement("line", {
                x1: outerSquare[0].x,
                y1: outerSquare[0].y,
                x2: outerSquare[2].x,
                y2: outerSquare[2].y,
                ...mainStyle,
            })
        );
        gridGroup.appendChild(
            this._createSVGElement("line", {
                x1: outerSquare[1].x,
                y1: outerSquare[1].y,
                x2: outerSquare[3].x,
                y2: outerSquare[3].y,
                ...mainStyle,
            })
        );

        // Draw inner diamond (connecting midpoints of outer edges) - Thinner lines
        // This visually separates the Kendra houses (1,4,7,10) from others
        const midPoints = [
            {
                x: (outerSquare[0].x + outerSquare[1].x) / 2,
                y: outerSquare[0].y,
            }, // Top-Mid
            {
                x: outerSquare[1].x,
                y: (outerSquare[1].y + outerSquare[2].y) / 2,
            }, // Right-Mid
            {
                x: (outerSquare[2].x + outerSquare[3].x) / 2,
                y: outerSquare[2].y,
            }, // Bottom-Mid
            {
                x: outerSquare[3].x,
                y: (outerSquare[3].y + outerSquare[0].y) / 2,
            }, // Left-Mid
        ];
        gridGroup.appendChild(
            this._createSVGElement("polygon", {
                points: midPoints.map(p => `${p.x},${p.y}`).join(" "),
                ...innerStyle, // Use inner style
            })
        );
    }

    _drawHouseLabels() {
        if (isNaN(this.ascendantLongitude)) return;

        const labelGroup = this._createSVGElement("g", {
            class: "kundali-house-labels",
        });
        this.svg.appendChild(labelGroup);

        const firstHouseRashiIndex = Math.floor(this.ascendantLongitude / 30);

        for (let houseNum = 1; houseNum <= 12; houseNum++) {
            const anchorPoints = this._getHouseAnchorPoints(houseNum);
            const rashiIndex = (firstHouseRashiIndex + (houseNum - 1)) % 12;

            // Rashi Number Label
            const textElement = this._createSVGElement("text", {
                x: anchorPoints.rashiLabelPos.x,
                y: anchorPoints.rashiLabelPos.y,
                class: "house-label",
                "font-size": "12px",
                fill: "#444",
                "text-anchor": "middle",
                "dominant-baseline": "central",
            });
            textElement.textContent =
                1 + rashiIndex + " " + rashiNames[rashiIndex];
            labelGroup.appendChild(textElement);

            // Ascendant Marker in House 1
            if (houseNum === 1 && anchorPoints.ascPos) {
                const ascElement = this._createSVGElement("text", {
                    x: anchorPoints.ascPos.x,
                    y: anchorPoints.ascPos.y,
                    class: "ascendant-marker",
                    "text-anchor": "middle",
                    "dominant-baseline": "central",
                });
                ascElement.textContent = "लग्न";
                labelGroup.appendChild(ascElement);
            }
        }
    }

    _drawPlanets(planetsData) {
        if (isNaN(this.ascendantLongitude)) {
            console.error(
                "Cannot draw planets: Ascendant longitude is not set."
            );
            return;
        }

        const planetGroup = this._createSVGElement("g", {
            class: "kundali-planets",
        });
        this.svg.appendChild(planetGroup);

        const housePlanetPositions = {};

        // First pass: Calculate house and base position
        planetsData.forEach(planet => {
            const pConfig = this.config.planetConfig[planet.id];
            if (!pConfig || isNaN(planet.longitude)) return;

            const houseNum =
                1 +
                ((12 -
                    Math.floor(this.ascendantLongitude / 30) +
                    Math.floor(planet.longitude / 30)) %
                    12);

            if (houseNum === null) return;

            if (!housePlanetPositions[houseNum]) {
                housePlanetPositions[houseNum] = [];
            }
            const baseCoords =
                this._getHouseAnchorPoints(houseNum).planetCenter;
            housePlanetPositions[houseNum].push({
                id: planet.id,
                baseCoords: baseCoords,
            });
        });

        // Second pass: Draw planets with layout adjustments
        for (const houseNum in housePlanetPositions) {
            const planetsInHouse = housePlanetPositions[houseNum];
            const totalInHouse = planetsInHouse.length;
            const maxPerRow = 3;
            const horizontalSpacing = 24; // Increased spacing
            const verticalSpacing = 24; // Increased spacing

            planetsInHouse.forEach((planetPos, index) => {
                const planetData = planetsData.find(p => p.id === planetPos.id);
                const pConfig = this.config.planetConfig[planetData.id];
                let coords = { ...planetPos.baseCoords };

                // Apply layout offset for multiple planets
                if (totalInHouse > 1) {
                    const row = Math.floor(index / maxPerRow);
                    const col = index % maxPerRow;
                    const numInThisRow = Math.min(
                        totalInHouse - row * maxPerRow,
                        maxPerRow
                    );
                    const totalRowWidth =
                        (numInThisRow - 1) * horizontalSpacing;
                    coords.x =
                        coords.x - totalRowWidth / 2 + col * horizontalSpacing;
                    const totalBlockHeight =
                        (Math.ceil(totalInHouse / maxPerRow) - 1) *
                        verticalSpacing;
                    coords.y =
                        coords.y - totalBlockHeight / 2 + row * verticalSpacing;
                }

                const group = this._createSVGElement("g", {
                    class: `planet-clickable planet-group-${planetData.id}`,
                    "data-planet-id": planetData.id,
                    style: "cursor: pointer;", // Make group clickable
                });

                group.addEventListener("click", () => {
                    if (this.selectedPlanetId === planetData.id)
                        this.selectPlanet(null);
                    else this.selectPlanet(planetData.id);
                });

                // Highlight Circle (initially hidden)
                const highlightCircle = this._createSVGElement("circle", {
                    cx: coords.x,
                    cy: coords.y,
                    r: 16,
                    class: "highlight-circle",
                    opacity: 0, // Hidden by default
                });
                group.appendChild(highlightCircle);

                // Planet Symbol/Text
                const textElement = this._createSVGElement("text", {
                    x: coords.x,
                    y: coords.y,
                    class: "planet-symbol",
                    fill: pConfig.color || "#000",
                });
                textElement.textContent = planetData.retrograde
                    ? planetData.name + "*"
                    : planetData.name || "?";
                group.appendChild(textElement); // Text on top of circle

                planetGroup.appendChild(group);
            });
        }
    }

    // --- Selection Methods ---
    _removeHighlight() {
        // Hide all highlight circles
        this.svg.querySelectorAll(`.highlight-circle`).forEach(el => {
            el.setAttribute("opacity", 0);
        });
        // Remove highlight class from groups
        this.svg.querySelectorAll(`.selected-planet`).forEach(el => {
            el.classList.remove("selected-planet");
        });
    }

    /**
     * Selects a planet, highlighting it in the Kundali.
     *
     * @param {string | null} planetId - The ID of the planet or null to
     *   deselect.
     * @returns {object | null} The selected planet data object or null.
     */
    selectPlanet(planetId) {
        this._removeHighlight();
        if (!planetId) {
            this.selectedPlanetId = null;
            // console.log("Kundali planet deselected.");
            return null;
        }
        const selectedPlanetData = this.currentPlanetsData.find(
            p => p.id === planetId
        );
        this.selectedPlanetId = planetId;
        const planetGroup = this.svg.querySelector(`.planet-group-${planetId}`);
        if (planetGroup) {
            const highlightCircle =
                planetGroup.querySelector(`.highlight-circle`);
            if (highlightCircle) {
                highlightCircle.setAttribute("opacity", 0.1); // Show the circle (semi-transparent)
            }
            planetGroup.classList.add("selected-planet"); // Add class to group
        } else {
            console.warn(
                `Could not find element for planet "${planetId}" to highlight.`
            );
        }
        // console.log(`Kundali planet "${planetId}" selected.`);
        return selectedPlanetData;
    }

    // --- Public Methods ---

    /**
     * Clears the SVG and draws the entire Kundali chart.
     *
     * @param {object[]} planetsData - Array of planet objects [{ id: '...',
     *   longitude: ... }].
     * @param {number} ascendantLongitude - The longitude of the Ascendant
     *   (Lagna).
     */
    drawKundali(planetsData, ascendantLongitude) {
        if (!this.svg) return;
        if (!planetsData || !Array.isArray(planetsData)) {
            console.error("Invalid planetsData passed to drawKundali.");
            return;
        }
        if (isNaN(ascendantLongitude)) {
            console.error("Invalid ascendantLongitude passed to drawKundali.");
            return;
        }

        this.currentPlanetsData = planetsData;
        this.ascendantLongitude = ascendantLongitude;

        this.svg.innerHTML = ""; // Clear everything
        this._removeHighlight(); // Ensure no highlights persist
        const currentlySelected = this.selectedPlanetId; // Store selection
        this.selectedPlanetId = null;

        // Draw components
        this._drawKundaliGrid();
        this._drawHouseLabels();
        this._drawPlanets(planetsData);

        // Re-apply selection if one was active
        if (currentlySelected) {
            this.selectPlanet(currentlySelected);
        }
    }
}

// --- Example Usage (Remains the same, ensure calculateAscendant is implemented) ---
/*
// Assuming:
// <svg id="kundali-svg"></svg>
// GrahaManager instance 'grahaManager'
// Function calculateAscendant(date, location) -> longitude

const kundaliView = new KundaliSVG('kundali-svg');

function updateKundaliView() {
    const currentDate = new Date();
    const ujjainLocation = { lat: 23.1765, lon: 75.7885 };

    grahaManager.calculatePlanetPosition(currentDate);
    const planetPositions = grahaManager.getPlanets();

    // !!! REPLACE THIS with your actual Ascendant calculation !!!
    const ascendantLon = calculateAscendant(currentDate, ujjainLocation);

    if (isNaN(ascendantLon)) {
        console.error("Failed to calculate Ascendant.");
        document.getElementById('kundali-svg').innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="red">Error calculating Ascendant</text>';
        return;
    }

    kundaliView.drawKundali(planetPositions, ascendantLon);
}

// !!! Placeholder - Requires a real astrological library !!!
function calculateAscendant(date, location) {
    console.warn("Using placeholder Ascendant calculation. Replace with a real one.");
    // Rough approximation - NOT ACCURATE FOR ASTROLOGY
    const hours = date.getUTCHours() + date.getUTCMinutes() / 60;
    const approxSunLon = (grahaManager.getPlanetById('sun')?.longitude || 0);
    const roughAscendant = (approxSunLon + (hours - 6) * 15 + 360) % 360;
    return roughAscendant;
    // return 45.0; // Example fixed value
}

// Initial draw
updateKundaliView();

// Add event listeners for updates or selections as needed
*/
