import { DateTime } from "luxon";
import type { RasiNumber } from "src/services/constants/Rasi";

// --- Math Utility Functions ---

/** Absolute integer rounding towards zero */
export const absolute = (x: number): number =>
    x >= 0 ? Math.floor(x) : Math.ceil(x);

/** Normalize to 0–24 hour range */
export const mod24 = (x: number): number => (x + 24) % 24;

/** Normalize to 0 – 359.99... degrees */
export const MOD360 = (x: number): number => {
    let y = x % 360;
    if (y < 0) {
        y += 360;
    }
    return y;
};

/**
 * Normalize a given integer in rashi number.
 *
 * @returns {RasiNumber} RasiNumber between 1 and 12.
 */
export function NORMALIZE12(x: number): RasiNumber {
    let ret = x % 12;
    if (ret <= 0) {
        ret += 12;
    }
    return ret as RasiNumber;
}

// --- Time/Angle Formatting ---
export interface HMS {
    hour: number;
    minute: number;
    second: number;
}

/** Convert decimal hours to HMS+ms */
export const hms = (h: number): HMS => {
    if (h < 0) h += 24;
    const hour = Math.floor(h);
    h = (h - hour) * 60;
    const minute = Math.floor(h);
    const second = (h - minute) * 60;
    return {
        hour,
        minute,
        second,
    };
};

// 👉 Factory function
export const DMS = (d: number) => {
    const s = Math.abs(d);
    const degree = Math.floor(s);
    const minute = Math.floor((s - degree) * 60);
    const second = ((s - degree) * 60 - minute) * 60;
    return {
        degree,
        minute,
        second,
        toDegree: () => d,
        toString: () => `${degree}° ${minute}′ ${absolute(second)}″`,
    };
};

/** Convert HMS to decimal degrees */
export const hms2deg = (hms: HMS): number =>
    hms.hour * 15 + hms.minute / 4 + hms.second / 240;

/** Convert HMS to decimal hours */
export const hms2dec = (hms: HMS): number =>
    hms.hour + hms.minute / 60 + hms.second / 3600;

/** Convert degrees to formatted HMS string */
export const deg2hms = (x: number): string => {
    const total = x / 15;
    const h = Math.floor(total);
    const m = Math.floor((total - h) * 60);
    const s = Math.floor(((total - h) * 60 - m) * 60);
    return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

//  Helper Functions

/**
 * Utility function to calculate percentage
 *
 * @param percent
 * @param total
 * @returns
 */
export function percentage(percent: number, total: number): number {
    return (percent / 100) * total;
}

/**
 * Reorders an array so that it starts from the given `startValue`, wrapping
 * around to the beginning if necessary.
 *
 * @example
 *     // Basic usage
 *     reorderArray([1, 2, 3, 4], 3);
 *     // → [3, 4, 1, 2]
 *
 * @example
 *     // Works with strings
 *     reorderArray(["a", "b", "c", "d"], "b");
 *     // → ['b', 'c', 'd', 'a']
 *
 * @example
 *     // If startValue is not found, returns the original array
 *     reorderArray([1, 2, 3], 5);
 *     // → [1, 2, 3]
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to reorder.
 * @param {T} startValue - The value to start the array from.
 * @returns {T[]} A new reordered array.
 */
export function reorderArray<T>(arr: T[], startValue: T): T[] {
    const startIndex = arr.indexOf(startValue);
    if (startIndex === -1) return arr; // avoid unexpected behavior
    return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
}

/**
 * Creates a memoized version of the given function.
 *
 * The memoized function caches results based on the stringified arguments. If
 * the same arguments are passed again, it returns the cached result instead of
 * re-executing the original function.
 *
 * @example
 *     // A slow function
 *     function slowSquare(n: number): number {
 *         console.log(`Calculating square for ${n}...`);
 *         return n * n;
 *     }
 *
 *     const memoizedSquare = memoizeFunction(slowSquare);
 *
 *     console.log(memoizedSquare(4)); // Logs: Calculating square for 4... → 16
 *     console.log(memoizedSquare(4)); // Uses cache → 16
 *
 * @template T - A function type.
 * @param {T} fn - The function whose results should be cached.
 * @returns {T} A new function that returns cached results when called with the
 *   same arguments.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoizeFunction<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();

    return function (...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    } as T;
}

/** Convert decimal to formatted HMS string */
export function decimalToHMS(days: number) {
    return DateTime.fromObject(
        { hour: 0, minute: 0, second: 0 },
        { zone: "utc" }
    )
        .plus({ days })
        .toFormat("HH'h' mm'm' ss's'");
}

export function convertDegreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}
