// src/hooks/useSessionState.ts
import { useState } from "react";
import {
    type ISessionData,
    parseSearchParams,
    searchParamKeys,
} from "src/utils/parseSearchParams";
import { merge } from "ts-deepmerge";

// Recursive Partial (DeepPartial)
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * A custom hook to manage the application's session state, synchronizing with
 * URL search parameters.
 *
 * @returns An object containing the session data and update functions.
 */
export function useSessionState() {
    const [data, setData] = useState<ISessionData>(parseSearchParams());

    // Our updater function
    const updateData = (patch: DeepPartial<ISessionData>) => {
        setData(data => merge(data, patch) as ISessionData);
    };

    const getSortURL = () => {
        const params = new URLSearchParams(
            searchParamKeys.map(key => [key, String(data[key])])
        );
        return (
            window.location.origin +
            window.location.pathname +
            "?id=" +
            btoa(params.toString())
        );
    };

    console.log(
        "session.data:",
        // new Date().toISOString(),
        JSON.stringify(data, null, 4)
    );
    // console.time(session.getSortURL());

    return {
        data,
        setData,
        updateData,
        getSortURL,
    };
}
