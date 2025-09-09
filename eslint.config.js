// eslint.config.js
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import js from "@eslint/js";
import ts from "typescript-eslint";
import { globalIgnores, defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig([
    globalIgnores(["dist", "node_modules"]),
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [
            prettier,
            js.configs.recommended,
            ts.configs.recommended,
            reactHooks.configs["recommended-latest"],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.browser,
                React: "readonly",
                JSX: "readonly",
            },
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
            },
        },
        plugins: {
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
        },

        rules: {
            // "no-console": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "simple-import-sort/exports": "warn",
            "simple-import-sort/imports": "warn",

            "no-var": "warn",
            "object-shorthand": ["warn", "properties"],

            eqeqeq: ["warn", "always", { null: "ignore" }],

            "lines-between-class-members": [
                "warn",
                "always",
                { exceptAfterSingleLine: true },
            ],

            "spaced-comment": [
                "warn",
                "always",
                {
                    line: { markers: ["*package", "!", "/", ",", "="] },
                    block: {
                        balanced: true,
                        markers: [
                            "*package",
                            "!",
                            ",",
                            ":",
                            "::",
                            "flow-include",
                        ],
                        exceptions: ["*"],
                    },
                },
            ],
            "no-unexpected-multiline": "warn",
            "no-warning-comments": [
                "warn",
                { terms: ["FIXME"], location: "anywhere" },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^ignored",
                },
            ],
            "@typescript-eslint/no-import-type-side-effects": "warn",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    prefer: "type-imports",
                    disallowTypeAnnotations: true,
                    fixStyle: "inline-type-imports",
                },
            ],

            "@typescript-eslint/no-misused-promises": [
                "warn",
                { checksVoidReturn: false },
            ],

            // "symbol-description": "warn",
        },
    },
]);
