import { DateTime } from "luxon";
import { useState } from "react";
import type { SearchParams, SessionData, SessionState } from "src/types";
import { parseValidTimezoneOffset } from "src/utils/parseTimezoneOffset";
import { parseValidAyanamsaName } from "src/utils/parseValidAyanamsaName";
import { parseValidDate } from "src/utils/parseValidDate";
import { parseValidDegree } from "src/utils/parseValidDegree";
import { parseValidPageName } from "src/utils/parseValidPageName";
import { parseValidTime } from "src/utils/parseValidTime";

const searchParamKeys: (keyof SearchParams)[] = [
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
 * Extracts session data from the current URL's query parameters. If a parameter
 * is provided, it must be valid; otherwise, return null.
 *
 * @returns A fully parsed SessionData's Props object.
 * @throws Error if a provided parameter is invalid.
 */
export function useSessionState(): SessionState {
    // const data = JSON.parse(localStorage.getItem("data-form") || "{}");

    const now = DateTime.now();
    const sessionData: SessionData = {
        page: "Home",
        date: now.toFormat("yyyy-MM-dd"),
        time: now.toFormat("HH:mm:ss"),
        tz: 5.5,
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayanamsa: "Lahiri",
        error: [],
        nav: false,
    };

    let searchParams = new URLSearchParams(window.location.search);

    const id = searchParams.get("id");
    if (id) {
        searchParams = new URLSearchParams(atob(id));
    }

    searchParamKeys.forEach(key => {
        try {
            const value: string | number | null = searchParams.get(key);
            if (value) {
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
            }
        } catch (e) {
            sessionData.error.push({
                message: `${key}: ${e}`,
                type: "warning",
            });
        }
    });

    const [data, setData] = useState(sessionData);
    return {
        data,
        setData,
        updateData: (input: Partial<SessionData>) => {
            setData(prev => ({
                ...prev,
                ...input,
            }));
        },
        sortURL: () =>
            window.location.origin +
            window.location.pathname +
            "?id=" +
            btoa(
                new URLSearchParams(
                    searchParamKeys.map(key => [key, String(data[key])])
                ).toString()
            ),
    };
}
