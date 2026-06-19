import type { WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/**
 * A NullPointer is a special pointer that never points to valid WASM memory. It
 * provides a safe representation of "no memory" within the pointer system.
 *
 * This class is useful when an API requires a pointer instance but you want to
 * explicitly represent the absence of allocated memory without using `null` or
 * `undefined`.
 *
 * @example
 *     const nullPtr = new NullPointer();
 *     console.log(nullPtr.ptr); // 0
 */
export class NullPointer<T = void> extends BasePointer<T> {
    /**
     * Creates a new NullPointer instance.
     *
     * Unlike other pointers, this does not need a WASM module.
     */
    constructor() {
        // Pass a dummy object for wasm, since BasePointer expects it
        super({} as WASMModule, 0);
    }

    /**
     * Always throws because a NullPointer cannot read memory.
     *
     * @throws {Error} Always throws: "Cannot read from a NullPointer"
     */
    read(): T {
        throw new Error("Cannot read from a NullPointer");
    }
}
