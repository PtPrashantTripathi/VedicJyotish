export type LanguageTypes = "english" | "hindi";

/** Enumerates the source texts for astrological phala (results). */
export type SourceBookEn =
    | "BPHS"
    | "JatakaParijata"
    | "PhalaDeepika"
    | "BrihatJataka"
    | "Saravali"
    | "BhriguSamhita";

export interface Translation<EnglishType, HindiType> {
    english: EnglishType;
    hindi: HindiType;
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
