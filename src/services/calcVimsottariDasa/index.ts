import type { DateTime } from "luxon";
import { AntarDashaPhal } from "src/services/calcVimsottariDasa/AntarDashaPhal";
import { MahaDashaPhal } from "src/services/calcVimsottariDasa/MahaDashaPhal";
import { tropicalYearExtended } from "src/services/calcVimsottariDasa/MeanTropicalYear";
import type { Nakshatra } from "src/services/constants/Nakshatra";
import type { NavagrahaEn } from "src/services/constants/Planet";
import type { SourceBookEn, Translation } from "src/services/types";
import { reorderArray } from "src/services/utils";

/** TYPE DEFINITIONS */

/** Represents the astrological phala (results) from a source text. */
export type DashaPhal = Partial<
    Record<SourceBookEn, Translation<string, string>>
>;

/** Enumerates the different levels of Vimsottari Dasha periods. */
export type DashaName =
    | "MahaDasha"
    | "AntarDasha"
    | "PratyantarDasha"
    | "SookshmaDasha"
    | "PraanaDasha"
    | "DehaDasha";

/** Represents a single Dasha period entry with all its calculated properties. */
export interface Dasha {
    Name: DashaName;
    Lord: NavagrahaEn;
    StartDate: DateTime;
    EndDate: DateTime;
    Phal: DashaPhal;
    ChildDasha: Dasha[];
}

/** STATIC DATA */

/** The duration in years for each planetary lord in the Vimsottari Dasha system. */
export const DurationOfVimsottariDasa: Record<NavagrahaEn, number> = {
    Mercury: 17,
    Ketu: 7,
    Venus: 20,
    Sun: 6,
    Moon: 10,
    Mars: 7,
    Rahu: 18,
    Jupiter: 16,
    Saturn: 19,
};

/**
 * A map to define the hierarchy of Dasha levels.
 *
 * @example
 *     The child of a 'MahaDasha' is an 'AntarDasha'.
 */
const childDasha: Record<DashaName, DashaName | undefined> = {
    MahaDasha: "AntarDasha",
    AntarDasha: "PratyantarDasha",
    PratyantarDasha: "SookshmaDasha",
    SookshmaDasha: "PraanaDasha",
    PraanaDasha: "DehaDasha",
    DehaDasha: undefined,
};

/**
 * # =============================================================================
 *
 * PUBLIC FUNCTIONS
 */

/**
 * Calculates the complete Vimsottari Dasha tree from the date of birth and the
 * Moon's Nakshatra.
 *
 * @param JD - The Julian Day number of the birth moment.
 * @param moon_nakshatra - The Nakshatra in which the Moon is placed at birth.
 * @param DOB - The date and time of birth as a Luxon DateTime object.
 * @returns An array of MahaDasha objects, each containing its sub-dashas.
 */
export function calcVimsottariDasa(
    JD: number,
    moon_nakshatra: Nakshatra,
    DOB: DateTime
): Dasha[] {
    // Determine the length of the tropical year in days for accurate calculations.
    const solarYear = tropicalYearExtended(JD);

    // Calculate the total degrees of the Moon's nakshatra (360/27).
    const degreesPerNakshatra = 360 / 27;

    // Calculate the degree balance of the Moon's nakshatra at birth.
    // The `degree` property of Nakshatra is the position within the Nakshatra, from 0 to degreesPerNakshatra.
    const remainingDegreeInNakshatra =
        degreesPerNakshatra - moon_nakshatra.degree;

    // Calculate the duration of the remaining part of the first MahaDasha.
    const dasaBalance =
        DurationOfVimsottariDasa[moon_nakshatra.lord] *
        (remainingDegreeInNakshatra / degreesPerNakshatra);

    // Calculate the start date of the entire Vimsottari Dasa cycle.
    // This is the date before birth when the current MahaDasha began.
    const StartDate = DOB.minus({ days: dasaBalance * solarYear });

    // Compute the full Dasha tree starting from the MahaDasha level.
    return computeDasha(
        "MahaDasha",
        moon_nakshatra.lord,
        StartDate,
        solarYear,
        120 // The total duration of all Maha Dashas is 120 years.
    );
}

/**
 * A recursive function to compute Dasha periods at different levels (Maha,
 * Antar, etc.).
 *
 * @param dashaName - The name of the current Dasha level being calculated.
 * @param parentLord - The planetary lord of the parent Dasha.
 * @param startDate - The start date of the current Dasha sequence.
 * @param solarYear - The length of the tropical year in days.
 * @param parentDuration - The total duration of the parent Dasha sequence in
 *   years.
 * @returns An array of Dasha objects for the current level.
 */
function computeDasha(
    dashaName: DashaName,
    parentLord: NavagrahaEn,
    startDate: DateTime,
    solarYear: number,
    parentDuration: number
): Dasha[] {
    // Get the sequence of lords for the current Dasha level, starting with the parent lord.
    const sequence = reorderArray(
        Object.keys(DurationOfVimsottariDasa),
        parentLord
    ) as NavagrahaEn[];

    let cursor = startDate;

    return sequence.map(currentLord => {
        // Calculate the duration of the current Dasha period.
        // The duration of a sub-dasha is proportional to its lord's period
        // relative to the total 120-year cycle.
        const durationYears =
            (DurationOfVimsottariDasa[currentLord] * parentDuration) / 120;

        const endDate = cursor.plus({ days: durationYears * solarYear });

        const childDashaName = childDasha[dashaName];

        const dashaEntry: Dasha = {
            Name: dashaName,
            Lord: currentLord,
            StartDate: cursor,
            EndDate: endDate,
            // Assign the correct Phal (results) based on the Dasha level.
            Phal:
                dashaName === "MahaDasha"
                    ? MahaDashaPhal[currentLord]
                    : dashaName === "AntarDasha"
                      ? AntarDashaPhal[parentLord]?.[currentLord]
                      : {},
            // Recursively compute the next level of child dashas if they exist.
            ChildDasha:
                childDashaName === "AntarDasha"
                    ? computeDasha(
                          childDashaName,
                          currentLord,
                          cursor,
                          solarYear,
                          durationYears
                      )
                    : [],
        };

        // Advance the cursor to the end date for the next iteration.
        cursor = endDate;
        return dashaEntry;
    });
}
