import {
    getHouse,
    type HouseDetail,
    type HouseNumber,
} from "src/services/constants/Houses";
import { getNakshatra, type Nakshatra } from "src/services/constants/Nakshatra";
import {
    getRasi,
    type Rasi,
    type RasiEn,
    type RasiNumber,
} from "src/services/constants/Rasi";
import type { DayEn } from "src/services/constants/Varas";
import type { Translation } from "src/services/types";
import { MOD360, NORMALIZE12 } from "src/services/utils";

/** TYPE DEFINITIONS */

/** Ascendant (Lagna) at the time of birth. */
export type AscendantEn = "Ascendant";
export type AscendantHi = "लग्न";

/** Core 7 Planets (Satyagraha). */
export type SaptagrahaEn =
    | "Sun"
    | "Moon"
    | "Mars"
    | "Mercury"
    | "Jupiter"
    | "Venus"
    | "Saturn";

export type SaptagrahaHi =
    | "सूर्य"
    | "चंद्र"
    | "मंगल"
    | "बुध"
    | "गुरु"
    | "शुक्र"
    | "शनि";

/** "Chhaya" = shadow planets (lunar nodes, Rahu & Ketu). */
export type ChhayagrahaEn = "Rahu" | "Ketu";
export type ChhayagrahaHi = "राहु" | "केतु";

/** Core 9 Planets (Navagraha) - English. */
export type NavagrahaEn = SaptagrahaEn | ChhayagrahaEn;
/** Core 9 Planets (Navagraha) - Hindi. */
export type NavagrahaHi = SaptagrahaHi | ChhayagrahaHi;

/** Outer planets beyond Saturn (Bahyagrahas). */
export type BahyagrahaEn = "Uranus" | "Neptune" | "Pluto";
export type BahyagrahaHi = "अरुण" | "वरुण" | "यम";

/** Minor shadow Planets (Upagrahas). */
export type UpagrahaEn =
    | "Dhuma"
    | "Vyatipata"
    | "Parivesha"
    | "Chapa"
    | "Upaketu";
export type UpagrahaHi = "धूम" | "व्यतीपात" | "परिवेष" | "चाप" | "उपकेतु";

/** Time-based shadow periods (Kalavelas). */
export type KalavelasEn =
    | "Gulika"
    | "Kaala"
    | "Mrityu"
    | "Yamaghantaka"
    | "Ardhaprahara";
// "RahuKaal";
export type KalavelasHi = "गुलिक" | "काल" | "मृत्यु" | "यमघंटक" | "अर्धप्रहर";
// "राहुकाल";

/** A union of all possible planet types. */
export type PlanetEn =
    | AscendantEn
    | SaptagrahaEn
    | ChhayagrahaEn
    | BahyagrahaEn
    | UpagrahaEn
    | KalavelasEn;

export type PlanetHi =
    | AscendantHi
    | SaptagrahaHi
    | ChhayagrahaHi
    | BahyagrahaHi
    | UpagrahaHi
    | KalavelasHi;

/**
 * Defines the static attributes for a planet, such as its name, type, and
 * astrological properties.
 */
export interface PlanetDetail {
    name: Translation<PlanetEn, PlanetHi>;
    shortname?: Translation<string, string>;
    type:
        | "Ascendant"
        | "Saptagraha"
        | "Chhayagraha"
        | "Bahyagraha"
        | "Upagraha"
        | "Kalavelas";
    day?: DayEn;
    aspect?: HouseNumber[];
    happy_house?: HouseNumber[];
    sad_house?: HouseNumber[];
    friend?: SaptagrahaEn[];
    enemy?: SaptagrahaEn[];
    neutral?: SaptagrahaEn[];
    exaltation?: RasiEn;
    debilitation?: RasiEn;
    own_sign?: RasiEn[];
    symbol: string;
    color: string;
}

/**
 * # =============================================================================
 *
 * STATIC DATA: PLANET DETAILS These objects serve as the primary source of
 * truth for all planet attributes.
 */

const AscendantDetails: Record<AscendantEn, PlanetDetail> = {
    Ascendant: {
        name: { english: "Ascendant", hindi: "लग्न" },
        type: "Ascendant",
        color: "#1e90ff",
        symbol: "☉",
        shortname: { english: "Asc", hindi: "ल" },
    },
};

