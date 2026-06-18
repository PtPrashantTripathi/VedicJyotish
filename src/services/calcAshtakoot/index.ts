/** Ashtakoot Guna Milap — 8-fold compatibility calculation (36 points total) */

// ─── Static Lookup Tables (index = nakshatra_num - 1, i.e. 0-based) ───────────

type Gana = "D" | "M" | "R"; // Deva / Manushya / Rakshasa
const GANA: Gana[] = [
    "D","M","R","M","D","M","D","D","R","R","M","M","D","R","D","R","D","R","R","M","M","D","R","R","M","D","D",
];

type Nadi = "V" | "P" | "K"; // Vata / Pitta / Kapha
const NADI: Nadi[] = [
    "V","P","K","K","P","V","V","P","K","K","P","V","V","P","K","K","P","V","V","P","K","K","P","V","V","P","K",
];

type YoniAnimal = "Horse"|"Elephant"|"Goat"|"Snake"|"Dog"|"Cat"|"Rat"|"Cow"|"Buffalo"|"Tiger"|"Deer"|"Monkey"|"Mongoose"|"Lion";
const YONI_ANIMAL: YoniAnimal[] = [
    "Horse","Elephant","Goat","Snake","Snake","Dog","Cat","Goat","Cat","Rat","Rat","Cow","Buffalo","Tiger","Buffalo","Tiger","Deer","Deer","Dog","Monkey","Mongoose","Monkey","Lion","Horse","Lion","Cow","Elephant",
];
// Male(♂) gender nakshatras (nakshatra_num, 1-based): 1,2,4,7,10,12,13,16,18,19,22,25,27
const YONI_MALE_SET = new Set([1,2,4,7,10,12,13,16,18,19,22,25,27]);
// Enemy pairs — these animals are hostile to each other
const YONI_ENEMIES: [YoniAnimal, YoniAnimal][] = [
    ["Horse","Buffalo"], ["Elephant","Lion"], ["Goat","Monkey"],
    ["Snake","Mongoose"], ["Dog","Deer"], ["Cat","Rat"], ["Tiger","Cow"],
];

// Rashi Varna (index = rasi_num - 1, 0-based 0..11)
type Varna = 1|2|3|4; // 1=Brahmin, 2=Kshatriya, 3=Vaishya, 4=Shudra
const RASHI_VARNA: Varna[] = [
    2, // Aries(1)    = Kshatriya
    3, // Taurus(2)   = Vaishya
    4, // Gemini(3)   = Shudra
    1, // Cancer(4)   = Brahmin
    2, // Leo(5)      = Kshatriya
    3, // Virgo(6)    = Vaishya
    4, // Libra(7)    = Shudra
    1, // Scorpio(8)  = Brahmin
    2, // Sagi(9)     = Kshatriya
    3, // Capri(10)   = Vaishya
    4, // Aqua(11)    = Shudra
    1, // Pisces(12)  = Brahmin
];

// Rashi Vashya groups
type VashyaGroup = "Manava"|"Chatushpada"|"Jalachara"|"Vanachara"|"Keet";
const RASHI_VASHYA: VashyaGroup[] = [
    "Chatushpada", // Aries
    "Chatushpada", // Taurus
    "Manava",      // Gemini
    "Jalachara",   // Cancer
    "Vanachara",   // Leo
    "Manava",      // Virgo
    "Manava",      // Libra
    "Keet",        // Scorpio
    "Manava",      // Sagittarius
    "Jalachara",   // Capricorn
    "Manava",      // Aquarius
    "Jalachara",   // Pisces
];

// Rashi lord (index = rasi_num - 1)
type PlanetLord = "Sun"|"Moon"|"Mars"|"Mercury"|"Jupiter"|"Venus"|"Saturn";
const RASHI_LORD: PlanetLord[] = [
    "Mars","Venus","Mercury","Moon","Sun","Mercury","Venus","Mars","Jupiter","Saturn","Saturn","Jupiter",
];

// Planet friendship table: F=Friend, N=Neutral, E=Enemy
type Relation = "F"|"N"|"E";
const PLANET_RELATIONS: Record<PlanetLord, Record<PlanetLord, Relation>> = {
    Sun:     { Sun:"F", Moon:"F", Mars:"F", Mercury:"N", Jupiter:"F", Venus:"E", Saturn:"E" },
    Moon:    { Sun:"F", Moon:"F", Mars:"N", Mercury:"F", Jupiter:"N", Venus:"N", Saturn:"N" },
    Mars:    { Sun:"F", Moon:"F", Mars:"F", Mercury:"E", Jupiter:"F", Venus:"N", Saturn:"N" },
    Mercury: { Sun:"F", Moon:"E", Mars:"N", Mercury:"F", Jupiter:"N", Venus:"F", Saturn:"N" },
    Jupiter: { Sun:"F", Moon:"F", Mars:"F", Mercury:"E", Jupiter:"F", Venus:"E", Saturn:"N" },
    Venus:   { Sun:"E", Moon:"N", Mars:"N", Mercury:"F", Jupiter:"N", Venus:"F", Saturn:"F" },
    Saturn:  { Sun:"E", Moon:"E", Mars:"E", Mercury:"F", Jupiter:"N", Venus:"F", Saturn:"F" },
};

