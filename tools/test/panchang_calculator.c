/**
 * @file panchang_calculator.c
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

// gcc -O0 -Wno-deprecated-declarations  -fsanitize=address -g tools/test/panchang_calculator.c src/services/swisseph-wasm/lib/*.c -o main && ./main

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include "../../src/services/swisseph-wasm/lib/swephexp.h"

// Configuration
// Location: Mandla, Madhya Pradesh, India
#define GEO_LON 80.37 // Mandla, MP, India
#define GEO_LAT 22.60
#define GEO_ALT 0.0 // Altitude in meters

// Timezone Offset for IST (Indian Standard Time)
#define IST_OFFSET (5.5 / 24.0)

// Path to Swiss Ephemeris data files.
// Change this to the directory where you've stored the 'sepl_18.se1', etc. files.
#define EPHE_PATH "/Users/ptripathi/code/VedicJyotish/public/ephe/"

// Constants for calculations
#define TITHI_DEGREES 12.0
#define NAKSHATRA_DEGREES (360.0 / 27.0)
#define YOGA_DEGREES (360.0 / 27.0)
#define KARANA_DEGREES 6.0

// Data Arrays for Panchang Element Names
const char *TITHI_NAMES[] = {
    "Shukla Pratipada", "Shukla Dwitiya", "Shukla Tritiya", "Shukla Chaturthi", "Shukla Panchami",
    "Shukla Shashti", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami",
    "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi", "Purnima",
    "Krishna Pratipada", "Krishna Dwitiya", "Krishna Tritiya", "Krishna Chaturthi", "Krishna Panchami",
    "Krishna Shashti", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami",
    "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi", "Amavasya"};

const char *NAKSHATRA_NAMES[] = {
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu",
    "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
    "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
    "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"};

const char *YOGA_NAMES[] = {
    "Vishkambha", "Priti", "Ayushmana", "Saubhagya", "Shobhana", "Atiganda", "Sukarman",
    "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
    "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
    "Shukla", "Brahma", "Indra", "Vaidhriti"};

const char *KARANA_NAMES[] = {
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)",
    // Repeating Karanas
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)",
    // Fixed Karanas
    "Shakuni", "Chatushpada", "Naga", "Kimstughna"};

const char *VARA_NAMES[] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

const char *rasi_names[12] = {
    "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)",
    "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)",
    "Tula (Libra)", "Vrischika (Scorpio)", "Dhanu (Sagittarius)",
    "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"};

/**
 * @brief Converts a Julian Day (UT) to a readable IST date-time string.
 *
 * @param jd_ut The Julian Day in Universal Time.
 * @param buffer A character buffer to store the resulting string.
 * @param buffer_size The size of the buffer.
 */
void jd_ut_to_ist_string(double jd_ut, char *buffer, size_t buffer_size)
{
    double jd_ist = jd_ut + IST_OFFSET;
    int year, month, day;
    double time_of_day;

    // Correct function to convert Julian Day to calendar date is swe_revjul
    swe_revjul(jd_ist, SE_GREG_CAL, &year, &month, &day, &time_of_day);

    // Convert the fractional time of day into H:M:S
    int hour = (int)floor(time_of_day);
    int min = (int)floor((time_of_day - hour) * 60.0);
    double sec = (((time_of_day - hour) * 60.0) - min) * 60.0;

    snprintf(buffer, buffer_size, "%04d-%02d-%02d %02d:%02d:%02.0f IST",
             year, month, day, hour, min, floor(sec));
}

/**
 * @brief Finds the precise time for a lunar event (Tithi/Karana) crossing.
 * This is when the angular separation between the Moon and Sun reaches a specific degree.
 *
 * @param jd_start The Julian Day to start searching from.
 * @param target_angle The target angular separation in degrees.
 * @return The Julian Day (UT) of the event.
 */
