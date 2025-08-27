/**
 * # wasp-lib
 *
 * Utilities to manage typed memory operations in WebAssembly modules
 * (Emscripten-generated), including numeric arrays, strings, booleans, and
 * characters.
 *
 * ## Features
 *
 * - Type-safe interaction with WASM memory
 * - Easy memory allocation and deallocation
 * - Fixed-length numeric array helpers
 * - Works with Emscripten-generated modules
 */

import { ArrayPointer } from "./pointer/array-pointer";
import { BasePointer } from "./pointer/base-pointer";
import { BoolPointer } from "./pointer/bool-pointer";
import { CharPointer } from "./pointer/char-pointer";
import { NumberPointer } from "./pointer/number-pointer";
import { StringPointer } from "./pointer/string-pointer";
import { TypeConverter } from "./type-converter";
import {
    type C_BoolType,
    type C_CharType,
    C_FALSE,
    type C_NumberType,
    C_TRUE,
    C_TYPE_SIZES,
    type WASMModule,
} from "./types";

export {
    ArrayPointer,
    BasePointer,
    BoolPointer,
    type C_BoolType,
    type C_CharType,
    C_FALSE,
    type C_NumberType,
    C_TRUE,
    CharPointer,
    C_TYPE_SIZES as NUMBER_TYPE_SIZES,
    NumberPointer,
    StringPointer,
    TypeConverter,
    type WASMModule,
};
