import type { NakshatraNumber } from "src/services/constants/Nakshatra";
import type { CalculatedDetail, Translation } from "src/services/types";
import { MOD360 } from "src/services/utils";

// Type Definitions
/* Yoga Details type definition */
export type YogaEn =
    | "Vishkambha"
    | "Priti"
    | "Ayushman"
    | "Saubhagya"
    | "Shobhana"
    | "Atiganda"
    | "Sukarman"
    | "Dhriti"
    | "Shula"
    | "Ganda"
    | "Vriddhi"
    | "Dhruva"
    | "Vyaghata"
    | "Harshana"
    | "Vajra"
    | "Siddhi"
    | "Vyatipata"
    | "Variyana"
    | "Parigha"
    | "Shiva"
    | "Siddha"
    | "Sadhya"
    | "Shubha"
    | "Shukla"
    | "Brahma"
    | "Indra"
    | "Vaidhriti";

export type YogaHi =
    | "विष्कम्भ"
    | "प्रीति"
    | "आयुष्मान"
    | "सौभाग्य"
    | "शोभन"
    | "अतिगण्ड"
    | "सुकर्मा"
    | "धृति"
    | "शूल"
    | "गंड"
    | "वृद्धि"
    | "ध्रुव"
    | "व्याघात"
    | "हर्षण"
    | "वज्र"
    | "सिद्धि"
    | "व्यतिपात"
    | "वरीयान"
    | "परिघ"
    | "शिव"
    | "सिद्ध"
    | "सन्ध्या"
    | "शुभ"
    | "शुक्ल"
    | "ब्रह्म"
    | "इंद्र"
    | "वैधृति";

export type YogaNumber = NakshatraNumber;

export interface YogaDetail {
    yoga_num: YogaNumber;
    name: Translation<YogaEn, YogaHi>;
}

export type Yoga = YogaDetail & CalculatedDetail;

// Constants

/** The total number of Yogas in Vedic astrology. */
export const TOTAL_YOGA_SIGNS = 27;

/** The angular span of each Yoga in degrees. */
export const DEG_PER_YOGA = 360 / TOTAL_YOGA_SIGNS;

// Data: Source of Truth for Yoga Details
/**
 * A comprehensive dictionary containing details for each of the 27 Yogas. This
 * serves as the primary source of truth.
 *
 * @type {Record<YogaEn, YogaDetail>}
 */
export const YogaDetails: Record<YogaEn, YogaDetail> = {
    Vishkambha: {
        yoga_num: 1,
        name: { english: "Vishkambha", hindi: "विष्कम्भ" },
    },
    Priti: { yoga_num: 2, name: { english: "Priti", hindi: "प्रीति" } },
    Ayushman: { yoga_num: 3, name: { english: "Ayushman", hindi: "आयुष्मान" } },
    Saubhagya: {
        yoga_num: 4,
        name: { english: "Saubhagya", hindi: "सौभाग्य" },
    },
    Shobhana: { yoga_num: 5, name: { english: "Shobhana", hindi: "शोभन" } },
    Atiganda: { yoga_num: 6, name: { english: "Atiganda", hindi: "अतिगण्ड" } },
    Sukarman: { yoga_num: 7, name: { english: "Sukarman", hindi: "सुकर्मा" } },
    Dhriti: { yoga_num: 8, name: { english: "Dhriti", hindi: "धृति" } },
    Shula: { yoga_num: 9, name: { english: "Shula", hindi: "शूल" } },
    Ganda: { yoga_num: 10, name: { english: "Ganda", hindi: "गंड" } },
    Vriddhi: { yoga_num: 11, name: { english: "Vriddhi", hindi: "वृद्धि" } },
    Dhruva: { yoga_num: 12, name: { english: "Dhruva", hindi: "ध्रुव" } },
    Vyaghata: { yoga_num: 13, name: { english: "Vyaghata", hindi: "व्याघात" } },
    Harshana: { yoga_num: 14, name: { english: "Harshana", hindi: "हर्षण" } },
    Vajra: { yoga_num: 15, name: { english: "Vajra", hindi: "वज्र" } },
    Siddhi: { yoga_num: 16, name: { english: "Siddhi", hindi: "सिद्धि" } },
    Vyatipata: {
        yoga_num: 17,
        name: { english: "Vyatipata", hindi: "व्यतिपात" },
    },
    Variyana: { yoga_num: 18, name: { english: "Variyana", hindi: "वरीयान" } },
    Parigha: { yoga_num: 19, name: { english: "Parigha", hindi: "परिघ" } },
    Shiva: { yoga_num: 20, name: { english: "Shiva", hindi: "शिव" } },
    Siddha: { yoga_num: 21, name: { english: "Siddha", hindi: "सिद्ध" } },
    Sadhya: { yoga_num: 22, name: { english: "Sadhya", hindi: "सन्ध्या" } },
    Shubha: { yoga_num: 23, name: { english: "Shubha", hindi: "शुभ" } },
    Shukla: { yoga_num: 24, name: { english: "Shukla", hindi: "शुक्ल" } },
    Brahma: { yoga_num: 25, name: { english: "Brahma", hindi: "ब्रह्म" } },
    Indra: { yoga_num: 26, name: { english: "Indra", hindi: "इंद्र" } },
    Vaidhriti: {
        yoga_num: 27,
        name: { english: "Vaidhriti", hindi: "वैधृति" },
    },
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of Yoga details for O(1) lookup time. It is generated once
 * from the `YogaDetails` object. The array is 0-indexed, so we access it with
 * `yoga_num - 1`.
 *
 * @type {YogaDetail[]}
 */
const YogaDetailsByIndex: YogaDetail[] = Object.values(YogaDetails).sort(
    (a, b) => a.yoga_num - b.yoga_num
);

// Core Calculation Function

/**
 * Calculates the Yoga based on the longitudinal positions of the Sun and Moon.
 * This optimized function uses a direct array lookup for high performance.
 *
 * @param {number} sun_lon - The Sun's longitude (0 to 360 degrees).
 * @param {number} moon_lon - The Moon's longitude (0 to 360 degrees).
 * @returns {Yoga} A full Yoga object containing its details and positional
 *   info.
 * @throws {Error} If the calculated Yoga number is out of the valid range
 *   (1-27).
 */
export function getYoga(sun_lon: number, moon_lon: number): Yoga {
    // 1. Calculate the combined longitude and normalize it to the 0-360 degree range.
    const degree = MOD360(moon_lon + sun_lon);

    // 2. Determine the Yoga number (1-based index).
    // The `Math.floor` is slightly more explicit for this kind of division.
    const yogaNum = Math.floor(degree / DEG_PER_YOGA) + 1;

    // 3. Perform a bounds check to ensure the yoga number is valid.
    if (yogaNum < 1 || yogaNum > TOTAL_YOGA_SIGNS) {
        throw new Error(
            `Invalid Yoga number calculated: ${yogaNum}. Degree was ${degree}.`
        );
    }

    // 4. Retrieve Yoga details using a direct O(1) array lookup.
    const details = YogaDetailsByIndex[yogaNum - 1];

    // This check is technically redundant due to the bounds check above,
    // but it's a good safeguard against data structure initialization errors.
    if (!details) {
        throw new Error(
            `Could not find Yoga details for Yoga number: ${yogaNum}.`
        );
    }

    // 5. Construct and return the final Yoga object.
    return {
        ...details,
        // Calculate the start and end degrees for this Yoga's span.
        range: {
            start: (yogaNum - 1) * DEG_PER_YOGA,
            end: yogaNum * DEG_PER_YOGA,
        },
        degree,
    };
}
