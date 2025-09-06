class GrahaManager {
    constructor() {
        // --- Planet Configuration (Static Info) ---
        this.planetConfig = {
            sun: { name: "सूर्य", symbol: "सू", siderealPeriod: 365.25876 },
            moon: { name: "चंद्र", symbol: "चं", siderealPeriod: 27.32167 },
            mars: { name: "मंगल", symbol: "मं", siderealPeriod: 686.99749 },
            mercury: { name: "बुध", symbol: "बु", siderealPeriod: 87.9697 },
            jupiter: { name: "गुरु", symbol: "गु", siderealPeriod: 4332.32065 },
            venus: { name: "शुक्र", symbol: "शु", siderealPeriod: 224.69857 },
            saturn: { name: "शनि", symbol: "श", siderealPeriod: 10765.77307 },
            rahu: { name: "राहु", symbol: "रा", siderealPeriod: -6794 }, // Negative for retrograde
            ketu: { name: "केतु", symbol: "के", siderealPeriod: -6794 },
            earth: { name: "पृथ्वी", symbol: "भू" },
        };

        // --- Planet State (Dynamic Info - only essential data) ---
        this.planets = Object.keys(this.planetConfig).map(key => ({
            id: key,
            name: this.planetConfig[key].name,
            symbol: this.planetConfig[key].symbol,
            longitude: NaN, // Initialize longitude as Not a Number
            retrograde: NaN,
        }));

        // Check dependencies needed for calculations
        if (typeof Ephemeris === "undefined")
            console.error(
                "Ephemeris library not loaded (needed by PlanetManager)."
            );
        if (typeof getAyanamsa === "undefined")
            console.error(
                "panchang.js (getAyanamsa) not loaded or defined globally (needed by PlanetManager)."
            );
        if (typeof daysSinceKaliYugaStart === "undefined")
            console.error(
                "panchang.js (daysSinceKaliYugaStart) not loaded or defined globally (needed by PlanetManager)."
            );
    }

    /**
     * Returns the static configuration for all planets.
     *
     * @returns {object} The planet configuration object.
     */
    getPlanetConfig() {
        return this.planetConfig;
    }

    /**
     * Returns the current state (id, name, longitude) of all planets.
     *
     * @returns {object[]} Array of planet data objects.
     */
    getPlanets() {
        return this.planets;
    }
    getAyanamsa() {
        return this.ayanamsa;
    }
    /** Returns the current LST in radians */
    getLST() {
        return this.lst;
    }

    /**
     * Returns the data for a specific planet by its ID.
     *
     * @param {string} planetId - The ID of the planet (e.g., 'sun').
     * @returns {object | undefined} The planet data object or undefined if not
     *   found.
     */
    getPlanetById(planetId) {
        return this.planets.find(p => p.id === planetId);
    }

    /**
     * Calculates planet positions using the Ephemeris library. Updates internal
     * state.
     *
     * @param {Date} date - The date/time for calculation.
     * @param {boolean} [sayan=false] - Whether to calculate Sayana (tropical)
     *   positions. Default is `false`
     */
    calculatePlanetPosition(date, sayan = false, location) {
        if (
            typeof Ephemeris === "undefined" ||
            typeof getAyanamsa === "undefined"
        ) {
            console.error(
                "Dependencies (Ephemeris/getAyanamsa) not available for calculation."
            );
            this.planets.forEach(p => {
                p.longitude = NaN;
            });
            return;
        }

        this.ayanamsa = getAyanamsa(date, sayan);
        try {
            // Use UTC components for ephemeris calculation
            const ephemeris = new Ephemeris.default({
                key: Object.keys(this.planetConfig).filter(
                    k => k !== "rahu" && k !== "ketu"
                ),
                year: date.getUTCFullYear(),
                month: date.getUTCMonth(), // 0-indexed
                day: date.getUTCDate(),
                hours: date.getUTCHours(),
                minutes: date.getUTCMinutes(),
                seconds: date.getUTCSeconds(),
                latitude: location.lat,
                longitude: location.lon,
                height: 0, // Geocentric
                calculateShadows: false,
            });
            const results = ephemeris.Results;
            if (!results) {
                console.error("Ephemeris calculation failed.");
                this.planets.forEach(p => {
                    p.longitude = NaN;
                });
                return;
            }
            this.lst = ephemeris.sun.position.altaz.dLocalApparentSiderialTime;

            // Update longitudes
            this.planets.forEach(p => {
                const config = this.planetConfig[p.id];
                if (!config) return;

                if (p.id === "rahu") {
                    // Get Mean Ascending Node for Rahu
                    p.longitude =
                        ephemeris.moon?.orbit?.meanAscendingNode
                            ?.apparentLongitude ?? NaN;
                    p.retrograde = true;
                } else if (p.id === "ketu") {
                    // Ketu is opposite Rahu
                    p.longitude =
                        ephemeris.moon?.orbit?.meanAscendingNode
                            ?.apparentLongitude + 180 ?? NaN;
                    p.retrograde = true;
                } else if (p.id === "earth") {
                    p.longitude = NaN;
                    p.positionAngle =
                        (ephemeris.Earth.position?.polar[0] * 180) / Math.PI;
                } else {
                    // Other planets
                    const planetResult = results.find(res => res.key === p.id);
                    p.longitude =
                        planetResult?.position?.apparentLongitude ?? NaN;
                    if (p.id != "sun")
                        p.positionAngle =
                            (planetResult?.position?.polar[0] * 180) / Math.PI;
                    p.retrograde = planetResult?.motion?.isRetrograde;
                    p.sunEarthObjectAngle =
                        (Math.acos(-planetResult?.locals.ep) * 180) / Math.PI;

                    if (p.id == "moon") {
                        p.illuminatedFraction =
                            planetResult?.position.illuminatedFraction ?? 0.5; // k
                        p.phaseAngle = planetResult.position.phaseDecimal * 360;
                    }
                }

                // Apply Ayanamsa and normalize
                if (!isNaN(p.longitude)) {
                    // IMPORTANT: Ephemeris gives Tropical longitude. Ayanamsa is SUBTRACTED for Nirayana.
                    // The original code added it, which might be incorrect depending on the getAyanamsa implementation.
                    // Assuming getAyanamsa returns the standard Lahiri-like value to subtract from Tropical.
                    p.longitude = (p.longitude + this.ayanamsa + 360) % 360; // Apply Ayanamsa for Nirayana
                } else {
                    //console.warn(`Could not calculate longitude for ${p.id}`);
                }
            });
        } catch (error) {
            console.error("Error during Ephemeris calculation:", error);
            this.planets.forEach(p => {
                p.longitude = NaN;
            });
        }
    }

    /**
     * Calculates approximate planet positions using Surya Siddhanta mean
     * motions. Updates internal state.
     *
     * @param {Date} date - The date/time for calculation.
     * @param {boolean} [sayan=false] - Whether to calculate Sayana (tropical)
     *   positions. Default is `false`
     */
    calculateSuryaSidhdhantaPosition(date, sayan = false) {
        if (
            typeof daysSinceKaliYugaStart === "undefined" ||
            typeof getAyanamsa === "undefined"
        ) {
            console.error(
                "Dependencies (daysSinceKaliYugaStart/getAyanamsa) not available for SS calculation."
            );
            this.planets.forEach(p => {
                p.longitude = NaN;
            });
            return;
        }
        const ahargana = daysSinceKaliYugaStart(date);
        const ayanamsa = getAyanamsa(date, sayan);

        this.planets.forEach(p => {
            const config = this.planetConfig[p.id];
            if (!config || !config.siderealPeriod) {
                p.longitude = NaN;
                return;
            }
            // Simple mean motion calculation (highly approximate)
            // Assumes initial longitude of 0 at Kali Yuga start for simplicity here
            // A proper SS implementation needs initial positions and corrections.
            const revolutions = ahargana / config.siderealPeriod;
            p.longitude = (revolutions * 360 + ayanamsa + 360) % 360; // Apply Ayanamsa
            if (p.id == "rahu") p.longitude += 180;
        });
        // Note: This SS calculation is extremely basic and doesn't account for
        // epicycles, equations of center, etc. It's just a placeholder.
    }
}
