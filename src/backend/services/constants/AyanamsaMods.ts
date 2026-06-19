/** A comprehensive list of ayanamsa mode with their full names. */
export const AyanamsaMods = {
    0: "Fagan Bradley", // SE_SIDM_FAGAN_BRADLEY
    1: "Lahiri", // SE_SIDM_LAHIRI
    2: "De Luce", // SE_SIDM_DELUCE
    3: "Raman", // SE_SIDM_RAMAN
    4: "Usha Shashi", // SE_SIDM_USHASHASHI
    5: "Krishnamurti", // SE_SIDM_KRISHNAMURTI
    6: "Djwhal Khul", // SE_SIDM_DJWHAL_KHUL
    7: "Yukteshwar", // SE_SIDM_YUKTESHWAR
    8: "J.N. Bhasin", // SE_SIDM_JN_BHASIN
    9: "Babylonian Kugler I", // SE_SIDM_BABYL_KUGLER1
    10: "Babylonian Kugler II", // SE_SIDM_BABYL_KUGLER2
    11: "Babylonian Kugler III", // SE_SIDM_BABYL_KUGLER3
    12: "Babylonian Huber", // SE_SIDM_BABYL_HUBER
    13: "Babylonian Eta Piscium", // SE_SIDM_BABYL_ETPSC
    14: "Babylonian Aldebaran (15° Taurus)", // SE_SIDM_ALDEBARAN_15TAU
    15: "Hipparchos", // SE_SIDM_HIPPARCHOS
    16: "Sassanian", // SE_SIDM_SASSANIAN
    17: "Galactic Center (0° Sagittarius)", // SE_SIDM_GALCENT_0SAG
    18: "J2000", // SE_SIDM_J2000
    19: "J1900", // SE_SIDM_J1900
    20: "B1950", // SE_SIDM_B1950
    21: "Suryasiddhanta", // SE_SIDM_SURYASIDDHANTA
    22: "Suryasiddhanta (Mean Sun)", // SE_SIDM_SURYASIDDHANTA_MSUN
    23: "Aryabhata", // SE_SIDM_ARYABHATA
    24: "Aryabhata (Mean Sun)", // SE_SIDM_ARYABHATA_MSUN
    25: "Suryasiddhanta Revati", // SE_SIDM_SS_REVATI
    26: "Suryasiddhanta Citra", // SE_SIDM_SS_CITRA
    27: "True Citra", // SE_SIDM_TRUE_CITRA
    28: "True Revati", // SE_SIDM_TRUE_REVATI
    29: "True Pushya (P.V.R. Narasimha Rao)", // SE_SIDM_TRUE_PUSHYA
    30: "Galactic Center (Gil Brand)", // SE_SIDM_GALCENT_RGILBRAND
    31: "Galactic Equator (IAU 1958)", // SE_SIDM_GALEQU_IAU1958
    32: "Galactic Equator", // SE_SIDM_GALEQU_TRUE
    33: "Galactic Equator (Mid Mula)", // SE_SIDM_GALEQU_MULA
    34: "Skydram (Mardyks)", // SE_SIDM_GALALIGN_MARDYKS
    35: "True Mula (Chandra Hari)", // SE_SIDM_TRUE_MULA
    36: "Dhruva Galactic Center (Wilhelm)", // SE_SIDM_GALCENT_MULA_WILHELM
    37: "Aryabhata 522", // SE_SIDM_ARYABHATA_522
    38: "Babylonian Britton", // SE_SIDM_BABYL_BRITTON
    39: "Vedic Sheoran", // SE_SIDM_TRUE_SHEORAN
    40: "Cochrane Galactic Center (0° Capricorn)", // SE_SIDM_GALCENT_COCHRANE
    41: "Galactic Equator (Fiorenza)", // SE_SIDM_GALEQU_FIORENZA
    42: "Vettius Valens", // SE_SIDM_VALENS_MOON
    43: "Lahiri 1940", // SE_SIDM_LAHIRI_1940
    44: "Lahiri VP285", // SE_SIDM_LAHIRI_VP285
    45: "Krishnamurti Senthilathiban", // SE_SIDM_KRISHNAMURTI_VP291
    46: "Lahiri ICRC", // SE_SIDM_LAHIRI_ICRC
    // 43: "Manjula Laghumanasa",              // SE_SIDM_MANJULA
    255: "User Defined Ayanamsa", // SE_SIDM_USER
} as const;

// This type generates a union of all possible values from the `ayanamsamods` object.
export type AyanamsaModsKey = keyof typeof AyanamsaMods;

// This type generates a union of all possible values from the `ayanamsamods` object.
export type AyanamsaModsValue = (typeof AyanamsaMods)[AyanamsaModsKey];
