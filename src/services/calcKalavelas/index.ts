import { calculateDayKalavelas } from "src/services/calcKalavelas/dayKalavelas";
import { calculateNightKalavelas } from "src/services/calcKalavelas/nightKalavelas";
import { decimalToHMS } from "src/services/utils";

/**
 * Calculates comprehensive Kalavelas data for day and night periods.
 *
 * @param sunriseJd Julian Day number of sunrise
 * @param sunsetJd Julian Day number of sunset
 * @param nextSunriseJd Julian Day number of next day's sunrise
 * @param dayOfWeek Weekday number (0 = Sunday, 6 = Saturday)
 * @returns Complete Kalavelas calculations including day, night
 */
export function calculateKalavelas(
    sunriseJd: number,
    sunsetJd: number,
    nextSunriseJd: number,
    dayOfWeek: number
) {
    const dayDuration = sunsetJd - sunriseJd;
    const nightDuration = nextSunriseJd - sunsetJd;

    return {
        day_duration: decimalToHMS(dayDuration),
        day_kalavelas: calculateDayKalavelas(sunriseJd, dayDuration, dayOfWeek),
        night_duration: decimalToHMS(nightDuration),
        night_kalavelas: calculateNightKalavelas(
            sunsetJd,
            nightDuration,
            dayOfWeek
        ),
    };
}
