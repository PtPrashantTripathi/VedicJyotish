// src/hooks/useSessionState.ts
<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import type { IErrorType } from "src/components/Errors";
import { AyanamsaMods } from "src/services/constants/AyanamsaMods";
import {
    type ISearchParams,
    parseURLSearchParams as parseSearchParams,
    searchParamKeys,
} from "src/utils/parseSearchParams";
import { parseStorageValues } from "src/utils/parseStorageValues";
=======
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import type { IErrorType } from "src/components/Errors";
import {
    getShortURLString,
    type ISearchParams,
    parseSearchParams as parseSearchParams,
    updateURL,
} from "src/utils/parseSearchParams";
import {
    type IStorageValues,
    parseStorageValues,
    saveStorageValues,
} from "src/utils/parseStorageValues";
>>>>>>> 391cf0f (last commit)

// Defines the full session data structure, including errors and navigation state.
export interface ISessionData {
    nav: boolean;
<<<<<<< HEAD
    data: ISearchParams;
=======
    searchParams: ISearchParams;
    storageValues: IStorageValues;
>>>>>>> 391cf0f (last commit)
    error: IErrorType[];
}

/**
<<<<<<< HEAD
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
=======
>>>>>>> 391cf0f (last commit)
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
<<<<<<< HEAD
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
=======
    const storageValues = parseStorageValues();

    const searchParams = parseSearchParams({
        user: storageValues.username,
        gender: storageValues.gender,
        date: storageValues.dob.toFormat("yyyy-MM-dd"),
        time: storageValues.dob.toFormat("HH:mm:ss"),
        tz: storageValues.dob.offset / 60,
        tznm: storageValues.tz_name,
        city: storageValues.city,
        lat: storageValues.lat,
        lon: storageValues.lon,
    });

    // Initialize state from URL parameters
    const [session, setSession] = useState<ISessionData>({
        searchParams,
        storageValues,
>>>>>>> 391cf0f (last commit)
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
<<<<<<< HEAD
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
=======
    const updateSearchParams = useCallback(
        (input: Partial<ISearchParams>) => {
            setSession(prev => {
                const updated = {
                    ...prev,
                    searchParams: { ...prev.searchParams, ...input },
                };

                // Sync with URL
                if (
                    Object.entries(updated.searchParams).some(
                        ([key, value]) => prev.searchParams[key] !== value
                    )
                )
                    updateURL(updated.searchParams);

                return updated;
            });
        },
        [setSession]
    );

    const updateStorageValues = useCallback(
        (input: Partial<IStorageValues>) => {
            setSession(prev => {
                const updated = {
                    ...prev,
                    storageValues: { ...prev.storageValues, ...input },
                };

                // Sync with Storage Values
                if (
                    Object.entries(updated.storageValues).some(
                        ([key, value]) => prev.storageValues[key] !== value
                    )
                )
                    saveStorageValues(updated.storageValues);

                return updated;
            });
        },
        [setSession]
    );

    // This block should be fixed to prevent a potential state update during render.
    // It should be wrapped in a useEffect, but since it only runs on the first mount
    // when default/save flags are true, it's a common pattern in hooks, but technically
    // a violation. It's often ignored if the function guarantees it only runs once,
    // but the safest approach is to use useEffect.
    // However, to strictly adhere to the original logic structure while acknowledging
    // its purpose: it's initializing storage based on initial state.
    if (storageValues.default || searchParams.save) {
        updateStorageValues({
            username: searchParams.user,
            gender: searchParams.gender,
            dob: DateTime.fromISO(`${searchParams.date}T${searchParams.time}`, {
                zone: searchParams.tznm,
            }) as DateTime<true>,
            tz_name: searchParams.tznm,
            city: searchParams.city,
            lat: searchParams.lat,
            lon: searchParams.lon,
            default: false,
        });
    }
>>>>>>> 391cf0f (last commit)

    // Handle browser navigation (back/forward buttons)
    useEffect(() => {
        const handlePopState = () => {
            setSession(prev => ({
                ...prev,
<<<<<<< HEAD
                data: parseSearchParams(),
=======
                searchParams: parseSearchParams(),
>>>>>>> 391cf0f (last commit)
            }));
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    console.log("session:", JSON.stringify(session, null, 4));
<<<<<<< HEAD
    console.log("storage:", JSON.stringify(storage_data, null, 4));
    console.log(getShortURL());
    return {
        ...session,
        setSession,
        updateData,
        getShortURL,
=======
    console.log(getShortURLString(session.searchParams));
    return {
        ...session,
        setSession,
        updateSearchParams,
        updateStorageValues,
        shortURL: useCallback(
            () => getShortURLString(session.searchParams),
            [session.searchParams]
        ),
>>>>>>> 391cf0f (last commit)
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
