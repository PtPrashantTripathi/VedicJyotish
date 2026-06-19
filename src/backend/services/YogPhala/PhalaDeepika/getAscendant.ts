import type { Planet, PlanetEn } from "src/backend/services/constants/Planet";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Retrieves the ascendant effects from Phala Deepika based on the Ascendant's
 * Rasi.
 */
export function getPhalaDeepikaAscendantYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala {
    const { english: rasiEnglishName, hindi: rasiHindiName } =
        planets.Ascendant.rasi.name;

    return {
        description: {
            english: `Ascendant in ${rasiEnglishName}`,
            hindi: `लग्न ${rasiHindiName} में`,
        },
        effect: getPhalDb()?.phala_deepika_ascendant?.[rasiEnglishName] ?? {
            english: "",
            hindi: "",
        },
    };
}
