import { PakshaDetails, type PakshaName } from "src/services/constants/Paksha";
import type { CalculatedDetail, Translation } from "src/services/types";
import { MOD360 } from "src/services/utils";

/** Type Definitions */
export type TithiEn =
    | "Pratipada"
    | "Dvitiya"
    | "Tritiya"
    | "Chaturthi"
    | "Panchami"
    | "Shashthi"
    | "Saptami"
    | "Ashtami"
    | "Navami"
    | "Dasami"
    | "Ekadasi"
    | "Dwadasi"
    | "Trayodasi"
    | "Chaturdasi"
    | "Amavasya"
    | "Purnima";

export type TithiHi =
    | "प्रथमा"
    | "द्वितीया"
    | "तृतिया"
    | "चतुर्थी"
    | "पंचमी"
    | "षष्ठी"
    | "सप्तमी"
    | "अष्टमी"
    | "नवमीं"
    | "दशमी"
    | "एकादशी"
    | "व्दादशी"
    | "त्रयोदशी"
    | "चर्तुदशी"
    | "अमावस्या"
    | "पूर्णिमा";

/**
 * The unique identifier for a Tithi, from 1 to 15, with 30 for Purnima in some
 * contexts.
 */
export type TithiNumber =
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
    | 30;

/** Static details of a Tithi. */
export interface TithiDetail {
    name: Translation<TithiEn, TithiHi>;
    num: TithiNumber;
}

/** The final calculated Tithi object, including Paksha and positional data. */
export type Tithi = TithiDetail &
    CalculatedDetail & {
        tithi_num: number;
        paksha_name: PakshaName;
        lunarphase: number;
    };

// Constants

/** The total number of Tithis in a lunar month. */
export const TOTAL_TITHIS = 30;

/** The angular span of each Tithi in degrees (12°). */
export const DEG_PER_TITHI = 360 / TOTAL_TITHIS;

// Data: Source of Truth for Paksha Details

/**
 * A comprehensive dictionary containing details for each of the 16 unique
 * Tithis. This serves as the primary source of truth.
 *
 * @type {Record<TithiEn, TithiDetail>}
 */
export const TithiDetails: Record<TithiEn, TithiDetail> = {
    Pratipada: { num: 1, name: { english: "Pratipada", hindi: "प्रथमा" } },
    Dvitiya: { num: 2, name: { english: "Dvitiya", hindi: "द्वितीया" } },
    Tritiya: { num: 3, name: { english: "Tritiya", hindi: "तृतिया" } },
    Chaturthi: { num: 4, name: { english: "Chaturthi", hindi: "चतुर्थी" } },
    Panchami: { num: 5, name: { english: "Panchami", hindi: "पंचमी" } },
    Shashthi: { num: 6, name: { english: "Shashthi", hindi: "षष्ठी" } },
    Saptami: { num: 7, name: { english: "Saptami", hindi: "सप्तमी" } },
    Ashtami: { num: 8, name: { english: "Ashtami", hindi: "अष्टमी" } },
    Navami: { num: 9, name: { english: "Navami", hindi: "नवमीं" } },
    Dasami: { num: 10, name: { english: "Dasami", hindi: "दशमी" } },
    Ekadasi: { num: 11, name: { english: "Ekadasi", hindi: "एकादशी" } },
    Dwadasi: { num: 12, name: { english: "Dwadasi", hindi: "व्दादशी" } },
    Trayodasi: { num: 13, name: { english: "Trayodasi", hindi: "त्रयोदशी" } },
    Chaturdasi: { num: 14, name: { english: "Chaturdasi", hindi: "चर्तुदशी" } },
    Amavasya: { num: 15, name: { english: "Amavasya", hindi: "अमावस्या" } },
    Purnima: { num: 30, name: { english: "Purnima", hindi: "पूर्णिमा" } }, // Special case
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of the 15 base Tithi details for O(1) lookup time. This
 * covers the standard cycle from Pratipada (1) to Amavasya (15). Purnima is
 * handled as a special case in the calculation logic.
 *
 * @type {TithiDetail[]}
 */
const TithiDetailsByIndex: TithiDetail[] = Object.values(TithiDetails)
    .filter(t => t.num <= 15) // Exclude Purnima from the base array
    .sort((a, b) => a.num - b.num);

// Core Calculation Function

/**
 * Calculates the Tithi based on the longitudinal difference between the Sun and
 * Moon.
 *
 * @param {number} sun_lon - The Sun's longitude (0 to 360 degrees).
 * @param {number} moon_lon - The Moon's longitude (0 to 360 degrees).
 * @param {boolean} [purnimanta=true] - Determines the lunar calendar system.
 *   `true` for Purnimanta (month ends on Purnima/Full Moon). `false` for Amanta
 *   (month ends on Amavasya/New Moon). Default is `true`
 * @returns {Tithi} A full Tithi object with details, Paksha, and positional
 *   info.
 * @throws {Error} If a valid Tithi cannot be determined.
 */
export function getTithi(
    sun_lon: number,
    moon_lon: number,
    purnimanta: boolean = true
): Tithi {
    // 1. Calculate the lunar phase: the angular distance of the Moon from the Sun.
    const lunarphase = MOD360(moon_lon - sun_lon);

    // 2. Determine the Tithi number (1-30).
    const tithiNum = Math.floor(lunarphase / DEG_PER_TITHI) + 1;

    // 3. Determine the Paksha (lunar fortnight).
    // Shukla Paksha (waxing) is the first half of the cycle from Amavasya to Purnima.
    // Krishna Paksha (waning) is the second half from Purnima to Amavasya.
    const paksha_name =
        lunarphase < 180 ? PakshaDetails.Shukla : PakshaDetails.Krishna;

    // 4. Get the base tithi details using a fast O(1) lookup.
    // The tithi index cycles from 0 to 14 (for Pratipada to Amavasya/Purnima).
    const tithiIndex = (tithiNum - 1) % 15;
    let details = TithiDetailsByIndex[tithiIndex];

    // 5. Handle the special cases for Purnima (Full Moon) and Amavasya (New Moon)
    // based on the calendar system (Purnimanta vs. Amanta).
    if (purnimanta) {
        // In Purnimanta, the month ends on Purnima (Tithi #30).
        if (tithiNum === 30) {
            details = TithiDetails.Purnima;
        }
    } else {
        // In Amanta, the month ends on Amavasya (Tithi #30).
        // Tithi #15 is considered Purnima.
        if (tithiNum === 15) {
            details = { ...TithiDetails.Purnima, num: 15 };
        } else if (tithiNum === 30) {
            details = { ...TithiDetails.Amavasya, num: 30 };
        }
    }

    if (!details) {
        throw new Error(`No Tithi found for lunar phase ${lunarphase}`);
    }

    // 6. Construct and return the final Tithi object.
    return {
        ...details,
        tithi_num: tithiNum,
        lunarphase,
        paksha_name,
        range: {
            start: (tithiNum - 1) * DEG_PER_TITHI,
            end: tithiNum * DEG_PER_TITHI,
        },
        degree: lunarphase % DEG_PER_TITHI,
    };
}
