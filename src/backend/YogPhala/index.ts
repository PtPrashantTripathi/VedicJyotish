import type { Planet, PlanetEn } from "src/backend/constants/Planet";
import type { Translation } from "src/backend/types";
import { getBhriguSamhitaPlanetRasiHouseYogPhala } from "src/backend/YogPhala/BhriguSamhita/getPlanetRasiHouseEffects";
import { getBPHSLordshipYogPhala } from "src/backend/YogPhala/BPHS/getLordship";
import { getBPHSUpagrahaAndKalavelaHouseEffectsYogPhala } from "src/backend/YogPhala/BPHS/getUpagrahaAndKalavelaHouseEffects";
import { getBrihatJatakaMoonNakshatraEffectYogPhala } from "src/backend/YogPhala/BrihatJataka/getMoonNakshatraEffect";
import { getPhalaDeepikaAscendantYogPhala } from "src/backend/YogPhala/PhalaDeepika/getAscendant";
import { getPhalaDeepikaPlanetHouseEffectsYogPhala } from "src/backend/YogPhala/PhalaDeepika/getPlanetHouseEffects";
import { getSaravaliAspectYogPhala } from "src/backend/YogPhala/Saravali/getAspect";
import { getSaravaliConjunctionYogPhala } from "src/backend/YogPhala/Saravali/getConjunction";
import { getSaravaliPlanetHouseYogPhala } from "src/backend/YogPhala/Saravali/getHousePosition";
import { getSaravaliLunarYogPhala } from "src/backend/YogPhala/Saravali/getLunar";
import { getSaravaliNabhasaYogPhala } from "src/backend/YogPhala/Saravali/getNabhasa";
import { getSaravaliRasiPositionYogPhala } from "src/backend/YogPhala/Saravali/getRasiPosition";

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
