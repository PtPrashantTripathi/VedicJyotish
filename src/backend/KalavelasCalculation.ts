import { KalavelasEn } from "src/backend/Planet";
import { reorderArray } from "src/backend/utils";
import { VarasDetails } from "src/backend/Varas";

/** A map of weekday numbers (0 = Sunday) to their ruling planet (graha). */
export const dayLords = Object.fromEntries(
    Object.values(VarasDetails).map(v => [v.num % 7, v.lord])
);

/**
 * Calculates the day-time Kalavelas.
 *
 * @param sunrise_jd The Julian Day number of the sunrise.
 * @param sunset_jd The Julian Day number of the sunset.
 * @param day_of_weekday The number of the current weekday (0 for Sunday, 6 for
 *   Saturday).
 * @returns A record of day-time Kalavelas with their start Julian Day numbers.
 */
export function DayKalavelasCalculation(
    sunrise_jd: number,
    sunset_jd: number,
    day_of_weekday: number
): Record<KalavelasEn, number> {
    const duration = sunset_jd - sunrise_jd;
    const periods = Array.from(
        { length: 8 },
        (_, i) => sunrise_jd + i * (duration / 8)
    );
    const grahaSequence = reorderArray(
        Object.values(dayLords),
        dayLords[day_of_weekday]
    );

    return {
        Gulika: periods[grahaSequence.indexOf("Saturn")],
        Kaala: periods[grahaSequence.indexOf("Sun")],
        Mrityu: periods[grahaSequence.indexOf("Mars")],
        Yamaghantaka: periods[grahaSequence.indexOf("Jupiter")],
        Ardhaprahara: periods[grahaSequence.indexOf("Mercury")],
    };
}

/**
 * Calculates the night-time Kalavelas.
 *
 * @param sunset_jd The Julian Day number of the sunset.
 * @param next_sunrise_jd The Julian Day number of the next day's sunrise.
 * @param day_of_weekday The number of the current weekday (0 for Sunday, 6 for
 *   Saturday).
 * @returns A record of night-time Kalavelas with their start Julian Day
 *   numbers.
 */
export function NightKalavelasCalculation(
    sunset_jd: number,
    next_sunrise_jd: number,
    day_of_weekday: number
): Record<KalavelasEn, number> {
    const nightDuration = next_sunrise_jd - sunset_jd;
    const nightPeriods = Array.from(
        { length: 8 },
        (_, i) => sunset_jd + i * (nightDuration / 8)
    );

    // The night's planetary sequence starts with the 5th lord from the day lord.
    // 0-indexed: (day of week index + 4) % 7
    const nightLordIndex = (day_of_weekday + 4) % 7;
    const nightLord = dayLords[nightLordIndex];
    const grahaSequence = reorderArray(Object.values(dayLords), nightLord);

    return {
        Gulika: nightPeriods[grahaSequence.indexOf("Saturn")],
        Kaala: nightPeriods[grahaSequence.indexOf("Sun")],
        Mrityu: nightPeriods[grahaSequence.indexOf("Mars")],
        Yamaghantaka: nightPeriods[grahaSequence.indexOf("Jupiter")],
        Ardhaprahara: nightPeriods[grahaSequence.indexOf("Mercury")],
    };
}

/**
 * Calculates all Kalavelas (day and night).
 *
 * @param sunrise_jd The Julian Day number of the sunrise.
 * @param sunset_jd The Julian Day number of the sunset.
 * @param next_sunrise_jd The Julian Day number of the next day's sunrise.
 * @param day_of_weekday The number of the current weekday (0 for Sunday, 6 for
 *   Saturday).
 * @returns An object containing both day and night Kalavelas calculations.
 */
export function getKalavelas(
    sunrise_jd: number,
    sunset_jd: number,
    next_sunrise_jd: number,
    day_of_weekday: number
) {
    return {
        day: DayKalavelasCalculation(sunrise_jd, sunset_jd, day_of_weekday),
        night: NightKalavelasCalculation(
            sunset_jd,
            next_sunrise_jd,
            day_of_weekday
        ),
    };
}
