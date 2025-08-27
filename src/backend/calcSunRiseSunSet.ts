import { toFixedLengthArray } from "fixed-len-array/index";
import { MOD360 } from "src/backend/utils";
import type SwissEPH from "sweph-wasm/index";

export function calcSunRiseSunSet(
    swe: SwissEPH,
    jd: number,
    latitude: number,
    longitude: number
): {
    daybirth: boolean;
    sunrise: number;
    sunset: number;
} {
    const flag = swe.SE_BIT_DISC_CENTER | swe.SE_BIT_NO_REFRACTION;
    const geopos = toFixedLengthArray([longitude, latitude, 0], 3, 0);

    /** Get Sun's position at JD */
    const r = swe.swe_calc(jd, swe.SE_SUN, 0);
    const { ascmc } = swe.swe_houses(jd, latitude, longitude, "E");

    /** Ascendant vs Sun */
    const diffAscSun = MOD360(ascmc[0] - r[0]);
    const daybirth = diffAscSun <= 180;

    const diffICSun = MOD360(ascmc[1] + 180 - r[0]);

    let startJdRise = jd;
    let startJdSet = jd;

    if (daybirth) {
        if (diffICSun < 180) {
            startJdRise--;
        } else {
            startJdRise--;
        }
    } else {
        if (diffICSun < 180) {
            startJdRise--;
            startJdSet--;
        } else {
            startJdRise--;
            startJdSet--;
        }
    }

    return {
        daybirth,

        /** Call swe_rise_trans for each output */
        sunrise: swe.swe_rise_trans(
            startJdRise,
            swe.SE_SUN,
            null,
            swe.SEFLG_SWIEPH,
            swe.SE_CALC_RISE | flag,
            geopos,
            0,
            0
        ),

        sunset: swe.swe_rise_trans(
            startJdSet,
            swe.SE_SUN,
            null,
            swe.SEFLG_SWIEPH,
            swe.SE_CALC_SET | flag,
            geopos,
            0,
            0
        ),
    };
}
