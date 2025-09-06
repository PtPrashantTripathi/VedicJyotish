import { WEEKDAY_PLANETARY_LORDS } from "src/services/calcKalavelas/planetaryLords";
import { createTimePeriods } from "src/services/calcKalavelas/timeCalculations";
import type { KalavelasEn } from "src/services/constants/Planet";
import { reorderArray } from "src/services/utils";
import type { TimeSpan } from "src/types";

/**
 * Gets the night lord based on the day of the week. Night sequence starts with
 * the 5th lord from the day lord.
 */
export function getNightLordIndex(dayOfWeek: number): number {
    return (dayOfWeek + 4) % 7;
}

/** Calculates night-time Kalavelas based on sunset time and night duration. */
export function calculateNightKalavelas(
    sunsetJd: number,
    nightDuration: number,
    dayOfWeek: number
): Record<KalavelasEn, TimeSpan> {
    const timePeriods = createTimePeriods(sunsetJd, nightDuration, 8);

    const nightLordIndex = getNightLordIndex(dayOfWeek);
    const nightLord = WEEKDAY_PLANETARY_LORDS[nightLordIndex];
    const planetarySequence = reorderArray(
        Object.values(WEEKDAY_PLANETARY_LORDS),
        nightLord
    );

    const iSaturn = planetarySequence.indexOf("Saturn");
    const iSun = planetarySequence.indexOf("Sun");
    const iMars = planetarySequence.indexOf("Mars");
    const iJupiter = planetarySequence.indexOf("Jupiter");
    const iMercury = planetarySequence.indexOf("Mercury");
    return {
        Gulika: { start: timePeriods[iSaturn - 1], end: timePeriods[iSaturn] },
        Kaala: { start: timePeriods[iSun - 1], end: timePeriods[iSun] },
        Mrityu: { start: timePeriods[iMars - 1], end: timePeriods[iMars] },
        Yamaghantaka: {
            start: timePeriods[iJupiter - 1],
            end: timePeriods[iJupiter],
        },
        Ardhaprahara: {
            start: timePeriods[iMercury - 1],
            end: timePeriods[iMercury],
        },
    };
}
