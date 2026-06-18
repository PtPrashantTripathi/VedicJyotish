import type { DateTime } from "luxon";

export function fmtDate(dt: DateTime): string {
    return dt.toFormat("dd MMM yyyy");
}

export function fmtTime(dt: DateTime): string {
    return dt.toFormat("hh:mm a");
}

export function fmtDateTime(dt: DateTime): string {
    return dt.toFormat("dd MMM yyyy  •  hh:mm a");
}

export function fmtDuration(start: DateTime, end: DateTime): string {
    const totalDays = end.diff(start, "days").days;
    const years = Math.floor(totalDays / 365.25);
    const months = Math.floor((totalDays % 365.25) / 30.44);
    const parts: string[] = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    return parts.join(" ") || "<1m";
}

export function fmtDateRange(start: DateTime, end: DateTime): string {
    return `${fmtDate(start)}  →  ${fmtDate(end)}`;
}
