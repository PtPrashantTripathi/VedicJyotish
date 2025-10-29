import { DateTime } from "luxon";
import type { ValidPageType } from "src/pages";
import { parseValidBool } from "src/utils/validators/parseValidBool";
import { parseValidDate } from "src/utils/validators/parseValidDate";
import { parseValidDegree } from "src/utils/validators/parseValidDegree";
import { parseValidGender } from "src/utils/validators/parseValidGender";
import { parseValidPageName } from "src/utils/validators/parseValidPageName";
import { parseValidTime } from "src/utils/validators/parseValidTime";
import {
    parseValidTimezoneName,
    parseValidTimezoneOffset,
} from "src/utils/validators/parseValidTimezone";

/** Defines the structure of valid URL search parameters and component state. */
export interface ISearchParams {
    /** User name */
    user: string;
    /** Page - Current page type/name */
    page: ValidPageType;
    /** Date - Date in YYYY-MM-DD format */
    date: string;
    /** Time - Time in HH:mm:ss format */
    time: string;
    /** Tz - Timezone offset in hours (e.g., 5.5 for +05:30) */
    tz: number;
    /** Tz_name - Timezone name (e.g., "Asia/Kolkata") */
    tznm: string;
    /** City - City name with location details */
    city: string;
    /** Lat - Latitude coordinate */
    lat: number;
    /** Lon - Longitude coordinate */
    lon: number;
    /** User Gender */
    gender: "M" | "F";
    /** Save Data */
    save: boolean;
}

/**
 * Parses URL search parameters into an ISearchParams object. Handles both
 * direct search params and base64-encoded `id` parameter. Explicit query params
 * take precedence over decoded ones.
 *
 * @returns {ISearchParams} Parsed search parameters with fallback defaults
 */
export function parseSearchParams(
    input?: Partial<ISearchParams>
): ISearchParams {
    /**
     * Default search parameters with sensible fallback values. Used when URL
     * parameters are missing or invalid.
     */
    const searchParams: ISearchParams = {
        user: "User",
        page: "Home",
        date: DateTime.now().toFormat("yyyy-MM-dd"),
        time: DateTime.now().toFormat("HH:mm:ss"),
        tz: 5.5,
        tznm: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        gender: "M",
        save: false,
    };
    if (input) {
        Object.assign(searchParams, input);
    }

    let currentSearchParams = new URLSearchParams(window.location.search);
    const id = currentSearchParams.get("id");

    // Handle base64-encoded id parameter
    if (id) {
        currentSearchParams.delete("id");

        try {
            const decodedParams = new URLSearchParams(window.atob(id));

            // Merge explicit params (they override decoded ones)
            for (const [key, value] of currentSearchParams.entries()) {
                decodedParams.set(key, value);
            }

            currentSearchParams = decodedParams;

            // Update URL to expanded form
            const searchString = decodedParams.toString();
            const newUrl = `${window.location.pathname}?${searchString}`;
            if (newUrl !== window.location.pathname + window.location.search) {
                window.history.replaceState(null, "", newUrl);
            }
        } catch (error) {
            console.error("Failed to decode URL 'id' parameter:", error);
        }
    }

    Object.keys(searchParams).forEach(key => {
        const value = currentSearchParams.get(key);
        if (value) {
            try {
                switch (key) {
                    case "user":
                        searchParams.user = value.trim();
                        break;
                    case "page":
                        searchParams.page = parseValidPageName(value);
                        break;
                    case "date":
                        searchParams.date = parseValidDate(value);
                        break;
                    case "time":
                        searchParams.time = parseValidTime(value);
                        break;
                    case "tz":
                        searchParams.tz = parseValidTimezoneOffset(value);
                        break;
                    case "tznm":
                        searchParams.tznm = parseValidTimezoneName(value);
                        break;
                    case "city":
                        searchParams.city = value.trim();
                        break;
                    case "lat":
                        searchParams.lat = parseValidDegree(value, "lat");
                        break;
                    case "lon":
                        searchParams.lon = parseValidDegree(value, "lon");
                        break;
                    case "gender":
                        searchParams.gender = parseValidGender(value);
                        break;
                    case "save":
                        searchParams.save = parseValidBool(value);
                        break;
                }
            } catch (error) {
                console.warn({
                    message: `Invalid ${key} parameter: ${error instanceof Error ? error.message : String(error)}`,
                    type: "warning",
                });
            }
        }
    });

    return searchParams;
}

/**
 * Array of search parameter keys for consistent parsing and URL generation.
 * Used to maintain order and ensure all parameters are processed.
 */
const searchParamKeys: (keyof ISearchParams)[] = [
    "page", // Page Name
    "user", // User Name
    "gender",
    "date",
    "time",
    "tz", // Time Zone Offset
    "tznm", // Time Zone Name
    "city", // City Name
    "lat", // Latitude
    "lon", // Longitude
    "save",
];

/**
 * Updates the browser URL with new search parameters without page reload.
 * Replaces current history state to avoid navigation issues.
 *
 * @param {ISearchParams} params - Complete search parameters object
 */
export function updateURL(params: ISearchParams): void {
    const searchParams = new URLSearchParams(
        searchParamKeys.map(key => [key, String(params[key])])
    );

    const searchString = searchParams.toString();
    const newUrl = `${window.location.pathname}${searchString ? "?" + searchString : ""}`;

    if (newUrl !== window.location.pathname + window.location.search) {
        window.history.replaceState(null, "", newUrl);
    }
}

/**
 * Generates a short URL with all parameters base64-encoded in an `id`
 * parameter. Useful for sharing complete application state via URL.
 *
 * @param {ISearchParams} params - Complete search parameters object
 * @returns {string} Complete short URL with encoded parameters
 */
export function getShortURLString(params: ISearchParams): string {
    const urlSearchParams = new URLSearchParams(
        searchParamKeys.map(key => [key, String(params[key])])
    );

    return (
        window.location.origin +
        window.location.pathname +
        "?id=" +
        btoa(urlSearchParams.toString())
    );
}
