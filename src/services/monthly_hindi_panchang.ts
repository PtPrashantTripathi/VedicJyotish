/**
 * @file Monthly_hindi_panchang.c
 * @brief Monthly Hindi Panchang Calculator with optimized calculations
 *
 * Calculates for entire month:
 * - Daily Tithi with end time
 * - Moon Rashi with end time
 * - Sunrise and Sunset times
 * - Nakshatra with end time
 *
 * Output in Hindi with Devanagari script support
 */

// gcc -O0 -Wno-deprecated-declarations  -fsanitize=address -g tools/test/monthly_hindi_panchang.c src/services/swisseph-wasm/lib/*.c -o main && ./main

import { toFixedLengthArray } from "fixed-len-array";
import SwissEPH from "sweph-wasm";

// Configuration
// Location: Mandla, Madhya Pradesh, India
const GEO_LON = 80.37; // Mandla, MP, India
const GEO_LAT = 22.6;
const GEO_ALT = 0.0; // Altitude in meters

// Timezone Offset for IST (Indian Standard Time)
const IST_OFFSET = 5.5 / 24.0;

// Constants
// Constants for calculations
const TITHI_DEGREES = 12.0;
const NAKSHATRA_DEGREES = 360.0 / 27.0;
const RASHI_DEGREES = 360.0 / 12.0;

// Hindi/Devanagari names
const TITHI_NAMES = [
    "Shukla Pratipada",
    "Shukla Dwitiya",
    "Shukla Tritiya",
    "Shukla Chaturthi",
    "Shukla Panchami",
    "Shukla Shashti",
    "Shukla Saptami",
    "Shukla Ashtami",
    "Shukla Navami",
    "Shukla Dashami",
    "Shukla Ekadashi",
    "Shukla Dwadashi",
    "Shukla Trayodashi",
    "Shukla Chaturdashi",
    "Purnima",
    "Krishna Pratipada",
    "Krishna Dwitiya",
    "Krishna Tritiya",
    "Krishna Chaturthi",
    "Krishna Panchami",
    "Krishna Shashti",
    "Krishna Saptami",
    "Krishna Ashtami",
    "Krishna Navami",
    "Krishna Dashami",
    "Krishna Ekadashi",
    "Krishna Dwadashi",
    "Krishna Trayodashi",
    "Krishna Chaturdashi",
    "Amavasya",
];

const NAKSHATRA_NAMES = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashirsha",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishtha",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati",
];

const RASHI_NAMES = [
    "Mesha",
    "Vrishabha",
    "Mithuna",
    "Karka",
    "Simha",
    "Kanya",
    "Tula",
    "Vrischika",
    "Dhanu",
    "Makara",
    "Kumbha",
    "Meena",
];

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DAY_NAMES = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
// Structure to hold daily panchang data
interface DailyPanchang {
    date: number;
    month: number;
    year: number;
    day_name: string;

    // Tithi
    tithi_name: string;
    tithi_end_time: string;

    // Nakshatra
    nakshatra_name: string;
    nakshatra_end_time: string;

    // Moon Rashi
    moon_rashi: string;
    moon_rashi_end_time: string;

    // Sun timings
    sunrise_time: string;
    sunset_time: string;
}

globalThis.swe = await SwissEPH.init("./assets/swisseph.wasm");
// Path to Swiss Ephemeris data files.
await swe.swe_set_ephe_path("assets/ephe", [
    "seas_18.se1",
    "sepl_18.se1",
    "semo_18.se1",
    "sefstars.txt",
]);

/** Convert JD UT to IST time string (HH:MM format) */
function jd_to_time_string(jd_ut: number) {
    const jd_ist = jd_ut + IST_OFFSET;

    // Correct function to convert Julian Day to calendar date is swe_revjul
    const dt = swe.swe_revjul(jd_ist, swe.SE_GREG_CAL);

    // Convert the fractional time of day into H:M:S
    const hour = Math.trunc(dt.hour);
    const min = Math.trunc((dt.hour - hour) * 60.0);

    return `${hour}:${min}`;
}

