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
import { toFixedLengthArray } from "fixed-len-array/index";
import { DateTime } from "luxon";
import { getKarana } from "src/backend/Karana";
import { getMaaha, type MaahaNumber } from "src/backend/Maaha";
import { getNakshatra } from "src/backend/Nakshatra";
import { getRasi } from "src/backend/Rasi";
import { getSamvatsara } from "src/backend/Samvatsara";
import { getTithi } from "src/backend/Tithi";
import { MOD360 } from "src/backend/utils";
import { getVara } from "src/backend/Varas";
import { getYoga } from "src/backend/Yoga";
import type SwissEPH from "sweph-wasm/index";

/**
 * @param jd_ut The Julian Day in Universal Time.
 * @param buffer A character buffer to store the resulting string.
 * @param buffer_size The size of the buffer.
 * @brief Converts a Julian Day (UT) to a readable IST date-time string.
 */
function jdToDateTime(swe: SwissEPH, jd_ut: number): DateTime<true> {
    // Correct function to convert Julian Day to calendar date is swe_revjul
    const dt = swe.swe_revjul(jd_ut, swe.SE_GREG_CAL);
    const dtUTC = DateTime.utc(dt.year, dt.month, dt.day).plus({
        hours: dt.hour,
    });

    if (!dtUTC.isValid) throw new Error("Invalid date");

    return dtUTC;
}

function decimalToHMS(days: number) {
    return DateTime.fromObject(
        { hour: 0, minute: 0, second: 0 },
        { zone: "utc" }
    )
        .plus({ days })
        .toFormat("HH'h' mm'm' ss's'");
}

/**
 * @param jd_start The Julian Day to start searching from.
 * @param target_angle The target angular separation in degrees.
 * @returns The Julian Day (UT) of the event.
 * @brief Finds the precise time for a lunar event (Tithi/Karana) crossing.
 * This is when the angular separation between the Moon and Sun reaches a specific degree.
 */
function find_lunar_event_time(
    swe: SwissEPH,
    jd_start: number,
    target_angle: number
): number {
    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    // Get current positions and speeds
    let xx_sun = swe.swe_calc_ut(jd_start, swe.SE_SUN, iflag);
    let xx_moon = swe.swe_calc_ut(jd_start, swe.SE_MOON, iflag);

    let lunar_phase = MOD360(xx_moon[0] - xx_sun[0]);
    let relative_speed = xx_moon[3] - xx_sun[3];

    // initial estimate
    let angle_diff = target_angle - lunar_phase;
    if (angle_diff > 180.0) angle_diff -= 360.0;
    if (angle_diff < -180.0) angle_diff += 360.0;

    // Initial approximation
    let jd_estimated = jd_start + angle_diff / relative_speed;

    // Refine with maximum 5 iterations
    for (let i = 0; i < 5; i++) {
        // Calculate Sun and Moon positions at the current estimated time
        xx_sun = swe.swe_calc_ut(jd_estimated, swe.SE_SUN, iflag);
        xx_moon = swe.swe_calc_ut(jd_estimated, swe.SE_MOON, iflag);

        // Calculate current separation, handling the 360-degree wrap-around
        lunar_phase = MOD360(xx_moon[0] - xx_sun[0]);

        // Relative speed of Moon with respect to Sun
        relative_speed = xx_moon[3] - xx_sun[3];

        // Difference from target
        angle_diff = target_angle - lunar_phase;

        // Handle wrap-around for the difference itself
        if (angle_diff > 180.0) angle_diff -= 360.0;
        if (angle_diff < -180.0) angle_diff += 360.0;
        if (Math.abs(angle_diff) < 0.001) break; // Sufficient precision

        if (relative_speed !== 0) {
            // Avoid division by zero
            // Estimate time correction and update the Julian Day
            jd_estimated += angle_diff / relative_speed;
        }
    }
    return jd_estimated;
}

/**
 * @param jd_start The Julian Day to start searching from.
 * @param target_lon The target combined longitude.
 * @returns The Julian Day (UT) of the event.
 * @brief Finds the precise time for the sum of Sun and Moon longitudes to cross a specific degree (for Yoga).
 */
