/**
 * Formats a timezone offset to a human-readable format.
 *
 * @example
 *     console.log(formatTimezoneOffset("Asia/Kolkata", 5.5)); // Asia/Kolkata [+05:30]
 */
export function formatTimezoneOffset(name: string, offset: number): string {
    const sign = offset >= 0 ? "+" : "-";
    const abs = Math.abs(offset);
    const hours = Math.floor(abs);
    const minutes = Math.round((abs - hours) * 60);
    return `${name} [${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}]`;
}
