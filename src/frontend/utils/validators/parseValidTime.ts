/**
 * Parses a time string in `H:mm`, `HH:mm`, `H:mm:ss`, or `HH:mm:ss` format.
 * Throws an error if the format is invalid or values are out of range.
 *
 * @param input - A string in the format `H:mm[:ss]`
 * @returns Normalized time string (`HH:mm:ss`)
 * @throws Error if format or time values are invalid
 */
export function parseValidTime(input: string): string {
    const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(input.trim());
    if (!match) {
        throw new Error("Invalid time format. Expected H:mm or H:mm:ss.");
    }

    const [, hourStr, minuteStr = 0, secondStr = 0] = match;
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const second = Number(secondStr);

    // Month is 0-based in JS Date
    let dt = new Date(2000, 0, 1, hour, minute, second);

    if (
        isNaN(dt.getTime()) ||
        dt.getHours() !== hour ||
        dt.getMinutes() !== minute ||
        dt.getSeconds() !== second
    ) {
        throw new Error("Invalid time value.");
    }

    dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
    return dt.toISOString().split("T")[1]?.split(".")[0] ?? "";
}
