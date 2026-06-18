// src/hooks/useSessionState.ts
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

// Defines the full session data structure, including errors and navigation state.
export interface ISessionData {
    nav: boolean;
    searchParams: ISearchParams;
    storageValues: IStorageValues;
    error: IErrorType[];
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

    // Save search params to storage on first mount (default) or after Settings save.
    // Must run inside useEffect — calling setState directly during render causes
    // "Too many re-renders" because it synchronously queues another render.
    useEffect(() => {
        if (storageValues.default || searchParams.save) {
            updateStorageValues({
                username: searchParams.user,
                gender: searchParams.gender,
                dob: DateTime.fromISO(
                    `${searchParams.date}T${searchParams.time}`,
                    { zone: searchParams.tznm }
                ) as DateTime<true>,
                tz_name: searchParams.tznm,
                city: searchParams.city,
                lat: searchParams.lat,
                lon: searchParams.lon,
                default: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount with initial URL/storage snapshot

    // Handle browser navigation (back/forward buttons)
    useEffect(() => {
        const handlePopState = () => {
            setSession(prev => ({
                ...prev,
                searchParams: parseSearchParams(),
            }));
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    console.log("session:", JSON.stringify(session, null, 4));
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
