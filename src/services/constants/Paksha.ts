import type { Translation } from "src/services/types";

/** Type Definitions */
export type PakshaEn = "Krishna" | "Shukla";
export type PakshaHi = "कृष्ण" | "शुक्ल";
export type PakshaName = Translation<PakshaEn, PakshaHi>;

/** Details for the two Paksha (lunar phases). */
export const PakshaDetails: Record<PakshaEn, PakshaName> = {
    Shukla: { english: "Shukla", hindi: "शुक्ल" }, // Waxing moon
    Krishna: { english: "Krishna", hindi: "कृष्ण" }, // Waning moon
};
