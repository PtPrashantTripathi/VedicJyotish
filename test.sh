#!/usr/bin/env sh
gcc -O0 -g tools/test/monthly_hindi_panchang.c src/backend/swisseph-wasm/lib/*.c -o monthly_hindi_panchang && ./monthly_hindi_panchang
gcc -O0 -g tools/test/panchang_calculator.c src/backend/swisseph-wasm/lib/*.c -o panchang_calculator && ./panchang_calculator