import { C_TYPE_SIZES, type WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/** Class representing a UTF-8 string allocated in WASM memory. */
export class StringPointer<
    N extends number = number,
> extends BasePointer<string> {
    /** Number of character in the String. */
    public length: number;

    /**
     * Creates a new StringPointer instance.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - The type of each numeric element in the String.
     * @param length - Number of elements in the String.
     * @param ptr - Optional raw pointer to pre-allocated memory. If
     *   `undefined`, memory is allocated.
     */
    constructor(wasm: WASMModule, length: N, ptr?: number) {
        super(wasm, ptr ?? wasm._malloc(length * C_TYPE_SIZES.i8));
        this.length = length;
    }

    /**
     * Creates a StringPointer from a JavaScript string.
     *
     * @param wasm - Emscripten Module instance
     * @param input - The string to encode and store in WASM memory.
     * @returns A new instance of StringPointer.
     */
    static from<N extends number = number>(
        wasm: WASMModule,
        length: N,
        input: string = ""
    ): StringPointer {
        const str = StringPointer.alloc(wasm, length + 1); // +1 for null terminator
        str.write(input);
        return str;
    }

    /**
     * Allocates an empty buffer for a string of given length.
     *
     * @param wasm - Emscripten Module instance
     * @param length - Number of bytes to allocate in WASM memory.
     * @returns A new instance of StringPointer with zero-filled memory.
     */
    static alloc(wasm: WASMModule, length: number): StringPointer {
        return new StringPointer(wasm, length);
    }

    /**
     * Writes a JavaScript string into the allocated WASM memory buffer.
     *
     * @param input - The string to write.
     * @throws Will throw an error if the input string is too long for the
     *   allocated buffer.
     */
    write(input: string): void {
        this.validatePointer();
        if (input.length + 1 > this.length) {
            throw new Error("String length exceeds buffer size");
        }
        this.wasm.stringToUTF8(input, this.ptr, this.length);
    }

    /**
     * Reads the UTF-8 string from WASM memory.
     *
     * @returns The decoded JavaScript string.
     */
    read(): string {
        this.validatePointer();
        return this.wasm.UTF8ToString(this.ptr);
    }
}
