import { type SeasonDetail, Seasons } from "src/backend/Season";
import type { Translation } from "src/backend/types";

export type MaahaEn =
    | "Chhaitra"
    | "Vaishakha"
    | "Jyeshtha"
    | "Ashadha"
    | "Shravana"
    | "Bhadrapada"
    | "Ashwin"
    | "Kartika"
    | "Margashirsha"
    | "Pausha"
    | "Magha"
    | "Phalguna";

export type MaahaHi =
    | "चैत्र"
    | "वैशाख"
    | "ज्येष्ठ"
    | "आषाढ"
    | "श्रावण"
    | "भाद्रपद"
    | "आश्विन"
    | "कार्तिक"
    | "मार्गशीर्ष"
    | "पौष"
    | "माघ"
    | "फाल्गुन";

export interface MaahaDetail {
    name: Translation<MaahaEn, MaahaHi>;
    num: number;
    season: SeasonDetail;
}

export const MaahaDetails: Record<MaahaEn, MaahaDetail> = {
    Chhaitra: {
        name: { english: "Chhaitra", hindi: "चैत्र" },
        num: 1,
        season: Seasons.Vasant, // वसन्त ऋतु
    },
    Vaishakha: {
        name: { english: "Vaishakha", hindi: "वैशाख" },
        num: 2,
        season: Seasons.Vasant, // वसन्त ऋतु
    },
    Jyeshtha: {
        name: { english: "Jyeshtha", hindi: "ज्येष्ठ" },
        num: 3,
        season: Seasons.Grishma, // ग्रीष्म ऋतु
    },
    Ashadha: {
        name: { english: "Ashadha", hindi: "आषाढ" },
        num: 4,
        season: Seasons.Grishma, // ग्रीष्म ऋतु
    },
    Shravana: {
        name: { english: "Shravana", hindi: "श्रावण" },
        num: 5,
        season: Seasons.Varsha, // वर्षा ऋतु
    },
    Bhadrapada: {
        name: { english: "Bhadrapada", hindi: "भाद्रपद" },
        num: 6,
        season: Seasons.Varsha, // वर्षा ऋतु
    },
    Ashwin: {
        name: { english: "Ashwin", hindi: "आश्विन" },
        num: 7,
        season: Seasons.Sharad, // शरद् ऋतु
    },
    Kartika: {
        name: { english: "Kartika", hindi: "कार्तिक" },
        num: 8,
        season: Seasons.Sharad, // शरद् ऋतु
    },
    Margashirsha: {
        name: { english: "Margashirsha", hindi: "मार्गशीर्ष" },
        num: 9,
        season: Seasons.Hemant, // हेमन्त ऋतु
    },
    Pausha: {
        name: { english: "Pausha", hindi: "पौष" },
        num: 10,
        season: Seasons.Hemant, // हेमन्त ऋतु
    },
    Magha: {
        name: { english: "Magha", hindi: "माघ" },
        num: 11,
        season: Seasons.Shishir, // शिशिर ऋतु
    },
    Phalguna: {
        name: { english: "Phalguna", hindi: "फाल्गुन" },
        num: 12,
        season: Seasons.Shishir, // शिशिर ऋतु
    },
};
