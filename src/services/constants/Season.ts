// Season type in English
export type SeasonEn =
    | "Vasant"
    | "Grishma"
    | "Varsha"
    | "Sharad"
    | "Hemant"
    | "Shishir";

// Season type in Hindi
export type SeasonHi =
    | "वसन्त"
    | "ग्रीष्म"
    | "वर्षा"
    | "शरद्"
    | "हेमन्त"
    | "शिशिर";

// Season detail type
export interface SeasonDetail {
    english: SeasonEn;
    hindi: SeasonHi;
}

// Mapping of all possible seasons
export const Seasons: Record<SeasonEn, SeasonDetail> = {
    Vasant: { english: "Vasant", hindi: "वसन्त" },
    Grishma: { english: "Grishma", hindi: "ग्रीष्म" },
    Varsha: { english: "Varsha", hindi: "वर्षा" },
    Sharad: { english: "Sharad", hindi: "शरद्" },
    Hemant: { english: "Hemant", hindi: "हेमन्त" },
    Shishir: { english: "Shishir", hindi: "शिशिर" },
};
