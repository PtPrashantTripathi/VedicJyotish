import type { HouseNumber } from "src/backend/services/constants/Houses";
import type {
    NavagrahaEn,
    Planet,
    PlanetEn,
} from "src/backend/services/constants/Planet";
import type { RasiEn } from "src/backend/services/constants/Rasi";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Returns a list of house position details for a given planet position map.
 */
export function getBhriguSamhitaPlanetRasiHouseYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala[] {
    const allEffects = getPhalDb()?.bhrigu_samhita_planet_rasi_house as
        | Record<
              RasiEn,
              Record<
                  NavagrahaEn,
                  Record<HouseNumber, { english: string; hindi: string }>
              >
          >
        | undefined;
    if (!allEffects) return [];

    const ascendantRasi = planetPositions.Ascendant.rasi.name;
    const ascendantHouseMap = allEffects[ascendantRasi.english];
    if (!ascendantHouseMap) return [];

    return Object.entries(ascendantHouseMap).map(
        ([planetName, planetEffects]) => {
            const planet = planetPositions[planetName as NavagrahaEn];

            return {
                description: {
                    english: `${ascendantRasi.english} ascendant, ${planet.name.english} in the ${planet.house.name.english} House in ${planet.rasi.name.english} Rasi`,
                    hindi: `${ascendantRasi.hindi} लग्न, ${planet.name.hindi} ${planet.house.name.hindi} भाव में, ${planet.rasi.name.hindi} राशि में`,
                },
                effect: planetEffects[planet.house.num] ?? {
                    english: "",
                    hindi: "",
                },
            };
        }
    );
}
