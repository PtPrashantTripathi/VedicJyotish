# build_tool/config.py
from typing import Dict, List

# Source files to download and compile
SOURCE_FILES: List[str] = [
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

# --- Type Mappings ---
# C -> JS type mapping for the TypeScript declaration file
CTYPE_TO_JS: Dict[str, str] = {
    "int": "number",
    "short": "number",
    "long": "number",
    "float": "number",
    "double": "number",
    "char": "number",
    "unsigned": "number",
    "void": "void",
    # Typedefs from swephexp.h
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

# --- Emscripten Build Flags ---
# Common flags for all builds
BASE_EMCC_FLAGS = [
    "-sWASM=1",
    "-sMODULARIZE=1",
    "-sEXPORT_ES6=1",
    "-sALLOW_MEMORY_GROWTH=1",
    "-sINITIAL_MEMORY=16MB",
    "-sMAXIMUM_MEMORY=128MB",
    "-sSTACK_OVERFLOW_CHECK=1",
    "-sSAFE_HEAP=1",
    "--no-entry",
]

# Flags specific to the production environment
PROD_EMCC_FLAGS = ["-O3", "-g0"]

# JS methods to export from the Emscripten runtime
EXPORTED_RUNTIME_METHODS = [
    "setValue",
    "getValue",
    "stringToUTF8",
    "UTF8ToString",
    "lengthBytesUTF8",
    "FS",
]
