// Import utility functions
import type { DateTime } from "luxon";
import { calcSunRiseSunSet } from "src/backend/calcSunRiseSunSet";
import { DayKalavelasCalculation } from "src/backend/KalavelasCalculation";
import { Planet, type PlanetEn } from "src/backend/Planet";
import { getVara } from "src/backend/Varas";
import { calcVimsottariDasa, type Dasha } from "src/backend/VimsottariDasa";
import { calcYogPhala } from "src/backend/YogPhala";
import type SwissEPH from "sweph-wasm/index";

// getPlanetaryPosition
export async function Kundli(
    swe: SwissEPH,
    datetime: DateTime<true>,
    longitude: number, // north positive
    latitude: number, // east positive
    altitude: number = 0 // height above sea level in meters
) {
    // todo : we neet to use tjd_et (Julian Day in Ephemeris Time or Terrestrial Time):
    // Setup location detail
    swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);
    swe.swe_set_topo(longitude, latitude, altitude);

    // swe.SEFLG_EQUATORIAL; this for chalit
    const IFLAGS = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    const utc = datetime.toUTC();
    const julian_datetime = swe.swe_julday(
        utc.year,
        utc.month,
        utc.day,
        utc.hour +
            utc.minute / 60 +
            (utc.second + utc.millisecond / 1000) / 3600,
        swe.SE_GREG_CAL
    );

    // Ayanamsa
    const ayanamsa = swe.swe_get_ayanamsa_ex_ut(julian_datetime, IFLAGS);

    // Ascendant etc.
    const { ascmc } = swe.swe_houses(
        julian_datetime,
        latitude,
        longitude,
        "P" // W = equal whole sign
    );

    const { daybirth, sunrise, sunset } = calcSunRiseSunSet(
        swe,
        julian_datetime,
        latitude,
        longitude
    );

    // Add Ascendant
    const planets: Partial<Record<PlanetEn, Planet>> = {};
    planets.Ascendant = new Planet("Ascendant", [ascmc[0]]);

    // Planets
    const PLANET_IDS: Map<PlanetEn, number> = new Map([
        ["Sun", swe.SE_SUN],
        ["Moon", swe.SE_MOON],
        ["Mercury", swe.SE_MERCURY],
        ["Venus", swe.SE_VENUS],
        ["Mars", swe.SE_MARS],
        ["Jupiter", swe.SE_JUPITER],
        ["Saturn", swe.SE_SATURN],
        ["Uranus", swe.SE_URANUS],
        ["Neptune", swe.SE_NEPTUNE],
        ["Pluto", swe.SE_PLUTO],
        ["Rahu", swe.SE_TRUE_NODE],
    ]);
    for (const [planetName, planetId] of PLANET_IDS) {
        const vCoords = swe.swe_calc_ut(julian_datetime, planetId, IFLAGS);
        const hCoords = swe.swe_azalt(
            julian_datetime,
            swe.SE_EQU2HOR,
            [longitude, latitude, altitude],
            0,
            0,
            [vCoords[0], vCoords[1], vCoords[2]]
        );

        // Map planets using ephe_data
        planets[planetName] = new Planet(
            planetName,
            vCoords,
            hCoords,
            planets.Ascendant.rasi.rasi_num
        );

        if (planetName === "Rahu") {
            // Ketu is always 180° opposite to Rahu (i.e., Ketu = Rahu + 180°)
            vCoords[0] += 180;
            planets.Ketu = new Planet(
                "Ketu",
                vCoords,
                hCoords,
                planets.Ascendant.rasi.rasi_num
            );
        }
    }

    if (planets.Sun) {
        // धूम (Dhuma) is calculated by adding 133°20′ to the Sun's position
        planets.Dhuma = new Planet(
            "Dhuma",
            [planets.Sun.degree + 133 + 20 / 60],
            [],
            planets.Ascendant.rasi.rasi_num
        );

        // व्यतीपात (Vyatipata) is 360° minus Dhuma's position (its opposite point)
        planets.Vyatipata = new Planet(
            "Vyatipata",
            [360 - planets.Dhuma.degree],
            [],
            planets.Ascendant.rasi.rasi_num
        );

        // परिवेष (Parivesha) is 180° added to Vyatipata (opposite of Vyatipata)
        planets.Parivesha = new Planet(
            "Parivesha",
            [planets.Vyatipata.degree + 180],
            [],
            planets.Ascendant.rasi.rasi_num
        );

        // इन्द्रचाप (Chapa / Indrachapa) is 360° minus Parivesha
        planets.Chapa = new Planet(
            "Chapa",
            [360 - planets.Parivesha.degree],
            [],
            planets.Ascendant.rasi.rasi_num
        );

        // उपकेतु (Upaketu / Sikhii) is Chapa + 16°40′
        planets.Upaketu = new Planet(
            "Upaketu",
            [planets.Chapa.degree + 16 + 40 / 60],
            [],
            planets.Ascendant.rasi.rasi_num
        );
    }

    const vara = getVara(
        swe.swe_day_of_week(sunrise + datetime.offset / (24 * 60))
    );
    for (const [name, t_jd] of Object.entries(
        DayKalavelasCalculation(sunrise, sunset, vara.num % 7)
    )) {
        planets[name] = new Planet(
            name,
            [swe.swe_houses(t_jd, latitude, longitude, "P").ascmc[0]],
            [],
            planets.Ascendant?.rasi.rasi_num
        );
    }

    let vimsottari_dasa: Dasha[] = [];
    if (planets.Moon) {
        vimsottari_dasa = calcVimsottariDasa(
            julian_datetime,
            planets.Moon.nakshatra,
            datetime
        );
    }

    swe.swe_close();
    return {
        datetime,
        daybirth,
        vara,
        sunrise: datetime.plus({ days: sunrise - julian_datetime }),
        sunset: datetime.plus({ days: sunset - julian_datetime }),
        latitude,
        longitude,
        julian_datetime,
        ayanamsa,
        planets: planets as Record<PlanetEn, Planet>,
        vimsottari_dasa,
        yogPhala: calcYogPhala(planets as Record<PlanetEn, Planet>),
    };
}
