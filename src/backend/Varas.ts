import type { SaptagrahaEn, Translation } from "src/backend/types";

// Type Definitions

export type DayEn =
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";

export type DayHi =
    | "शनिवार"
    | "रविवार"
    | "सोमवार"
    | "मंगलवार"
    | "बुधवार"
    | "गुरुवार"
    | "शुक्रवार";

export interface VaraDetail {
    name: Translation<DayEn, DayHi>;
    lord: SaptagrahaEn;
    num: number; // 1 for Monday, ..., 7 for Sunday
}

// Data: Source of Truth for Vara Details

/**
 * A comprehensive dictionary containing details for each of the 7 Varas
 * (weekdays). This serves as the primary source of truth.
 *
 * @type {Record<DayEn, VaraDetail>}
 */
export const VarasDetails: Record<DayEn, VaraDetail> = {
    Monday: {
        name: { english: "Monday", hindi: "सोमवार" },
        lord: "Moon",
        num: 1,
    },
    Tuesday: {
        name: { english: "Tuesday", hindi: "मंगलवार" },
        lord: "Mars",
        num: 2,
    },
    Wednesday: {
        name: { english: "Wednesday", hindi: "बुधवार" },
        lord: "Mercury",
        num: 3,
    },
    Thursday: {
        name: { english: "Thursday", hindi: "गुरुवार" },
        lord: "Jupiter",
        num: 4,
    },
    Friday: {
        name: { english: "Friday", hindi: "शुक्रवार" },
        lord: "Venus",
        num: 5,
    },
    Saturday: {
        name: { english: "Saturday", hindi: "शनिवार" },
        lord: "Saturn",
        num: 6,
    },
    Sunday: {
        name: { english: "Sunday", hindi: "रविवार" },
        lord: "Sun",
        num: 7,
    },
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of Vara details for O(1) lookup time. It is generated once
 * from the `VarasDetails` object and sorted by the `num` property. The array is
 * 0-indexed, where index 0 corresponds to Monday (num: 1).
 *
 * @type {VaraDetail[]}
 */
const VarasDetailsByIndex: VaraDetail[] = Object.values(VarasDetails).sort(
    (a, b) => a.num - b.num
);

// Core Calculation Function

/**
 * Retrieves Vara details for a given weekday index. This optimized function
 * uses a direct array lookup for high performance.
 *
 * @param {number} weekdayIndex - The index of the weekday, where 0 is Monday, 1
 *   is Tuesday, ..., and 6 is Sunday.
 * @returns {VaraDetail} The corresponding Vara details.
 * @throws {Error} If the weekdayIndex is out of the valid range (0-6).
 */
export function getVara(weekdayIndex: number): VaraDetail {
    // 1. Perform a bounds check to ensure the index is valid.
    if (weekdayIndex < 0 || weekdayIndex >= VarasDetailsByIndex.length) {
        throw new Error(
            `Invalid weekdayIndex: ${weekdayIndex}. Index must be between 0 and 6.`
        );
    }

    // 2. Retrieve Vara details using a direct O(1) array lookup.
    const vara = VarasDetailsByIndex[weekdayIndex];

    // This check is a safeguard against data structure initialization errors.
    if (!vara) {
        throw new Error(
            `Could not find Vara details for index: ${weekdayIndex}.`
        );
    }

    // 3. Return the found details.
    return vara;
}
