#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// WebAssembly will provide memory; we just read into it
// Export function to be visible in WebAssembly
__attribute__((export_name("read_file")))
char* read_file(const char* path) {
    FILE *file = fopen(path, "r");
    if (!file) {
        printf("Error: Unable to open file %s\n", path);
        return NULL;
    }

    // Seek to end to determine size
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);

    // Allocate buffer in WASM memory
    char *buffer = (char*)malloc(size + 1);
    if (!buffer) {
        printf("Error: Memory allocation failed\n");
        fclose(file);
        return NULL;
    }

    fread(buffer, 1, size, file);
    buffer[size] = '\0'; // Null terminator
    fclose(file);

    // Print to stdout (native run or WASM console)
    printf("File contents:\n%s\n", buffer);

    return buffer;
}
