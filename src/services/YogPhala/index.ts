import type { Planet, PlanetEn } from "src/services/constants/Planet";
import type { Translation } from "src/services/types";
import { getBhriguSamhitaPlanetRasiHouseYogPhala } from "src/services/YogPhala/BhriguSamhita/getPlanetRasiHouseEffects";
import { getBPHSLordshipYogPhala } from "src/services/YogPhala/BPHS/getLordship";
import { getBPHSUpagrahaAndKalavelaHouseEffectsYogPhala } from "src/services/YogPhala/BPHS/getUpagrahaAndKalavelaHouseEffects";
import { getBrihatJatakaMoonNakshatraEffectYogPhala } from "src/services/YogPhala/BrihatJataka/getMoonNakshatraEffect";
import { getPhalaDeepikaAscendantYogPhala } from "src/services/YogPhala/PhalaDeepika/getAscendant";
import { getPhalaDeepikaPlanetHouseEffectsYogPhala } from "src/services/YogPhala/PhalaDeepika/getPlanetHouseEffects";
import { getSaravaliAspectYogPhala } from "src/services/YogPhala/Saravali/getAspect";
import { getSaravaliConjunctionYogPhala } from "src/services/YogPhala/Saravali/getConjunction";
import { getSaravaliPlanetHouseYogPhala } from "src/services/YogPhala/Saravali/getHousePosition";
import { getSaravaliLunarYogPhala } from "src/services/YogPhala/Saravali/getLunar";
import { getSaravaliNabhasaYogPhala } from "src/services/YogPhala/Saravali/getNabhasa";
import { getSaravaliRasiPositionYogPhala } from "src/services/YogPhala/Saravali/getRasiPosition";

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
