/**
 * Mean tropical year length (solar year) — **fast approximation**.
 *
 * Based on Laskar (1986) and McCarthy & Seidelmann (2009). Valid for ± a few
 * thousand years around J2000.
 *
 * @param {number} JD - Julian Day (Terrestrial Time).
 * @returns {number} - Approximate tropical year length (days).
 */
export function tropicalYearApprox(JD: number): number {
    const Ts = (JD - 2451545.0) / 36525.0;
    return (
        365.2421896698 -
        6.15359e-6 * Ts -
        7.29e-10 * Ts * Ts +
        2.64e-10 * Ts * Ts * Ts
    );
}

/**
 * Mean tropical year length (solar year) — **extended model**.
 *
 * Based on Simon & alii, "Numerical Expressions for precession formulae and
 * mean elements for the Moon and the planets," Astronomy and Astrophysics 282,
 * 663-683 (1994), p. 678.
 *
 * More accurate over long timescales (tens of thousands of years).
 *
 * @param {number} JD - Julian Day (Terrestrial Time).
 * @returns {number} - Tropical year length (days).
 */
export function tropicalYearExtended(JD: number): number {
    const Ts = (JD - 2451545.0) / 365250.0;
    const t2 = Ts * Ts;
    const t3 = t2 * Ts;
    const t4 = t3 * Ts;
    const t5 = t4 * Ts;
    const dvel =
        (1296027711.03429 +
            2 * 109.15809 * Ts +
            3 * 0.07207 * t2 -
            4 * 0.2353 * t3 -
            5 * 0.0018 * t4 +
            6 * 0.0002 * t5) /
        /* arcsec per milllennium */
        3600.0;
    /* degrees per millennium */
    const dcycle = (360.0 * 365250.0) / dvel;
    return dcycle;
}
