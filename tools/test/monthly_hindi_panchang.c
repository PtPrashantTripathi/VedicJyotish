/**
 * @file monthly_hindi_panchang.c
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

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include <locale.h>
#include "../../src/services/swisseph-wasm/lib/swephexp.h"

// Configuration
#define GEO_LON 80.37 // Default: Mandla, MP, India
#define GEO_LAT 22.60
#define GEO_ALT 0.0
#define IST_OFFSET (5.5 / 24.0)
#define EPHE_PATH "/storage/emulated/0/VedicJyotish/public/ephe/"

// Constants
#define TITHI_DEGREES 12.0
#define NAKSHATRA_DEGREES (360.0 / 27.0)
#define RASHI_DEGREES 30.0

// Hindi/Devanagari names
const char *TITHI_NAMES_HINDI[] = {
    "शुक्ल प्रतिपदा", "शुक्ल द्वितीया", "शुक्ल तृतीया", "शुक्ल चतुर्थी", "शुक्ल पंचमी",
    "शुक्ल षष्ठी", "शुक्ल सप्तमी", "शुक्ल अष्टमी", "शुक्ल नवमी", "शुक्ल दशमी",
    "शुक्ल एकादशी", "शुक्ल द्वादशी", "शुक्ल त्रयोदशी", "शुक्ल चतुर्दशी", "पूर्णिमा",
    "कृष्ण प्रतिपदा", "कृष्ण द्वितीया", "कृष्ण तृतीया", "कृष्ण चतुर्थी", "कृष्ण पंचमी",
    "कृष्ण षष्ठी", "कृष्ण सप्तमी", "कृष्ण अष्टमी", "कृष्ण नवमी", "कृष्ण दशमी",
    "कृष्ण एकादशी", "कृष्ण द्वादशी", "कृष्ण त्रयोदशी", "कृष्ण चतुर्दशी", "अमावस्या"};

const char *TITHI_NAMES[] = {
    "Shukla Pratipada", "Shukla Dwitiya", "Shukla Tritiya", "Shukla Chaturthi", "Shukla Panchami",
    "Shukla Shashti", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami",
    "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi", "Purnima",
    "Krishna Pratipada", "Krishna Dwitiya", "Krishna Tritiya", "Krishna Chaturthi", "Krishna Panchami",
    "Krishna Shashti", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami",
    "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi", "Amavasya"};

const char *NAKSHATRA_NAMES_HINDI[] = {
    "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु",
    "पुष्य", "आश्लेषा", "मघा", "पूर्व फाल्गुनी", "उत्तर फाल्गुनी", "हस्त", "चित्रा",
    "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा",
    "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्व भाद्रपद", "उत्तर भाद्रपद", "रेवती"};

const char *NAKSHATRA_NAMES[] = {
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu",
    "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
    "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
    "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"};

const char *RASHI_NAMES_HINDI[] = {
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन"};

const char *RASHI_NAMES[12] = {
    "Mesha", "Vrishabha", "Mithuna",
    "Karka", "Simha", "Kanya",
    "Tula", "Vrischika", "Dhanu",
    "Makara", "Kumbha", "Meena"};

const char *MONTH_NAMES_HINDI[] = {
    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"};

const char *MONTH_NAMES[] = {
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
    "December"};

const char *DAY_NAMES_HINDI[] = {
    "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"};

const char *DAY_NAMES[] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
// Structure to hold daily panchang data
typedef struct
{
    int date;
    int month;
    int year;
    char day_name[30];

    // Tithi
    char tithi_name[30];
    char tithi_end_time[30];

    // Nakshatra
    char nakshatra_name[30];
    char nakshatra_end_time[30];

    // Moon Rashi
    char moon_rashi[30];
    char moon_rashi_end_time[30];

    // Sun timings
    char sunrise_time[30];
    char sunset_time[30];

} DailyPanchang;

/**
 * Convert JD UT to IST time string (HH:MM format)
 */
void jd_to_time_string(double jd_ut, char *buffer, size_t buffer_size)
{
    double jd_ist = jd_ut + IST_OFFSET;
    int year, month, day;
    double time_of_day;

    swe_revjul(jd_ist, SE_GREG_CAL, &year, &month, &day, &time_of_day);

    int hour = (int)floor(time_of_day);
    int min = (int)floor((time_of_day - hour) * 60.0);

    snprintf(buffer, buffer_size, "%02d:%02d", hour, min);
}

/**
 * Convert JD UT to full IST date-time string
 */
void jd_to_full_string(double jd_ut, char *buffer, size_t buffer_size)
{
    double jd_ist = jd_ut + IST_OFFSET;
    int year, month, day;
    double time_of_day;

    swe_revjul(jd_ist, SE_GREG_CAL, &year, &month, &day, &time_of_day);

    int hour = (int)floor(time_of_day);
    int min = (int)floor((time_of_day - hour) * 60.0);

    snprintf(buffer, buffer_size, "%02d %s %02d:%02d",
             day, MONTH_NAMES[month - 1], hour, min);
}

