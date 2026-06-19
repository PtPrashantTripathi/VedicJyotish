/** A comprehensive list of house systems with their full names. */
export const HouseSystems = {
    A: "Equal House", // Equal division starting from Ascendant : most common house system in modern Vedic astrology
    B: "Alcabitius", // Alcabitius system
    C: "Campanus", // Campanus system
    D: "Equal House (MC Based)", // Equal house starting from Midheaven
    E: "Equal House", // Standard equal house system
    F: "Carter Poli-Equatorial", // Carter's poli-equatorial method
    G: "Gauquelin Sectors", // Gauquelin statistical sectors
    H: "Horizon Azimuth", // Based on horizon and azimuth
    I: "Sunshine", // Sunshine method
    i: "Sunshine (Altitude Based)", // Sunshine variant based on altitude
    J: "Savard-A", // Savard A system
    K: "Koch", // Koch system
    L: "Pullen Sinusoidal (SD)", // Pullen Sinusoidal Direct
    M: "Morinus", // Morinus system
    N: "Equal House (Aries 1st House)", // Equal house with Aries always first
    O: "Porphyry", // Porphyry system
    P: "Placidus", // Placidus system : most common house system in modern Western astrology
    Q: "Pullen Sinusoidal (SR)", // Pullen Sinusoidal Reverse
    R: "Regiomontanus", // Regiomontanus system
    S: "Sripati", // Sripati house system
    T: "Polich-Page", // Polich-Page system
    U: "Krusinski-Pisa-Goelzer", // Krusinski-Pisa-Goelzer system
    V: "Equal Vehlow", // Equal house Vehlow style
    W: "Whole Sign", // Whole sign house system
    X: "Axial Rotation (Meridian Houses)", // Axial rotation or Meridian houses
    Y: "APC Houses", // APC system
} as const;

// This type generates a union of all possible values from the `housesys` object.
export type HouseSystemKey = keyof typeof HouseSystems;

// This type generates a union of all possible values from the `housesys` object.
export type HouseSystemValue = (typeof HouseSystems)[HouseSystemKey];
