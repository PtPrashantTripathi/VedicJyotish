import { useSessionContext } from "src/contexts/SessionContext";

type LangKey = "en" | "hi";

const T = {
    // ----- Navigation -----
    home:              { en: "Home",             hi: "मुख्य" },
    dailyPanchang:     { en: "Daily Panchang",   hi: "दैनिक पंचांग" },
    monthlyCalendar:   { en: "Monthly Calendar", hi: "मासिक कैलेंडर" },
    generateKundli:    { en: "Generate Kundli",  hi: "कुंडली बनाएं" },
    kundliMatching:    { en: "Kundli Matching",  hi: "कुंडली मिलान" },
    settings:          { en: "Settings",         hi: "सेटिंग्स" },
    about:             { en: "About",            hi: "हमारे बारे में" },

    // ----- Common -----
    save:              { en: "Save",             hi: "सहेजें" },
    reset:             { en: "Reset",            hi: "रीसेट" },
    back:              { en: "Back",             hi: "वापस" },
    loading:           { en: "Loading…",         hi: "लोड हो रहा है…" },
    calculate:         { en: "Calculate",        hi: "गणना करें" },
    male:              { en: "Male",             hi: "पुरुष" },
    female:            { en: "Female",           hi: "महिला" },
    yes:               { en: "Yes",              hi: "हाँ" },
    no:                { en: "No",               hi: "नहीं" },

    // ----- KundliForm -----
    enterBirthData:    { en: "Enter Birth Data",          hi: "जन्म विवरण दर्ज करें" },
    birthDataSubtitle: { en: "Birth details for Kundli",  hi: "कुंडली के लिए जन्म विवरण" },
    fullName:          { en: "Full Name",                 hi: "पूरा नाम" },
    dateOfBirth:       { en: "Date of Birth",             hi: "जन्म तिथि" },
    timeOfBirth:       { en: "Time of Birth",             hi: "जन्म समय" },
    placeOfBirth:      { en: "Place of Birth",            hi: "जन्म स्थान" },
    gender:            { en: "Gender",                    hi: "लिंग" },
    advancedOptions:   { en: "Advanced Options",          hi: "उन्नत विकल्प" },
    timezone:          { en: "TimeZone",                  hi: "समय क्षेत्र" },
    latitude:          { en: "Latitude",                  hi: "अक्षांश" },
    longitude:         { en: "Longitude",                 hi: "देशांतर" },
    cityTip:           { en: "Type city name in English and choose from the list.", hi: "अंग्रेज़ी में शहर का नाम टाइप करें और सूची से चुनें।" },
    cityTip2:          { en: "If not found, pick the nearest major city.", hi: "नहीं मिला तो निकटतम प्रमुख शहर चुनें।" },
    cityTip3:          { en: "Select city to auto-fill timezone and coordinates.", hi: "टाइमज़ोन और निर्देशांक स्वतः भरने के लिए शहर चुनें।" },

    // ----- KundliResult tabs -----
    overview:          { en: "Overview",         hi: "सिंहावलोकन" },
    divisionalCharts:  { en: "Divisional Charts",hi: "विभागीय चार्ट" },
    yogaAnalysis:      { en: "Yoga Analysis",    hi: "योग विश्लेषण" },
    dasaAnalysis:      { en: "Dasa Analysis",    hi: "दशा विश्लेषण" },

    // ----- Panchang tabs -----
    panchangOverview:  { en: "Overview",         hi: "पंचांग" },
    timings:           { en: "Timings",          hi: "शुभ समय" },
    planetary:         { en: "Planetary",        hi: "ग्रह स्थिति" },
    muhurat:           { en: "Muhurat",          hi: "मुहूर्त" },

    // ----- KundliMatching -----
    maleDetails:       { en: "Groom Details",    hi: "वर का विवरण" },
    femaleDetails:     { en: "Bride Details",    hi: "वधू का विवरण" },
    checkCompatibility:{ en: "Check Compatibility", hi: "कुंडली मिलान करें" },
    compatibilityResult:{ en: "Compatibility Result", hi: "मिलान परिणाम" },
    totalScore:        { en: "Total Score",      hi: "कुल अंक" },
    outOf36:           { en: "out of 36",        hi: "/ 36 में से" },

    // ----- Settings -----
    locationSettings:  { en: "Location Settings",    hi: "स्थान सेटिंग्स" },
    languageDisplay:   { en: "Language & Display",   hi: "भाषा और प्रदर्शन" },
    calcSettings:      { en: "Calculation Settings", hi: "गणना सेटिंग्स" },
    saveSettings:      { en: "Save Settings",        hi: "सेटिंग्स सहेजें" },
    dangerZone:        { en: "Danger Zone",           hi: "खतरा क्षेत्र" },
    resetDefault:      { en: "Reset to Default",     hi: "डिफ़ॉल्ट पर रीसेट करें" },
    language:          { en: "Language",              hi: "भाषा" },
    chooseAyanamsa:    { en: "Choose Ayanamsa",       hi: "अयनांश चुनें" },
    houseSystem:       { en: "House System",          hi: "भाव पद्धति" },
} as const;

export type I18nKey = keyof typeof T;

export function useLang() {
    const session = useSessionContext();
    const lang: LangKey = session.storageValues.language === "Hindi" ? "hi" : "en";
    return {
        lang,
        isHindi: lang === "hi",
        t: (key: I18nKey): string => T[key][lang],
    };
}
