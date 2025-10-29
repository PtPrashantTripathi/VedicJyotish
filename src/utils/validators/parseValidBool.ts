export function parseValidBool(input: number | string): boolean {
    // Trim whitespace and convert the input to a string for consistent processing.
    const cleanedInput = String(input).trim().toLowerCase();

    // Convert string "true"/"false" to a boolean
    if (
        cleanedInput === "true" ||
        cleanedInput === "1" ||
        cleanedInput === "t"
    ) {
        return true;
    } else if (
        cleanedInput === "false" ||
        cleanedInput === "0" ||
        cleanedInput === "f"
    ) {
        return false;
    } else {
        throw new Error(`Invalid Boolean value : ${input}`);
    }
}
