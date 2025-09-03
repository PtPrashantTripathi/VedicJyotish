import type { Translation } from "src/services/types";

// Type Definitions

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

export type SamvatsaraHi =
    | "प्रभव"
    | "विभव"
    | "शुक्ल"
    | "प्रमोदूत"
    | "प्रजापति"
    | "अंगिरस"
    | "श्रीमुख"
    | "भाव"
    | "युव"
    | "धातृ"
    | "ईश्वर"
    | "बहुधान्य"
    | "प्रमाथी"
    | "विक्रम"
    | "वृषप्रजा"
    | "चित्रभानु"
    | "स्वभानु"
    | "तारण"
    | "पार्थिव"
    | "अव्यय"
    | "सर्वजित्"
    | "सर्वधारी"
    | "विरोधी"
    | "विकृति"
    | "खर"
    | "नन्दन"
    | "विजय"
    | "जय"
    | "मन्मथ"
    | "दुर्मुख"
    | "हेविळम्बि"
    | "विळम्बि"
    | "विकारि"
    | "शार्वरी"
    | "प्लव"
    | "शुभकृत्"
    | "शोभकृत्"
    | "क्रोधी"
    | "विश्वावसु"
    | "पराभव"
    | "प्लवङ्ग"
    | "कीलक"
    | "सौम्य"
    | "साधारण"
    | "विरोधकृत"
    | "परिधावी"
    | "प्रमादी"
    | "आनंद"
    | "राक्षस"
    | "नल"
    | "पिंगल"
    | "कालयुक्त"
    | "सिद्धार्थी"
    | "रौद्र"
    | "दुर्मति"
    | "दुन्दुभी"
    | "रूधिरोद्गारी"
    | "रक्ताक्षि"
    | "क्रोधन"
    | "अक्षय";

/** A number representing a Samvatsara, from 1 to 60. */
export type SamvatsaraNumber = number;

/** Static details of a Samvatsara (Jovian Year). */
export interface SamvatsaraDetail {
    name: Translation<SamvatsaraEn, SamvatsaraHi>;
    num: SamvatsaraNumber;
}

// Data: Source of Truth for Samvatsara Details

/**
 * A comprehensive dictionary containing details for each of the 60 Samvatsara.
 * This serves as the primary source of truth.
 *
 * @type {Record<SamvatsaraEn, SamvatsaraDetail>}
 */
