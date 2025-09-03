import type { SaptagrahaEn } from "src/services/constants/Planet";
import type { Translation } from "src/services/types";

/**
 * Defines the auspiciousness or inauspiciousness of a Choghadiya period.
 *
 * "Good" indicates an auspicious period. "Bad" indicates an inauspicious
 * period.
 */
export type EffectEn = "Good" | "Bad";

/** Defines the English names for each of the seven types of Choghadiya. */
export type ChoghadiyaEn =
    | "Udveg"
    | "Amrit"
    | "Rog"
    | "Labh"
    | "Shubh"
    | "Char"
    | "Kaal";

/** Defines the Hindi names for each of the seven types of Choghadiya. */
export type ChoghadiyaHi =
    | "उद्वेग"
    | "अमृत"
    | "रोग"
    | "लाभ"
    | "शुभ"
    | "चर"
    | "काल";

/** An interface defining the detailed properties of a single Choghadiya period. */
export interface ChoghadiyaDetail {
    name: Translation<ChoghadiyaEn, string>;
    lord: SaptagrahaEn;
    meaning: string;
    effect: EffectEn;
}

/**
 * A comprehensive record containing the static details for all seven Choghadiya
 * periods. This serves as the primary source of truth for Choghadiya data.
 */
export const ChoghadiyaDetails: Record<ChoghadiyaEn, ChoghadiyaDetail> = {
    Udveg: {
        name: { english: "Udveg", hindi: "उद्वेग" },
        lord: "Sun",
        meaning: "Anxiety",
        effect: "Bad",
    },
    Amrit: {
        name: { english: "Amrit", hindi: "अमृत" },
        lord: "Moon",
        meaning: "Nectar",
        effect: "Good",
    },
    Rog: {
        name: { english: "Rog", hindi: "रोग" },
        lord: "Mars",
        meaning: "Illness",
        effect: "Bad",
    },
    Labh: {
        name: { english: "Labh", hindi: "लाभ" },
        lord: "Mercury",
        meaning: "Profit",
        effect: "Good",
    },
    Shubh: {
        name: { english: "Shubh", hindi: "शुभ" },
        lord: "Jupiter",
        meaning: "Auspicious",
        effect: "Good",
    },
    Char: {
        name: { english: "Char", hindi: "चर" },
        lord: "Venus",
        meaning: "Moving",
        effect: "Good",
    },
    Kaal: {
        name: { english: "Kaal", hindi: "काल" },
        lord: "Saturn",
        meaning: "Death",
        effect: "Bad",
    },
};