// Tara auspicious positions (Janma=1, Sampat=2, Vipat=3, Kshema=4, Pratyari=5, Sadhana=6, Naidhana=7, Mitra=8, Paramitra=9)
const TARA_AUSPICIOUS = new Set([1, 2, 4, 6, 8, 9]); // 3, 5, 7 are inauspicious

// ─── Result Types ────────────────────────────────────────────────────────────

export interface KootScore {
    score: number;
    max: number;
    label: string;
    labelHi: string;
    detail: string;
}

export interface AshtakootResult {
    varna:        KootScore;
    vashya:       KootScore;
    tara:         KootScore;
    yoni:         KootScore;
    grahaMaitri:  KootScore;
    gana:         KootScore;
    bhakoot:      KootScore;
    nadi:         KootScore;
    total:        number;
    verdict:      string;
    verdictHi:    string;
    maleNakshatra: number;
    femaleNakshatra: number;
    maleRasi: number;
    femaleRasi: number;
}

// ─── Main Calculation ────────────────────────────────────────────────────────

export function calcAshtakoot(
    maleRasiNum: number,      // 1-12
    maleNakshatraNum: number, // 1-27
    femaleRasiNum: number,
    femaleNakshatraNum: number
): AshtakootResult {
    const m = maleNakshatraNum - 1;   // 0-based
    const f = femaleNakshatraNum - 1;
    const mr = maleRasiNum - 1;       // 0-based rasi
    const fr = femaleRasiNum - 1;

    // 1. Varna (1 pt)
    const mVarna = RASHI_VARNA[mr];
    const fVarna = RASHI_VARNA[fr];
    const varnaScore = mVarna <= fVarna ? 1 : 0; // male caste >= female caste
    const varnaDetail = `${varnaNames[mVarna-1]} × ${varnaNames[fVarna-1]}`;

    // 2. Vashya (2 pts)
    const mVashya = RASHI_VASHYA[mr];
    const fVashya = RASHI_VASHYA[fr];
    let vashyaScore = 0;
    if (mVashya === fVashya) vashyaScore = 2;
    else if (vashyaCompatible(mVashya, fVashya)) vashyaScore = 1;
    const vashyaDetail = `${mVashya} × ${fVashya}`;

    // 3. Tara (3 pts)
    const mToF = ((femaleNakshatraNum - maleNakshatraNum + 27) % 27) || 27;
    const fToM = ((maleNakshatraNum - femaleNakshatraNum + 27) % 27) || 27;
    const mTara = ((mToF - 1) % 9) + 1;
    const fTara = ((fToM - 1) % 9) + 1;
    const mTaraOk = TARA_AUSPICIOUS.has(mTara);
    const fTaraOk = TARA_AUSPICIOUS.has(fTara);
    const taraScore = mTaraOk && fTaraOk ? 3 : mTaraOk || fTaraOk ? 1.5 : 0;
    const taraDetail = `Tara ${mTara} (${mTaraOk ? "✓" : "✗"}) × Tara ${fTara} (${fTaraOk ? "✓" : "✗"})`;

    // 4. Yoni (4 pts)
    const mAnimal = YONI_ANIMAL[m];
    const fAnimal = YONI_ANIMAL[f];
    const mMale = YONI_MALE_SET.has(maleNakshatraNum);
    const fMale = YONI_MALE_SET.has(femaleNakshatraNum);
    let yoniScore = 0;
    if (mAnimal === fAnimal) {
        yoniScore = mMale !== fMale ? 4 : 3;
    } else if (isYoniEnemy(mAnimal, fAnimal)) {
        yoniScore = 0;
    } else {
        yoniScore = 2;
    }
    const yoniDetail = `${mAnimal} × ${fAnimal}`;

    // 5. Graha Maitri (5 pts)
    const mLord = RASHI_LORD[mr];
    const fLord = RASHI_LORD[fr];
    let grahaMaitriScore = 0;
    if (mLord === fLord) {
        grahaMaitriScore = 5;
    } else {
        const mToFRel = PLANET_RELATIONS[mLord][fLord];
        const fToMRel = PLANET_RELATIONS[fLord][mLord];
        grahaMaitriScore = relationScore(mToFRel, fToMRel);
    }
    const grahaMaitriDetail = `${mLord} × ${fLord}`;

    // 6. Gana (6 pts)
    const mGana = GANA[m];
    const fGana = GANA[f];
    let ganaScore = 0;
    if (mGana === fGana) ganaScore = 6;
    else if ((mGana === "D" && fGana === "M") || (mGana === "M" && fGana === "D")) ganaScore = 5;
    else ganaScore = 0;
    const ganaDetail = `${ganaName(mGana)} × ${ganaName(fGana)}`;

    // 7. Bhakoot (7 pts)
    const maleToFemale = ((femaleRasiNum - maleRasiNum + 12) % 12) || 12;
    const femaleToMale = ((maleRasiNum - femaleRasiNum + 12) % 12) || 12;
    const bhakootScore = calcBhakootScore(maleToFemale, femaleToMale);
    const bhakootDetail = `${maleToFemale}-${femaleToMale} relationship`;

    // 8. Nadi (8 pts)
    const mNadi = NADI[m];
    const fNadi = NADI[f];
    const nadiScore = mNadi !== fNadi ? 8 : 0;
    const nadiDetail = `${nadiName(mNadi)} × ${nadiName(fNadi)}`;

    const total = varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore;

    const { verdict, verdictHi } = getVerdict(total);

    return {
        varna:       { score: varnaScore,       max: 1,  label: "Varna",        labelHi: "वर्ण",         detail: varnaDetail },
        vashya:      { score: vashyaScore,      max: 2,  label: "Vashya",       labelHi: "वश्य",         detail: vashyaDetail },
        tara:        { score: taraScore,         max: 3,  label: "Tara",         labelHi: "तारा",         detail: taraDetail },
        yoni:        { score: yoniScore,         max: 4,  label: "Yoni",         labelHi: "योनि",         detail: yoniDetail },
        grahaMaitri: { score: grahaMaitriScore, max: 5,  label: "Graha Maitri", labelHi: "ग्रह मैत्री", detail: grahaMaitriDetail },
        gana:        { score: ganaScore,         max: 6,  label: "Gana",         labelHi: "गण",           detail: ganaDetail },
        bhakoot:     { score: bhakootScore,      max: 7,  label: "Bhakoot",      labelHi: "भकूट",         detail: bhakootDetail },
        nadi:        { score: nadiScore,         max: 8,  label: "Nadi",         labelHi: "नाड़ी",        detail: nadiDetail },
        total,
        verdict,
        verdictHi,
        maleNakshatra: maleNakshatraNum,
        femaleNakshatra: femaleNakshatraNum,
        maleRasi: maleRasiNum,
        femaleRasi: femaleRasiNum,
    };
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

const varnaNames = ["Brahmin", "Kshatriya", "Vaishya", "Shudra"];

function ganaName(g: Gana): string {
    return g === "D" ? "Deva" : g === "M" ? "Manushya" : "Rakshasa";
}

function nadiName(n: Nadi): string {
    return n === "V" ? "Vata" : n === "P" ? "Pitta" : "Kapha";
}

function isYoniEnemy(a: YoniAnimal, b: YoniAnimal): boolean {
    return YONI_ENEMIES.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

function vashyaCompatible(a: VashyaGroup, b: VashyaGroup): boolean {
    const pairs: [VashyaGroup, VashyaGroup][] = [
        ["Manava", "Jalachara"], ["Vanachara", "Chatushpada"], ["Manava", "Vanachara"],
    ];
    return pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

function relationScore(r1: Relation, r2: Relation): number {
    if (r1 === "F" && r2 === "F") return 5;
    if ((r1 === "F" && r2 === "N") || (r1 === "N" && r2 === "F")) return 4;
    if (r1 === "N" && r2 === "N") return 3;
    if ((r1 === "F" && r2 === "E") || (r1 === "E" && r2 === "F")) return 2;
    if ((r1 === "N" && r2 === "E") || (r1 === "E" && r2 === "N")) return 1;
    return 0; // both enemy
}

function calcBhakootScore(mToF: number, fToM: number): number {
    // Bad combinations: 2-12, 5-9, 6-8
    const sorted = [mToF, fToM].sort((a, b) => a - b);
    const [lo, hi] = sorted;
    if ((lo === 2 && hi === 10) || (lo === 1 && hi === 11)) {
        // 1-1 (same) or 1-11 etc.
    }
    if (lo + hi === 14 && hi - lo === 10) return 0; // 2-12
    if (lo + hi === 14 && lo === 2 && hi === 12) return 0;
    if (lo === 2 && hi === 12) return 0;
    if (lo === 5 && hi === 9) return 0;
    if (lo === 6 && hi === 8) return 0;
    return 7;
}

function getVerdict(total: number): { verdict: string; verdictHi: string } {
    if (total >= 32) return { verdict: "Excellent Match — Highly Auspicious", verdictHi: "उत्तम मिलान — अति शुभ" };
    if (total >= 28) return { verdict: "Very Good Match — Auspicious",         verdictHi: "बहुत अच्छा मिलान — शुभ" };
    if (total >= 24) return { verdict: "Good Match — Acceptable",               verdictHi: "अच्छा मिलान — स्वीकार्य" };
    if (total >= 18) return { verdict: "Average Match — Consult Astrologer",    verdictHi: "सामान्य मिलान — ज्योतिषी से परामर्श करें" };
    return               { verdict: "Poor Match — Not Recommended",             verdictHi: "निम्न मिलान — अनुशंसित नहीं" };
}
