import type { HouseNumber } from "src/backend/services/constants/Houses";
import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/backend/services/constants/Planet";
import { getPhalDb } from "src/backend/services/phalLoader";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Retrieves house effect descriptions for each planet based on its current
 * house position.
 */
export function getSaravaliPlanetHouseYogPhala(
    planetaryPositions: Record<PlanetEn, Planet>
): Phala[] {
    const table = getPhalDb()?.saravali_house_position as
        | Record<
              SaptagrahaEn,
              Record<HouseNumber, { english: string; hindi: string }>
          >
        | undefined;
    if (!table) return [];

    return Object.entries(table).map(([grahaName, houseEffectMap]) => {
        const grahaData = planetaryPositions[grahaName as SaptagrahaEn];
        const { english: houseEnglish, hindi: houseHindi } =
            grahaData.house.name;

        return {
            description: {
                english: `${grahaName} in the ${houseEnglish} House`,
                hindi: `${grahaName} ${houseHindi} भाव में`,
            },
            effect: houseEffectMap[grahaData.house.num] ?? {
                english: "",
                hindi: "",
            },
        };
    });
}
