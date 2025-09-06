// src/hooks/useSessionState.ts
import { useCallback, useEffect, useState } from "react";
import type { IErrorType } from "src/components/Errors";
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
            updateURL(updated.data);

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