function find_yoga_crossing_time(
    swe: SwissEPH,
    jd_start: number,
    target_lon: number
): number {
    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

    // Get initial positions and speeds
    let xx_sun = swe.swe_calc_ut(jd_start, swe.SE_SUN, iflag);
    let xx_moon = swe.swe_calc_ut(jd_start, swe.SE_MOON, iflag);

    let combined_lon = MOD360(xx_sun[0] + xx_moon[0]);
    let combined_speed = xx_sun[3] + xx_moon[3];

    // Initial estimate
    let angle_diff = target_lon - combined_lon;
    if (angle_diff > 180.0) angle_diff -= 360.0;
    if (angle_diff < -180.0) angle_diff += 360.0;

    let jd_estimated = jd_start + angle_diff / combined_speed;

    // Refine with maximum 5 iterations
    for (let i = 0; i < 5; i++) {
        xx_sun = swe.swe_calc_ut(jd_estimated, swe.SE_SUN, iflag);
        xx_moon = swe.swe_calc_ut(jd_estimated, swe.SE_MOON, iflag);

        combined_lon = MOD360(xx_sun[0] + xx_moon[0]);
        combined_speed = xx_sun[3] + xx_moon[3];
        angle_diff = target_lon - combined_lon;

        if (angle_diff > 180.0) angle_diff -= 360.0;
        if (angle_diff < -180.0) angle_diff += 360.0;

        if (Math.abs(angle_diff) < 0.001) break;

        if (combined_speed !== 0) {
            jd_estimated += angle_diff / combined_speed;
        }
    }
    return jd_estimated;
}

function calculaterahu_kalam(
    sunrise: number,
    sunset: number,
    vara: number
): { start: number; end: number } {
    const dayDuration = sunset - sunrise;
    const portion = dayDuration / 8;

    const rahu_kalamPortionIndex = [8, 2, 7, 5, 6, 4, 3]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
    const portionIndex = rahu_kalamPortionIndex[vara];

    const start = sunrise + (portionIndex - 1) * portion;
    const end = sunrise + portionIndex * portion;

    return {
        start,
        end,
    };
}

