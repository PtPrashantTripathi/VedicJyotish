import {
    type C_BoolType,
    type C_CharType,
    C_FALSE,
    type C_NumberType,
    C_TRUE,
    C_TYPE_SIZES,
} from "./types";

/**
 * Utility class for converting between JavaScript and C types.
 *
 * Provides static methods for type-safe conversions that are used across all
 * pointer classes to maintain consistency.
 *
 * @example
 *     // Convert JS boolean to C boolean
 *     const cBool = TypeConverter.boolToC(true); // Returns 1
 *
 *     // Convert C boolean to JS boolean
 *     const jsBool = TypeConverter.boolFromC(0); // Returns false
 *
 *     // Convert single character to ASCII
 *     const ascii = TypeConverter.charToC("A"); // Returns 65
 */

export class TypeConverter {
    /**
     * Converts a JavaScript boolean to a C-style boolean.
     *
     * @example
     *     TypeConverter.boolToC(true); // Returns 1
     *     TypeConverter.boolToC(false); // Returns 0
     *
     * @param value - The JavaScript boolean value
     * @returns 1 for true, 0 for false
     */
    static boolToC(value: boolean): C_BoolType {
        return value ? C_TRUE : C_FALSE;
    }

    /**
     * Converts a C-style boolean to a JavaScript boolean.
     *
     * @example
     *     TypeConverter.boolFromC(1); // Returns true
     *     TypeConverter.boolFromC(0); // Returns false
     *
     * @param value - The C boolean value (0 or 1)
     * @returns True for non-zero values, false for zero
     */
    static boolFromC(value: C_BoolType): boolean {
        return Boolean(value);
    }

    /**
     * Converts a single-character JavaScript string to its ASCII code.
     *
     * @example
     *     TypeConverter.charToC("A"); // Returns 65
     *     TypeConverter.charToC("0"); // Returns 48
     *
     * @param char - A string containing exactly one character
     * @returns The ASCII code (0-255) of the character
     * @throws {Error} If input is not exactly one character
     */
    static charToC(char: string): C_CharType {
        if (typeof char !== "string" || char.length !== 1) {
            throw new Error("Input must be exactly one character");
        }
        const code = char.charCodeAt(0);
        if (code < 0 || code > 255) {
            throw new Error(
                `Character '${char}' is outside ASCII range (0-255)`
            );
        }
        return code;
    }

    /**
     * Converts an ASCII code to a single-character JavaScript string.
     *
     * @example
     *     TypeConverter.charFromC(65); // Returns 'A'
     *     TypeConverter.charFromC(48); // Returns '0'
     *
     * @param code - The ASCII code (must be 0-255)
     * @returns A single-character string
     * @throws {Error} If code is outside valid ASCII range
     */
    static charFromC(code: C_CharType): string {
        if (!Number.isInteger(code) || code < 0 || code > 255) {
            throw new Error(`Invalid ASCII code: ${code}. Must be 0-255`);
        }
        return String.fromCharCode(code);
    }

    /**
     * Validates that a numeric type is supported by the library.
     *
     * @param type - The type to validate
     * @returns True if the type is supported
     * @throws {Error} If the type is not supported
     */
    static validateNumberType(type: string): type is C_NumberType {
        if (!(type in C_TYPE_SIZES)) {
            throw new Error(`Unsupported number type: ${type}`);
        }
        return true;
    }

    /**
     * Gets the size in bytes for a given numeric type.
     *
     * @param type - The numeric type
     * @returns Size in bytes
     * @throws {Error} If type is not supported
     */
    static getTypeSize(type: C_NumberType): number {
        this.validateNumberType(type);
        return C_TYPE_SIZES[type];
    }
}
