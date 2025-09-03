import { type SeasonDetail, Seasons } from "src/services/constants/Season";
import type { Translation } from "src/services/types";

// Type Definitions
export type MaahaEn =
    | "Chhaitra"
    | "Vaishakha"
    | "Jyeshtha"
    | "Ashadha"
    | "Shravana"
    | "Bhadrapada"
    | "Ashwin"
    | "Kartika"
    | "Margashirsha"
    | "Pausha"
    | "Magha"
    | "Phalguna";

export type MaahaHi =
    | "चैत्र"
    | "वैशाख"
    | "ज्येष्ठ"
    | "आषाढ"
    | "श्रावण"
    | "भाद्रपद"
    | "आश्विन"
    | "कार्तिक"
    | "मार्गशीर्ष"
    | "पौष"
    | "माघ"
    | "फाल्गुन";

/** The unique identifier for a Maaha (lunar month), from 1 to 12. */
export type MaahaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Static details of a Maaha (lunar month). */
export interface MaahaDetail {
    name: Translation<MaahaEn, MaahaHi>;
    num: MaahaNumber;
    season: SeasonDetail;
}

// Data: Source of Truth for Maaha Details

/**
 * A comprehensive dictionary containing details for each of the 12 Maahas. This
 * serves as the primary source of truth.
 *
 * @type {Record<MaahaEn, MaahaDetail>}
 */
export const MaahaDetails: Record<MaahaEn, MaahaDetail> = {
    Chhaitra: {
        name: { english: "Chhaitra", hindi: "चैत्र" },
        num: 1,
        season: Seasons.Vasant,
    },
    Vaishakha: {
        name: { english: "Vaishakha", hindi: "वैशाख" },
        num: 2,
        season: Seasons.Vasant,
    },
    Jyeshtha: {
        name: { english: "Jyeshtha", hindi: "ज्येष्ठ" },
        num: 3,
        season: Seasons.Grishma,
    },
    Ashadha: {
        name: { english: "Ashadha", hindi: "आषाढ" },
        num: 4,
        season: Seasons.Grishma,
    },
    Shravana: {
        name: { english: "Shravana", hindi: "श्रावण" },
        num: 5,
        season: Seasons.Varsha,
    },
    Bhadrapada: {
        name: { english: "Bhadrapada", hindi: "भाद्रपद" },
        num: 6,
        season: Seasons.Varsha,
    },
    Ashwin: {
        name: { english: "Ashwin", hindi: "आश्विन" },
        num: 7,
        season: Seasons.Sharad,
    },
    Kartika: {
        name: { english: "Kartika", hindi: "कार्तिक" },
        num: 8,
        season: Seasons.Sharad,
    },
    Margashirsha: {
        name: { english: "Margashirsha", hindi: "मार्गशीर्ष" },
        num: 9,
        season: Seasons.Hemant,
    },
    Pausha: {
        name: { english: "Pausha", hindi: "पौष" },
        num: 10,
        season: Seasons.Hemant,
    },
    Magha: {
        name: { english: "Magha", hindi: "माघ" },
        num: 11,
        season: Seasons.Shishir,
    },
    Phalguna: {
        name: { english: "Phalguna", hindi: "फाल्गुन" },
        num: 12,
        season: Seasons.Shishir,
    },
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of Maaha details for O(1) lookup time. It is generated once
 * from the `MaahaDetails` object and sorted by `num`. The array is 0-indexed,
 * so we access it with `maaha_num - 1`.
 *
 * @type {MaahaDetail[]}
 */
const MaahaDetailsByIndex: MaahaDetail[] = Object.values(MaahaDetails).sort(
    (a, b) => a.num - b.num
);

// Core Calculation Function

/**
 * Retrieves the details of a Maaha (lunar month) based on its number.
 *
 * @param {MaahaNumber} maaha_num - The number of the Maaha (1-12).
 * @returns {MaahaDetail} A full Maaha object containing its details.
 * @throws {Error} If the maaha_num is out of the valid range (1-12).
 */
export function getMaaha(maaha_num: MaahaNumber): MaahaDetail {
    // 1. Perform a bounds check to ensure the number is valid.
    if (maaha_num < 1 || maaha_num > 12) {
        throw new Error(
            `Invalid Maaha number: ${maaha_num}. Number must be between 1 and 12.`
        );
    }

    // 2. Retrieve Maaha details using a direct O(1) array lookup.
    const details = MaahaDetailsByIndex[maaha_num - 1];

    if (!details) {
        throw new Error(
            `Could not find Maaha details for number: ${maaha_num}.`
        );
    }

    // 3. Return the found details.
    return details;
}
