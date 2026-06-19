/**
 * Converts all ASCII digits (0–9) in a string or number to their corresponding
 * Hindi numerals (०–९).
 *
 * Non-digit characters are left unchanged.
 *
 * @example
 *     ConvertEnglishToHindiNumerals(2025); // "२०२५"
 *     convertEnglishToHindiNumerals("Room 108"); // "Room १०८"
 *
 * @param input - The value to convert. Can be a string or number.
 * @returns A new string where English digits are replaced with Hindi numerals.
 */
export function convertEnglishToHindiNumerals(input: string | number): string {
    const mapping: Record<string, string> = {
        0: "०",
        1: "१",
        2: "२",
        3: "३",
        4: "४",
        5: "५",
        6: "६",
        7: "७",
        8: "८",
        9: "९",
    };

    return String(input)
        .split("")
        .map(char => mapping[char] ?? char)
        .join("");
}
