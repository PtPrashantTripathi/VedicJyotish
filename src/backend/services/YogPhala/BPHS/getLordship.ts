import { HouseDetails, type HouseNumber } from "src/backend/services/constants/Houses";
import type { Planet, PlanetEn } from "src/backend/services/constants/Planet";
import { RasiDetails } from "src/backend/services/constants/Rasi";
import { getPhalDb } from "src/backend/services/phalLoader";
import { reorderArray } from "src/backend/services/utils";
import type { Phala } from "src/backend/services/YogPhala";

/**
 * Get the BPHS (Brihat Parashara Hora Shastra) phala for each house lord's
 * placement in the horoscope.
 */
export function getBPHSLordshipYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala[] {
    const effectTable = getPhalDb()?.bphs_lordship as
        | Record<
              HouseNumber,
              Record<HouseNumber, { english: string; hindi: string }>
          >
        | undefined;
    if (!effectTable) return [];

    const reorderedRashiNames = reorderArray(
        Object.values(RasiDetails).map(rasi => rasi.name.english),
        planetPositions.Ascendant.rasi.name.english
    );

    const getLordHouseNumber = (houseNumber: HouseNumber): HouseNumber => {
        const rashiNameForHouse = reorderedRashiNames[houseNumber - 1];
        const lordPlanetKey = RasiDetails[rashiNameForHouse].lord;
        return planetPositions[lordPlanetKey].house.num;
    };

    return Array.from({ length: 12 }, (_, index) => {
        const currentHouseNumber = (index + 1) as HouseNumber;
        const rashiNameForCurrentHouse = reorderedRashiNames[index];
        const lordPlacementHouseNumber = getLordHouseNumber(currentHouseNumber);

        return {
            description: {
                english: `Lord of ${HouseDetails[currentHouseNumber].name.english} House (${rashiNameForCurrentHouse}) in ${HouseDetails[lordPlacementHouseNumber].name.english} House`,
                hindi: `${HouseDetails[currentHouseNumber].name.hindi} भाव का स्वामी (${rashiNameForCurrentHouse}) ${HouseDetails[lordPlacementHouseNumber].name.hindi} भाव में`,
            },
            effect: effectTable[currentHouseNumber]?.[
                lordPlacementHouseNumber
            ] ?? { english: "", hindi: "" },
        };
    });
}
