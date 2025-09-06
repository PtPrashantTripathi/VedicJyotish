import { WEEKDAY_PLANETARY_LORDS } from "src/services/calcKalavelas/planetaryLords";
import { createTimePeriods } from "src/services/calcKalavelas/timeCalculations";
import type { KalavelasEn } from "src/services/constants/Planet";
import { reorderArray } from "src/services/utils";
import type { TimeSpan } from "src/types";

/** Calculates day-time Kalavelas based on sunrise time and day duration. */

export function calculateDayKalavelas(
    sunriseJd: number,
    dayDuration: number,
    dayOfWeek: number
): Record<KalavelasEn, TimeSpan> {
    const timePeriods = createTimePeriods(sunriseJd, dayDuration, 8);

    const dayLord = WEEKDAY_PLANETARY_LORDS[dayOfWeek];
    const planetarySequence = reorderArray(
        Object.values(WEEKDAY_PLANETARY_LORDS),
        dayLord
    );

    const iSaturn = planetarySequence.indexOf("Saturn");
    const iSun = planetarySequence.indexOf("Sun");
    const iMars = planetarySequence.indexOf("Mars");
    const iJupiter = planetarySequence.indexOf("Jupiter");
    const iMercury = planetarySequence.indexOf("Mercury");
    return {
        Gulika: { start: timePeriods[iSaturn], end: timePeriods[iSaturn + 1] },
        Kaala: { start: timePeriods[iSun], end: timePeriods[iSun + 1] },
        Mrityu: { start: timePeriods[iMars], end: timePeriods[iMars + 1] },
        Yamaghantaka: {
            start: timePeriods[iJupiter],
            end: timePeriods[iJupiter + 1],
        },
        Ardhaprahara: {
            start: timePeriods[iMercury],
            end: timePeriods[iMercury + 1],
        },
    };
}
