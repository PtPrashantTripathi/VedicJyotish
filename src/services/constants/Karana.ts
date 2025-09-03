import type { CalculatedDetail, Translation } from "src/services/types";
import { MOD360 } from "src/services/utils";

/** Type Definitions */
export type KaranaEn =
    | "Sakuni"
    | "Catuspada"
    | "Naga"
    | "Kimstughna"
    | "Bava"
    | "Balava"
    | "Kaulava"
    | "Taitila"
    | "Gara"
    | "Vanij"
    | "Vishti";

export type KaranaHi =
    | "शकुनि"
    | "चतुष्पाद"
    | "नाग"
    | "किस्तुध्न"
    | "बव"
    | "बालव"
    | "कौलव"
    | "तैतिल"
    | "गर"
    | "वणिज"
    | "विष्टि";

/**
 * Static details of a Karana. The `num` field here is the sequential number for
 * fixed Karanas or the base number for repeating ones.
 */
export interface KaranaDetail {
    name: Translation<KaranaEn, KaranaHi>;
    num: number;
}

/** The final calculated Karana object, including positional data. */
export type Karana = KaranaDetail & CalculatedDetail;

/** Constants */

/**
 * A comprehensive dictionary containing details for each of the 11 unique
 * Karanas. This serves as the primary source of truth for Karana names.
 *
 * @type {Record<KaranaEn, KaranaDetail>}
 */
export const KaranaDetailsMap: Record<KaranaEn, KaranaDetail> = {
    Bava: { name: { english: "Bava", hindi: "बव" }, num: 1 },
    Balava: { name: { english: "Balava", hindi: "बालव" }, num: 2 },
    Kaulava: { name: { english: "Kaulava", hindi: "कौलव" }, num: 3 },
    Taitila: { name: { english: "Taitila", hindi: "तैतिल" }, num: 4 },
    Gara: { name: { english: "Gara", hindi: "गर" }, num: 5 },
    Vanij: { name: { english: "Vanij", hindi: "वणिज" }, num: 6 },
    Vishti: { name: { english: "Vishti", hindi: "विष्टि" }, num: 7 },
    Sakuni: { name: { english: "Sakuni", hindi: "शकुनि" }, num: 57 },
    Catuspada: { name: { english: "Catuspada", hindi: "चतुष्पाद" }, num: 58 },
    Naga: { name: { english: "Naga", hindi: "नाग" }, num: 59 },
    Kimstughna: {
        name: { english: "Kimstughna", hindi: "किस्तुध्न" },
        num: 60,
    },
};

/** The total number of unique Karana slots in the zodiac. */
export const TOTAL_KARANA_SLOTS = 60;

/** The angular span of each Karana in degrees ($360^\circ/60 = 6^\circ$). */
export const DEG_PER_KARANA = 6;

/**
 * An array of the 7 repeating Karanas (Bava to Vishti). Used for easy access
 * within the conditional logic.
 */
const repeatingKaranas = Object.values(KaranaDetailsMap).slice(0, 7);

/**
 * Calculates the Karana (lunar mansion) based on a given zodiac degree using a
 * conditional `if/else` approach.
 *
 * @param {number} sun_lon - The sun's longitude (0 to 360 degrees).
 * @param {number} moon_lon - The moon's longitude (0 to 360 degrees).
 * @returns {Karana} A full Karana object containing metadata and positional
 *   info.
 * @throws {Error} If a valid Karana cannot be determined.
 */
export function getKarana(sun_lon: number, moon_lon: number): Karana {
    /**
     * 1. Calculate the lunar degree: the angular distance of the Moon from the
     *    Sun.
     */
    const degree = MOD360(moon_lon - sun_lon);

    /** 2. Determine the Karana index (0-59) from the lunar degree. */
    const index = Math.trunc(degree / DEG_PER_KARANA);

    const details: KaranaDetail =
        index === 0
            ? /** #60 */
              KaranaDetailsMap.Kimstughna
            : index === 56
              ? /** #57 */
                KaranaDetailsMap.Sakuni
              : index === 57
                ? /** #58 */
                  KaranaDetailsMap.Catuspada
                : index === 58
                  ? /** #59 */
                    KaranaDetailsMap.Naga
                  : /**
                     * All other indices (1-55) are part of the repeating cycle of 7 Karanas. We
                     * use the modulo operator to find the correct Karana in the cycle.
                     */
                    repeatingKaranas[(index - 1) % 7];

    if (!details) {
        throw new Error(`No Karana found for degree ${degree}`);
    }

    /** 4. Construct and return the final Karana object. */
    return {
        ...details,
        /** The `num` is the 0-based index from the calculation. */
        num: index,
        /** Calculate the angular range for this Karana. */
        range: {
            start: index * DEG_PER_KARANA,
            end: (index + 1) * DEG_PER_KARANA,
        },
        degree: degree % DEG_PER_KARANA,
    };
}
