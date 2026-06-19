import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/backend/services/constants/Planet";
import type { RasiEn } from "src/backend/services/constants/Rasi";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Retrieves rasi effect descriptions for each planet based on its current rasi
 * position.
 */
export function getSaravaliRasiPositionYogPhala(
    planetaryPositions: Record<PlanetEn, Planet>
): Phala[] {
    const table = getPhalDb()?.saravali_rasi_position as
        | Record<
              SaptagrahaEn,
              Record<RasiEn, { english: string; hindi: string }>
          >
        | undefined;
    if (!table) return [];

    return Object.entries(table).map(([planetName, rasiEffectMap]) => {
        const planet = planetaryPositions[planetName as SaptagrahaEn];
        return {
            description: {
                english: `${planet.name.english} in the ${planet.rasi.name.english} Rasi`,
                hindi: `${planet.name.hindi} ${planet.rasi.name.hindi} राशि में`,
            },
            effect: rasiEffectMap[planet.rasi.name.english as RasiEn] ?? {
                english: "",
                hindi: "",
            },
        };
    });
}
