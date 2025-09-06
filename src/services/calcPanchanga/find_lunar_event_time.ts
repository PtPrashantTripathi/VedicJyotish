import { MOD360 } from "src/services/utils";

/**
 * @param jd_start The Julian Day to start searching from.
 * @param target_angle The target angular separation in degrees.
 * @returns The Julian Day (UT) of the event.
 * @brief Finds the precise time for a lunar event (Tithi/Karana) crossing.
 * This is when the angular separation between the Moon and Sun reaches a specific degree.
 */
export function find_lunar_event_time(
    jd_start: number,
    target_angle: number
): number {
    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    // Get current positions and speeds
    let xx_sun = swe.swe_calc_ut(jd_start, swe.SE_SUN, iflag);
    let xx_moon = swe.swe_calc_ut(jd_start, swe.SE_MOON, iflag);

    let lunar_phase = MOD360(xx_moon[0] - xx_sun[0]);
    let relative_speed = xx_moon[3] - xx_sun[3];

    // initial estimate
    let angle_diff = target_angle - lunar_phase;
    if (angle_diff > 180.0) angle_diff -= 360.0;
    if (angle_diff < -180.0) angle_diff += 360.0;

    // Initial approximation
    let jd_estimated = jd_start + angle_diff / relative_speed;

    // Refine with maximum 5 iterations
    for (let i = 0; i < 5; i++) {
        // Calculate Sun and Moon positions at the current estimated time
        xx_sun = swe.swe_calc_ut(jd_estimated, swe.SE_SUN, iflag);
        xx_moon = swe.swe_calc_ut(jd_estimated, swe.SE_MOON, iflag);

        // Calculate current separation, handling the 360-degree wrap-around
        lunar_phase = MOD360(xx_moon[0] - xx_sun[0]);

        // Relative speed of Moon with respect to Sun
        relative_speed = xx_moon[3] - xx_sun[3];

        // Difference from target
        angle_diff = target_angle - lunar_phase;

        // Handle wrap-around for the difference itself
        if (angle_diff > 180.0) angle_diff -= 360.0;
        if (angle_diff < -180.0) angle_diff += 360.0;
        if (Math.abs(angle_diff) < 0.001) break; // Sufficient precision

        if (relative_speed !== 0) {
            // Avoid division by zero
            // Estimate time correction and update the Julian Day
            jd_estimated += angle_diff / relative_speed;
        }
    }
    return jd_estimated;
}
