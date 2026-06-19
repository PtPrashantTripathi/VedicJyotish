import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/backend/services/constants/Planet";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Retrieves applicable planetary aspect results based on the given planetary
 * positions.
 */
export function getSaravaliAspectYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala[] {
    const aspectData = getPhalDb()?.saravali_aspect as
        | Record<string, Record<string, Record<string, { english: string; hindi: string }>>>
        | undefined;
    if (!aspectData) return [];

    const results: Phala[] = [];

    for (const [aspectingPlanet, aspectedMap] of Object.entries(aspectData)) {
        for (const [aspectedPlanet, rasiOrLordMap] of Object.entries(
            aspectedMap
        )) {
            const aspecting = planets[aspectingPlanet as SaptagrahaEn];
            const aspected = planets[aspectedPlanet as SaptagrahaEn];

            if (!aspecting?.isAspecting(aspected)) continue;

            const key =
                aspectedPlanet === "Moon"
                    ? aspected.rasi.name.english
                    : aspected.rasi.lord;

            const effect = rasiOrLordMap[key];
            if (effect) {
                results.push({
                    description: {
                        english: `${aspected.name.english} in ${aspected.rasi.name.english} aspected by the ${aspecting.name.english}`,
                        hindi: `${aspected.rasi.name.hindi} राशि में ${aspected.name.hindi} पर ${aspecting.name.hindi} की दृष्टि`,
                    },
                    effect,
                });
            }
        }
    }

    return results;
}
