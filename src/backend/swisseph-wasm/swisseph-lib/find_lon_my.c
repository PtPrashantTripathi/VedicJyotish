/*
 * find_lon.c
 *
 * Find the UT Julian Day when a planet reaches a given ecliptic longitude
 * using Swiss Ephemeris swe_calc_ut() and a bisection refinement.
 *
 * Author: ChatGPT (adapt as needed)
 *
 * Usage concept:
 *   - call find_event_jd(planet_id, target_long_deg, jd_guess, initial_step_days, tol_seconds)
 *
 * Link: -lswe -lm
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "swephexp.h"   /* or <swephexp.h> depending on your include path */
/* If your environment uses "swephexp.h" or "sweph.h" adjust accordingly. */

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

/* Normalize angle to [0,360) */
static double norm360(double a) {
    double r = fmod(a, 360.0);
    if (r < 0.0) r += 360.0;
    return r;
}

/* Signed shortest difference target -> angle in range (-180, +180] */
static double signed_angle_diff(double angle, double target) {
    double diff = norm360(angle) - norm360(target);
    if (diff > 180.0) diff -= 360.0;
    if (diff <= -180.0) diff += 360.0;
    return diff; /* negative means angle < target (shortest sense), positive means > */
}

/* Wrapper to get ecliptic longitude (degrees) of planet at given TJD (UT).
 * planet: Swiss Ephemeris planet constant (e.g. SE_SUN)
 * iflag: flags to pass to swe_calc_ut (e.g. SEFLG_SWIEPH | SEFLG_TRUEPOS / your preferred)
 * returns 0 on success and fills *lon; non-zero on error */
static int planet_longitude_ut(double tjd_ut, int planet, int iflag, double *lon, char *serrbuf) {
    double xx[6];
    int rc = swe_calc_ut(tjd_ut, planet, iflag, xx, serrbuf);
    if (rc < 0) {
        return rc;
    }
    /* xx[0] is ecliptic longitude (degrees) for common return modes */
    *lon = norm360(xx[0]);
    return 0;
}

/* Find crossing time (Julian day UT) when planet reaches target longitude.
 *
 * Input:
 *   planet        : Swiss Ephemeris planet id (SE_SUN, SE_MOON, etc.)
 *   target_deg    : target ecliptic longitude in degrees (0..360)
 *   jd_guess      : rough Julian Day UT guess (use your 1deg/day estimate)
 *   initial_step_days: starting step for bracketing (e.g., 2.0 days)
 *   max_bracket_days  : maximum days to search for a bracket (safety)
 *   iflag         : flags for swe_calc_ut (pass 0 or desired)
 *   tol_seconds   : desired final tolerance in seconds (e.g., 1.0)
 *
 * Returns:
 *   jd of event (Julian day UT) on success (>=0)
 *   negative on failure
 */
