import { TypeConverter } from "../type-converter";
import { type C_CharType, C_TYPE_SIZES, type WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/**
 * A wrapper around a C-style `char*` allocated in WebAssembly (WASM) memory.
 *
 * Provides methods for creating, writing, reading, and freeing memory for
 * single-character UTF-8 strings in the WASM heap.
 */
export class CharPointer extends BasePointer<string> {
    /**
     * Constructs a new `CharPointer`. If `ptr` is not provided, memory is
     * allocated for a single null-terminated char (initialized to `\0`).
     *
     * @param wasm - The Emscripten WebAssembly module instance.
     * @param ptr - Optional pointer to an existing WASM memory address.
     */
    constructor(wasm: WASMModule, ptr?: number) {
        super(wasm, ptr ?? wasm._malloc(C_TYPE_SIZES.i8));
        if (!ptr) {
            this.write("\0"); // null char
        }
    }

    /**
     * Creates a new `CharPointer` from a JavaScript string.\
     * Only the first character is stored (C `char` is a single byte).
     *
     * @param wasm - The Emscripten WebAssembly module instance.
     * @param input - A string from which the first character will be stored.
     * @returns A new instance of `CharPointer`.
     */
    static from(wasm: WASMModule, input: string): CharPointer {
        if (input.length !== 1) {
            throw new Error("Input must be exactly one character");
        }
        const char = CharPointer.alloc(wasm);
        char.write(input);
        return char;
    }

    /**
     * Allocates a new empty buffer for a single character (`char`).
     *
     * @param wasm - The Emscripten WebAssembly module instance.
     * @returns A new zero-initialized `CharPointer`.
     */
    static alloc(wasm: WASMModule): CharPointer {
        return new CharPointer(wasm);
    }

    /**
     * Writes a JavaScript string into the allocated WASM memory.\
     * Only the first character of the string will be stored.
     *
     * @param input - The string to write (must be exactly one character).
     * @throws Error if the string length is not exactly one character.
     */
    write(input: string): void {
        this.validatePointer();
        const cVal: C_CharType = TypeConverter.charToC(input);
        this.wasm.setValue(this.ptr, cVal, "i8");
    }

    /**
     * Reads the stored character as a JavaScript string.
     *
     * @returns A one-character string read from WASM memory.
     */
    read(): string {
        this.validatePointer();
        const cVal = this.wasm.getValue(this.ptr, "i8") as C_CharType;
        return TypeConverter.charFromC(cVal);
    }
}
