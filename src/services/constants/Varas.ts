import type { SaptagrahaEn } from "src/services/constants/Planet";
import type { Translation } from "src/services/types";

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
