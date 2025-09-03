import type { NavagrahaEn } from "src/services/constants/Planet";
import type { CalculatedDetail, Translation } from "src/services/types";
import { MOD360 } from "src/services/utils";

/** Type Definitions */
export type NakshatraEn =
    | "Aswini"
    | "Bharani"
    | "Krittika"
    | "Rohini"
    | "Mrigashira"
    | "Ardra"
    | "Punarvasu"
    | "Pushya"
    | "Ashlesha"
    | "Magha"
    | "PurvaPhalguni"
    | "UttaraPhalguni"
    | "Hasta"
    | "Chitra"
    | "Swati"
    | "Vishakha"
    | "Anuradha"
    | "Jyeshtha"
    | "Mula"
    | "PurvaShadha"
    | "UttaraShadha"
    | "Sravana"
    | "Dhanishta"
    | "Shatabhisha"
    | "PurvaBhadra"
    | "UttaraBhadra"
    | "Revati";

export type NakshatraHi =
    | "अश्विनी"
    | "भरणी"
    | "कृतिका"
    | "रोहिणी"
    | "मृगशिरा"
    | "आर्द्रा"
    | "पुर्नवसु"
    | "पुष्य"
    | "अश्लेषा"
    | "मघा"
    | "पू.फाल्गुनी"
    | "उ.फाल्गुनी"
    | "हस्त"
    | "चित्रा"
    | "स्वाति"
    | "विशाखा"
    | "अनुराधा"
    | "ज्येष्ठा"
    | "मूल"
    | "पू.षाढ़ा"
    | "उ.षाढ़ा"
    | "श्रवण"
    | "धनिष्ठा"
    | "शतभिषा"
    | "पू.भाद्रपद"
    | "उ.भाद्रपद"
    | "रेवती";

/** The unique identifier for a Nakshatra, from 1 to 27. */
export type NakshatraNumber =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27;

/** Static details of a Nakshatra. */
export interface NakshatraDetail {
    nakshatra_num: NakshatraNumber;
    name: Translation<NakshatraEn, NakshatraHi>;
    lord: NavagrahaEn;
}

/** The final calculated Nakshatra object, including positional data. */
export type Nakshatra = NakshatraDetail & CalculatedDetail;

/** Constants */

/** The total number of Nakshatras in Vedic astrology. */
export const TOTAL_NAKSHATRA_SIGNS = 27;

/** The angular span of each Nakshatra in degrees (13°20'). */
export const DEG_PER_NAKSHATRA = 360 / TOTAL_NAKSHATRA_SIGNS;

/** Data: Source of Truth for Nakshatra Details */

/**
 * A comprehensive dictionary containing details for each of the 27 Nakshatras.
 * This serves as the primary source of truth.
 *
 * @type {Record<NakshatraEn, NakshatraDetail>}
 */
