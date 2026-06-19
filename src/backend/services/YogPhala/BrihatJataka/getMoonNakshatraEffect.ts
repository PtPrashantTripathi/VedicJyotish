import type { NakshatraEn } from "src/backend/services/constants/Nakshatra";
import type { Planet, PlanetEn } from "src/backend/services/constants/Planet";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Returns Moon Nakshatra effects from Brihat Jataka data.
 */
export function getBrihatJatakaMoonNakshatraEffectYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala {
    const { english: moonNakshatraEng, hindi: moonNakshatraHin } =
        planetPositions.Moon.nakshatra.name;

    return {
        description: {
            english: `Moon in ${moonNakshatraEng} Nakshatra`,
            hindi: `चंद्रमा ${moonNakshatraHin} नक्षत्र में`,
        },
        effect: (
            getPhalDb()?.brihat_jataka_moon_nakshatra as
                | Record<NakshatraEn, { english: string; hindi: string }>
                | undefined
        )?.[moonNakshatraEng] ?? { english: "", hindi: "" },
    };
}