function fmod(angle: number, mod: number): number {
    return angle % mod;
}

/** Optimized lunar event finder */
function find_lunar_event_time(jd_start: number, target_angle: number): number {
    // Get current positions and speeds
    let xx_sun = swe.swe_calc_ut(
        jd_start,
        swe.SE_SUN,
        swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
    );
    let xx_moon = swe.swe_calc_ut(
        jd_start,
        swe.SE_MOON,
        swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
    );

    let current_sep = fmod(xx_moon[0] - xx_sun[0] + 360.0, 360.0);
    let relative_speed = xx_moon[3] - xx_sun[3];

    // Initial estimate
    let angle_diff = target_angle - current_sep;
    if (angle_diff > 180.0) angle_diff -= 360.0;
    if (angle_diff < -180.0) angle_diff += 360.0;

    let jd_estimated = jd_start + angle_diff / relative_speed;

    // Refine with max 2 iterations
    for (let i = 0; i < 2; i++) {
        xx_sun = swe.swe_calc_ut(
            jd_estimated,
            swe.SE_SUN,
            swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
        );
        xx_moon = swe.swe_calc_ut(
            jd_estimated,
            swe.SE_MOON,
            swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
        );

        current_sep = fmod(xx_moon[0] - xx_sun[0] + 360.0, 360.0);
        relative_speed = xx_moon[3] - xx_sun[3];

        angle_diff = target_angle - current_sep;
        if (angle_diff > 180.0) angle_diff -= 360.0;
        if (angle_diff < -180.0) angle_diff += 360.0;

        if (Math.abs(angle_diff) < 0.001) break;

        if (relative_speed !== 0) {
            jd_estimated += angle_diff / relative_speed;
        }
    }

    return jd_estimated;
}

/** Calculate daily panchang for given date */
function calculate_daily_panchang(
    jd_start: number,
    geopos: [longitude: number, latitude: number, elevation: number]
): DailyPanchang {
    // Convert JD to date
    const jd_ist = jd_start + IST_OFFSET;
    const dt = swe.swe_revjul(jd_ist, swe.SE_GREG_CAL);

    const dp: DailyPanchang = {
        date: dt.day,
        month: dt.month,
        year: dt.year,

        // Day name
        day_name: DAY_NAMES[swe.swe_day_of_week(jd_start)],
        tithi_name: "",
        tithi_end_time: "",
        nakshatra_name: "",
        nakshatra_end_time: "",
        moon_rashi: "",
        moon_rashi_end_time: "",
        sunrise_time: "",
        sunset_time: "",
    };

    // Get celestial positions at start of day
    const xx_sun = swe.swe_calc_ut(
        jd_start,
        swe.SE_SUN,
        swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
    );
    const xx_moon = swe.swe_calc_ut(
        jd_start,
        swe.SE_MOON,
        swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL
    );

    const sun_lon = xx_sun[0];
    const moon_lon = xx_moon[0];

    // === TITHI CALCULATION ===
    const lunarphase = fmod(moon_lon - sun_lon + 360.0, 360.0);
    let tithi_num = Math.trunc(lunarphase / TITHI_DEGREES) + 1;
    if (tithi_num > 30) tithi_num = 30;

    dp.tithi_name = TITHI_NAMES[tithi_num - 1];

    // Find tithi end time
    let tithi_end_angle = tithi_num * TITHI_DEGREES;
    if (tithi_end_angle >= 360.0) tithi_end_angle = 0.0;

    const tithi_end_jd = find_lunar_event_time(jd_start, tithi_end_angle);

    // If tithi doesn't end today, find next day's tithi end
    if (tithi_end_jd > jd_start + 1.0) {
        dp.tithi_end_time = "next day";
    } else {
        dp.tithi_end_time = jd_to_time_string(tithi_end_jd);
    }

    // === NAKSHATRA CALCULATION ===
    let nak_num = Math.trunc(moon_lon / NAKSHATRA_DEGREES) + 1;
    if (nak_num > 27) nak_num = 27;

    dp.nakshatra_name = NAKSHATRA_NAMES[nak_num - 1];

    // Find nakshatra end time using swe_mooncross_ut
    let nak_end_lon = nak_num * NAKSHATRA_DEGREES;
    if (nak_end_lon >= 360.0) nak_end_lon = 0.0;

    const nak_end_jd = swe.swe_mooncross_ut(
        nak_end_lon,
        jd_start,
        swe.SEFLG_SIDEREAL
    );

    if (nak_end_jd > jd_start + 1.0 || nak_end_jd < jd_start) {
        dp.nakshatra_end_time = "next day";
    } else {
        dp.nakshatra_end_time = jd_to_time_string(nak_end_jd);
    }

    // === MOON RASHI CALCULATION ===
    let moon_rashi_num = Math.trunc(moon_lon / RASHI_DEGREES) + 1;
    if (moon_rashi_num > 12) moon_rashi_num = 12;

    dp.moon_rashi = RASHI_NAMES[moon_rashi_num - 1];

    // Find moon rashi change time
    let rashi_end_lon = moon_rashi_num * RASHI_DEGREES;
    if (rashi_end_lon >= 360.0) rashi_end_lon = 0.0;

    const rashi_end_jd = swe.swe_mooncross_ut(
        rashi_end_lon,
        jd_start,
        swe.SEFLG_SIDEREAL
    );

    if (rashi_end_jd > jd_start + 1.0 || rashi_end_jd < jd_start) {
        dp.moon_rashi_end_time = "next day";
    } else {
        dp.moon_rashi_end_time = jd_to_time_string(rashi_end_jd);
    }

    // === SUNRISE/SUNSET CALCULATION ===
    const sunrise_jd = swe.swe_rise_trans(
        jd_start,
        swe.SE_SUN,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_RISE,
        geopos,
        0,
        0
    );
    dp.sunrise_time = jd_to_time_string(sunrise_jd);

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
    dp.sunset_time = jd_to_time_string(sunset_jd);

    return dp;
}

