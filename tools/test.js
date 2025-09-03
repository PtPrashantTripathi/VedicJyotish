import {
    Project,
    SyntaxKind,
} from "/opt/homebrew/lib/node_modules/ts-morph/dist/ts-morph.js";
import * as fs from "fs";

const project = new Project();

const sourceFile = project.addSourceFileAtPath(
    "src/services/YogPhala/Saravali/getRasiPosition.ts"
);

const dataVar = sourceFile.getVariableDeclarationOrThrow("effectTable");

const aspectDataRaw = dataVar
    .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression)
    .getElements();

const output = {};

const RasiEnglishNames = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
];
const navagraha = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu",
];

for (const planet of navagraha) {
    output[planet] = {};
    // for (const rasi of RasiEnglishNames) {
    //     output[planet][rasi] = {
    //         english: "",
    //         hindi: "",
    //         ruleText: "",
    //     };
    // }
}

for (const element of aspectDataRaw) {
    if (!element.isKind(SyntaxKind.ObjectLiteralExpression)) continue;

    let planet = "";
    let rasi = "";
    let effectEnglish = "";
    let effectHindi = "";
    let ruleText = "";

    for (const prop of element.getProperties()) {
        if (!prop.isKind(SyntaxKind.PropertyAssignment)) continue;

        const name = prop.getName().replace(/['"]/g, "");

        if (name === "rule") {
            ruleText = prop.getInitializer().getText().replace(/\s+/g, "");

            let match = ruleText.match(/planets\.(\w+).rasi.rasi_num==(\d+)/);
            if (match) {
                planet = match[1];
                rasi = RasiEnglishNames[parseInt(match[2]) - 1];
                // rasi = parseInt(match[2]);
            } else {
                throw new Error(`Mismatch '''${ruleText}''' => ${match}`);
            }
        }

        if (name === "effect") {
            // effect is an object literal with english and hindi props
            const effectObj = prop.getInitializerIfKindOrThrow(
                SyntaxKind.ObjectLiteralExpression
            );
            const englishProp = effectObj.getPropertyOrThrow("english");
            const hindiProp = effectObj.getPropertyOrThrow("hindi");

            effectEnglish = englishProp.getInitializer().getText();
            effectHindi = hindiProp.getInitializer().getText();

            // Remove quotes
            effectEnglish = effectEnglish.replace(/^["']|["']$/g, "");
            effectHindi = effectHindi.replace(/^["']|["']$/g, "");
        }
    }

    output[planet][rasi] = {
        english: effectEnglish,
        hindi: effectHindi,
        ruleText,
    };
}

// Write output JSON
fs.writeFileSync("data.json", JSON.stringify(output, null, 2));

console.log("✅ data.json written successfully.");
