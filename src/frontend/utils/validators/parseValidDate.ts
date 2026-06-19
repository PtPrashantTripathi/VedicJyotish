/**
 * Parses a flexible date string (`yyyy`, `yyyy-mm`, or `yyyy-mm-dd`) and
 * returns a normalized ISO date (`yyyy-mm-dd`). Throws an error if format or
 * values are invalid.
 *
 * @param input - Date string in formats: `yyyy`, `yyyy-mm`, or `yyyy-mm-dd`
 * @returns Normalized ISO date string (`yyyy-mm-dd`)
 * @throws Error if format or date is invalid
 */
export function parseValidDate(input: string): string {
    const match = /^(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?$/.exec(input.trim());
    if (!match) throw new Error("Invalid date format.");

    const [, yearStr, monthStr = 1, dayStr = 1] = match;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    // Month is 0-based in JS Date
    let dt = new Date(year, month - 1, day);

    if (
        dt.getFullYear() !== year ||
        dt.getMonth() !== month - 1 ||
        dt.getDate() !== day
    ) {
        throw new Error(`Invalid calendar date: "${input}"`);
    }

    dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
    return dt.toISOString().split("T")[0] ?? "";
}
