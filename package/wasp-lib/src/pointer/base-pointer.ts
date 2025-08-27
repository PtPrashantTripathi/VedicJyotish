import { type WASMModule } from "../types";

/**
 * @author Pt. Prashant Tripathi
 * @since 1.0.0
 *
 *   Abstract base class for all WASM memory pointer implementations. Provides
 *   common memory management functionality and enforces a consistent interface
 *   across all pointer types in the wasp-lib library.
 *
 *   This class provides common memory management functionality including
 *   allocation, deallocation, and pointer validation. All specific pointer
 *   types (StringPointer, NumberPointer, etc.) extend this base class.
 * @example
 *     // This is an abstract class - use concrete implementations:
 *     const strPtr = StringPointer.from(wasm, "Hello World");
 *     const numPtr = NumberPointer.from(wasm, "i32", 42);
 *     const arrPtr = ArrayPointer.from(wasm, "double", 3, [1.1, 2.2, 3.3]);
 *
 * @abstract
 * @template T The type of value stored in memory
 */
export abstract class BasePointer<T = unknown> {
    /** Raw memory pointer address in WASM heap */
    protected _ptr: number = 0;

    /** The WebAssembly module instance */
    protected readonly wasm: WASMModule;

    /**
     * Creates a new BasePointer instance.
     *
     * @param wasm - The Emscripten WebAssembly module instance
     * @param ptr - Pre-allocated memory pointer. If not provided, subclasses
     *   should handle allocation.
     * @protected
     */
    protected constructor(wasm: WASMModule, ptr: number) {
        this.wasm = wasm;
        this._ptr = ptr;
    }

    /**
     * Gets the raw memory pointer address.
     *
     * @example
     *     const strPtr = StringPointer.from(wasm, "test");
     *     console.log(strPtr.ptr); // e.g., 1048576
     *
     * @returns The memory address as a number, or 0 if freed
     */
    get ptr(): number {
        return this._ptr;
    }

    /**
     * Checks if the pointer is valid (non-zero and not freed).
     *
     * @example
     *     const ptr = StringPointer.from(wasm, "test");
     *     console.log(ptr.isValid); // true
     *     ptr.free();
     *     console.log(ptr.isValid); // false
     *
     * @returns True if pointer is valid, false if freed or unallocated
     */
    get isValid(): boolean {
        return this._ptr !== 0;
    }

    /**
     * Validates that the pointer is still valid before operations.
     *
     * @throws {Error} If pointer has been freed or is invalid
     * @protected
     */
    protected validatePointer(): void {
        if (!this.isValid) {
            throw new Error("Cannot operate on freed or invalid pointer");
        }
    }

    /**
     * Reads the value from WASM memory.
     *
     * @abstract
     * @returns The value stored in memory
     * @throws {Error} If pointer is invalid
     */
    abstract read(): T;

    /**
     * Frees the allocated WASM memory.
     *
     * After calling this method, the pointer becomes invalid and cannot be used
     * for further operations. This method is idempotent - calling it multiple
     * times is safe.
     *
     * @example
     *     const ptr = StringPointer.from(wasm, "test");
     *     ptr.free(); // Memory is freed
     *     ptr.free(); // Safe to call again
     */
    free(): void {
        if (this._ptr !== 0) {
            this.wasm._free(this._ptr);
            this._ptr = 0;
        }
    }

    /**
     * Convenience method that reads the value and immediately frees the memory.
     *
     * This is the recommended way to retrieve values when you don't need to
     * keep the pointer around for multiple operations.
     *
     * @example
     *     const result = StringPointer.from(wasm, "test").readAndFree();
     *     console.log(result); // "test"
     *     // Memory is automatically freed
     *
     * @returns The value stored in memory before freeing
     * @throws {Error} If pointer is invalid
     */
    readAndFree(): T {
        this.validatePointer();
        const value = this.read();
        this.free();
        return value;
    }

    /**
     * Returns a string representation of the pointer for debugging.
     *
     * @example
     *     const ptr = StringPointer.from(wasm, "test");
     *     console.log(ptr.toString()); // "BasePointer(ptr=1048576, valid=true)"
     *
     * @returns Debug string containing pointer address and validity
     */
    toString(): string {
        return `${this.constructor.name}(ptr=${this._ptr}, valid=${this.isValid})`;
    }

    /**
     * Finalizer that ensures memory is freed when object is garbage collected.
     *
     * Note: This is a safety net - you should still call free() explicitly for
     * deterministic memory management.
     *
     * @private
     */
    // Note: FinalizationRegistry would go here in a real implementation
    // but we keep it simple for this example
}
