import { TypeConverter } from "../type-converter";
import { type C_BoolType, C_TYPE_SIZES, type WASMModule } from "../types";
import { BasePointer } from "./base-pointer";

/** Pointer wrapper for C-style booleans in WASM memory */
export class BoolPointer extends BasePointer<boolean> {
    /**
     * Creates a new BoolPointer. If no `ptr` is given, allocates memory
     * initialized to `false` (0).
     *
     * @param wasm - Emscripten WASM module instance
     * @param ptr - Optional pointer to an existing WASM memory address.
     */
    constructor(wasm: WASMModule, ptr?: number) {
        super(wasm, ptr ?? wasm._malloc(C_TYPE_SIZES.i8));
        if (!ptr) {
            this.write(false); // default false
        }
    }

    /**
     * Creates a BoolPointer from a JavaScript boolean.
     *
     * @param wasm - Emscripten WASM module instance
     * @param value - The boolean value to store (true/false).
     * @returns A new instance of BoolPointer.
     */
    static from(wasm: WASMModule, value: boolean): BoolPointer {
        const ptr = BoolPointer.alloc(wasm);
        ptr.write(value);
        return ptr;
    }

    /**
     * Allocates an empty BoolPointer initialized to false.
     *
     * @param wasm - Emscripten WASM module instance
     * @returns A new instance of BoolPointer.
     */
    static alloc(wasm: WASMModule): BoolPointer {
        return new BoolPointer(wasm);
    }

    /**
     * Writes a JavaScript boolean into WASM memory.
     *
     * @param value - The boolean to write.
     */
    write(value: boolean): void {
        this.validatePointer();
        const cVal: C_BoolType = TypeConverter.boolToC(value);
        this.wasm.setValue(this.ptr, cVal, "i8");
    }

    /**
     * Reads the boolean value from WASM memory.
     *
     * @returns The stored JavaScript boolean.
     */
    read(): boolean {
        this.validatePointer();
        const cVal = this.wasm.getValue(this.ptr, "i8") as C_BoolType;
        return TypeConverter.boolFromC(cVal);
    }
}