/** Get number of days in month */
function get_days_in_month(month: number, year: number): number {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        // Check for leap year
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 29;
        }
    }

    return days[month - 1];
}

// Initialization
console.log("swe_version", swe.swe_version());

// Path to Swiss Ephemeris data files.
// Change this to the directory where you've stored the 'sepl_18.se1', etc. files.

swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);
// Location settings
const geopos = toFixedLengthArray([GEO_LON, GEO_LAT, GEO_ALT], 3, 0);
swe.swe_set_topo(GEO_LON, GEO_LAT, GEO_ALT);
// Get current time
const tm_gmt = new Date();

const year = tm_gmt.getUTCFullYear();
const month = tm_gmt.getUTCMonth() + 1;

console.log("Location: Latitude %.2f°, Longitude %.2f°", geopos[1], geopos[0]);

const days_in_month = get_days_in_month(month, year);
const month_data: DailyPanchang[] = [];

// Calculate for each day of the month
for (let day = 1; day <= days_in_month; day++) {
    // Convert current system time (UTC) to Julian Day UT
    const dret = swe.swe_utc_to_jd(year, month, day, 0, 0, 0, swe.SE_GREG_CAL);

    month_data[day - 1] = calculate_daily_panchang(dret[1], geopos);
}

// Print header

console.log("Monthly Panchang", year, MONTH_NAMES[month - 1]);

const data = month_data.map(md => ({
    date: md.date,
    day_name: md.day_name,
    tithi_name: md.tithi_name,
    tithi_end_time: md.tithi_end_time,
    nakshatra_name: md.nakshatra_name,
    nakshatra_end_time: md.nakshatra_end_time,
    moon_rashi: md.moon_rashi,
    moon_rashi_end_time: md.moon_rashi_end_time,
    sunrise_time: md.sunrise_time,
    sunset_time: md.sunset_time,
}));
console.table(data);

console.log("Note: Time is given in IST (Indian Standard Time)");
console.log(
    "'Next day' means that the date/nakshatra will end on the following day"
);

swe.swe_close();
