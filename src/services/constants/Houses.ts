import type { NavagrahaEn } from "src/services/constants/Planet";
import type { RasiNumber } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import { NORMALIZE12 } from "src/services/utils";

/** Type Definitions */

export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type HouseCategoriesEn =
    | "Kendra"
    | "Trikona"
    | "Dusthana"
    | "Upachaya"
    | "Maraka"
    | "Panaphara"
    | "Apoklima";

export type PurusharthaEn = "Dharma" | "Artha" | "Kama" | "Moksha";

/** Static details of a House (Bhava). */
export interface HouseDetail {
    num: HouseNumber;
    name: Translation<string, string>;
    categories: HouseCategoriesEn[];
    purushartha: PurusharthaEn;
    karak: NavagrahaEn[];
}

/** Data: Source of Truth for House Details */

/**
 * A comprehensive dictionary containing details for each of the 12 Houses
 * (Bhavas). This serves as the primary source of truth. The keys are the House
 * numbers.
 *
 * @type {Record<HouseNumber, HouseDetail>}
 */
export const HouseDetails: Record<HouseNumber, HouseDetail> = {
    1: {
        num: 1,
        name: { english: "1st", hindi: "प्रथम" },
        categories: ["Kendra", "Trikona"],
        purushartha: "Dharma",
        karak: ["Sun"],
    },
    2: {
        num: 2,
        name: { english: "2nd", hindi: "द्वितीय" },
        categories: ["Maraka", "Panaphara"],
        purushartha: "Artha",
        karak: ["Jupiter"],
    },
    3: {
        num: 3,
        name: { english: "3rd", hindi: "तृतीय" },
        categories: ["Upachaya", "Apoklima"],
        purushartha: "Kama",
        karak: ["Mars"],
    },
    4: {
        num: 4,
        name: { english: "4th", hindi: "चतुर्थ" },
        categories: ["Kendra"],
        purushartha: "Moksha",
        karak: ["Moon", "Mercury"],
    },
    5: {
        num: 5,
        name: { english: "5th", hindi: "पंचम" },
        categories: ["Trikona", "Panaphara"],
        purushartha: "Dharma",
        karak: ["Jupiter"],
    },
    6: {
        num: 6,
        name: { english: "6th", hindi: "षष्ठ" },
        categories: ["Dusthana", "Upachaya", "Apoklima"],
        purushartha: "Artha",
        karak: ["Mars", "Saturn"],
    },
    7: {
        num: 7,
        name: { english: "7th", hindi: "सप्तम" },
        categories: ["Kendra", "Maraka"],
        purushartha: "Kama",
        karak: ["Venus"],
    },
    8: {
        num: 8,
        name: { english: "8th", hindi: "अष्टम" },
        categories: ["Dusthana", "Panaphara"],
        purushartha: "Moksha",
        karak: ["Saturn"],
    },
    9: {
        num: 9,
        name: { english: "9th", hindi: "नवम" },
        categories: ["Trikona", "Apoklima"],
        purushartha: "Dharma",
        karak: ["Jupiter", "Sun"],
    },
    10: {
        num: 10,
        name: { english: "10th", hindi: "दशम" },
        categories: ["Kendra", "Upachaya"],
        purushartha: "Artha",
        karak: ["Sun", "Mercury", "Jupiter", "Saturn"],
    },
    11: {
        num: 11,
        name: { english: "11th", hindi: "एकादश" },
        categories: ["Upachaya", "Panaphara"],
        purushartha: "Kama",
        karak: ["Jupiter"],
    },
    12: {
        num: 12,
        name: { english: "12th", hindi: "द्वादश" },
        categories: ["Dusthana", "Apoklima"],
        purushartha: "Moksha",
        karak: ["Saturn", "Venus"],
    },
};

/** Core Calculation Function */

/**
 * Calculates the House (Bhava) a planet occupies relative to the ascendant.
 *
 * @param {RasiNumber} planet_rasi_num - The Rasi number (1-12) where the planet
 *   is located.
 * @param {RasiNumber} ascendant_rasi_num - The Rasi number (1-12) of the
 *   ascendant (Lagna).
 * @returns {HouseDetail} A full House object containing its details.
 * @throws {Error} If a valid House cannot be determined.
 */
export function getHouse(
    planet_rasi_num: RasiNumber,
    ascendant_rasi_num: RasiNumber
): HouseDetail {
    /**
     * 1. Determine the House number by counting from the ascendant. The formula is
     *    (Planet's Rasi - Ascendant's Rasi + 1), normalized to the 1-12 range.
     */
    const houseNumber = NORMALIZE12(
        planet_rasi_num - ascendant_rasi_num + 1
    ) as HouseNumber;

    /**
     * 2. Retrieve House details using a direct O(1) array lookup. We use
     *    `houseNumber - 1` because the array is 0-indexed.
     */
    const details = HouseDetails[houseNumber];

    if (!details) {
        throw new Error(
            `Could not find House details for calculated number: ${houseNumber}.`
        );
    }

    /** 3. Return the found details. */
    return details;
}
