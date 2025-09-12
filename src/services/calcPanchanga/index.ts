/**
 * @file Panchang.ts
 * @brief A comprehensive Panchang calculator using the Swiss Ephemeris library.
 *
 * This program calculates the five elements of the Hindu lunar calendar (Panchang)
 * for a given date, time, and location:
 * 1. Tithi (Lunar Day)
 * 2. Vara (Weekday)
 * 3. Nakshatra (Lunar Mansion)
 * 4. Yoga (Luni-Solar combination)
 * 5. Karana (Half of a Tithi)
 */
import { toFixedLengthArray } from "fixed-len-array";
import type { DateTime } from "luxon";
import { calculateKalavelas } from "src/services/calcKalavelas";
import { calcSamvatsara } from "src/services/calcPanchanga/calc_samvatsara";
import { find_lunar_event_time } from "src/services/calcPanchanga/find_lunar_event_time";
import { find_yoga_crossing_time } from "src/services/calcPanchanga/find_yoga_crossing_time";
import { calculateRahuKalam } from "src/services/calcRahuKalam";
import { calcRiseSet } from "src/services/calcRiseSet";
import { getKarana } from "src/services/constants/Karana";
import { getMaaha, type MaahaNumber } from "src/services/constants/Maaha";
import { getNakshatra } from "src/services/constants/Nakshatra";
import { getRasi } from "src/services/constants/Rasi";
import { getTithi } from "src/services/constants/Tithi";
import { type DayEn, VarasDetails } from "src/services/constants/Varas";
import { getYoga } from "src/services/constants/Yoga";
import { MOD360 } from "src/services/utils";

/** Main calculation function */
export function getPanchanga(
    input_dt: DateTime<true>,
    longitude: number, // north positive
    latitude: number // east positive
) {
    // Convert current system time to Julian Day UT
    const datetime = input_dt.startOf("day").plus({ minute: input_dt.offset });
    const utc_dt = datetime.toUTC();
    const tjd_ut = swe.swe_utc_to_jd(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        0,
        0,
        0,
        swe.SE_GREG_CAL
    )[1];

    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    // Ayanamsa
    const ayanamsa = swe.swe_get_ayanamsa_ex_ut(tjd_ut, iflag);

    // Get Sun and Moon positions at the given time
    const sun_lon = swe.swe_calc_ut(tjd_ut, swe.SE_SUN, iflag)[0];
    const moon_lon = swe.swe_calc_ut(tjd_ut, swe.SE_MOON, iflag)[0];

    // Sun and Moon info
    const sun_rashi = getRasi(sun_lon);
    const moon_rashi = getRasi(moon_lon);

    // Panchang Details

    // Calculate rise/set times
    const geopos = toFixedLengthArray([longitude, latitude, 0], 3);

    // Calculate Hindu Today Sunrise and SunSet
    const today_sun = calcRiseSet(tjd_ut, swe.SE_SUN, geopos);

    // Calculate Hindu Next Day Sunrise
    const tomorrow_sun = calcRiseSet(tjd_ut + 1, swe.SE_SUN, geopos);

    // Calculate Hindu Day Sunrise and SunSet
    const today_moon = calcRiseSet(today_sun.rise_jd, swe.SE_MOON, geopos);

    // Vara (Weekday) - No calculation needed, direct function
    const vara = VarasDetails[datetime.weekdayLong as DayEn];

    // Tithi - Optimized calculation
    const tithi = getTithi(sun_lon, moon_lon);
    const tithi_start_jd = find_lunar_event_time(
        tjd_ut - 0.5,
        tithi.range.start
    );
    const tithi_end_jd = find_lunar_event_time(tjd_ut, tithi.range.end);

    // Nakshatra - Use direct swe_mooncross_ut
    const nakshatra = getNakshatra(moon_lon);
    const nakshatra_start_jd = swe.swe_mooncross_ut(
        nakshatra.range.start,
        tjd_ut - 1.0,
        swe.SEFLG_SIDEREAL
    );
    const nakshatra_end_jd = swe.swe_mooncross_ut(
        nakshatra.range.end,
        tjd_ut,
        swe.SEFLG_SIDEREAL
    );

    // Yoga - Optimized calculation
    const yoga = getYoga(sun_lon, moon_lon);
    const yoga_start_jd = find_yoga_crossing_time(
        tjd_ut - 0.5,
        yoga.range.start
    );
    const yoga_end_jd = find_yoga_crossing_time(tjd_ut, yoga.range.end);

    // Karana - Optimized calculation
    const karana = getKarana(sun_lon, moon_lon);
    const karana_start_jd = find_lunar_event_time(
        tjd_ut - 0.25,
        karana.range.start
    );
    const karana_end_jd = find_lunar_event_time(tjd_ut, karana.range.end);

    // Masa
    const slast = MOD360(
        swe.swe_calc_ut(
            today_sun.rise_jd - (tithi.lunarphase / 360.0) * 30.0,
            swe.SE_SUN,
            iflag
        )[0]
    );
    const snext = MOD360(
        swe.swe_calc_ut(
            today_sun.rise_jd + ((30.0 - tithi.lunarphase) / 360.0) * 30.0,
            swe.SE_SUN,
            iflag
        )[0]
    );
    const m1 = Math.floor(slast / 30.0) + 1;
    const m2 = Math.floor(snext / 30.0) + 1;
    const masa_num = m1 === m2 ? (m1 % 12) + 1 : (m1 % 12) + 1;

    // Converts a Julian Day to DateTime with original timezone
    const jdToDateTime = (jd: number) => {
        const dt = datetime.plus({ days: jd - tjd_ut });
        if (!dt.isValid) throw new Error("Invalid date");
        return { jd, dt };
    };

    return {
        datetime,
        utc_dt,
        tjd_ut,
        latitude,
        longitude,
        ayanamsa,
        sun_rashi,
        moon_rashi,
        sunrise: jdToDateTime(today_sun.rise_jd),
        sunset: jdToDateTime(today_sun.set_jd),
        moonrise: jdToDateTime(today_moon.rise_jd),
        moonset: jdToDateTime(today_moon.set_jd),
        vara,
        tithi: {
            ...tithi,
            start: jdToDateTime(tithi_start_jd),
            end: jdToDateTime(tithi_end_jd),
        },
        nakshatra: {
            ...nakshatra,
            start: jdToDateTime(nakshatra_start_jd),
            end: jdToDateTime(nakshatra_end_jd),
        },
        yoga: {
            ...yoga,
            start: jdToDateTime(yoga_start_jd),
            end: jdToDateTime(yoga_end_jd),
        },
        karana: {
            ...karana,
            start: jdToDateTime(karana_start_jd),
            end: jdToDateTime(karana_end_jd),
        },
        masa: getMaaha(masa_num as MaahaNumber),
        samvatsara: calcSamvatsara(tjd_ut, masa_num),
        kalavelas: calculateKalavelas(
            today_sun.rise_jd,
            today_sun.set_jd,
            tomorrow_sun.rise_jd,
            vara.num % 7
        ),
        rahu_kalam: calculateRahuKalam(
            today_sun.rise_jd,
            today_sun.set_jd,
            vara.num % 7
        ),
    };
}