const SaptagrahaDetails: Record<
    SaptagrahaEn,
    {
        name: Translation<SaptagrahaEn, SaptagrahaHi>;
        shortname: Translation<string, string>;
        type: "Saptagraha";
        day: DayEn;
        aspect: HouseNumber[];
        happy_house: HouseNumber[];
        sad_house: HouseNumber[];
        friend: SaptagrahaEn[];
        enemy: SaptagrahaEn[];
        neutral: SaptagrahaEn[];
        exaltation: RasiEn;
        debilitation: RasiEn;
        /* Swakshetra */
        own_sign: RasiEn[];
        symbol: string;
        color: string;
    }
> = {
    Sun: {
        name: { english: "Sun", hindi: "सूर्य" },
        type: "Saptagraha",
        day: "Sunday",
        aspect: [7],
        happy_house: [1, 5, 9, 10],
        sad_house: [4, 6, 7, 8, 12],
        friend: ["Venus", "Mercury", "Saturn"],
        enemy: ["Jupiter", "Mars"],
        neutral: ["Moon"],
        symbol: "☼",
        color: "#f39c12",
        exaltation: "Aries",
        debilitation: "Libra",
        own_sign: ["Leo"],
        shortname: { english: "Su", hindi: "सू" },
    },
    Moon: {
        name: { english: "Moon", hindi: "चंद्र" },
        type: "Saptagraha",
        day: "Monday",
        aspect: [7],
        happy_house: [4, 7, 9, 11, 12],
        sad_house: [2, 3, 6, 8],
        friend: ["Sun", "Jupiter"],
        enemy: ["Venus"],
        neutral: ["Mercury", "Saturn", "Mars"],
        symbol: "☽",
        color: "#5dade2",
        exaltation: "Taurus",
        debilitation: "Scorpio",
        own_sign: ["Cancer"],
        shortname: { english: "Mo", hindi: "च" },
    },
    Mars: {
        name: { english: "Mars", hindi: "मंगल" },
        type: "Saptagraha",
        day: "Tuesday",
        aspect: [4, 7, 8],
        happy_house: [1, 3, 5, 8, 10, 11],
        sad_house: [2, 4, 6, 12],
        friend: ["Moon", "Jupiter"],
        enemy: ["Sun", "Venus", "Mercury"],
        neutral: ["Saturn"],
        symbol: "♂",
        color: "#e74c3c",
        exaltation: "Capricorn",
        debilitation: "Cancer",
        own_sign: ["Aries", "Scorpio"],
        shortname: { english: "Ma", hindi: "मं" },
    },
    Mercury: {
        name: { english: "Mercury", hindi: "बुध" },
        type: "Saptagraha",
        day: "Wednesday",
        aspect: [7],
        happy_house: [1, 3, 5, 6, 7, 10, 11],
        sad_house: [2, 4, 8, 9, 12],
        friend: ["Sun", "Venus", "Saturn"],
        enemy: ["Moon"],
        neutral: ["Jupiter", "Mars"],
        symbol: "☿",
        color: "#27ae60",
        exaltation: "Virgo",
        debilitation: "Pisces",
        own_sign: ["Gemini", "Virgo"],
        shortname: { english: "Me", hindi: "बु" },
    },
    Jupiter: {
        name: { english: "Jupiter", hindi: "गुरु" },
        type: "Saptagraha",
        day: "Thursday",
        aspect: [5, 7, 9],
        happy_house: [1, 4, 5, 7, 9, 10, 2, 11],
        sad_house: [2, 11],
        friend: ["Moon", "Mars"],
        enemy: ["Sun", "Venus"],
        neutral: ["Mercury", "Saturn"],
        symbol: "♃",
        color: "#b7950b",
        exaltation: "Cancer",
        debilitation: "Capricorn",
        own_sign: ["Sagittarius", "Pisces"],
        shortname: { english: "Ju", hindi: "गु" },
    },
    Venus: {
        name: { english: "Venus", hindi: "शुक्र" },
        type: "Saptagraha",
        day: "Friday",
        aspect: [7],
        happy_house: [1, 2, 4, 5, 7, 9, 11, 12],
        sad_house: [3, 6, 8, 10],
        friend: ["Sun", "Moon"],
        enemy: [],
        neutral: ["Mercury", "Saturn", "Jupiter", "Mars"],
        symbol: "♀",
        color: "#ff69b4",
        exaltation: "Pisces",
        debilitation: "Virgo",
        own_sign: ["Taurus", "Libra"],
        shortname: { english: "Ve", hindi: "शु" },
    },
    Saturn: {
        name: { english: "Saturn", hindi: "शनि" },
        type: "Saptagraha",
        day: "Saturday",
        aspect: [3, 7, 10],
        happy_house: [3, 6, 7, 10, 11],
        sad_house: [4, 5, 8, 9, 12],
        friend: ["Sun", "Venus", "Mercury"],
        enemy: ["Moon", "Jupiter"],
        neutral: ["Mars"],
        symbol: "♄",
        color: "#5d6d7e",
        exaltation: "Libra",
        debilitation: "Aries",
        own_sign: ["Capricorn", "Aquarius"],
        shortname: { english: "Sa", hindi: "श" },
    },
};