double find_event_jd(int planet, double target_deg, double jd_guess,
                     double initial_step_days, double max_bracket_days,
                     int iflag, double tol_seconds) {
    char serr[256] = {0};
    double t0 = jd_guess - initial_step_days; /* start a bit before guess */
    double t1 = jd_guess + initial_step_days;
    double lon0, lon1;
    double diff0, diff1;
    int rc;

    /* Evaluate endpoints */
    rc = planet_longitude_ut(t0, planet, iflag, &lon0, serr);
    if (rc < 0) {
        fprintf(stderr, "swe_calc_ut error at t0 (%.6f): %s\n", t0, serr);
        return -1.0;
    }
    rc = planet_longitude_ut(t1, planet, iflag, &lon1, serr);
    if (rc < 0) {
        fprintf(stderr, "swe_calc_ut error at t1 (%.6f): %s\n", t1, serr);
        return -2.0;
    }

    diff0 = signed_angle_diff(lon0, target_deg);
    diff1 = signed_angle_diff(lon1, target_deg);

    /* If already within tolerance in angle at guess, return guess */
    double ang_tol_deg = 360.0 * (tol_seconds / 86400.0) * 2.0; /* crude mapping; not exact */
    if (fabs(diff1) < 1e-8) return t1;

    /* Expand bracket until sign change or reach maximum search window */
    double step = initial_step_days;
    double total_searched = 2.0 * initial_step_days;
    int iter = 0, max_iters = 2000;

    while (diff0 * diff1 > 0.0 && total_searched < max_bracket_days && iter < max_iters) {
        iter++;
        /* Move forward by step */
        t0 = t1;
        diff0 = diff1;
        t1 = t1 + step;
        total_searched += step;

        rc = planet_longitude_ut(t1, planet, iflag, &lon1, serr);
        if (rc < 0) {
            fprintf(stderr, "swe_calc_ut error while bracketing (t=%.6f): %s\n", t1, serr);
            return -3.0;
        }
        diff1 = signed_angle_diff(lon1, target_deg);

        /* Optionally increase step (exponential) every few iterations to speed up */
        if ((iter % 4) == 0) step *= 2.0;
    }

    if (diff0 * diff1 > 0.0) {
        /* failed to bracket */
        fprintf(stderr, "Failed to bracket crossing within %.1f days\n", total_searched);
        return -4.0;
    }

    /* Now we have bracket [t0, t1] where signed diff changes sign.
     * Use bisection to refine until time range < tol_seconds */
    double tol_days = tol_seconds / 86400.0;
    double mid, lonmid, diffmid;
    int bisect_iter = 0, bisect_max_iter = 100;

    while ((t1 - t0) > tol_days && bisect_iter < bisect_max_iter) {
        bisect_iter++;
        mid = 0.5 * (t0 + t1);
        rc = planet_longitude_ut(mid, planet, iflag, &lonmid, serr);
        if (rc < 0) {
            fprintf(stderr, "swe_calc_ut error during bisection (mid=%.6f): %s\n", mid, serr);
            return -5.0;
        }
        diffmid = signed_angle_diff(lonmid, target_deg);

        /* If diffmid is zero (exact) return mid */
        if (fabs(diffmid) < 1e-12) {
            return mid;
        }

        /* Replace the side that has same sign as mid */
        if (diff0 * diffmid <= 0.0) {
            /* root is in [t0, mid] */
            t1 = mid; diff1 = diffmid;
        } else {
            /* root is in [mid, t1] */
            t0 = mid; diff0 = diffmid;
        }
    }

    /* Return midpoint as best estimate */
    return 0.5 * (t0 + t1);
}

/* Example driver: find when the Sun reaches 38.0 deg near a guessed date.
 * You can replace jd_guess (Julian Day UT) with your estimate.
 */
int main(void) {
    /* Example constants: use Swiss Ephemeris planet constant for Sun: SE_SUN */
    int planet = SE_SUN;
    double target = 38.0; /* degrees ecliptic longitude target */

    /* Example guess: 2025-08-01 00:00 UT -> convert to JD by swe_julday (year, month, day, hour, gregflag) */
    int year = 2025, month = 8, day = 1;
    double hour = 0.0; /* UT */
    int gregflag = SE_GREG_CAL; /* use Gregorian calendar */
    double jd_guess = swe_julday(year, month, day, hour, gregflag);

    /* Flags for calculation (set as desired). Many use SEFLG_SWIEPH | SEFLG_ECL_T or others.
     * If you aren't sure, 0 works but check Swiss Ephemeris docs for recommended flags. */
    int iflag = SEFLG_SWIEPH;

    /* Find event */
    double jd_event = find_event_jd(planet, target, jd_guess, 2.0 /*2 days step*/,
                                    365.0 /*max search window days*/, iflag, 1.0 /*1 sec tol*/);

    if (jd_event < 0.0) {
        fprintf(stderr, "Event search failed, code %.6f\n", jd_event);
        return 1;
    }

    /* Print result: convert JD to calendar date/time */
    int y,m,d;
    double ut;
    swe_revjul(jd_event, SE_GREG_CAL, &y, &m, &d, &ut);
    int hh = (int)ut;
    int mm = (int)((ut - hh) * 60.0);
    double ssd = ((ut - hh) * 60.0 - mm) * 60.0;
    int ss = (int)(ssd + 0.5);

    printf("Event JD (UT): %.9f\n", jd_event);
    printf("Calendar (UT): %04d-%02d-%02d %02d:%02d:%02d\n", y, m, d, hh, mm, ss);

    return 0;
}
