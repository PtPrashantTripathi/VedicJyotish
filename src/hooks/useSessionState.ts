// src/hooks/useSessionState.ts
import { useMemo, useState } from "react";
import {
    type ISessionData,
    parseSearchParams,
    searchParamKeys,
} from "src/utils/parseSearchParams";

// Defines the shape of the return value for the useSessionState hook.
export interface SessionState {
    data: ISessionData;
    setData: React.Dispatch<React.SetStateAction<ISessionData>>;
    updateData: (input: Partial<ISessionData>) => void;
    getSortURL: () => string;
}

/**
 * A custom hook to manage the application's session state, synchronizing with
 * URL search parameters.
 *
 * @returns {SessionState} An object containing the session data and update
 *   functions.
 */
export function useSessionState(): SessionState {
    const initialData = useMemo(() => parseSearchParams(), []);
    const [data, setData] = useState<ISessionData>(initialData);

    const updateData = (input: Partial<ISessionData>) => {
        setData(prev => ({ ...prev, ...input }));
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

    return {
        data,
        setData,
        updateData,
        getSortURL,
    };
}
