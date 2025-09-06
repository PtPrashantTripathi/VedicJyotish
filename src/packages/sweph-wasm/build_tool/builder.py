# build_tool/builder.py
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any, Dict, List

from . import config


class Builder:
    """Orchestrates the entire WebAssembly build process for Swisseph."""

    def __init__(self, base_dir: Path, env: str, verbose: bool):
        self.base_dir = base_dir
        self.src_dir = self.base_dir / "swisseph"
        self.build_dir = self.base_dir / "src/wasm"
        self.env = env
        self.verbose = verbose
        self.metadata: List[Dict[str, Any]] = []

    def run(self, targets: List[str]):
        """Executes the full build pipeline."""
        print("Starting Swisseph WASM build process...")
        self._check_emcc()
        self._parse_metadata()
        self._build_targets(targets)
        self._generate_ts_declaration()
        print("Build process completed successfully!")

    def _check_emcc(self):
        """Checks if the Emscripten compiler (emcc) is in the system's PATH."""
        print("Checking for Emscripten (emcc)...")
        if not shutil.which("emcc"):
            raise EnvironmentError(
                "Emscripten (emcc) not found. Please install and configure the Emscripten SDK."
            )
        print("Emscripten found.")

    def _parse_metadata(self):
        """Parses the C header file to extract function metadata."""
        print("Parsing header file to extract function metadata...")
        header_file = self.src_dir / "swephexp.h"

        # 1. Clean the header content for easier parsing
        text = header_file.read_text()
        replacements = {
            "ext_def(x)": "",
            "const": "",
            # Add dummy var names for consistent parsing
            "swe_version(char *)": "swe_version(char *s)",
            "swe_get_library_path(char *)": "swe_get_library_path(char *s)",
        }
        for old, new in replacements.items():
            text = text.replace(old, new)
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
        text = re.sub(r"\s+", " ", text.replace("\n", " ")).strip()

        # 2. Find all function definitions
        matches = re.findall(r"ext_def[\s\S]*?\);", text)
        print(f"Found {len(matches)} potential functions in header file.")

        # 3. Parse each function signature
        for match in matches:
            try:
                self.metadata.append(self._parse_function_signature(match))
            except ValueError as e:
                print(f"Skipped malformed function signature: {match[:50]}... ({e})")

        self.metadata.sort(key=lambda x: x["func_name"])
        print(f"Successfully parsed {len(self.metadata)} functions.")

    def _parse_function_signature(self, signature: str) -> Dict[str, Any]:
        """Parses a single C function signature string."""
        clean_sig = signature.strip().rstrip(";")

        # Regex to capture: 1=return type, 2=function name, 3=arguments string
        pattern = re.compile(r"ext_def\s*?\(([\w\s\*]+?)\)\s*?([\w\d_]+)\s*\((.*?)\)")
        m = pattern.match(clean_sig)
        if not m:
            raise ValueError("Invalid function signature format.")

        return_type_raw, name, arg_str = m.groups()
        return_type = return_type_raw.replace("*", "").strip()
        is_ptr = "*" in return_type_raw

        args = []
        if arg_str.strip().lower() != "void":
            arg_parts = [arg.strip() for arg in arg_str.split(",") if arg.strip()]
            args = [self._parse_arg(arg) for arg in arg_parts]

        return {
            "func_name": name,
            "pointer": is_ptr,
            "c_type": return_type,
            "js_type": (
                "number" if is_ptr else config.CTYPE_TO_JS.get(return_type, "unknown")
            ),
            "args": args,
        }

    def _parse_arg(self, arg_str: str) -> Dict[str, Any]:
        """Parses a single C function argument string."""
        tokens = arg_str.strip().split()
        if len(tokens) < 2:
            raise ValueError(f"Malformed argument: {arg_str}")

        c_type = " ".join(tokens[:-1]).replace("*", "").strip()
        name = tokens[-1].replace("*", "").strip()
        is_ptr = "*" in arg_str

        return {
            "name": name,
            "pointer": is_ptr,
            "c_type": c_type,
            "js_type": (
                "number" if is_ptr else config.CTYPE_TO_JS.get(c_type, "unknown")
            ),
        }

    def _build_targets(self, targets: List[str]):
        """Compiles the C source into WASM for specified targets."""
        # cleanup last build if any
        if self.build_dir.exists():
            shutil.rmtree(self.build_dir)
        self.build_dir.mkdir(parents=True)

        print(f"Building WebAssembly for target: {targets}")
        output_file = self.build_dir / f"swisseph.js"
        self.build_dir.mkdir(parents=True, exist_ok=True)

        exported_funcs = ["_free", "_malloc"] + [
            f"_{info['func_name']}" for info in self.metadata
        ]

        command = ["emcc"]
        command.extend(
            [str(self.src_dir / f) for f in config.SOURCE_FILES if f.endswith(".c")]
        )
        command.extend(config.BASE_EMCC_FLAGS)
        if self.env == "prod":
            command.extend(config.PROD_EMCC_FLAGS)
        if self.verbose:
            command.append("-v")
        command.extend(
            [
                f"-sENVIRONMENT=[{','.join(targets)}]",
                f"-sEXPORTED_FUNCTIONS=[{','.join(exported_funcs)}]",
                f"-sEXPORTED_RUNTIME_METHODS=[{','.join(config.EXPORTED_RUNTIME_METHODS)}]",
                "-o",
                str(output_file),
            ]
        )

        print(f"Executing emcc command: {' '.join(command)}")
        try:
            subprocess.run(command, check=True, capture_output=True, text=True)
            print(f"WASM build complete -> {output_file.name}")
        except subprocess.CalledProcessError as e:
            print(f"emcc compilation failed.")
            print(f"STDOUT: {e.stdout}")
            print(f"STDERR: {e.stderr}")
            raise

    def _generate_ts_declaration(self):
        """Generates the swisseph.d.ts TypeScript declaration file."""
        print("Generating TypeScript declaration file...")
        output_file = self.build_dir / "swisseph.d.ts"

        function_declarations = []
        for fn in self.metadata:
            # JSDoc block
            jsdoc = ["    /**"]
            for arg in fn["args"]:
                jsdoc.append(
                    f"     * @param {{{arg['js_type']}}} {arg['name']} - C Type: `{arg['c_type']}{'*' if arg['pointer'] else ''}`"
                )
            jsdoc.append(
                f"     * @returns {{{fn['js_type']}}} - C Type: `{fn['c_type']}{'*' if fn['pointer'] else ''}`"
            )
            jsdoc.append("     */")

            # Function signature
            arg_sig = ", ".join(
                f"{arg['name']}: {arg['js_type']}" for arg in fn["args"]
            )
            signature = f"    _{fn['func_name']}({arg_sig}): {fn['js_type']};"

            function_declarations.append("\n".join(jsdoc) + "\n" + signature)

        template = self._get_ts_template()
        content = template.replace(
            "###OTHER_CODE###", "\n\n".join(function_declarations)
        )

        output_file.write_text(content, encoding="utf-8")
        print(f"TypeScript declaration generated -> {output_file}")

    def _get_ts_template(self) -> str:
        """Returns the base string template for the .d.ts file."""
        return """/// <reference types="emscripten" />

/**
 * TypeScript bindings for the Swisseph Emscripten-generated WebAssembly module.
 * Extends the EmscriptenModule with custom wrapped native functions.
 */
export interface SwissephModule extends EmscriptenModule {
    // --- Standard Emscripten Runtime Methods ---
    /* [MDN Reference](https://developer.mozilla.org/docs/WebAssembly/Reference/JavaScript_interface/Memory) */
    wasmMemory: WebAssembly.Memory;

    /** Sets a value in the WebAssembly heap memory. */
    setValue: typeof setValue;

    /** Retrieves a value from the WebAssembly heap memory. */
    getValue: typeof getValue;

    /** Converts a JavaScript string to a UTF-8 encoded string in the WebAssembly memory. */
    stringToUTF8: typeof stringToUTF8;

    /** Converts a UTF-8 encoded string from the WebAssembly memory to a JavaScript string. */
    UTF8ToString: typeof UTF8ToString;

    /** Returns the number of bytes required to encode a JavaScript string as UTF-8. */
    lengthBytesUTF8: typeof lengthBytesUTF8;

    /** Provides access to the Emscripten virtual file system. */
    FS: typeof FS;

    /**
     * Frees allocated memory in the WebAssembly heap.
     *
     * Equivalent to `free(void* ptr)` in C.
     * @param ptr Pointer to the memory location to free.
     */
    _free(ptr: number): void;

    /**
     * Allocates memory in the WebAssembly heap.
     *
     * Equivalent to `malloc(size_t size)` in C.
     * @param size Number of bytes to allocate.
     * @returns A pointer to the beginning of the allocated memory block.
     */
    _malloc(size: number): number;
    
    // --- Exported Swisseph C Functions ---
###OTHER_CODE###
}

/**
 * Initializes and returns the Swisseph WebAssembly module.
 *
 * @param moduleArg - Optional configuration object for the Emscripten module.
 * @returns A Promise that resolves to the initialized Swisseph instance.
 */
export default function Module(moduleArg?: Partial<EmscriptenModule>): Promise<SwissephModule>;
"""
