import { DateTime } from "luxon";
import { type IErrorType } from "src/components/Errors";
import { type ValidPageType } from "src/pages/pageDetails";
import { parseValidTimezoneOffset } from "src/utils/parseTimezoneOffset";
import { parseValidAyanamsaName } from "src/utils/parseValidAyanamsaName";
import { parseValidDate } from "src/utils/parseValidDate";
import { parseValidDegree } from "src/utils/parseValidDegree";
import { parseValidPageName } from "src/utils/parseValidPageName";
import { parseValidTime } from "src/utils/parseValidTime";

// Defines the structure of valid URL search parameters.
export interface ISearchParams {
    page: ValidPageType;
    date: string;
    time: string;
    tz: number;
    tz_name: string;
    city: string;
    lat: number;
    lon: number;
    ayanamsa: string;
}

// Defines the full session data structure, including errors and navigation state.
export interface ISessionData extends ISearchParams {
    error: IErrorType[];
    nav: boolean;
}
// An array of search parameter keys to ensure consistent parsing and URL generation.
export const searchParamKeys: (keyof ISearchParams)[] = [
    "page",
    "city",
    "tz_name",
    "lat",
    "lon",
    "ayanamsa",
    "date",
    "time",
    "tz",
];

/**
 * Parses URL search parameters and returns a parsed SessionData object. This
 * function handles both direct search params and base64-encoded `id`.
 *
 * @returns {ISessionData} A SessionData object populated from the URL or
 *   defaults.
 */
export function parseSearchParams(): ISessionData {
    let searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (id) {
        try {
            searchParams = new URLSearchParams(atob(id));
        } catch (e) {
            console.error("Failed to decode URL 'id' parameter:", e);
        }
    }

    // Default values for the session state.
    const sessionData: ISessionData = {
        page: "Home",
        date: DateTime.now().toFormat("yyyy-MM-dd"),
        time: DateTime.now().toFormat("HH:mm:ss"),
        tz: 5.5,
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayanamsa: "Lahiri",
        error: [],
        nav: false,
    };

    searchParamKeys.forEach(key => {
        const value = searchParams.get(key);
        if (value) {
            try {
                switch (key) {
                    case "page":
                        sessionData.page = parseValidPageName(value);
                        break;
                    case "lat":
                        sessionData.lat = parseValidDegree(value, "lat");
                        break;
                    case "lon":
                        sessionData.lon = parseValidDegree(value, "lon");
                        break;
                    case "ayanamsa":
                        sessionData.ayanamsa = parseValidAyanamsaName(value);
                        break;
                    case "date":
                        sessionData.date = parseValidDate(value);
                        break;
                    case "time":
                        sessionData.time = parseValidTime(value);
                        break;
                    case "tz":
                        sessionData.tz = parseValidTimezoneOffset(value);
                        break;
                    case "city":
                        sessionData.city = value;
                        break;
                    case "tz_name":
                        sessionData.tz_name = value;
                        break;
                }
            } catch (e) {
                sessionData.error.push({
                    message: `${key}: ${e instanceof Error ? e.message : String(e)}`,
                    type: "warning",
                });
            }
        }
    });

    return sessionData;
}
