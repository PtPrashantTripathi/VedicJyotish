import { type C_NumberType, C_TYPE_SIZES, type WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/** Class representing a single number allocated in WASM memory. */
export class NumberPointer<T extends C_NumberType> extends BasePointer<
    T extends "i64" ? bigint : number
> {
    /** Data type of the elements stored (e.g., "i32", "double"). */
    public type: T;

    /**
     * Creates a new NumberPointer. If no pointer is given, allocates memory for
     * one number.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - The type of each numeric element in the Number.
     * @param ptr - Optional raw pointer to pre-allocated memory. If
     *   `undefined`, memory is allocated.
     */
    constructor(wasm: WASMModule, type: T, ptr?: number) {
        super(wasm, ptr ?? wasm._malloc(C_TYPE_SIZES[type]));
        this.type = type;
    }

    /**
     * Creates a new NumberPointer from a JavaScript number Number.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - Type of each numeric element (e.g., "double", "i32").
     * @param input - JavaScript Number of numbers to write to WASM memory.
     * @returns A new instance of NumberPointer.
     */
    static from<T extends C_NumberType>(
        wasm: WASMModule,
        type: T,
        input: T extends "i64" ? bigint : number
    ): NumberPointer<T> {
        const arr = NumberPointer.alloc(wasm, type);
        arr.write(input);
        return arr;
    }

    /** Writes a JS Number into WASM memory */
    write(values: T extends "i64" ? bigint : number): void {
        // Type assertion to help TypeScript understand the correct type
        this.validatePointer();
        this.add(values as T extends "i64" ? bigint : number);
    }

    /**
     * Allocates an empty buffer for a numeric Number.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - Type of numeric element stored.
     * @param length - Number of elements to allocate.
     * @returns A new instance of NumberPointer.
     */
    static alloc<T extends C_NumberType>(
        wasm: WASMModule,
        type: T
    ): NumberPointer<T> {
        return new NumberPointer(wasm, type);
    }

    /**
     * Writes a numeric value at a given index in WASM memory.
     *
     * @param val - Numeric value to write.
     * @throws If index is out of bounds.
     */
    add(val: T extends "i64" ? bigint : number): void {
        this.validatePointer();
        this.wasm.setValue(
            this.ptr,
            val as T extends "i64" | "i64*" ? bigint : number,
            this.type
        );
    }

    /**
     * Reads the entire numeric Number from WASM memory and trims or pads it to
     * the specified fixed length.
     *
     * @returns A fixed-length Number
     */
    read(): T extends "i64" ? bigint : number {
        this.validatePointer();
        // Read up to this.length elements from WASM memory
        return this.wasm.getValue(this.ptr, this.type) as T extends "i64"
            ? bigint
            : number;
    }
}
