/**
 * Shared type definitions and conversion utilities for WASM memory operations.
 * This module provides type-safe conversion utilities between JavaScript types
 * and their C equivalents in WebAssembly memory, eliminating redundancy across
 * pointer classes.
 *
 * @author Pt. Prashant Tripathi
 * @since 1.0.0
 */

// =============================================================================
// Type Definitions
// =============================================================================

/** C-style numeric types supported by Emscripten */
export type C_NumberType = Emscripten.CIntType | Emscripten.CFloatType;

/** C-style boolean type (0 for false, 1 for true) */
export type C_BoolType = number;

/** C-style character type (ASCII code 0-255) */
export type C_CharType = number;

/** Type constants for C-style booleans */
export const C_TRUE: C_BoolType = 1;
export const C_FALSE: C_BoolType = 0;

// =============================================================================
// Size Mappings
// =============================================================================

/**
 * Size (in bytes) for each WASM number type. Used for memory allocation and
 * pointer arithmetic.
 */
export const C_TYPE_SIZES: Readonly<Record<C_NumberType, number>> = {
    i8: 1,
    i16: 2,
    i32: 4,
    i64: 8,
    float: 4,
    double: 8,
} as const;

/**
 * TypeScript bindings for the Emscripten-generated WebAssembly module. Extends
 * the EmscriptenModule with custom wrapped native functions.
 */
export interface WASMModule {
    /** Sets a value in the WebAssembly heap memory. */
    setValue: typeof setValue;

    /** Retrieves a value from the WebAssembly heap memory. */
    getValue: typeof getValue;

    /**
     * Converts a JavaScript string to a UTF-8 encoded string in the WebAssembly
     * memory.
     */
    stringToUTF8: typeof stringToUTF8;

    /**
     * Converts a UTF-8 encoded string from the WebAssembly memory to a
     * JavaScript string.
     */
    UTF8ToString: typeof UTF8ToString;

    /**
     * Returns the number of bytes required to encode a JavaScript string as
     * UTF-8.
     */
    lengthBytesUTF8: typeof lengthBytesUTF8;

    /**
     * Frees allocated memory in the WebAssembly heap.
     *
     * Equivalent to `free(void* ptr)` in C.
     *
     * @param ptr Pointer to the memory location to free.
     */
    _free(ptr: number): void;

    /**
     * Allocates memory in the WebAssembly heap.
     *
     * Equivalent to `malloc(size_t size)` in C.
     *
     * @param size Number of bytes to allocate.
     * @returns A pointer to the beginning of the allocated memory block.
     */
    _malloc(size: number): number;
}
