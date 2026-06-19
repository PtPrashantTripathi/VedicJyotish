import type { Planet, PlanetEn } from "src/backend/services/constants/Planet";
import type { Translation } from "src/backend/services/types";
import { getBhriguSamhitaPlanetRasiHouseYogPhala } from "src/backend/services/YogPhala/BhriguSamhita/getPlanetRasiHouseEffects";
import { getBPHSLordshipYogPhala } from "src/backend/services/YogPhala/BPHS/getLordship";
import { getBPHSUpagrahaAndKalavelaHouseEffectsYogPhala } from "src/backend/services/YogPhala/BPHS/getUpagrahaAndKalavelaHouseEffects";
import { getBrihatJatakaMoonNakshatraEffectYogPhala } from "src/backend/services/YogPhala/BrihatJataka/getMoonNakshatraEffect";
import { getPhalaDeepikaAscendantYogPhala } from "src/backend/services/YogPhala/PhalaDeepika/getAscendant";
import { getPhalaDeepikaPlanetHouseEffectsYogPhala } from "src/backend/services/YogPhala/PhalaDeepika/getPlanetHouseEffects";
import { getSaravaliAspectYogPhala } from "src/backend/services/YogPhala/Saravali/getAspect";
import { getSaravaliConjunctionYogPhala } from "src/backend/services/YogPhala/Saravali/getConjunction";
import { getSaravaliPlanetHouseYogPhala } from "src/backend/services/YogPhala/Saravali/getHousePosition";
import { getSaravaliLunarYogPhala } from "src/backend/services/YogPhala/Saravali/getLunar";
import { getSaravaliNabhasaYogPhala } from "src/backend/services/YogPhala/Saravali/getNabhasa";
import { getSaravaliRasiPositionYogPhala } from "src/backend/services/YogPhala/Saravali/getRasiPosition";

export interface Phala {
    description: Translation<string, string>;
    effect: Translation<string, string>;
}

export function calcYogPhala(
    planets: Record<PlanetEn, Planet>
): Record<string, Phala[]> {
    return {
        "Ascendant (PhalaDeepika)": [getPhalaDeepikaAscendantYogPhala(planets)],
        "HousePosition (PhalaDeepika)":
            getPhalaDeepikaPlanetHouseEffectsYogPhala(planets),
        "NakshatraPosition {BrihatJataka}": [
            getBrihatJatakaMoonNakshatraEffectYogPhala(planets),
        ],
        "Lordship (BPHS)": getBPHSLordshipYogPhala(planets),
        "UpagrahasAndKalavelas (BPHS)":
            getBPHSUpagrahaAndKalavelaHouseEffectsYogPhala(planets),
        "PlanetRasiHouse {BhriguSamhita}":
            getBhriguSamhitaPlanetRasiHouseYogPhala(planets),
        "Aspect (Saravali)": getSaravaliAspectYogPhala(planets),
        "Conjunction (Saravali)": getSaravaliConjunctionYogPhala(planets),
        "HousePosition (Saravali)": getSaravaliPlanetHouseYogPhala(planets),
        "Lunar (Saravali)": getSaravaliLunarYogPhala(planets),
        "Nabhasa (Saravali)": getSaravaliNabhasaYogPhala(planets),
        "RasiPosition (Saravali)": getSaravaliRasiPositionYogPhala(planets),
    };
}