export const SamvatsaraDetails: Record<SamvatsaraEn, SamvatsaraDetail> = {
    Prabhava: { name: { hindi: "प्रभव", english: "Prabhava" }, num: 1 },
    Vibhava: { name: { hindi: "विभव", english: "Vibhava" }, num: 2 },
    Shukla: { name: { hindi: "शुक्ल", english: "Shukla" }, num: 3 },
    Pramodadoota: {
        name: { hindi: "प्रमोदूत", english: "Pramodadoota" },
        num: 4,
    },
    Prajapati: { name: { hindi: "प्रजापति", english: "Prajapati" }, num: 5 },
    Angirasa: { name: { hindi: "अंगिरस", english: "Angirasa" }, num: 6 },
    Shrimukha: { name: { hindi: "श्रीमुख", english: "Shrimukha" }, num: 7 },
    Bhava: { name: { hindi: "भाव", english: "Bhava" }, num: 8 },
    Yuva: { name: { hindi: "युव", english: "Yuva" }, num: 9 },
    Dhatr: { name: { hindi: "धातृ", english: "Dhatr" }, num: 10 },
    Isvara: { name: { hindi: "ईश्वर", english: "Isvara" }, num: 11 },
    Bahudhanya: { name: { hindi: "बहुधान्य", english: "Bahudhanya" }, num: 12 },
    Pramathi: { name: { hindi: "प्रमाथी", english: "Pramathi" }, num: 13 },
    Vikrama: { name: { hindi: "विक्रम", english: "Vikrama" }, num: 14 },
    Vrsapraja: { name: { hindi: "वृषप्रजा", english: "Vrsapraja" }, num: 15 },
    Chitrabhanu: {
        name: { hindi: "चित्रभानु", english: "Chitrabhanu" },
        num: 16,
    },
    Svabhanu: { name: { hindi: "स्वभानु", english: "Svabhanu" }, num: 17 },
    Tarana: { name: { hindi: "तारण", english: "Tarana" }, num: 18 },
    Parthiva: { name: { hindi: "पार्थिव", english: "Parthiva" }, num: 19 },
    Vyaya: { name: { hindi: "अव्यय", english: "Vyaya" }, num: 20 },
    Sarvajit: { name: { hindi: "सर्वजित्", english: "Sarvajit" }, num: 21 },
    Sarvadhari: { name: { hindi: "सर्वधारी", english: "Sarvadhari" }, num: 22 },
    Virodhi: { name: { hindi: "विरोधी", english: "Virodhi" }, num: 23 },
    Vikrti: { name: { hindi: "विकृति", english: "Vikrti" }, num: 24 },
    Khara: { name: { hindi: "खर", english: "Khara" }, num: 25 },
    Nandana: { name: { hindi: "नन्दन", english: "Nandana" }, num: 26 },
    Vijaya: { name: { hindi: "विजय", english: "Vijaya" }, num: 27 },
    Jaya: { name: { hindi: "जय", english: "Jaya" }, num: 28 },
    Manmatha: { name: { hindi: "मन्मथ", english: "Manmatha" }, num: 29 },
    Durmukha: { name: { hindi: "दुर्मुख", english: "Durmukha" }, num: 30 },
    Hevilambi: { name: { hindi: "हेविळम्बि", english: "Hevilambi" }, num: 31 },
    Vilambi: { name: { hindi: "विळम्बि", english: "Vilambi" }, num: 32 },
    Vikari: { name: { hindi: "विकारि", english: "Vikari" }, num: 33 },
    Sharvari: { name: { hindi: "शार्वरी", english: "Sharvari" }, num: 34 },
    Plava: { name: { hindi: "प्लव", english: "Plava" }, num: 35 },
    Shubhakrt: { name: { hindi: "शुभकृत्", english: "Shubhakrt" }, num: 36 },
    Shobhakrt: { name: { hindi: "शोभकृत्", english: "Shobhakrt" }, num: 37 },
    Krodhi: { name: { hindi: "क्रोधी", english: "Krodhi" }, num: 38 },
    Vishvavasu: {
        name: { hindi: "विश्वावसु", english: "Vishvavasu" },
        num: 39,
    },
    Parabhava: { name: { hindi: "पराभव", english: "Parabhava" }, num: 40 },
    Plavanga: { name: { hindi: "प्लवङ्ग", english: "Plavanga" }, num: 41 },
    Kilaka: { name: { hindi: "कीलक", english: "Kilaka" }, num: 42 },
    Saumya: { name: { hindi: "सौम्य", english: "Saumya" }, num: 43 },
    Sadharana: { name: { hindi: "साधारण", english: "Sadharana" }, num: 44 },
    Virodhakrta: {
        name: { hindi: "विरोधकृत", english: "Virodhakrta" },
        num: 45,
    },
    Paridhavi: { name: { hindi: "परिधावी", english: "Paridhavi" }, num: 46 },
    Pramadi: { name: { hindi: "प्रमादी", english: "Pramadi" }, num: 47 },
    Ananda: { name: { hindi: "आनंद", english: "Ananda" }, num: 48 },
    Raksasa: { name: { hindi: "राक्षस", english: "Raksasa" }, num: 49 },
    Nala: { name: { hindi: "नल", english: "Nala" }, num: 50 },
    Pingala: { name: { hindi: "पिंगल", english: "Pingala" }, num: 51 },
    Kalayukta: { name: { hindi: "कालयुक्त", english: "Kalayukta" }, num: 52 },
    Siddharthi: {
        name: { hindi: "सिद्धार्थी", english: "Siddharthi" },
        num: 53,
    },
    Raudri: { name: { hindi: "रौद्र", english: "Raudri" }, num: 54 },
    Durmati: { name: { hindi: "दुर्मति", english: "Durmati" }, num: 55 },
    Dundubhi: { name: { hindi: "दुन्दुभी", english: "Dundubhi" }, num: 56 },
    Rudhirodgari: {
        name: { hindi: "रूधिरोद्गारी", english: "Rudhirodgari" },
        num: 57,
    },
    Raktaksi: { name: { hindi: "रक्ताक्षि", english: "Raktaksi" }, num: 58 },
    Krodhana: { name: { hindi: "क्रोधन", english: "Krodhana" }, num: 59 },
    Akshaya: { name: { hindi: "अक्षय", english: "Akshaya" }, num: 60 },
};

// Optimized Data Structure for Fast Lookups

/**
 * An indexed array of Samvatsara details for O(1) lookup time. It is generated
 * once from the `SamvatsaraDetails` object and sorted by `num`. The array is
 * 0-indexed, so we access it with `samvatsara_num - 1`.
 *
 * @type {SamvatsaraDetail[]}
 */
const SamvatsaraDetailsByIndex: SamvatsaraDetail[] = Object.values(
    SamvatsaraDetails
).sort((a, b) => a.num - b.num);

// Core Calculation Function

/**
 * Retrieves the details of a Samvatsara (Jovian year) based on its number.
 *
 * @param {SamvatsaraNumber} samvatsara_num - The number of the Samvatsara
 *   (1-60).
 * @returns {SamvatsaraDetail} A full Samvatsara object containing its details.
 * @throws {Error} If the samvatsara_num is out of the valid range (1-60).
 */
export function getSamvatsara(
    samvatsara_num: SamvatsaraNumber
): SamvatsaraDetail {
    // 1. Perform a bounds check to ensure the number is valid.
    if (samvatsara_num < 1 || samvatsara_num > 60) {
        throw new Error(
            `Invalid Samvatsara number: ${samvatsara_num}. Number must be between 1 and 60.`
        );
    }

    // 2. Retrieve Samvatsara details using a direct O(1) array lookup.
    const details = SamvatsaraDetailsByIndex[samvatsara_num - 1];

    if (!details) {
        throw new Error(
            `Could not find Samvatsara details for number: ${samvatsara_num}.`
        );
    }

    // 3. Return the found details.
    return details;
}
