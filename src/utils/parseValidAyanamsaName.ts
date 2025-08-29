import { ayanamsaNames } from "src/backend/constants/Ayanamsa";

/**
 * Validates and parses an Ayanamsa name.
 *
 * @param str - The Ayanamsa name.
 * @returns The validated Ayanamsa name string.
 * @throws Error if the name is not supported.
 */
export function parseValidAyanamsaName(str: string): string {
    if (!ayanamsaNames.includes(str)) {
        throw new Error(
            `Invalid ayanamsa: "${str}". Must be one of: ${ayanamsaNames.join(", ")}`
        );
    }

    return str;
}