const ChhayagrahaDetails: Record<
    ChhayagrahaEn,
    {
        name: Translation<ChhayagrahaEn, ChhayagrahaHi>;
        type: "Chhayagraha";
        aspect: HouseNumber[];
        happy_house: HouseNumber[];
        sad_house: HouseNumber[];
        exaltation: RasiEn;
        debilitation: RasiEn;
        shortname: Translation<string, string>;
        symbol: string;
        color: string;
    }
> = {
    Rahu: {
        name: { english: "Rahu", hindi: "राहु" },
        type: "Chhayagraha",
        aspect: [5, 7, 9],
        happy_house: [1, 2, 3, 5, 10, 11],
        sad_house: [4, 6, 7, 8, 9, 12],
        symbol: "☊",
        color: "#7f8c8d",
        exaltation: "Gemini",
        debilitation: "Sagittarius",
        shortname: { english: "Ra", hindi: "रा" },
    },
    Ketu: {
        name: { english: "Ketu", hindi: "केतु" },
        type: "Chhayagraha",
        aspect: [5, 7, 9],
        happy_house: [4, 6, 8, 9, 12],
        sad_house: [1, 2, 3, 5, 7, 10, 11],
        symbol: "☋",
        color: "#d35400",
        exaltation: "Sagittarius",
        debilitation: "Gemini",
        shortname: { english: "Ke", hindi: "के" },
    },
};

const BahyagrahaDetails: Record<
    BahyagrahaEn,
    {
        name: Translation<BahyagrahaEn, BahyagrahaHi>;
        type: "Bahyagraha";
        shortname: Translation<string, string>;
        symbol: string;
        color: string;
    }
> = {
    Uranus: {
        name: { english: "Uranus", hindi: "अरुण" },
        type: "Bahyagraha",
        symbol: "♅",
        color: "#00bcd4",
        shortname: { english: "Ur", hindi: "अ" },
    },
    Neptune: {
        name: { english: "Neptune", hindi: "वरुण" },
        type: "Bahyagraha",
        symbol: "♆",
        color: "#3f51b5",
        shortname: { english: "Ne", hindi: "व" },
    },
    Pluto: {
        name: { english: "Pluto", hindi: "यम" },
        type: "Bahyagraha",
        symbol: "♇",
        color: "#9b59b6",
        shortname: { english: "Pl", hindi: "य" },
    },
};

const UpagrahaDetails: Record<
    UpagrahaEn,
    {
        name: Translation<UpagrahaEn, UpagrahaHi>;
        type: "Upagraha";
        exaltation: RasiEn;
        debilitation: RasiEn;
        own_sign: RasiEn[];
        symbol: string;
        color: string;
    }
