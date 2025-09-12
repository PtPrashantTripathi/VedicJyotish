// src/hooks/useSessionState.ts
import { useCallback, useEffect, useState } from "react";
import type { IErrorType } from "src/components/Errors";
import { AyanamsaMods } from "src/services/constants/AyanamsaMods";
import {
    type ISearchParams,
    parseURLSearchParams as parseSearchParams,
    searchParamKeys,
} from "src/utils/parseSearchParams";
import { parseStorageValues } from "src/utils/parseStorageValues";

// Defines the full session data structure, including errors and navigation state.
export interface ISessionData {
    nav: boolean;
    data: ISearchParams;
    error: IErrorType[];
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
    const storage_data = parseStorageValues();

    const data = parseSearchParams(
        {
            name: storage_data.name,
            date: storage_data.dob.toFormat("yyyy-MM-dd"),
            time: storage_data.dob.toFormat("HH:mm:ss"),
            tz: storage_data.dob.offset / 60,
            tznm: storage_data.tz_name,
            city: storage_data.city,
            lat: storage_data.lat,
            lon: storage_data.lon,
            ayan: (Object.entries(AyanamsaMods).find(
                ([_, value]) => value === storage_data.ayanamsa
            ) || [1])[0],
        },
        storage_data.default // if its a default init data then the first run will be saved
    );

    // Initialize state from URL parameters
    const [session, setSession] = useState<ISessionData>({
        data,
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

            // Sync with URL
            if (
                Object.entries(updated.data).some(
                    ([key, value]) => prev.data[key] !== value
                )
            )
                updateURL(updated.data);

            // Set ayanamsa for sidereal mode
            if (updated.data.ayan !== prev.data.ayan)
                swe.swe_set_sid_mode(updated.data.ayan, 0, 0);

            // Location settings
            if (
                updated.data.lon !== prev.data.lon ||
                updated.data.lat !== prev.data.lat
            )
                swe.swe_set_topo(updated.data.lon, updated.data.lat, 0);

            return updated;
        });
    }, []);

    /**
     * Generates a short URL with all parameters base64-encoded in an `id`
     * parameter. Useful for sharing complete application state via URL.
     *
     * @returns {string} Complete short URL with encoded parameters
     */
    const getShortURL = useCallback((): string => {
        const params = new URLSearchParams(
            searchParamKeys.map(key => [key, String(session.data[key])])
        );

        return (
            window.location.origin +
            window.location.pathname +
            "?id=" +
            btoa(params.toString())
        );
    }, [session]);

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

    console.log("session:", JSON.stringify(session, null, 4));
    console.log("storage:", JSON.stringify(storage_data, null, 4));
    console.log(getShortURL());
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
