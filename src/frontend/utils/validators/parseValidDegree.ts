/**
 * Parses and validates a degree value for latitude or longitude.
 *
 * @param deg - Degree value as a number or string.
 * @param type - Either "lat" (latitude) or "lon" (longitude).
 * @returns The validated degree as a number.
 * @throws Error if the input is not a valid degree for the given type.
 */
export function parseValidDegree(
    deg: number | string,
    type: "lat" | "lon"
): number {
    const maxDeg = type === "lon" ? 180 : 90;
    const parsed = parseFloat(String(deg));

    if (isNaN(parsed)) {
        throw new Error(`Invalid ${type} degree: "${deg}"`);
    }

    if (parsed < -maxDeg || parsed > maxDeg) {
        throw new Error(
            `${type.toUpperCase()} must be between -${maxDeg} and +${maxDeg}, got ${parsed}`
        );
    }

    return parsed;
}
