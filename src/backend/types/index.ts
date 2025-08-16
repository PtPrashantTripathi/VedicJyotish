import type { DateTime } from "luxon";

/** Ascendant (Lagna) at the time of birth. */
export type AscendantEn = "Ascendant";

export type AscendantHi = "लग्न";

/** Core 7 Planets */
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

/** Core 9 Planets (Navagrahas) - English. */
export type NavagrahaEn = SaptagrahaEn | ChhayagrahaEn;

/** Core 9 Planets (Navagrahas) - Hindi. */
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

export type KalavelasHi = "गुलिक" | "काल" | "मृत्यु" | "यमघंटक" | "अर्धप्रहर";

/* Planet with calculated attributes + detaildata */
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
    ownsign?: RasiEn[];
    symbol: string;
    color: string;
}

export type RasiEn =
    | "Aries"
    | "Taurus"
    | "Gemini"
    | "Cancer"
    | "Leo"
    | "Virgo"
    | "Libra"
    | "Scorpio"
    | "Sagittarius"
    | "Capricorn"
    | "Aquarius"
    | "Pisces";

export type RasiHi =
    | "मेष"
    | "वृषभ"
    | "मिथुन"
    | "कर्क"
    | "सिंह"
    | "कन्या"
    | "तुला"
    | "वृश्चिक"
    | "धनु"
    | "मकर"
    | "कुंभ"
    | "मीन";

export type ChoghadiyaEn =
    | "Udveg"
    | "Amrit"
    | "Rog"
    | "Labh"
    | "Shubh"
    | "Char"
    | "Kaal";

export type ChoghadiyaHi =
    | "उद्वेग"
    | "अमृत"
    | "रोग"
    | "लाभ"
    | "शुभ"
    | "चर"
    | "काल";

export type PurusharthaEn = "Dharma" | "Artha" | "Kama" | "Moksha";

export type HouseCategoriesEn =
    | "Kendra"
    | "Trikona"
    | "Dusthana"
    | "Upachaya"
    | "Maraka"
    | "Panaphara"
    | "Apoklima";

export type SamvatsaraEn =
    | "Prabhava"
    | "Vibhava"
    | "Shukla"
    | "Pramodadoota"
    | "Prajapati"
    | "Angirasa"
    | "Shrimukha"
    | "Bhava"
    | "Yuva"
    | "Dhatr"
    | "Isvara"
    | "Bahudhanya"
    | "Pramathi"
    | "Vikrama"
    | "Vrsapraja"
    | "Chitrabhanu"
    | "Svabhanu"
    | "Tarana"
    | "Parthiva"
    | "Vyaya"
    | "Sarvajit"
    | "Sarvadhari"
    | "Virodhi"
    | "Vikrti"
    | "Khara"
    | "Nandana"
    | "Vijaya"
    | "Jaya"
    | "Manmatha"
    | "Durmukha"
    | "Hevilambi"
    | "Vilambi"
    | "Vikari"
    | "Sharvari"
    | "Plava"
    | "Shubhakrt"
    | "Shobhakrt"
    | "Krodhi"
    | "Vishvavasu"
    | "Parabhava"
    | "Plavanga"
    | "Kilaka"
    | "Saumya"
    | "Sadharana"
    | "Virodhakrta"
    | "Paridhavi"
    | "Pramadi"
    | "Ananda"
    | "Raksasa"
    | "Nala"
    | "Pingala"
    | "Kalayukta"
    | "Siddharthi"
    | "Raudri"
    | "Durmati"
    | "Dundubhi"
    | "Rudhirodgari"
    | "Raktaksi"
    | "Krodhana"
    | "Akshaya";

export type EffectEn = "Good" | "Bad";

/* Classical elements */
export type ElementEn = "Fire" | "Earth" | "Air" | "Water";

/* Gender of Rasi */
export type GenderEn = "M" | "F";

/* Nature of sign */
export type NatureEn = "Movable" | "Fixed" | "Dual";

/* Zodiac index (1–12) */
export type RasiNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type HouseNumber = RasiNumber;

export type LanguageTypes = "english" | "hindi";

export interface Translation<EnglishType, HindiType> {
    english: EnglishType;
    hindi: HindiType;
}

/* Zodiac Sign Details */
export interface RasiDetail {
    rasi_num: RasiNumber;
    name: Translation<RasiEn, RasiHi>;
    lord: SaptagrahaEn;
    element: ElementEn;
    gender: GenderEn;
    nature: NatureEn;
    symbol: string;
    color: string;
}

/* RangeType of degrees */
export interface RangeType {
    start: number;
    end: number;
}

/* Degree + NameType context */
export interface CalculatedDetail {
    degree: number;
    range: RangeType;
}

/* Computed Rasi/Nakshatra details */
export type Rasi = RasiDetail & CalculatedDetail;

export interface ChoghadiyaDetail {
    name: Translation<ChoghadiyaEn, string>;
    lord: SaptagrahaEn;
    meaning: string;
    effect: EffectEn;
}

export interface IDMS {
    degree: number;
    minute: number;
    second: number;
    toDegree: () => number;
    toString: () => string;
}

/* Date and Time structure */
export interface HMS {
    hour: number;
    minute: number;
    second: number;
}

export interface DateType {
    year: number;
    month: number;
    day: number;
}

export interface DateTimeType extends DateType, HMS {
    millisecond: number;
    timezone_offset: number;
}

export interface HouseDetail {
    num: HouseNumber;
    name: Translation<string, string>;
    categories: HouseCategoriesEn[];
    purushartha: PurusharthaEn;
    karak: NavagrahaEn[];
}

export interface SamvatsaraDetail {
    name: Translation<SamvatsaraEn, string>;
    num: number;
}

export type SourceBookEn =
    | "BPHS"
    | "JatakaParijata"
    | "PhalaDeepika"
    | "BrihatJataka"
    | "Saravali"
    | "BhriguSamhita";

export interface Phala {
    description: Translation<string, string>;
    effect: Translation<string, string>;
}

export type DashaPhal = Partial<
    Record<SourceBookEn, Translation<string, string>>
>;

export type DashaName =
    | "MahaDasha"
    | "AntarDasha"
    | "PratyantarDasha"
    | "SookshmaDasha"
    | "PraanaDasha"
    | "DehaDasha";

export interface Dasha {
    Name: DashaName;
    Lord: NavagrahaEn;
    StartDate: DateTime;
    EndDate: DateTime;
    Phal: DashaPhal;
    ChildDasha: Dasha[];
}
