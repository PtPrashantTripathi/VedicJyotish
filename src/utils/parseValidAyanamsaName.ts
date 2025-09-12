import {
    AyanamsaMods,
    type AyanamsaModsKey,
    type AyanamsaModsValue,
} from "src/services/constants/AyanamsaMods";

/**
 * Validates an Ayanamsa mode input, matching it to a valid key and value.
 *
 * This function first checks if the input is a valid numeric key from the
 * AyanamsaMods map. If not, it then attempts to find a match by comparing the
 * input string (case-insensitive) against the values in the map.
 *
 * @param {number | string} input - The Ayanamsa mode, either as a numeric key
 *   (e.g., 1) or a string value (e.g., "Lahiri").
 * @returns {{ key: AyanamsaModsKey; value: AyanamsaModsValue }} An object
 *   containing the matched numeric key and string value.
 * @throws {Error} Throws an error if no matching Ayanamsa mode is found for the
 *   given input.
 */
export function parseValidAyanamsaName(input: number | string): {
    key: AyanamsaModsKey;
    value: AyanamsaModsValue;
} {
    // Trim whitespace and convert the input to a string for consistent processing.
    const cleanedInput = String(input).trim().toLowerCase();

    // 1. First, attempt to match the input as a numeric key.
    // Ensure the cleaned input is a number before attempting the lookup.
    const parsedKey = parseInt(cleanedInput, 10) as AyanamsaModsKey;
    if (!isNaN(parsedKey)) {
        const value = AyanamsaMods[parsedKey];
        if (value) {
            return { key: parsedKey, value };
        }
    }

    // 2. If no numeric key is found, attempt to match the input as a string value.
    for (const [key, value] of Object.entries(AyanamsaMods)) {
        if (value.toLowerCase() === cleanedInput) {
            return {
                key,
                value,
            };
        }
    }

    // 3. If no match is found after both checks, throw an error.
    throw new Error(`Invalid ayanamsa: "${input}"`);
}