> = {
    Dhuma: {
        name: { english: "Dhuma", hindi: "धूम" },
        type: "Upagraha",
        symbol: "☉",
        color: "#1e90ff",
        exaltation: "Leo",
        debilitation: "Aquarius",
        own_sign: ["Capricorn"],
    },
    Vyatipata: {
        name: { english: "Vyatipata", hindi: "व्यतीपात" },
        type: "Upagraha",
        symbol: "☉",
        color: "#1e90ff",
        exaltation: "Scorpio",
        debilitation: "Taurus",
        own_sign: ["Gemini"],
    },
    Parivesha: {
        name: { english: "Parivesha", hindi: "परिवेष" },
        type: "Upagraha",
        symbol: "☉",
        color: "#1e90ff",
        exaltation: "Gemini",
        debilitation: "Sagittarius",
        own_sign: ["Sagittarius"],
    },
    Chapa: {
        name: { english: "Chapa", hindi: "चाप" },
        type: "Upagraha",
        symbol: "☉",
        color: "#1e90ff",
        exaltation: "Sagittarius",
        debilitation: "Gemini",
        own_sign: ["Cancer"],
    },
    Upaketu: {
        name: { english: "Upaketu", hindi: "उपकेतु" },
        type: "Upagraha",
        symbol: "☉",
        color: "#1e90ff",
        exaltation: "Aquarius",
        debilitation: "Leo",
        own_sign: ["Cancer"],
    },
};

const KalavelasDetails: Record<
    KalavelasEn,
    {
        name: Translation<KalavelasEn, KalavelasHi>;
        type: "Kalavelas";
        own_sign: RasiEn[];
        symbol: string;
        color: string;
    }
> = {
    Gulika: {
        name: { english: "Gulika", hindi: "गुलिक" },
        type: "Kalavelas",
        symbol: "☉",
        color: "#1e90ff",
        own_sign: ["Aquarius"],
    },
    Kaala: {
        name: { english: "Kaala", hindi: "काल" },
        type: "Kalavelas",
        symbol: "☉",
        color: "#1e90ff",
        own_sign: ["Capricorn"],
    },
    Mrityu: {
        name: { english: "Mrityu", hindi: "मृत्यु" },
        type: "Kalavelas",
        symbol: "☉",
        color: "#1e90ff",
        own_sign: ["Scorpio"],
    },
    Yamaghantaka: {
        name: { english: "Yamaghantaka", hindi: "यमघंटक" },
        type: "Kalavelas",
        symbol: "☉",
        color: "#1e90ff",
        own_sign: ["Sagittarius"],
    },
    Ardhaprahara: {
        name: { english: "Ardhaprahara", hindi: "अर्धप्रहर" },
        type: "Kalavelas",
        symbol: "☉",
        color: "#1e90ff",
        own_sign: ["Gemini"],
    },
};

export const PlanetDetails: Record<PlanetEn, PlanetDetail> = {
    ...AscendantDetails,
    ...SaptagrahaDetails,
    ...ChhayagrahaDetails,
    ...BahyagrahaDetails,
    ...KalavelasDetails,
    ...UpagrahaDetails,
};

/**
 * Represents a celestial body (planet, ascendant, etc.) with its calculated
 * astrological attributes and static details.
 */
export class Planet implements PlanetDetail {
    // Calculated dynamic properties
    degree: number;
    rasi: Rasi;
    nakshatra: Nakshatra;
    motion: "Vakri" | "Margi";
    visibility: "Asta" | "Udaya";
    latitude: number;
    distance: number;
    speed: { longitude: number; latitude: number; distance: number };
    azimuth: number;
    altitude: { true: number; apparent: number };
    divisional: Record<string, Rasi>;
    house: HouseDetail;

    // Static PlanetDetail properties
    name!: Translation<PlanetEn, PlanetHi>;
    shortname?: Translation<string, string>;
    type!:
        | "Ascendant"
        | "Saptagraha"
        | "Chhayagraha"
        | "Bahyagraha"
        | "Upagraha"
        | "Kalavelas";

    day?: DayEn;
    aspect?: HouseNumber[];
    happy_house?: HouseNumber[];
    sad_house?: HouseNumber[];
    friend?: SaptagrahaEn[];
    enemy?: SaptagrahaEn[];
    neutral?: SaptagrahaEn[];
    exaltation?: RasiEn;
    debilitation?: RasiEn;
    own_sign?: RasiEn[];
    symbol!: string;
    color!: string;

