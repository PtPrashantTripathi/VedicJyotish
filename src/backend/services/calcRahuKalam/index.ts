import type { TimeSpan } from "src/types";

/**
 * Rahu Kalam portion indices for each day of the week. Index corresponds to
 * weekday (0 = Sunday, 6 = Saturday).
 */
export const RAHU_KALAM_PORTIONS = [8, 2, 7, 5, 6, 4, 3];

/**
 * Calculates Rahu Kalam period for the given day.
 *
 * @param sunriseJd Julian Day number of sunrise
 * @param sunsetJd Julian Day number of sunset
 * @param dayOfWeek Weekday number (0 = Sunday, 6 = Saturday)
 * @returns Rahu Kalam
 */
export function calculateRahuKalam(
    sunriseJd: number,
    sunsetJd: number,
    dayOfWeek: number
): TimeSpan {
    const dayDuration = sunsetJd - sunriseJd;
    const portionDuration = dayDuration / 8;
    const portionIndex = RAHU_KALAM_PORTIONS[dayOfWeek] - 1;

    return {
        start: sunriseJd + portionIndex * portionDuration,
        end: sunriseJd + (portionIndex + 1) * portionDuration,
    };
}
