// src/contexts/WASMContext.ts
import { createContext, useContext } from "react";
import type SwissEPH from "sweph-wasm/index";

/** A React context for managing and sharing the application WASM state. */
export const WASMContext = createContext<SwissEPH | undefined>(undefined);

/**
 * A custom hook to access the WASM context.
 *
 * @returns The WASM state and update functions.
 * @throws {Error} If used outside of a WASMProvider.
 */
export const useWASMContext = () => {
    const context = useContext(WASMContext);
    if (context === undefined) {
        throw new Error("useWASMContext must be used within a WASMProvider");
    }
    console.log("swe_version", context.swe_version());
    return context;
};
