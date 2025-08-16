import argparse
import json
import os
import re
import shutil
import subprocess
from pathlib import Path
from typing import Dict, List

import requests


class SwissephBuildTools:
    # Current script's directory
    base_dir = Path(__file__).parent.parent / "src/backend/swisseph-wasm"
    base_url = "https://github.com/aloistr/swisseph/raw/refs/heads/master"
    lib_dir = base_dir / "lib"
    wasm_dir = base_dir / "wasm"
    header_file = lib_dir / "swephexp.h"
    output_ts = wasm_dir / "index.d.ts"
    output_js = wasm_dir / "swisseph.js"
    json_file = wasm_dir / "exported_funtion.json"
    source_files = [
        "swemptab.h",
        "swemmoon.c",
        "swehouse.h",
        "swephexp.h",
        "sweph.h",
        "swedate.h",
        "swehel.c",
        "swejpl.h",
        "swephlib.h",
        "swehouse.c",
        "swecl.c",
        "swenut2000a.h",
        "sweph.c",
        "swedate.c",
        "swemplan.c",
        "swephlib.c",
        "swejpl.c",
        "sweodef.h",
    ]
    # C → JS type mapping
    CTYPE_TO_JS: Dict[str, str] = {
        "int": "number",
        "short": "number",
        "long": "number",
        "float": "number",
        "double": "number",
        "char": "number",
        "unsigned": "number",
        "void": "void",
        # typedefs
        "int32": "number",
        "int64": "number",
        "int16": "number",
        "uint32": "number",
        "UINT4": "number",
        "INT4": "number",
        "REAL8": "number",
        "UINT2": "number",
        "AS_BOOL": "number",
        "CSEC": "number",
        "centisec": "number",
    }

    def __init__(
        self,
        env: str = "dev",
        node: bool = False,
        verbose: bool = False,
        download_source_files: bool = False,
    ):
        self.env = env
        self.node = node
        self.verbose = verbose
        self.check_emcc()
        shutil.rmtree(self.wasm_dir, True)
        self.wasm_dir.mkdir(parents=True, exist_ok=True)
        if download_source_files:
            self.download_source_files()
        self.build_function_map()
        self.build()
        self.generate_typescript_interface()

    def check_emcc(self):
        if shutil.which("emcc") is None:
            raise EnvironmentError(
                "❌ Emscripten (emcc) not found. Install: https://emscripten.org/docs/getting_started/downloads.html"
            )

    def clean_header(self) -> str:
        print(f"🧼 Cleaning header: {self.header_file}")
        text = self.header_file.read_text()

        replacements = {
            "ext_def(x)": "",
            "const": "",
            "swe_version(char *)": "swe_version(char *s)",
            "swe_get_library_path(char *)": "swe_get_library_path(char *s)",
        }

        for old, new in replacements.items():
            text = text.replace(old, new)

        text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
        text = re.sub(r"\s+", " ", text.replace("\n", " ")).strip()
        return text

    def extract_functions(self) -> List[Dict]:
        header_text = self.clean_header()
        matches = re.findall(r"ext_def[\s\S]*?\);", header_text)
        print(f"🔍 Found {len(matches)} functions in header file")

        result = []
        for match in matches:
            try:
                result.append(self.parse_function(match))
            except Exception as e:
                print(f"⚠️ Skipped malformed function: {match}\n{e}")
        return result

    def parse_function(self, signature: str) -> Dict:
        signature = signature.strip().rstrip(";")
        m = re.match(
            r"ext_def\s*?\(([\w\s\*]+?)\)\s*?([\w\d_]+)\s*\((.*?)\)", signature
        )
        if not m:
            raise ValueError("Invalid function signature")

        return_type_raw, name, arg_str = m.groups()
        return_type = return_type_raw.replace("*", "").strip()
        is_ptr = "*" in return_type_raw

        args = []
        if arg_str.strip() != "void":
            args = [self.parse_arg(arg) for arg in arg_str.split(",")]

        return {
            "func_name": name,
            "pointer": is_ptr,
            "c_type": return_type,
            "js_type": (
                "number" if is_ptr else self.CTYPE_TO_JS.get(return_type, "unknown")
            ),
            "args": args,
        }

    def parse_arg(self, arg: str) -> Dict:
        tokens = arg.strip().split()
        if len(tokens) < 2:
            return {}  # skip malformed
        c_type = " ".join(tokens[:-1]).replace("*", "").strip()
        pointer = "*" in arg
        return {
            "name": tokens[-1].replace("*", "").strip(),
            "pointer": pointer,
            "c_type": c_type,
            "js_type": (
                "number" if pointer else self.CTYPE_TO_JS.get(c_type, "unknown")
            ),
        }

    def build_function_map(self):
        functions = self.extract_functions()
        functions.sort(key=lambda x: x["func_name"])

        with open(self.json_file, "w") as f:
            json.dump(functions, f, indent=4)

        print(f"📄 Exported {len(functions)} functions metadata to → {self.json_file}")
        return functions

    def generate_typescript_interface(self):
        interfaces_lines = [
            "/**",
            " * TypeScript bindings for the Swisseph Emscripten-generated WebAssembly module.",
            " * Extends the EmscriptenModule with custom wrapped native functions.",
            " */",
            "export interface WASMModule extends EmscriptenModule {",
            "    /** Sets a value in the WebAssembly heap memory. */",
            "    setValue: typeof setValue;",
            "",
            "    /** Retrieves a value from the WebAssembly heap memory. */",
            "    getValue: typeof getValue;",
            "",
            "    /** Converts a JavaScript string to a UTF-8 encoded string in the WebAssembly memory. */",
            "    stringToUTF8: typeof stringToUTF8;",
            "",
            "    /** Converts a UTF-8 encoded string from the WebAssembly memory to a JavaScript string. */",
            "    UTF8ToString: typeof UTF8ToString;",
            "",
            "    /** Returns the number of bytes required to encode a JavaScript string as UTF-8. */",
            "    lengthBytesUTF8: typeof lengthBytesUTF8;",
            "",
            "    /** Provides access to the Emscripten virtual file system. */",
            "    FS: typeof FS;",
            "",
            "    /**",
            "     * Frees allocated memory in the WebAssembly heap.",
            "     *",
            "     * Equivalent to `free(void* ptr)` in C.",
            "     * @param ptr Pointer to the memory location to free.",
            "     */",
            "    _free(ptr: number): void;",
            "",
            "    /**",
            "     * Allocates memory in the WebAssembly heap.",
            "     *",
            "     * Equivalent to `malloc(size_t size)` in C.",
            "     * @param size Number of bytes to allocate.",
            "     * @returns A pointer to the beginning of the allocated memory block.",
            "     */",
            "    _malloc(size: number): number;",
            "",
        ]

        for fn in json.loads(self.json_file.read_text()):
            # JSDoc block
            interfaces_lines.append("    /**")
            for arg in fn["args"]:
                interfaces_lines.append(
                    f"     * @param {{{arg['js_type']}}} {arg['name']} - `{arg['c_type']}{'*' if arg['pointer'] else ''} {arg['name']}`"
                )
            interfaces_lines.append(
                f"     * @returns {{{fn['js_type']}}} `{fn['c_type']}{'*' if fn['pointer'] else ''}`"
            )
            interfaces_lines.append("     */")

            # Function signature
            arg_sig = ",\n".join(
                f"        {arg['name']}: {arg['js_type']}" for arg in fn["args"]
            )
            interfaces_lines.append(
                f"    _{fn['func_name']}(\n{arg_sig}\n    ): {fn['js_type']};"
            )
            interfaces_lines.append("")  # Add space between functions

        # Closing interface and export
        interfaces_lines.extend(
            [
                "}",
                "",
                "/**",
                " * Initializes and returns the Swisseph WebAssembly module.",
                " *",
                " * @param moduleArg - Optional configuration object for the Emscripten module.",
                " * @returns A Promise that resolves to the initialized WASMModule instance.",
                " */",
                "",
                "export default function Module(moduleArg?: Partial<EmscriptenModule>): Promise<WASMModule>;",
            ]
        )

        data = "\n".join(interfaces_lines)

        self.output_ts.write_text(
            data,
            encoding="utf-8",
        )

        print(f"🧾 TypeScript interface generated → {self.output_ts}")

    def download_source_files(self):
        shutil.rmtree(self.lib_dir)
        for filename in self.source_files:
            try:
                full_url = f"{self.base_url}/{filename}"
                local_path = self.lib_dir / filename
                local_path.parent.mkdir(parents=True, exist_ok=True)
                print(f"Downloading: {full_url}")
                response = requests.get(full_url, stream=True)
                response.raise_for_status()
                with open(local_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"Saved to: {local_path}")
            except requests.exceptions.RequestException as e:
                print(f"Failed to download {filename}\nError: {e}")

    def build(self):
        print("🔧 Building WebAssembly...")
        exported_funcs = ["_free", "_malloc"] + [
            f"_{info['func_name']}" for info in json.loads(self.json_file.read_text())
        ]
        runtime_methods = [
            "setValue",
            "getValue",
            "stringToUTF8",
            "UTF8ToString",
            "lengthBytesUTF8",
            "FS",
        ]

        flags = [
            # Enable WebAssembly output
            "-sWASM=1",
            # Wrap the module in a function (ES6-friendly)
            "-sMODULARIZE=1",
            # Use ES6 export syntax
            "-sEXPORT_ES6=1",
            # # Custom export name
            # "-sEXPORT_NAME=MainModuleFactory",
            # Exported C functions
            f"-sEXPORTED_FUNCTIONS=[{','.join(exported_funcs)}]",
            # Useful JS runtime methods
            f"-sEXPORTED_RUNTIME_METHODS=[{','.join(runtime_methods)}]",
            # Allow memory to grow at runtime
            "-sALLOW_MEMORY_GROWTH=1",
            # Initial WebAssembly memory
            "-sINITIAL_MEMORY=16MB",
            # Max memory limit
            "-sMAXIMUM_MEMORY=128MB",
            # Target Environment
            f"-sENVIRONMENT=[{'web,node' if self.node else 'web'}]"
            # Stack safety
            "-sSTACK_OVERFLOW_CHECK=1",
            # Memory access checks
            "-sSAFE_HEAP=1",
            # No main() function
            "--no-entry",
            # Output file
            "-o",
            str(self.output_js),
        ]

        if self.env.strip().lower() == "prod":
            # Optimize aggressively
            flags.extend(
                [
                    "-O3",
                    "-g0",
                ]
            )

        if self.verbose:
            flags.append("-v")

        src_paths = [
            str(self.lib_dir / file_name)
            for file_name in self.source_files
            if file_name.endswith(".c")
        ]
        # Construct the full emcc compilation command with all source files and flags
        command = ["emcc"] + src_paths + flags

        # Inform the user the compilation is starting
        print("📦 Running emcc compilation...")
        print("command:", "\n\t".join(command))

        # Run the command, raising an error if compilation fails
        subprocess.run(command, check=True)

        # Rename the default Emscripten output (e.g. index.js) to swisseph.js for consistency
        self.output_js = self.output_js.rename(self.output_js.with_name("index.js"))

        # Indicate that the WASM build and cleanup process is complete
        print(f"✅ WASM build complete → {self.output_js.with_name("swisseph.wasm")}")


if __name__ == "__main__":
    # Create the parser
    parser = argparse.ArgumentParser(description="A simple Python CLI example.")

    # Add arguments
    parser.add_argument(
        "-e",
        "--env",
        default=str(os.environ.get("env", "dev")),
        help="build env",
    )
    parser.add_argument(
        "-n",
        "--node",
        action="store_true",
        help="Enable node build.",
        default=str(os.environ.get("node")).strip().lower() == "true",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Enable verbose output.",
        default=str(os.environ.get("verbose")).strip().lower() == "true",
    )
    parser.add_argument(
        "-d",
        "--download_source_files",
        action="store_true",
        help="Download source files.",
        default=str(os.environ.get("download_source_files")).strip().lower() == "true",
    )

    # Parse the arguments
    args = parser.parse_args()

    # Use the parsed arguments
    if args.verbose:
        print("Running in verbose mode.")

    SwissephBuildTools(
        env=args.env,
        node=args.node,
        verbose=args.verbose,
        download_source_files=args.download_source_files,
    )
