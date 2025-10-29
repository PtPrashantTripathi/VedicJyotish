import {
    type HouseSystemKey,
    HouseSystems,
    type HouseSystemValue,
} from "src/services/constants/HouseSystems";

/**
 * Validates a House System input, matching it to a valid key and value.
 *
 * This function first checks if the input string is a valid key (e.g., "A",
 * "B") from the HouseSystems map. If not, it then attempts to find a match by
 * comparing the input string (case-insensitive) against the values in the map.
 *
 * @param {string} input - The House System mode, either as a key (e.g., "A") or
 *   a string value (e.g., "Equal House").
 * @returns {{ key: HouseSystemKey; value: HouseSystemValue }} An object
 *   containing the matched key and string value.
 * @throws {Error} Throws an error if no matching House System is found for the
 *   given input.
 */
export function parseValidHouseSystemName(input: string): {
    key: HouseSystemKey;
    value: HouseSystemValue;
} {
    // Trim whitespace from the input for consistent processing.
    const cleanedInput = input.trim() as HouseSystemKey;

    // 1. First, attempt to match the input as a direct key.
    // We assume the keys are case-sensitive as provided in the example.
    const valueByKey = HouseSystems[cleanedInput];
    if (valueByKey) {
        return { key: cleanedInput, value: valueByKey };
    }

    // 2. If no key is found, attempt to match the input as a string value.
    const lowerCaseInput = cleanedInput.toLowerCase();
    for (const [key, value] of Object.entries(HouseSystems)) {
        if (value.toLowerCase() === lowerCaseInput) {
            return {
                key,
                value,
            };
        }
    }

    // 3. If no match is found after both checks, throw an error.
    throw new Error(`Invalid housesystem: "${input}"`);
}