export const NakshatraDetails: Record<NakshatraEn, NakshatraDetail> = {
    Aswini: {
        nakshatra_num: 1,
        lord: "Ketu",
        name: { hindi: "अश्विनी", english: "Aswini" },
    },
    Bharani: {
        nakshatra_num: 2,
        lord: "Venus",
        name: { hindi: "भरणी", english: "Bharani" },
    },
    Krittika: {
        nakshatra_num: 3,
        lord: "Sun",
        name: { hindi: "कृतिका", english: "Krittika" },
    },
    Rohini: {
        nakshatra_num: 4,
        lord: "Moon",
        name: { hindi: "रोहिणी", english: "Rohini" },
    },
    Mrigashira: {
        nakshatra_num: 5,
        lord: "Mars",
        name: { hindi: "मृगशिरा", english: "Mrigashira" },
    },
    Ardra: {
        nakshatra_num: 6,
        lord: "Rahu",
        name: { hindi: "आर्द्रा", english: "Ardra" },
    },
    Punarvasu: {
        nakshatra_num: 7,
        lord: "Jupiter",
        name: { hindi: "पुर्नवसु", english: "Punarvasu" },
    },
    Pushya: {
        nakshatra_num: 8,
        lord: "Saturn",
        name: { hindi: "पुष्य", english: "Pushya" },
    },
    Ashlesha: {
        nakshatra_num: 9,
        lord: "Mercury",
        name: { hindi: "अश्लेषा", english: "Ashlesha" },
    },
    Magha: {
        nakshatra_num: 10,
        lord: "Ketu",
        name: { hindi: "मघा", english: "Magha" },
    },
    PurvaPhalguni: {
        nakshatra_num: 11,
        lord: "Venus",
        name: { hindi: "पू.फाल्गुनी", english: "PurvaPhalguni" },
    },
    UttaraPhalguni: {
        nakshatra_num: 12,
        lord: "Sun",
        name: { hindi: "उ.फाल्गुनी", english: "UttaraPhalguni" },
    },
    Hasta: {
        nakshatra_num: 13,
        lord: "Moon",
        name: { hindi: "हस्त", english: "Hasta" },
    },
    Chitra: {
        nakshatra_num: 14,
        lord: "Mars",
        name: { hindi: "चित्रा", english: "Chitra" },
    },
    Swati: {
        nakshatra_num: 15,
        lord: "Rahu",
        name: { hindi: "स्वाति", english: "Swati" },
    },
    Vishakha: {
        nakshatra_num: 16,
        lord: "Jupiter",
        name: { hindi: "विशाखा", english: "Vishakha" },
    },
    Anuradha: {
        nakshatra_num: 17,
        lord: "Saturn",
        name: { hindi: "अनुराधा", english: "Anuradha" },
    },
    Jyeshtha: {
        nakshatra_num: 18,
        lord: "Mercury",
        name: { hindi: "ज्येष्ठा", english: "Jyeshtha" },
    },
    Mula: {
        nakshatra_num: 19,
        lord: "Ketu",
        name: { hindi: "मूल", english: "Mula" },
    },
    PurvaShadha: {
        nakshatra_num: 20,
        lord: "Venus",
        name: { hindi: "पू.षाढ़ा", english: "PurvaShadha" },
    },
    UttaraShadha: {
        nakshatra_num: 21,
        lord: "Sun",
        name: { hindi: "उ.षाढ़ा", english: "UttaraShadha" },
    },
    Sravana: {
        nakshatra_num: 22,
        lord: "Moon",
        name: { hindi: "श्रवण", english: "Sravana" },
    },
    Dhanishta: {
        nakshatra_num: 23,
        lord: "Mars",
        name: { hindi: "धनिष्ठा", english: "Dhanishta" },
    },
    Shatabhisha: {
        nakshatra_num: 24,
        lord: "Rahu",
        name: { hindi: "शतभिषा", english: "Shatabhisha" },
    },
    PurvaBhadra: {
        nakshatra_num: 25,
        lord: "Jupiter",
        name: { hindi: "पू.भाद्रपद", english: "PurvaBhadra" },
    },
    UttaraBhadra: {
        nakshatra_num: 26,
        lord: "Saturn",
        name: { hindi: "उ.भाद्रपद", english: "UttaraBhadra" },
    },
    Revati: {
        nakshatra_num: 27,
        lord: "Mercury",
        name: { hindi: "रेवती", english: "Revati" },
    },
};

/** Optimized Data Structure for Fast Lookups */

/**
 * An indexed array of Nakshatra details for O(1) lookup time. It is generated
 * once from the `NakshatraDetails` object and sorted by `nakshatra_num`. The
 * array is 0-indexed, so we access it with `nakshatra_num - 1`.
 *
 * @type {NakshatraDetail[]}
 */
const NakshatraDetailsByIndex: NakshatraDetail[] = Object.values(
    NakshatraDetails
).sort((a, b) => a.nakshatra_num - b.nakshatra_num);

/** Core Calculation Function */

/**
 * Calculates the Nakshatra (lunar mansion) based on a given zodiac degree.
 *
 * @param {number} degree - The ecliptic longitude (0° to 360°).
 * @returns {Nakshatra} A full Nakshatra object containing its details and
 *   positional info.
 * @throws {Error} If the degree is invalid or a Nakshatra cannot be found.
 */
export function getNakshatra(degree: number): Nakshatra {
    /** 1. Normalize degree to be within the 0-360 range. */
    const normalizedDegree = MOD360(degree);

    /** 2. Determine the Nakshatra number (1-based index). */
    const nakshatraNum = Math.floor(normalizedDegree / DEG_PER_NAKSHATRA) + 1;

    /** 3. Perform a bounds check to ensure the number is valid. */
    if (nakshatraNum < 1 || nakshatraNum > TOTAL_NAKSHATRA_SIGNS) {
        throw new Error(
            `Invalid Nakshatra number calculated: ${nakshatraNum}. Degree was ${degree}.`
        );
    }

    /** 4. Retrieve Nakshatra details using a direct O(1) array lookup. */
    const details = NakshatraDetailsByIndex[nakshatraNum - 1];

    /** This check is a safeguard against data structure initialization errors. */
    if (!details) {
        throw new Error(
            `Could not find Nakshatra details for number: ${nakshatraNum}.`
        );
    }

    /** 5. Construct and return the final Nakshatra object. */
    return {
        ...details,
        degree: normalizedDegree % DEG_PER_NAKSHATRA,
        /** Calculate the start and end degrees for this Nakshatra's span. */
        range: {
            start: (nakshatraNum - 1) * DEG_PER_NAKSHATRA,
            end: nakshatraNum * DEG_PER_NAKSHATRA,
        },
    };
}
