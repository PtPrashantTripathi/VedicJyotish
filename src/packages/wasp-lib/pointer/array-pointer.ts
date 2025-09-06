import { type FixedLengthArray, toFixedLengthArray } from "fixed-len-array";

import { type C_NumberType, C_TYPE_SIZES, type WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/** A class representing a typed numeric array in WASM memory. */
export class ArrayPointer<
    T extends C_NumberType,
    N extends number = number,
> extends BasePointer<FixedLengthArray<N, T extends "i64" ? bigint : number>> {
    /** Data type of the elements stored (e.g., "i32", "double"). */
    public type: T;

    /** Number of elements in the array. */
    public length: N;

    /**
     * Creates a new ArrayPointer instance.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - The type of each numeric element in the array.
     * @param length - Number of elements in the array.
     * @param ptr - Optional raw pointer to pre-allocated memory. If
     *   `undefined`, memory is allocated.
     */
    constructor(wasm: WASMModule, type: T, length: N, ptr?: number) {
        super(wasm, ptr ?? wasm._malloc(length * C_TYPE_SIZES[type]));
        this.type = type;
        this.length = length;
    }

    /**
     * Creates a new ArrayPointer from a JavaScript number array.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - Type of each numeric element (e.g., "double", "i32").
     * @param input - JavaScript array of numbers to write to WASM memory.
     * @returns A new instance of ArrayPointer.
     */
    static from<T extends C_NumberType, N extends number>(
        wasm: WASMModule,
        type: T,
        length: N,
        input: T extends "i64" ? bigint[] : number[] = []
    ): ArrayPointer<T, N> {
        const arr = ArrayPointer.alloc(wasm, type, length);
        arr.write(input);
        return arr;
    }

    /**
     * Allocates an empty buffer for a numeric array.
     *
     * @param wasm - Swisseph Emscripten Module instance
     * @param type - Type of numeric element stored.
     * @param length - Number of elements to allocate.
     * @returns A new instance of ArrayPointer.
     */
    static alloc<T extends C_NumberType, N extends number>(
        wasm: WASMModule,
        type: T,
        length: N
    ): ArrayPointer<T, N> {
        return new ArrayPointer(wasm, type, length);
    }

    /**
     * Writes a numeric value at a given index in WASM memory.
     *
     * @param loc - Index to write to.
     * @param val - Numeric value to write.
     * @throws If index is out of bounds.
     */
    add(loc: number, val: T extends "i64" ? bigint : number): void {
        this.validatePointer();
        if (loc >= 0 && loc < this.length) {
            this.wasm.setValue(
                this.ptr + loc * C_TYPE_SIZES[this.type],
                val as T extends "i64" | "i64*" ? bigint : number,
                this.type
            );
        } else {
            throw new Error(
                `Out-of-bounds access: tried to write at index ${loc} in array of length ${this.length}`
            );
        }
    }

    /**
     * Reads the entire numeric array from WASM memory and trims or pads it to
     * the specified fixed length.
     *
     * @returns A fixed-length array
     */
    read(): FixedLengthArray<N, T extends "i64" ? bigint : number> {
        this.validatePointer();
        const size = C_TYPE_SIZES[this.type];

        // Read up to this.length elements from WASM memory
        const array = Array.from({ length: this.length }, (_, i) =>
            this.wasm.getValue(this.ptr + i * size, this.type)
        );

        return toFixedLengthArray(array, this.length, null);
    }

    /** Writes a JS array into WASM memory */
    write(values: T extends "i64" ? bigint[] : number[]): void {
        this.validatePointer();
        if (values.length > this.length) {
            throw new Error(
                `Array length mismatch. Expected ${this.length}, got ${values.length}`
            );
        }

        // Type assertion to help TypeScript understand the correct type
        values.forEach((val, i) =>
            this.add(i, val as T extends "i64" ? bigint : number)
        );
    }
}
