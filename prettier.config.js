/**
 * @type {import("prettier").Config}
 * @see https://prettier.io/docs/configuration
 */
export default {
    plugins: ["prettier-plugin-jsdoc", "prettier-plugin-tailwindcss"],
    arrowParens: "avoid",
    bracketSameLine: true,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    endOfLine: "auto",
    htmlWhitespaceSensitivity: "css",
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: "always",
    quoteProps: "as-needed",
    semi: true,
    singleAttributePerLine: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    useTabs: false,
    overrides: [
        {
            files: "*.ts",
            options: {
                parser: "typescript",
            },
        },
        {
            files: ["*.html", "*.svg"],
            options: {
                parser: "html",
            },
        },
        {
            files: "*.css",
            options: {
                parser: "css",
            },
        },
        {
            files: ["*.json", "*.webmanifest"],
            options: {
                parser: "json",
            },
        },
        {
            files: "*.md",
            options: {
                parser: "markdown",
            },
        },
        {
            files: ["*.yml", "*.yaml"],
            options: {
                parser: "yaml",
            },
        },
    ],
};
