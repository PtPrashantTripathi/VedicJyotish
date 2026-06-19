import { IANAZone } from "luxon";
/**
 * Parses and validates a timezone offset. Accepts values from -12.0 to +14.0
 * with up to one decimal (.0 or .5).
 *
 * @param {string | number} tz - The timezone offset as a string or number.
 * @returns {number | null} The parsed number if valid.
 * @throws Error if the input is not a valid timezone offset.
 */

export function parseValidTimezoneOffset(tz: string | number): number {
    const num = parseFloat(String(tz));
    if (isNaN(num)) {
        throw new Error(`Invalid timezone offset: "${tz}"`);
    }

    if (num < -12 || num > 14) {
        throw new Error(`Timezone offset out of range: ${num}`);
    }

    const decimalPart = Math.abs(num % 1);
    if (decimalPart !== 0 && decimalPart !== 0.5) {
        throw new Error(
            `Timezone offset must be in .0 or .5 increments: ${num}`
        );
    }

    return num;
}

export function parseValidTimezoneName(zone: string) {
    const tz = new IANAZone(zone);
    if (tz.isValid) {
        return tz.name;
    } else {
        throw new Error("Invalid time value.");
    }
}