    constructor(
        planetName: PlanetEn,
        vCoords: number[],
        hCoords: number[] = [],
        ascendant_rasi_num: RasiNumber = 1
    ) {
        // Assign all static properties directly from the data map.
        Object.assign(this, PlanetDetails[planetName]);

        // Calculate and assign dynamic properties from the coordinate data.
        this.degree = MOD360(vCoords[0] ?? 0);
        this.latitude = vCoords[1] ?? 0;
        this.distance = vCoords[2] ?? 0;
        this.speed = {
            longitude: vCoords[3] ?? 0,
            latitude: vCoords[4] ?? 0,
            distance: vCoords[5] ?? 0,
        };

        this.azimuth = hCoords[0] ?? 0;
        this.altitude = {
            true: hCoords[1] ?? 0,
            apparent: hCoords[2] ?? 0,
        };

        // Determine calculated astrological properties.
        this.rasi = getRasi(this.degree);
        this.nakshatra = getNakshatra(this.degree);
        this.visibility = this.azimuth < 0 ? "Asta" : "Udaya";
        this.motion = this.speed.longitude < 0 ? "Vakri" : "Margi";
        this.house = getHouse(this.rasi.rasi_num, ascendant_rasi_num);

        // Apply and calculate all divisional charts.
        this.divisional = {
            // D2 (Hora - Wealth and resources)
            hora: this.getDivChart(2),
            // D3 (Drekkana - Siblings, courage)
            drekkana: this.getDivChart(3),
            // D4 (Chaturthamsa - Property, fixed assets)
            chaturthamsa: this.getDivChart(4),
            // D5 (Panchamsa - Power, authority)
            panchamsa: this.getDivChart(5),
            // D6 (Shashtamsa - Diseases)
            shashtamsa: this.getDivChart(6),
            // D7 (Saptamsa - Children)
            saptamsa: this.getDivChart(7),
            // D8 (Ashtamsa - Longevity, struggles)
            ashtamsa: this.getDivChart(8),
            // D9 (Navamsa - Marriage, fortune, dharma)
            navamsa: this.getDivChart(9),
            // D10 (Dasamsa - Career)
            dasamsa: this.getDivChart(10),
            // D12 (Dvadasamsa - Parents)
            dvadasamsa: this.getDivChart(12),
            // D16 (Shodashamsa - Vehicles, luxuries)
            shodashamsa: this.getDivChart(16),
            // D20 (Vimshamsa - Spiritual progress)
            vimshamsa: this.getDivChart(20),
            // D24 (Siddhamsa/Chaturvimshamsa - Education, learning)
            siddhamsa: this.getDivChart(24),
            // D27 (Bhamsa/Nakshatramsa - Strength, vulnerability)
            bhamsa: this.getDivChart(27),
            // D30 (Trimsamsa - Evils, misfortunes)
            trimsamsa: this.getDivChart(30),
            // D40 (Khavedamsa - Maternal happiness)
            khavedamsa: this.getDivChart(40),
            // D45 (Akshavedamsa - Personality)
            akshavedamsa: this.getDivChart(45),
            // D60 (Shashtiamsa - Past life karmas)
            shashtiamsa: this.getDivChart(60),
        };
    }

    /**
     * Generic method to calculate a divisional chart (D-chart).
     *
     * @param {number} divisor - Number of divisions in chart (e.g., 9 for D9).
     * @returns {Rasi} - The resulting Rasi object for this divisional chart.
     */
    getDivChart(divisor: number): Rasi {
        // The correct logic is to multiply the planet's longitude by the divisor
        // and then find the Rasi for the resulting degree.
        const divisionalDegree = this.degree * divisor;
        return getRasi(divisionalDegree);
    }

    /**
     * Checks if a given planet (graha) has a drishti (aspect) on a target
     * planet.
     *
     * @param target - The planet to check whether it receives aspect from the
     *   graha.
     * @returns {boolean | number} - True if graha aspects the target, or the
     *   aspect distance if it exists. Returns `false` otherwise.
     */
    isAspecting(target: Planet): boolean | number {
        // Calculate the house distance between the two planets.
        const aspectDistance = NORMALIZE12(
            target.rasi.rasi_num + 1 - this.rasi.rasi_num
        );
        // Check if the calculated distance is in the list of this planet's aspects.
        const hasAspect = this.aspect?.includes(aspectDistance) ?? false;
        // Return the aspect distance or false.
        return hasAspect ? aspectDistance : false;
    }
}