/**
 * Optimized lunar event finder
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

    // Initial estimate
    double angle_diff = target_angle - current_sep;
    if (angle_diff > 180.0)
        angle_diff -= 360.0;
    if (angle_diff < -180.0)
        angle_diff += 360.0;

    double jd_est = jd_start + (angle_diff / relative_speed);

    // Refine with max 2 iterations
    for (int i = 0; i < 2; i++)
    {
        swe_calc_ut(jd_est, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
        swe_calc_ut(jd_est, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

        current_sep = fmod(xx_moon[0] - xx_sun[0] + 360.0, 360.0);
        relative_speed = xx_moon[3] - xx_sun[3];

        angle_diff = target_angle - current_sep;
        if (angle_diff > 180.0)
            angle_diff -= 360.0;
        if (angle_diff < -180.0)
            angle_diff += 360.0;

        if (fabs(angle_diff) < 0.001)
            break;

        if (relative_speed != 0)
        {
            jd_est += angle_diff / relative_speed;
        }
    }

    return jd_est;
}

/**
 * Calculate daily panchang for given date
 */
void calculate_daily_panchang(double jd_start, double geopos[3], DailyPanchang *dp)
{
    char serr[AS_MAXCH];
    double xx_sun[6], xx_moon[6];

    // Convert JD to date
    double jd_ist = jd_start + IST_OFFSET;
    int year, month, day;
    double time_of_day;
    swe_revjul(jd_ist, SE_GREG_CAL, &year, &month, &day, &time_of_day);

    dp->date = day;
    dp->month = month;
    dp->year = year;

    // Day name
    int day_num = swe_day_of_week(jd_start);
    strcpy(dp->day_name, DAY_NAMES[day_num]);

    // Get celestial positions at start of day
    swe_calc_ut(jd_start, SE_SUN, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_sun, serr);
    swe_calc_ut(jd_start, SE_MOON, SEFLG_SWIEPH | SEFLG_SPEED | SEFLG_SIDEREAL, xx_moon, serr);

    double sun_lon = xx_sun[0];
    double moon_lon = xx_moon[0];

    // === TITHI CALCULATION ===
    double lunarphase = fmod(moon_lon - sun_lon + 360.0, 360.0);
    int tithi_num = (int)floor(lunarphase / TITHI_DEGREES) + 1;
    if (tithi_num > 30)
        tithi_num = 30;

    strcpy(dp->tithi_name, TITHI_NAMES[tithi_num - 1]);

    // Find tithi end time
    double tithi_end_angle = tithi_num * TITHI_DEGREES;
    if (tithi_end_angle >= 360.0)
        tithi_end_angle = 0.0;

    double tithi_end_jd = find_lunar_event_time(jd_start, tithi_end_angle);

    // If tithi doesn't end today, find next day's tithi end
    if (tithi_end_jd > jd_start + 1.0)
    {
        strcpy(dp->tithi_end_time, "next day");
    }
    else
    {
        jd_to_time_string(tithi_end_jd, dp->tithi_end_time, sizeof(dp->tithi_end_time));
    }

    // === NAKSHATRA CALCULATION ===
    int nak_num = (int)floor(moon_lon / NAKSHATRA_DEGREES) + 1;
    if (nak_num > 27)
        nak_num = 27;

    strcpy(dp->nakshatra_name, NAKSHATRA_NAMES[nak_num - 1]);

    // Find nakshatra end time using swe_mooncross_ut
    double nak_end_lon = nak_num * NAKSHATRA_DEGREES;
    if (nak_end_lon >= 360.0)
        nak_end_lon = 0.0;

    double nak_end_jd = swe_mooncross_ut(nak_end_lon, jd_start, SEFLG_SIDEREAL, serr);

    if (nak_end_jd > jd_start + 1.0 || nak_end_jd < jd_start)
    {
        strcpy(dp->nakshatra_end_time, "next day");
    }
    else
    {
        jd_to_time_string(nak_end_jd, dp->nakshatra_end_time, sizeof(dp->nakshatra_end_time));
    }

    // === MOON RASHI CALCULATION ===
    int moon_rashi_num = (int)floor(moon_lon / RASHI_DEGREES) + 1;
    if (moon_rashi_num > 12)
        moon_rashi_num = 12;

    strcpy(dp->moon_rashi, RASHI_NAMES[moon_rashi_num - 1]);

    // Find moon rashi change time
    double rashi_end_lon = moon_rashi_num * RASHI_DEGREES;
    if (rashi_end_lon >= 360.0)
        rashi_end_lon = 0.0;

    double rashi_end_jd = swe_mooncross_ut(rashi_end_lon, jd_start, SEFLG_SIDEREAL, serr);

    if (rashi_end_jd > jd_start + 1.0 || rashi_end_jd < jd_start)
    {
        strcpy(dp->moon_rashi_end_time, "next day");
    }
    else
    {
        jd_to_time_string(rashi_end_jd, dp->moon_rashi_end_time, sizeof(dp->moon_rashi_end_time));
    }

    // === SUNRISE/SUNSET CALCULATION ===
    double sunrise_jd, sunset_jd;

    if (swe_rise_trans(jd_start, SE_SUN, NULL, SEFLG_SWIEPH, SE_CALC_RISE, geopos, 0, 0, &sunrise_jd, serr) != ERR)
    {
        jd_to_time_string(sunrise_jd, dp->sunrise_time, sizeof(dp->sunrise_time));
    }
    else
    {
        strcpy(dp->sunrise_time, "N/A");
    }

    if (swe_rise_trans(jd_start, SE_SUN, NULL, SEFLG_SWIEPH, SE_CALC_SET, geopos, 0, 0, &sunset_jd, serr) != ERR)
    {
        jd_to_time_string(sunset_jd, dp->sunset_time, sizeof(dp->sunset_time));
    }
    else
    {
        strcpy(dp->sunset_time, "N/A");
    }
}

