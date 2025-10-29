<<<<<<< HEAD
// vite.config.ts

=======
>>>>>>> 391cf0f (last commit)
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
<<<<<<< HEAD
=======

>>>>>>> 391cf0f (last commit)
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
<<<<<<< HEAD
=======
        chunkSizeWarningLimit: 2000,
>>>>>>> 391cf0f (last commit)
        rollupOptions: {
            treeshake: true,
            external: [],
            output: {
<<<<<<< HEAD
                // This will name the JS entry file like: index.[hash].js or result.[hash].js
                entryFileNames: "js/[name].js",
                chunkFileNames: "js/[name].js",
                assetFileNames: "assets/[name][extname]",
=======
                // This will name the JS entry file like: index.js or result.js
                entryFileNames: "js/[name].js",
                chunkFileNames: "js/[name].js",
                assetFileNames: "assets/[name].[ext]",
>>>>>>> 391cf0f (last commit)
            },
        },
    },
});
