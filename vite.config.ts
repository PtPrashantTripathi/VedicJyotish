import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    root: ".",

    plugins: [react(), tailwindcss()],
    resolve: {
        // Enable native path resolution from tsconfig.json
        tsconfigPaths: true,
    },
    server: {
        watch: {
            // Follow symlinks into sub_modules/ so workspace package changes trigger HMR
            ignored: ["!**/sub_modules/**"],
        },
    },
    optimizeDeps: {
        // Load workspace packages directly from their dist/ (don't pre-bundle them)
        // so that a library rebuild is immediately picked up by the dev server
        exclude: ["fixed-len-array", "wasp-lib", "sweph-wasm"],
    },
    build: {
        target: "esnext",
        outDir: "dist",
        emptyOutDir: true,
        // sourcemap: true, // optional: helps debugging
        minify: "esbuild",
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            treeshake: true,
            external: [],
            output: {
                // This will name the JS entry file like: index.js or result.js
                entryFileNames: "js/[name].js",
                chunkFileNames: "js/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
    },
});
