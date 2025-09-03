// src/hooks/useSessionState.ts
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import type { IErrorType } from "src/components/Errors";
import { calcHinduTime } from "src/hooks/hinduTime";
import { calcRiseSet } from "src/services/calcRiseSet";
import {
    type ISearchParams,
    parseURLSearchParams as parseSearchParams,
    searchParamKeys,
} from "src/utils/parseSearchParams";

// Defines the full session data structure, including errors and navigation state.
export interface ISessionData {
    nav: boolean;
    data: ISearchParams;
    error: IErrorType[];
    hinduTime: HinduTime;
    sunrise: DateTime<true>;
    sunset: DateTime<true>;
}

/**
 * Updates the browser URL with new search parameters without page reload.
 * Replaces current history state to avoid navigation issues.
 *
 * @param {ISearchParams} params - Complete search parameters object
 */
function updateURL(params: ISearchParams): void {
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
 * Custom React hook for managing search parameters with URL synchronization.
 *
 * Features:
 *
 * - Automatic URL parsing on mount with base64 `id` parameter support
 * - Bidirectional state-URL synchronization
 * - Input validation with fallback defaults
 * - Short URL generation with base64 encoding
 * - Reset functionality
 *
 * @returns Object containing state and control functions
 */
export function useSessionState() {
    const data = parseSearchParams();

    swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

    // Location settings
    swe.swe_set_topo(data.lon, data.lat, 0);

    // Convert current system time to Julian Day UT
    const datetime = DateTime.fromISO(data.date, {
        zone: data.tz_name,
    });
    const utc_dt = datetime.toUTC();
    const tjd_ut = swe.swe_utc_to_jd(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        utc_dt.hour,
        utc_dt.minute,
        utc_dt.second,
        swe.SE_GREG_CAL
    )[1];

    // Calculate Hindu Today Sunrise and SunSet
    const today_sun = calcRiseSet(swe, tjd_ut, swe.SE_SUN, [
        data.lon,
        data.lat,
        0,
    ]);

    // Initialize state from URL parameters
    const [session, setSession] = useState<ISessionData>({
        data,
        hinduTime: calcHinduTime(today_sun.rise_jd - tjd_ut),
        sunrise: datetime.plus({
            days: today_sun.rise_jd - tjd_ut,
        }) as DateTime<true>,
        sunset: datetime.plus({
            days: today_sun.set_jd - tjd_ut,
        }) as DateTime<true>,
        nav: false,
        error: [],
    });
    /**
     * Updates search parameters state and synchronizes with URL. Performs
     * partial updates, merging with existing state.
     *
     * @param {Partial<ISearchParams>} input - Partial search parameters to
     *   update
     */
    const updateData = useCallback((input: Partial<ISearchParams>) => {
        setSession(prev => {
            const updated = {
                ...prev,
                data: { ...prev.data, ...input },
            };

            // Sync with URL (using setTimeout to avoid state update batching issues)
            setTimeout(() => updateURL(updated.data), 0);

            return updated;
        });
    }, []);

    /**
     * Generates a short URL with all parameters base64-encoded in an `id`
     * parameter. Useful for sharing complete application state via URL.
     *
     * @param {ISearchParams} [data] - Optional specific parameters (defaults to
     *   current state)
     * @returns {string} Complete short URL with encoded parameters
     */
    const getShortURL = useCallback(
        (input?: ISearchParams): string => {
            const params = new URLSearchParams(
                searchParamKeys.map(key => [
                    key,
                    String((input || session.data)[key]),
                ])
            );

            return (
                window.location.origin +
                window.location.pathname +
                "?id=" +
                btoa(params.toString())
            );
        },
        [session]
    );

    // Handle browser navigation (back/forward buttons)
    useEffect(() => {
        const handlePopState = () => {
            setSession(prev => ({
                ...prev,
                data: parseSearchParams(),
            }));
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setSession(prev => ({
                ...prev,
                hinduTime: calcHinduTime(
                    prev.sunrise.hour / 24 +
                        prev.sunrise.minute / (24 * 60) +
                        prev.sunrise.second / (24 * 3600)
                ),
            }));
        }, 400);
        return () => clearInterval(timer);
    }, []);

    // console.log("session:", JSON.stringify(session, null, 4));

    // console.time(session.getSortURL());
    return {
        ...session,
        setSession,
        updateData,
        getShortURL,
        setNav: (nav: boolean) => {
            setSession(prev => ({
                ...prev,
                nav,
            }));
        },
        clearErrors: () => {
            setSession(prev => ({
                ...prev,
                error: [],
            }));
        },
    };
}
