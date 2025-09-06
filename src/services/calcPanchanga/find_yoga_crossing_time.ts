import { MOD360 } from "src/services/utils";

/**
 * @param jd_start The Julian Day to start searching from.
 * @param target_lon The target combined longitude.
 * @returns The Julian Day (UT) of the event.
 * @brief Finds the precise time for the sum of Sun and Moon longitudes to cross a specific degree (for Yoga).
 */
export function find_yoga_crossing_time(
    jd_start: number,
    target_lon: number
): number {
    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    // Get initial positions and speeds
    let xx_sun = swe.swe_calc_ut(jd_start, swe.SE_SUN, iflag);
    let xx_moon = swe.swe_calc_ut(jd_start, swe.SE_MOON, iflag);

    let combined_lon = MOD360(xx_sun[0] + xx_moon[0]);
    let combined_speed = xx_sun[3] + xx_moon[3];

    // Initial estimate
    let angle_diff = target_lon - combined_lon;
    if (angle_diff > 180.0) angle_diff -= 360.0;
    if (angle_diff < -180.0) angle_diff += 360.0;

    let jd_estimated = jd_start + angle_diff / combined_speed;

    // Refine with maximum 5 iterations
    for (let i = 0; i < 5; i++) {
        xx_sun = swe.swe_calc_ut(jd_estimated, swe.SE_SUN, iflag);
        xx_moon = swe.swe_calc_ut(jd_estimated, swe.SE_MOON, iflag);

        combined_lon = MOD360(xx_sun[0] + xx_moon[0]);
        combined_speed = xx_sun[3] + xx_moon[3];
        angle_diff = target_lon - combined_lon;

        if (angle_diff > 180.0) angle_diff -= 360.0;
        if (angle_diff < -180.0) angle_diff += 360.0;

        if (Math.abs(angle_diff) < 0.001) break;

        if (combined_speed !== 0) {
            jd_estimated += angle_diff / combined_speed;
        }
    }
    return jd_estimated;
}