/**
 * Print monthly panchang in formatted table
 */
/**
 * Print monthly panchang in formatted table (English)
 */
void print_monthly_panchang(DailyPanchang *month_data, int days_in_month, int month, int year)
{
    // Print header
    printf("\n");
    printf("╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n");
    printf("║                                                 Monthly Panchang - %-4d %-9s                                               ║\n", year, MONTH_NAMES[month - 1]);
    printf("╠════════╤═══════════╤═════════════════════╤══════════╤═══════════════════╤══════════╤═══════════╤══════════╤══════════╤══════════╣\n");
    printf("║ Date   │ Day       │ Tithi               │ End      │ Nakshatra         │ End      │ Moon Rashi│ End      │ Sunrise  │ Sunset   ║\n");
    printf("╠════════╪═══════════╪═════════════════════╪══════════╪═══════════════════╪══════════╪═══════════╪══════════╪══════════╪══════════╣\n");

    // Print daily data
    for (int i = 0; i < days_in_month; i++)
    {
        printf("║ %2d     │ %-9s │ %-19s │ %-8s │ %-17s │ %-8s │ %-9s │ %-8s │ %-8s │ %-8s ║\n",
               month_data[i].date,
               month_data[i].day_name,
               month_data[i].tithi_name,
               month_data[i].tithi_end_time,
               month_data[i].nakshatra_name,
               month_data[i].nakshatra_end_time,
               month_data[i].moon_rashi,
               month_data[i].moon_rashi_end_time,
               month_data[i].sunrise_time,
               month_data[i].sunset_time);
    }

    printf("╚════════╧═══════════╧═════════════════════╧══════════╧═══════════════════╧══════════╧═══════════╧══════════╧══════════╧══════════╝\n");
    printf("\n");
}

/**
 * Get number of days in month
 */
int get_days_in_month(int month, int year)
{
    int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    if (month == 2)
    {
        // Check for leap year
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
        {
            return 29;
        }
    }

    return days[month - 1];
}

/**
 * Main function
 */
int main(int argc, char *argv[])
{
    // Set locale for UTF-8 support
    setlocale(LC_ALL, "en_US.UTF-8");

    // Initialize Swiss Ephemeris
    swe_set_ephe_path(EPHE_PATH);
    swe_set_sid_mode(SE_SIDM_LAHIRI, 0, 0);

    double geopos[3] = {GEO_LON, GEO_LAT, GEO_ALT};
    swe_set_topo(GEO_LON, GEO_LAT, GEO_ALT);

    // Get current date or use provided month/year
    int month, year;
    if (argc >= 3)
    {
        month = atoi(argv[1]);
        year = atoi(argv[2]);
    }
    else
    {
        time_t now = time(NULL);
        struct tm *tm_local = localtime(&now);
        month = tm_local->tm_mon + 1;
        year = tm_local->tm_year + 1900;
    }

    if (argc >= 5)
    {
        geopos[1] = atof(argv[3]); // Latitude
        geopos[0] = atof(argv[4]); // Longitude
    }

    printf("Location: Latitude %.2f°, Longitude %.2f°\n", geopos[1], geopos[0]);

    int days_in_month = get_days_in_month(month, year);
    DailyPanchang month_data[31]; // Max days in month

    char serr[AS_MAXCH];

    // Calculate for each day of the month
    for (int day = 1; day <= days_in_month; day++)
    {
        double dret[2];
        if (swe_utc_to_jd(year, month, day, 0, 0, 0, SE_GREG_CAL, dret, serr) == ERR)
        {
            printf("Error converting date to JD: %s\n", serr);
            continue;
        }

        calculate_daily_panchang(dret[1], geopos, &month_data[day - 1]);

        // Progress indicator
        fflush(stdout);
    }

    // Print the complete monthly panchang
    print_monthly_panchang(month_data, days_in_month, month, year);

    printf("Note: Time is given in IST (Indian Standard Time)\n");
    printf("'Next day' means that the date/nakshatra will end on the following day\n");

    swe_close();
    return 0;
}
