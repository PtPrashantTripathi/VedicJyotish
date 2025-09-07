clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all \
  -Wl,--allow-undefined -o file_reader.wasm file_reader.c
