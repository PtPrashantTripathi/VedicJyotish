import { DateTime } from "luxon";
import type { ValidPageType } from "src/pages";
import {
    AyanamsaMods,
    type AyanamsaModsKey,
} from "src/services/constants/AyanamsaMods";
import { setStorageValues } from "src/utils/parseStorageValues";
import {
    parseValidTimezoneName,
    parseValidTimezoneOffset,
} from "src/utils/parseTimezone";
import { parseValidAyanamsaName } from "src/utils/parseValidAyanamsaName";
import { parseValidBool } from "src/utils/parseValidBool";
import { parseValidDate } from "src/utils/parseValidDate";
import { parseValidDegree } from "src/utils/parseValidDegree";
import { parseValidPageName } from "src/utils/parseValidPageName";
import { parseValidTime } from "src/utils/parseValidTime";

/** Defines the structure of valid URL search parameters and component state. */
export interface ISearchParams {
    /** User name */
    name: string;
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
    /** Ayanamsa - Ayanamsa calculation method */
    ayan: AyanamsaModsKey;
}

/**
 * Array of search parameter keys for consistent parsing and URL generation.
 * Used to maintain order and ensure all parameters are processed.
 */
export const searchParamKeys: (keyof ISearchParams)[] = [
    "page", // Page Name
    "city", // City Name
    "date", // Date
    "time", // Time
    "tznm", // Time Zone Name
    "tz", // Time Zone Offset
    "lat", // Latitude
    "lon", // Longitude
    "ayan", // Ayanamsa Name
];

/**
 * Parses URL search parameters into an ISearchParams object. Handles both
 * direct search params and base64-encoded `id` parameter. Explicit query params
 * take precedence over decoded ones.
 *
 * @returns {ISearchParams} Parsed search parameters with fallback defaults
 */
export function parseURLSearchParams(
    input?: Partial<ISearchParams>,
    save?: boolean
): ISearchParams {
    /**
     * Default search parameters with sensible fallback values. Used when URL
     * parameters are missing or invalid.
     */
    const searchParams: ISearchParams = {
        name: "User",
        page: "Home",
        date: DateTime.now().toFormat("yyyy-MM-dd"),
        time: DateTime.now().toFormat("HH:mm:ss"),
        tz: 5.5,
        tznm: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayan: 1,
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

    searchParamKeys.forEach(key => {
        const value = currentSearchParams.get(key);
        if (value) {
            try {
                switch (key) {
                    case "page":
                        searchParams.page = parseValidPageName(value);
                        break;
                    case "lat":
                        searchParams.lat = parseValidDegree(value, "lat");
                        break;
                    case "lon":
                        searchParams.lon = parseValidDegree(value, "lon");
                        break;
                    case "ayan":
                        searchParams.ayan = parseValidAyanamsaName(value).key;
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
                        searchParams.city = value;
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
    const sp_save = currentSearchParams.get("save");
    if (
        (sp_save && parseValidBool(sp_save)) ||
        (save && searchParams.page === "KundliResult")
    ) {
        setStorageValues({
            name: searchParams.name,
            dob: DateTime.fromISO(`${searchParams.date}T${searchParams.time}`, {
                zone: searchParams.tznm,
            }) as DateTime<true>,
            tz_name: searchParams.tznm,
            city: searchParams.city,
            lat: searchParams.lat,
            lon: searchParams.lon,
            ayanamsa: AyanamsaMods[searchParams.ayan],
            default: false,
        });
    }

    return searchParams;
}
