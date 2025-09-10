// vite.config.ts

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
    base: "./",
    root: ".",
    plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
    build: {
        target: "esnext",
        outDir: "dist",
        emptyOutDir: true,
        // sourcemap: true, // optional: helps debugging
        minify: "esbuild",
        rollupOptions: {
            treeshake: true,
            external: [],
            output: {
                // This will name the JS entry file like: index.[hash].js or result.[hash].js
                entryFileNames: "js/[name].js",
                chunkFileNames: "js/[name].js",
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
});
