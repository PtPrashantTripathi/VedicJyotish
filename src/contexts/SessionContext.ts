// src/contexts/SessionContext.ts
import { createContext, useContext } from "react";
import type { useSessionState } from "src/hooks/useSessionState";

/** A React context for managing and sharing the application session state. */
export const SessionContext = createContext<
    ReturnType<typeof useSessionState> | undefined
>(undefined);

/**
 * A custom hook to access the session context.
 *
 * @returns The session state and update functions.
 * @throws {Error} If used outside of a SessionProvider.
 */
export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(
            "useSessionContext must be used within a SessionProvider"
        );
    }
    return context;
};
