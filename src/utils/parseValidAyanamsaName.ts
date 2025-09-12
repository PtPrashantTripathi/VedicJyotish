import { ayanamsaNames } from "src/services/constants/Ayanamsa";

/**
 * Validates an Ayanamsa mode number. Logs the corresponding name and returns
 * the validated mode number.
 *
 * @param mode - The Ayanamsa sidereal mode number or string.
 * @returns The validated Ayanamsa mode number.
 * @throws Error if the mode is not supported.
 */
export function parseValidAyanamsaName(mode: number | string): number {
    const parsedMode = parseInt(String(mode), 10); // Ensures conversion to number
    const ayanamsaName = ayanamsaNames[parsedMode];

    if (ayanamsaName) {
        console.log(`Ayanamsa Mode Selected: ${parsedMode} - ${ayanamsaName}`);
        return parsedMode;
    }

    throw new Error(`Invalid ayanamsa mode: "${mode}"`);
}
