import {
    GiAquarius,
    GiAries,
    GiCancer,
    GiCapricorn,
    GiGemini,
    GiLeo,
    GiLibra,
    GiPisces,
    GiSagittarius,
    GiScorpio,
    GiTaurus,
    GiVirgo,
} from "react-icons/gi";
import type { IconType } from "react-icons/lib";
import type { SaptagrahaEn } from "src/services/constants/Planet";
import type { CalculatedDetail, Translation } from "src/services/types";
import { MOD360 } from "src/services/utils";

// Type Definitions
export type RasiEn =
    | "Aries"
    | "Taurus"
    | "Gemini"
    | "Cancer"
    | "Leo"
    | "Virgo"
    | "Libra"
    | "Scorpio"
    | "Sagittarius"
    | "Capricorn"
    | "Aquarius"
    | "Pisces";

export type RasiHi =
    | "मेष"
    | "वृषभ"
    | "मिथुन"
    | "कर्क"
    | "सिंह"
    | "कन्या"
    | "तुला"
    | "वृश्चिक"
    | "धनु"
    | "मकर"
    | "कुंभ"
    | "मीन";

/* Classical elements */
export type ElementEn = "Fire" | "Earth" | "Air" | "Water";

/* Gender of Rasi */
export type GenderEn = "M" | "F";

/* Nature of sign */
export type NatureEn = "Movable" | "Fixed" | "Dual";

/** The unique identifier for a Rasi, from 1 to 12. */
export type RasiNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Static details of a Rasi (Zodiac Sign). */
export interface RasiDetail {
    rasi_num: RasiNumber;
    name: Translation<RasiEn, RasiHi>;
    lord: SaptagrahaEn;
    element: ElementEn;
    gender: GenderEn;
    nature: NatureEn;
    symbol: IconType;
    color: string;
}

/** The final calculated Rasi object, including positional data. */
export type Rasi = RasiDetail & CalculatedDetail;

// Constants

/** The total number of Rasi (Zodiac) signs. */
export const TOTAL_RASI_SIGNS: RasiNumber = 12;

/** Each Rasi spans 30 degrees of the zodiac. */
export const DEG_PER_RASI = 360 / TOTAL_RASI_SIGNS;

// Data: Source of Truth for Rasi Details

/**
 * A comprehensive dictionary containing details for each of the 12 Rasis. This
 * serves as the primary source of truth.
 *
 * @type {Record<RasiEn, RasiDetail>}
 */
export const RasiDetails: Record<RasiEn, RasiDetail> = {
    Aries: {
        rasi_num: 1,
        name: { hindi: "मेष", english: "Aries" },
        lord: "Mars",
        element: "Fire",
        gender: "M",
        nature: "Movable",
        symbol: GiAries,
        color: "#ff0000",
    },
    Taurus: {
        rasi_num: 2,
        name: { hindi: "वृषभ", english: "Taurus" },
        lord: "Venus",
        element: "Earth",
        gender: "F",
        nature: "Fixed",
        symbol: GiTaurus,
        color: "#00ff00",
    },
    Gemini: {
        rasi_num: 3,
        name: { hindi: "मिथुन", english: "Gemini" },
        lord: "Mercury",
        element: "Air",
        gender: "M",
        nature: "Dual",
        symbol: GiGemini,
        color: "#ee754f",
    },
    Cancer: {
        rasi_num: 4,
        name: { hindi: "कर्क", english: "Cancer" },
        lord: "Moon",
        element: "Water",
        gender: "F",
        nature: "Movable",
        symbol: GiCancer,
        color: "#4a6efa",
    },
    Leo: {
        rasi_num: 5,
        name: { hindi: "सिंह", english: "Leo" },
        lord: "Sun",
        element: "Fire",
        gender: "M",
        nature: "Fixed",
        symbol: GiLeo,
        color: "#ff4c45",
    },
    Virgo: {
        rasi_num: 6,
        name: { hindi: "कन्या", english: "Virgo" },
        lord: "Mercury",
        element: "Earth",
        gender: "F",
        nature: "Dual",
        symbol: GiVirgo,
        color: "#ee754f",
    },
    Libra: {
        rasi_num: 7,
        name: { hindi: "तुला", english: "Libra" },
        lord: "Venus",
        element: "Air",
        gender: "M",
        nature: "Movable",
        symbol: GiLibra,
        color: "#00ff00",
    },
    Scorpio: {
        rasi_num: 8,
        name: { hindi: "वृश्चिक", english: "Scorpio" },
        lord: "Mars",
        element: "Water",
        gender: "F",
        nature: "Fixed",
        symbol: GiScorpio,
        color: "#ff0000",
    },
    Sagittarius: {
        rasi_num: 9,
        name: { hindi: "धनु", english: "Sagittarius" },
        lord: "Jupiter",
        element: "Fire",
        gender: "M",
        nature: "Dual",
        symbol: GiSagittarius,
        color: "#0134ff",
    },
    Capricorn: {
        rasi_num: 10,
        name: { hindi: "मकर", english: "Capricorn" },
        lord: "Saturn",
        element: "Earth",
        gender: "F",
        nature: "Movable",
        symbol: GiCapricorn,
        color: "#964B00",
    },
    Aquarius: {
        rasi_num: 11,
        name: { hindi: "कुंभ", english: "Aquarius" },
        lord: "Saturn",
        element: "Air",
        gender: "M",
        nature: "Fixed",
        symbol: GiAquarius,
        color: "#964B00",
    },
    Pisces: {
        rasi_num: 12,
        name: { hindi: "मीन", english: "Pisces" },
        lord: "Jupiter",
        element: "Water",
        gender: "F",
        nature: "Dual",
        symbol: GiPisces,
        color: "#0134ff",
    },
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of Rasi details for O(1) lookup time. It is generated once
 * from the `RasiDetails` object and sorted by `rasi_num`. The array is
 * 0-indexed, so we access it with `rasi_num - 1`.
 *
 * @type {RasiDetail[]}
 */
const RasiDetailsByIndex: RasiDetail[] = Object.values(RasiDetails).sort(
    (a, b) => a.rasi_num - b.rasi_num
);

// Core Calculation Function

/**
 * Calculates the Rasi (Zodiac Sign) based on a given zodiac degree.
 *
 * @param {number} degree - The ecliptic longitude (0° to 360°).
 * @returns {Rasi} A full Rasi object containing its details and positional
 *   info.
 * @throws {Error} If the degree is invalid or a Rasi cannot be found.
 */
export function getRasi(degree: number): Rasi {
    // 1. Normalize degree to be within the 0-360 range.
    const normalizedDegree = MOD360(degree);

    // 2. Determine the Rasi number (1-based index).
    const rasiNum = Math.floor(normalizedDegree / DEG_PER_RASI) + 1;

    // 3. Perform a bounds check to ensure the number is valid.
    if (rasiNum < 1 || rasiNum > TOTAL_RASI_SIGNS) {
        throw new Error(
            `Invalid Rasi number calculated: ${rasiNum}. Degree was ${degree}.`
        );
    }

    // 4. Retrieve Rasi details using a direct O(1) array lookup.
    const details = RasiDetailsByIndex[rasiNum - 1];

    if (!details) {
        throw new Error(`Could not find Rasi details for number: ${rasiNum}.`);
    }

    // 5. Construct and return the final Rasi object.
    return {
        ...details,
        degree: normalizedDegree % DEG_PER_RASI,
        // Calculate the start and end degrees for this Rasi's span.
        range: {
            start: (rasiNum - 1) * DEG_PER_RASI,
            end: rasiNum * DEG_PER_RASI,
        },
    };
}