double find_lunar_event_time(double jd_start, double target_angle)
{
    double xx_sun[6], xx_moon[6];
    char serr[AS_MAXCH];

    // Get current positions and speeds
    swe_calc_ut(jd_start, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
    swe_calc_ut(jd_start, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

    double current_sep = fmod(xx_moon[0] - xx_sun[0] + 360.0, 360.0);
    double relative_speed = xx_moon[3] - xx_sun[3];

    // initial estimate
    double angle_diff = target_angle - current_sep;
    if (angle_diff > 180.0)
        angle_diff -= 360.0;
    if (angle_diff < -180.0)
        angle_diff += 360.0;

    // Initial approximation
    double jd_estimated = jd_start + (angle_diff / relative_speed);

    // Refine with maximum 5 iterations
    for (int i = 0; i < 5; i++)
    {
        // Calculate Sun and Moon positions at the current estimated time
        swe_calc_ut(jd_estimated, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
        swe_calc_ut(jd_estimated, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

        // Calculate current separation, handling the 360-degree wrap-around
        current_sep = fmod(xx_moon[0] - xx_sun[0] + 360.0, 360.0);
        // Relative speed of Moon with respect to Sun
        relative_speed = xx_moon[3] - xx_sun[3];

        // Difference from target
        angle_diff = target_angle - current_sep;
        // Handle wrap-around for the difference itself
        if (angle_diff > 180.0)
            angle_diff -= 360.0;
        if (angle_diff < -180.0)
            angle_diff += 360.0;

        if (fabs(angle_diff) < 0.001)
            break; // Sufficient precision

        if (relative_speed != 0) // Avoid division by zero
        {
            // Estimate time correction and update the Julian Day
            jd_estimated += angle_diff / relative_speed;
        }
    }

    return jd_estimated;
}

/**
 * @brief Finds the precise time for the sum of Sun and Moon longitudes to cross a specific degree (for Yoga).
 *
 * @param jd_start The Julian Day to start searching from.
 * @param target_lon The target combined longitude.
 * @return The Julian Day (UT) of the event.
 */
double find_yoga_crossing_time(double jd_start, double target_lon)
{
    double xx_sun[6], xx_moon[6];
    char serr[AS_MAXCH];

    // Get initial positions and speeds
    swe_calc_ut(jd_start, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
    swe_calc_ut(jd_start, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

    double combined_lon = fmod(xx_sun[0] + xx_moon[0], 360.0);
    double combined_speed = xx_sun[3] + xx_moon[3];

    // Initial estimate
    double angle_diff = target_lon - combined_lon;
    if (angle_diff > 180.0)
        angle_diff -= 360.0;
    if (angle_diff < -180.0)
        angle_diff += 360.0;

    double jd_estimated = jd_start + (angle_diff / combined_speed);

    // Refine with maximum 5 iterations
    for (int i = 0; i < 5; i++)
    {
        swe_calc_ut(jd_estimated, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
        swe_calc_ut(jd_estimated, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

        combined_lon = fmod(xx_sun[0] + xx_moon[0], 360.0);
        combined_speed = xx_sun[3] + xx_moon[3];

        angle_diff = target_lon - combined_lon;
        if (angle_diff > 180.0)
            angle_diff -= 360.0;
        if (angle_diff < -180.0)
            angle_diff += 360.0;

        if (fabs(angle_diff) < 0.001)
            break;

        if (combined_speed != 0)
        {
            jd_estimated += angle_diff / combined_speed;
        }
    }

    return jd_estimated;
}

/**
 * Main calculation function
 */
int main()
{
    // Initialization
    swe_set_ephe_path(EPHE_PATH);
    swe_set_sid_mode(SE_SIDM_LAHIRI, 0, 0);
    // Location settings
    double geopos[3] = {GEO_LON, GEO_LAT, GEO_ALT};
    swe_set_topo(GEO_LON, GEO_LAT, GEO_ALT);

    // Get current time
    time_t now = time(NULL);
    struct tm *tm_gmt = gmtime(&now);

    int year = tm_gmt->tm_year + 1900;
    int month = tm_gmt->tm_mon + 1;
    int day = tm_gmt->tm_mday;

    // Convert current system time (UTC) to Julian Day UT
    double dret[2];
    char serr[AS_MAXCH];
    char time_str[80];

    if (swe_utc_to_jd(year, month, day, 0, 0, 0, SE_GREG_CAL, dret, serr) == ERR)
    {
        printf("Error converting UTC to JD: %s\n", serr);
        return 1;
    }
    double tjd_ut = dret[1];

    jd_ut_to_ist_string(tjd_ut, time_str, sizeof(time_str));
    printf("Panchang Calculation for: %s\n", time_str);
    printf("Location: Lon %.2f E, Lat %.2f N\n", geopos[0], geopos[1]);

    // Calculate rise/set times
    double sunrise_jd, sunset_jd, moonrise_jd, moonset_jd;

    printf("\n--- Sunrise, Sunset, Moonrise, Moonset ---\n");

    // Use more efficient rise/set calculation
    if (swe_rise_trans(tjd_ut, SE_SUN, NULL, SEFLG_SWIEPH, SE_CALC_RISE, geopos, 0, 0, &sunrise_jd, serr) != ERR)
    {
        jd_ut_to_ist_string(sunrise_jd, time_str, sizeof(time_str));
        printf("Sunrise:  %s\n", time_str);
    }

    if (swe_rise_trans(sunrise_jd, SE_SUN, NULL, SEFLG_SWIEPH, SE_CALC_SET, geopos, 0, 0, &sunset_jd, serr) != ERR)
    {
        jd_ut_to_ist_string(sunset_jd, time_str, sizeof(time_str));
        printf("Sunset:   %s\n", time_str);
    }

    if (swe_rise_trans(sunrise_jd, SE_MOON, NULL, SEFLG_SWIEPH, SE_CALC_RISE, geopos, 0, 0, &moonrise_jd, serr) != ERR)
    {
        jd_ut_to_ist_string(moonrise_jd, time_str, sizeof(time_str));
        printf("Moonrise: %s\n", time_str);
    }

    if (swe_rise_trans(moonrise_jd, SE_MOON, NULL, SEFLG_SWIEPH, SE_CALC_SET, geopos, 0, 0, &moonset_jd, serr) != ERR)
    {
        jd_ut_to_ist_string(moonset_jd, time_str, sizeof(time_str));
        printf("Moonset:  %s\n", time_str);
    }

    // calculate_panchang;

    // 1. Get Sun and Moon positions at the given time
    double xx_sun[6], xx_moon[6];

    if (swe_calc_ut(tjd_ut, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr) == ERR)
    {
        printf("Error calculating Sun position: %s\n", serr);
        return 1;
    }

    if (swe_calc_ut(tjd_ut, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr) == ERR)
    {
        printf("Error calculating Moon position: %s\n", serr);
        return 1;
    }

    double sun_lon = xx_sun[0];
    double moon_lon = xx_moon[0];
    double combined_lon = fmod(sun_lon + moon_lon, 360.0);

    // Display Sun and Moon info
    printf("\n--- Celestial Positions ---\n");
    int rasi_number = (int)(sun_lon / 30.0) + 1;
    double deg_in_rasi = fmod(sun_lon, 30.0);
    printf("Sun:  Rasi %d (%s) - %.2f°\n", rasi_number, rasi_names[rasi_number - 1], deg_in_rasi);

    rasi_number = (int)(moon_lon / 30.0) + 1;
    deg_in_rasi = fmod(moon_lon, 30.0);
    printf("Moon: Rasi %d (%s) - %.2f°\n", rasi_number, rasi_names[rasi_number - 1], deg_in_rasi);

    printf("\n--- Panchang Details ---\n");

    // 1. Vara (Weekday) - No calculation needed, direct function
    int vara_num = swe_day_of_week(sunrise_jd + IST_OFFSET);
    printf("Vara:      %s\n", VARA_NAMES[vara_num]);

    // 2. Tithi - Optimized calculation
    double lunarphase = fmod(moon_lon - sun_lon + 360.0, 360.0);
    int tithi_num = (int)floor(lunarphase / TITHI_DEGREES) + 1;

    double tithi_start_angle = (tithi_num - 1) * TITHI_DEGREES;
    double tithi_end_angle = tithi_num * TITHI_DEGREES;

    double tithi_start_jd = find_lunar_event_time(tjd_ut - 0.5, tithi_start_angle);
    double tithi_end_jd = find_lunar_event_time(tjd_ut, tithi_end_angle);

    printf("Tithi:     %s\n", TITHI_NAMES[tithi_num - 1]);
    jd_ut_to_ist_string(tithi_start_jd, time_str, sizeof(time_str));
    printf("           Starts: %s\n", time_str);
    jd_ut_to_ist_string(tithi_end_jd, time_str, sizeof(time_str));
    printf("           Ends:   %s\n", time_str);

    // 3. Nakshatra - Use direct swe_mooncross_ut
    int nak_num = (int)floor(moon_lon / NAKSHATRA_DEGREES) + 1;
    double nak_start_lon = (nak_num - 1) * NAKSHATRA_DEGREES;
    double nak_end_lon = nak_num * NAKSHATRA_DEGREES;

    double nak_start_jd = swe_mooncross_ut(nak_start_lon, tjd_ut - 1.0, SEFLG_SIDEREAL, serr);
    double nak_end_jd = swe_mooncross_ut(nak_end_lon, tjd_ut, SEFLG_SIDEREAL, serr);

    printf("Nakshatra: %s\n", NAKSHATRA_NAMES[nak_num - 1]);
    jd_ut_to_ist_string(nak_start_jd, time_str, sizeof(time_str));
    printf("           Starts: %s\n", time_str);
    jd_ut_to_ist_string(nak_end_jd, time_str, sizeof(time_str));
    printf("           Ends:   %s\n", time_str);

    // 4. Yoga - Optimized calculation
    int yoga_num = (int)floor(combined_lon / YOGA_DEGREES) + 1;
    double yoga_start_lon = (yoga_num - 1) * YOGA_DEGREES;
    double yoga_end_lon = yoga_num * YOGA_DEGREES;

    double yoga_start_jd = find_yoga_crossing_time(tjd_ut - 0.5, yoga_start_lon);
    double yoga_end_jd = find_yoga_crossing_time(tjd_ut, yoga_end_lon);

    printf("Yoga:      %s\n", YOGA_NAMES[yoga_num - 1]);
    jd_ut_to_ist_string(yoga_start_jd, time_str, sizeof(time_str));
    printf("           Starts: %s\n", time_str);
    jd_ut_to_ist_string(yoga_end_jd, time_str, sizeof(time_str));
    printf("           Ends:   %s\n", time_str);

    // 5. Karana - Optimized calculation
    int karana_idx = (int)floor(lunarphase / KARANA_DEGREES);
    const char *karana_name;

    // Handle fixed karanas
    if (karana_idx == 57)
        karana_name = KARANA_NAMES[14]; // Shakuni
    else if (karana_idx == 58)
        karana_name = KARANA_NAMES[15]; // Chatushpada
    else if (karana_idx == 59)
        karana_name = KARANA_NAMES[16]; // Naga
    else if (karana_idx == 0)
        karana_name = KARANA_NAMES[17]; // Kimstughna
    else
        karana_name = KARANA_NAMES[karana_idx % 7];

    double karana_start_angle = karana_idx * KARANA_DEGREES;
    double karana_end_angle = (karana_idx + 1) * KARANA_DEGREES;

    double karana_start_jd = find_lunar_event_time(tjd_ut - 0.25, karana_start_angle);
    double karana_end_jd = find_lunar_event_time(tjd_ut, karana_end_angle);

    printf("Karana:    %s\n", karana_name);
    jd_ut_to_ist_string(karana_start_jd, time_str, sizeof(time_str));
    printf("           Starts: %s\n", time_str);
    jd_ut_to_ist_string(karana_end_jd, time_str, sizeof(time_str));
    printf("           Ends:   %s\n", time_str);

    // --- Cleanup ---
    swe_close();
    return 0;
}