/** Main calculation function */
export async function getPanchanga(
    swe: SwissEPH,
    datetime: DateTime<true>,
    latitude: number,
    longitude: number
) {
    swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

    // Location settings
    swe.swe_set_topo(longitude, latitude, 0);

    // Convert current system time to Julian Day UT
    const utc_dt = datetime.toUTC();
    const tjd_ut = swe.swe_utc_to_jd(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        utc_dt.hour,
        utc_dt.minute,
        utc_dt.second,
        swe.SE_GREG_CAL
    )[1];

    // Get Sun and Moon positions at the given time
    const iflag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;
    const xx_sun = swe.swe_calc_ut(tjd_ut, swe.SE_SUN, iflag);
    const xx_moon = swe.swe_calc_ut(tjd_ut, swe.SE_MOON, iflag);
    const sun_lon = xx_sun[0];
    const moon_lon = xx_moon[0];

    // Sun and Moon info
    const sun_rashi = getRasi(sun_lon);
    const moon_rashi = getRasi(moon_lon);

    // Panchang Details

    // Calculate rise/set times
    const geopos = toFixedLengthArray([longitude, latitude, 0], 3, 0);

    const sunrise_jd = swe.swe_rise_trans(
        tjd_ut,
        swe.SE_SUN,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_RISE,
        geopos,
        0,
        0
    );

    const sunset_jd = swe.swe_rise_trans(
        sunrise_jd,
        swe.SE_SUN,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_SET,
        geopos,
        0,
        0
    );

    // Calculate Hindu Next Day Sunrise
    const next_sunrise_jd = swe.swe_rise_trans(
        tjd_ut + 1,
        swe.SE_SUN,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_RISE,
        geopos,
        0,
        0
    );

    // Day Duration
    const day_duration = sunset_jd - sunrise_jd;
    const night_duration = next_sunrise_jd - sunset_jd;

    const moonrise_jd = swe.swe_rise_trans(
        sunrise_jd,
        swe.SE_MOON,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_RISE,
        geopos,
        0,
        0
    );

    const moonset_jd = swe.swe_rise_trans(
        moonrise_jd,
        swe.SE_MOON,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_SET,
        geopos,
        0,
        0
    );

    // Vara (Weekday) - No calculation needed, direct function
    const vara = getVara(
        swe.swe_day_of_week(sunrise_jd + utc_dt.offset / (24 * 60))
    );

    // Tithi - Optimized calculation
    const tithi = getTithi(sun_lon, moon_lon);
    const tithi_start_jd = find_lunar_event_time(
        swe,
        tjd_ut - 0.5,
        tithi.range.start
    );
    const tithi_end_jd = find_lunar_event_time(swe, tjd_ut, tithi.range.end);

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
        swe,
        tjd_ut - 0.5,
        yoga.range.start
    );
    const yoga_end_jd = find_yoga_crossing_time(swe, tjd_ut, yoga.range.end);

    // Karana - Optimized calculation
    const karana = getKarana(sun_lon, moon_lon);
    const karana_start_jd = find_lunar_event_time(
        swe,
        tjd_ut - 0.25,
        karana.range.start
    );
    const karana_end_jd = find_lunar_event_time(swe, tjd_ut, karana.range.end);

    // Masa
    const slast = MOD360(
        swe.swe_calc_ut(
            sunrise_jd - (tithi.lunarphase / 360.0) * 30.0,
            swe.SE_SUN,
            iflag
        )[0]
    );
    const snext = MOD360(
        swe.swe_calc_ut(
            sunrise_jd + ((30.0 - tithi.lunarphase) / 360.0) * 30.0,
            swe.SE_SUN,
            iflag
        )[0]
    );
    const m1 = Math.floor(slast / 30.0) + 1;
    const m2 = Math.floor(snext / 30.0) + 1;
    const masa_num = m1 === m2 ? (m1 % 12) + 1 : (m1 % 12) + 1;

    // Samvatsara
    const ahargana = tjd_ut - 588465.5;
    const sidereal_year = 365.25636;
    let kali = Math.ceil((ahargana + (4 - masa_num) * 30) / sidereal_year);
    if (kali >= 4009) {
        kali = kali - 14;
    }
    const saka_samvat = kali - 3179;
    const vikrama_samvat = saka_samvat + 135;
    const samvatsara_num =
        (kali + 27 + Math.floor((kali * 211 - 108) / 18000)) % 60;

    const rahu_kalam = calculaterahu_kalam(sunrise_jd, sunset_jd, vara.num);

    // Cleanup
    swe.swe_close();

    return {
        datetime,
        latitude,
        longitude,
        sun_rashi,
        moon_rashi,
        sunrise: jdToDateTime(swe, sunrise_jd),
        sunset: jdToDateTime(swe, sunset_jd),
        moonrise: jdToDateTime(swe, moonrise_jd),
        moonset: jdToDateTime(swe, moonset_jd),
        day_duration: decimalToHMS(day_duration),
        night_duration: decimalToHMS(night_duration),
        vara,
        tithi: {
            ...tithi,
            start_dt: jdToDateTime(swe, tithi_start_jd),
            end_dt: jdToDateTime(swe, tithi_end_jd),
        },
        nakshatra: {
            ...nakshatra,
            start_dt: jdToDateTime(swe, nakshatra_start_jd),
            end_dt: jdToDateTime(swe, nakshatra_end_jd),
        },
        yoga: {
            ...yoga,
            start_dt: jdToDateTime(swe, yoga_start_jd),
            end_dt: jdToDateTime(swe, yoga_end_jd),
        },
        karana: {
            ...karana,
            start_dt: jdToDateTime(swe, karana_start_jd),
            end_dt: jdToDateTime(swe, karana_end_jd),
        },
        masa: getMaaha(masa_num as MaahaNumber),
        samvatsara: getSamvatsara(samvatsara_num),

        kali,
        saka_samvat,
        vikrama_samvat,
        samvatsara_num,
        rahu_kalam: {
            start_dt: jdToDateTime(swe, rahu_kalam.start),
            end_dt: jdToDateTime(swe, rahu_kalam.end),
        },
    };
}
