// st33.c calculate random planetary crossings
#include "swephexp.h"
int iflag =  SEFLG_SPEED; 	//global

void print_date(double t, char *txt)
{
  double hour, dsec, dsecfr;
  int iyar, imon, iday, ihour, imin, isec, isgn;
  swe_revjul(t, SE_GREG_CAL, &iyar, &imon, &iday, &hour);
  swe_split_deg(hour, 0, &ihour, &imin, &isec, &dsecfr, &isgn);
  dsec = isec + dsecfr;
  printf("%s\tjd=%.10lf\t%04d/%02d/%02d %02d:%02d:%05.2lf\n", txt, t, iyar, imon, iday, ihour, imin, dsec);
}

// this function appeared originally in swevents.c as part of Swiss Ephemeris.
// It computes a parabola (polynomial of 2nd degree) from three equidistant datapoints
// and find the time moments when the function crossed zero.
// For a planet like the Moon, which has never a change of direction, only one crossing point
// will appear.
/* y00, y11, y2 are values for -2*dx, -dx, 0.
 * find zero points of parabola.
 * return: 0 if none
 * 	   1 if one zero in [-dx.. 0[
 * 	   2 if both zeros in [-dx.. 0[
 */
int find_zero(double y00, double y11, double y2, double dx, 
			double *dxret, double *dxret2)
{
  double a, b, c, x1, x2;
  c = y11;
  b = (y2 - y00) / 2.0;
  a = (y2 + y00) / 2.0 - c;
  if (b * b - 4 * a * c < 0) 
    return 0;
  if (fabs(a) < 1e-100) return 0;
  x1 = (-b + sqrt(b * b - 4 * a * c)) / 2 / a;
  x2 = (-b - sqrt(b * b - 4 * a * c)) / 2 / a;
  // up to here the calcuation was made as if the x-values were -1, 0, 1.
  // This is why below they are shifted by -1
  if (x1 == x2) {
    *dxret = (x1 - 1) * dx;
    *dxret2 = (x1 - 1) * dx;
    return 1;
  }
  if (x1 >=0 && x1 < 1 && x2 >= 0 && x2 < 1) {
    if (x1 > x2) {	// two zeroes, order return values
      *dxret = (x2 - 1) * dx;
      *dxret2 = (x1 - 1) * dx;
    } else {
      *dxret = (x1 - 1) * dx;
      *dxret2 = (x2 - 1) * dx;
    }
    return 2;
  }
  if (x1 >=0 && x1 < 1) {
    *dxret = (x1 - 1) * dx;
    *dxret2 = (x2 - 1) * dx;	// set this value just in case, should not be used.
    return 1;
  } 
  if (x2 >=0 && x2 < 1) {
    *dxret = (x2 - 1) * dx;
    *dxret2 = (x1 - 1) * dx;
    return 1;
  }
  return 0;	// should not happen!
}

// this function lists crossings of planet ipl
// crosses over the the value xcross. 
// return value -1 indicates an error
int find_crossings(double xcross, int ipl, double tstart, double tstep, int nsteps, double movemax, char *serr)
{
  double t0, ym2, ym1 = 0, y0, x0, tc1, tc2, xx[6];
  int n, r, retval;
  char sp[AS_MAXCH];
  // start two steps earlier, to have initial values
  for (n = -1; n < nsteps; n++) {
    t0 = tstart + n * tstep;
    retval = swe_calc_ut(t0, ipl, iflag, xx, serr);
    if (retval < 0) {
      fprintf(stderr, "error at t=%lf, %s\n", t0, serr);
      return ERR;
    }
    x0 = xx[0];
    y0 = swe_difdeg2n(xcross, x0);
    if (n >=  1) { // the first two steps initialize the loop
      // now we have certainly three longitudes xm2, xm1, x0:
      if (fabs(y0) < movemax) {
	r = find_zero(ym2, ym1, y0, tstep, &tc1, &tc2);
	if (r >= 1) {
	  // check for retrograde
	  retval = swe_calc_ut(t0 + tc1, ipl, iflag, xx, serr);
	  if (retval < 0) {
	    fprintf(stderr, "error at t=%lf, %s\n", t0, serr);
	    return ERR;
	  }
	  if (xx[3] < 0) 
	    sprintf(sp, "crossing %lf retrograde", xx[0]);
	  else
	    sprintf(sp, "crossing %lf", xx[0]);
          print_date(t0 + tc1, sp);
        }
	if (r == 2) {
	  // check for retrograde
	  retval = swe_calc_ut(t0 + tc2, ipl, iflag, xx, serr);
	  if (retval < 0) {
	    fprintf(stderr, "error at t=%lf, %s\n", t0, serr);
	    return ERR;
	  }
	  if (xx[3] < 0) 
	    sprintf(sp, "crossing %lf retrograde", xx[0]);
	  else
	    sprintf(sp, "crossing %lf", xx[0]);
          print_date(t0 + tc2, sp);
        }
      }
    }
    ym2 = ym1;
    ym1 = y0;
  }
  return OK;
}

int main(int argc, char *argv[])
{
  double t = 2459580.5;	// 1 Jan 2022
  char serr[AS_MAXCH];
  double xcross = 290.0;	// 20Â° Capricorn
  if (argc > 1) xcross = atof(argv[1]);
  find_crossings(xcross, SE_VENUS, t, 1,  366, 2.0, serr);
  return OK;
}
