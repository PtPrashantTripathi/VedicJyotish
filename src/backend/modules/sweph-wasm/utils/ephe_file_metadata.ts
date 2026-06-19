export interface EpheFileDetail {
    name: string;
    desc: string;
    category: string;
}
const JPLEpheFiles: Array<EpheFileDetail> = [
    {
        name: "de200.eph",
        desc: "1599 AD - 2169 AD",
        category: "JPL Ephemeris",
    },
    {
        name: "de403.eph",
        desc: "3000 BC - 3000 AD",
        category: "JPL Ephemeris",
    },
    {
        name: "de404.eph",
        desc: "3000 BC - 3000 AD",
        category: "JPL Ephemeris",
    },
    {
        name: "de405.eph",
        desc: "1600 AD - 2200 AD",
        category: "JPL Ephemeris",
    },
    {
        name: "de406.eph",
        desc: "3000 BC - 3000 AD",
        category: "JPL Ephemeris",
    },
    {
        name: "de431.eph",
        desc: "13201 BC - 17191 AD",
        category: "JPL Ephemeris",
    },
];
const StaticTxtFiles: Array<EpheFileDetail> = [
    {
        name: "fixstars.cat",
        desc: "Static",
        category: "Fixed Stars Catalog",
    },
    {
        name: "sefstars.txt",
        desc: "Static",
        category: "Fixed Stars Names",
    },
    {
        name: "seasnam.txt",
        desc: "Static",
        category: "Asteroid Names",
    },
    {
        name: "seorbel.txt",
        desc: "Epoch-based (varies)",
        category: "Orbital Elements (Asteroids)",
    },
];

/** Converts a year to BC/AD string. */
function formatYearEra(year: number): string {
    if (year < 0) return `${Math.abs(year)} BC`;
    if (year === 0) return "1 BC";
    return `${year} AD`;
}

/** Function to Generates a list of se1 ephemeris files with metadata. */
function se1EpheFiles(): Array<EpheFileDetail> {
    const epheFiles: Array<EpheFileDetail> = [];
    let startYear = -5401;

    const categories: Array<{ prefix: string; category: string }> = [
        { prefix: "pl", category: "SE Planetary Ephemeris" },
        { prefix: "mo", category: "SE Moon Ephemeris" },
        { prefix: "as", category: "SE Asteroid Ephemeris" },
    ];

    while (startYear < 5400) {
        let endYear = startYear + 599;

        // Handle 1 BC to 1 AD transition
        if (startYear <= 0 && endYear >= 0) {
            startYear += 1;
            endYear += 1;
        }

        const blockNumber = String(
            Math.floor(Math.abs(startYear) / 100)
        ).padStart(2, "0");

        const suffix = endYear < 0 ? "m" : "_";

        for (const c of categories) {
            epheFiles.push({
                name: `se${c.prefix}${suffix}${blockNumber}.se1`,
                desc: `${formatYearEra(startYear)} - ${formatYearEra(endYear)}`,
                category: c.category,
            });
        }

        startYear += 600;
    }
    epheFiles.sort((a, b) => {
        const catCompare = a.category.localeCompare(b.category);
        return catCompare !== 0 ? catCompare : a.name.localeCompare(b.name);
    });

    return epheFiles;
}

export const EpheFileMetadata = se1EpheFiles().concat(
    JPLEpheFiles,
    StaticTxtFiles
);
