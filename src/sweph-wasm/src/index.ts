import { type FixedLengthArray, toFixedLengthArray } from "fixed-len-array";
import {
    ArrayPointer,
    NullPointer,
    NumberPointer,
    StringPointer,
    TypeConverter,
} from "wasp-lib";

import { EpheFileMetadata } from "./utils/ephe_file_metadata";
import { getBaseURLPath } from "./utils/get_base_url_path";
import { SWEerror } from "./utils/swe_error";
import Module, { type SwissephModule } from "./wasm/swisseph";

/** Wrapper class for Swiss Ephemeris WebAssembly bindings. */
export default class SwissEPH {
    public readonly TRUE = 1;
    public readonly FALSE = 0;
    public readonly OK = 0;
    public readonly ERR = -1;
    public readonly NOT_AVAILABLE = -2;
    public readonly BEYOND_EPH_LIMITS = -3;

    /** Degree as string, utf8 encoding */
    public readonly ODEGREE_STRING = "°";
    /** Biggest value for REAL8 */
    public readonly HUGE = 1.7e308;
    /** 3.14159265358979323846 */
    public readonly M_PI = Math.PI;
    /**
     * Forward static obsolete used for string declarations, allowing 255
     * char+\0
     */
    public readonly AS_MAXCH = 256;
    public readonly RADTODEG = 180.0 / this.M_PI;
    public readonly DEGTORAD = this.M_PI / 180.0;
    /** Degree expressed in centiseconds */
    public readonly DEG = 360000;
    /** 7.5 degrees */
    public readonly DEG7_30 = 2700000;
    public readonly DEG15 = 15 * this.DEG;
    public readonly DEG24 = 24 * this.DEG;
    public readonly DEG30 = 30 * this.DEG;
    public readonly DEG60 = 60 * this.DEG;
    public readonly DEG90 = 90 * this.DEG;
    public readonly DEG120 = 120 * this.DEG;
    public readonly DEG150 = 150 * this.DEG;
    public readonly DEG180 = 180 * this.DEG;
    public readonly DEG270 = 270 * this.DEG;
    public readonly DEG360 = 360 * this.DEG;
    /** CSTORAD = 4.84813681109536E-08 centisec to rad: pi / 180 /3600/100 */
    public readonly CSTORAD = this.DEGTORAD / 360000.0;
    /** RADTOCS = 2.06264806247096E+07 rad to centisec 180_3600_100/pi */
    public readonly RADTOCS = this.RADTODEG * 360000.0;
    /** Centisec to degree */
    public readonly CS2DEG = 1.0 / 360000.0;
    /** Open binary file for reading */
    public readonly BFILE_R_ACCESS = "rb";
    /** Open binary file for writing and reading */
    public readonly BFILE_RW_ACCESS = "r+b";
    /** Create/open binary file for write */
    public readonly BFILE_W_CREATE = "wb";
    /** Create/open binary file for append */
    public readonly BFILE_A_ACCESS = "a+b";
    /** Semicolon as PATH separator */
    public readonly PATH_SEPARATOR = ";";
    /** Default file creation mode */
    public readonly OPEN_MODE = "0666";
    /** Open text file for reading */
    public readonly FILE_R_ACCESS = "rt";
    /** Open text file for writing and reading */
    public readonly FILE_RW_ACCESS = "r+t";
    /** Create/open text file for write */
    public readonly FILE_W_CREATE = "wt";
    /** Create/open text file for append */
    public readonly FILE_A_ACCESS = "a+t";
    /**
     * Attention, all backslashes for msdos directry names must be written as
     * because it is the C escape character glue string for directory/file
     */
    public readonly DIR_GLUE = "\\";
    public readonly SE_AUNIT_TO_KM = 149597870.7;
    public readonly SE_AUNIT_TO_LIGHTYEAR = 1.0 / 63241.07708427;
    public readonly SE_AUNIT_TO_PARSEC = 1.0 / 206264.8062471;
    /** Values for gregflag in swe_julday() and swe_revjul() */
    public readonly SE_JUL_CAL = 0;
    public readonly SE_GREG_CAL = 1;
    /** Planet numbers for the ipl parameter in swe_calc() */
    public readonly SE_ECL_NUT = -1;
    public readonly SE_SUN = 0;
    public readonly SE_MOON = 1;
    public readonly SE_MERCURY = 2;
    public readonly SE_VENUS = 3;
    public readonly SE_MARS = 4;
    public readonly SE_JUPITER = 5;
    public readonly SE_SATURN = 6;
    public readonly SE_URANUS = 7;
    public readonly SE_NEPTUNE = 8;
    public readonly SE_PLUTO = 9;
    public readonly SE_MEAN_NODE = 10;
    public readonly SE_TRUE_NODE = 11;
    public readonly SE_MEAN_APOG = 12;
    public readonly SE_OSCU_APOG = 13;
    public readonly SE_EARTH = 14;
    public readonly SE_CHIRON = 15;
    public readonly SE_PHOLUS = 16;
    public readonly SE_CERES = 17;
    public readonly SE_PALLAS = 18;
    public readonly SE_JUNO = 19;
    public readonly SE_VESTA = 20;
    public readonly SE_INTP_APOG = 21;
    public readonly SE_INTP_PERG = 22;
    public readonly SE_NPLANETS = 23;
    public readonly SE_PLMOON_OFFSET = 9000;
    public readonly SE_AST_OFFSET = 10000;
    public readonly SE_VARUNA = this.SE_AST_OFFSET + 20000;
    public readonly SE_FICT_OFFSET = 40;
    public readonly SE_FICT_OFFSET_1 = 39;
    public readonly SE_FICT_MAX = 999;
    public readonly SE_NFICT_ELEM = 15;
    public readonly SE_COMET_OFFSET = 1000;
    public readonly SE_NALL_NAT_POINTS = this.SE_NPLANETS + this.SE_NFICT_ELEM;
    /** Hamburger or Uranian "planets" */
    public readonly SE_CUPIDO = 40;
    public readonly SE_HADES = 41;
    public readonly SE_ZEUS = 42;
    public readonly SE_KRONOS = 43;
    public readonly SE_APOLLON = 44;
    public readonly SE_ADMETOS = 45;
    public readonly SE_VULKANUS = 46;
    public readonly SE_POSEIDON = 47;
    /** Other fictitious bodies */
    public readonly SE_ISIS = 48;
    public readonly SE_NIBIRU = 49;
    public readonly SE_HARRINGTON = 50;
    public readonly SE_NEPTUNE_LEVERRIER = 51;
    public readonly SE_NEPTUNE_ADAMS = 52;
    public readonly SE_PLUTO_LOWELL = 53;
    public readonly SE_PLUTO_PICKERING = 54;
    public readonly SE_VULCAN = 55;
    public readonly SE_WHITE_MOON = 56;
    public readonly SE_PROSERPINA = 57;
    public readonly SE_WALDEMATH = 58;
    public readonly SE_FIXSTAR = -10;
    public readonly SE_ASC = 0;
    public readonly SE_MC = 1;
    public readonly SE_ARMC = 2;
    public readonly SE_VERTEX = 3;
    public readonly SE_EQUASC = 4; /** "equatorial ascendant" */
    public readonly SE_COASC1 = 5; /** "co-ascendant" ( W. Koch) */
    public readonly SE_COASC2 = 6; /** "co-ascendant" ( M. Munkasey) */
    public readonly SE_POLASC = 7; /** "polar ascendant" ( M. Munkasey) */
    public readonly SE_NASCMC = 8;
    /**
     * Flag bits for parameter iflag in swe_calc() The flag bits are defined in
     * such a way that iflag = 0 delivers what one usually wants:
     *
     * - The default ephemeris ( SWISS EPHEMERIS) is used,
     * - Apparent geocentric positions referring to the true equinox of date are
     *   returned. If not only coordinates, but also speed values are required,
     *   use flag = SEFLG_SPEED. The 'L' behind the number indicates that 32-bit
     *   integers ( Long) are used.
     */
    /** Use JPL ephemeris */
    public readonly SEFLG_JPLEPH = 1;
    /** Use SWISSEPH ephemeris */
    public readonly SEFLG_SWIEPH = 2;
    /** Use Moshier ephemeris */
    public readonly SEFLG_MOSEPH = 4;
    /** Heliocentric position */
    public readonly SEFLG_HELCTR = 8;
    /** True/geometric position, not apparent position */
    public readonly SEFLG_TRUEPOS = 16;
    /** No precession, i.e. give J2000 equinox */
    public readonly SEFLG_J2000 = 32;
    /** No nutation, i.e. mean equinox of date */
    public readonly SEFLG_NONUT = 64;
    /**
     * Speed from 3 positions (do not use it, SEFLG_SPEED is faster and more
     * precise.)
     */
    public readonly SEFLG_SPEED3 = 128;
    /** High precision speed */
    public readonly SEFLG_SPEED = 256;
    /** Turn off gravitational deflection */
    public readonly SEFLG_NOGDEFL = 512;
    /** Turn off 'annual' aberration of light */
    public readonly SEFLG_NOABERR = 1024;
    /**
     * Astrometric position, i.e. with light - time, but without aberration and
     * light deflection
     */
    public readonly SEFLG_ASTROMETRIC = this.SEFLG_NOABERR | this.SEFLG_NOGDEFL;
    /** Equatorial positions are wanted */
    public readonly SEFLG_EQUATORIAL = 2 * 1024;
    /** Cartesian, not polar, coordinates */
    public readonly SEFLG_XYZ = 4 * 1024;
    /** Coordinates in radians, not degrees */
    public readonly SEFLG_RADIANS = 8 * 1024;
    /** Barycentric position */
    public readonly SEFLG_BARYCTR = 16 * 1024;
    /** Topocentric position */
    public readonly SEFLG_TOPOCTR = 32 * 1024;
    /** Used for Astronomical Almanac mode in calculation of Kepler elipses */
    public readonly SEFLG_ORBEL_AA = this.SEFLG_TOPOCTR;
    /** Tropical position ( default) */
    public readonly SEFLG_TROPICAL = 0;
    /** Sidereal position */
    public readonly SEFLG_SIDEREAL = 64 * 1024;
    /** ICRS ( DE406 reference frame) */
    public readonly SEFLG_ICRS = 128 * 1024;
    /** Reproduce JPL Horizons 1962 - today to 0.002 arcsec. */
    public readonly SEFLG_DPSIDEPS_1980 = 256 * 1024;
    public readonly SEFLG_JPLHOR = this.SEFLG_DPSIDEPS_1980;
    /** Approximate JPL Horizons 1962 - today */
    public readonly SEFLG_JPLHOR_APPROX = 512 * 1024;
    /**
     * Calculate position of center of body ( COB) of planet, not barycenter of
     * its system
     */
    public readonly SEFLG_CENTER_BODY = 1024 * 1024;
    /** Test raw data in files sepm9* */
    public readonly SEFLG_TEST_PLMOON =
        (2 * 1024 * 1024) |
        this.SEFLG_J2000 |
        this.SEFLG_ICRS |
        this.SEFLG_HELCTR |
        this.SEFLG_TRUEPOS;

    public readonly SE_SIDBITS = 256;
    /** For projection onto ecliptic of t0 */
    public readonly SE_SIDBIT_ECL_T0 = 256;
    /** For projection onto solar system plane */
    public readonly SE_SIDBIT_SSY_PLANE = 512;
    /** With user-defined ayanamsha, t0 is UT */
    public readonly SE_SIDBIT_USER_UT = 1024;
    /**
     * Ayanamsha measured on ecliptic of date; see commentaries in sweph.c:
     * swi_get_ayanamsa_ex().
     */
    public readonly SE_SIDBIT_ECL_DATE = 2048;
    /**
     * Test feature: don't apply const ant offset to ayanamsha see commentary
     * above sweph.c: get_aya_correction()
     */
    public readonly SE_SIDBIT_NO_PREC_OFFSET = 4096;
    /** Test feature: calculate ayanamsha using its original precession model */
    public readonly SE_SIDBIT_PREC_ORIG = 8192;
    /** Sidereal modes ( ayanamsas) */
    public readonly SE_SIDM_FAGAN_BRADLEY = 0;
    public readonly SE_SIDM_LAHIRI = 1;
    public readonly SE_SIDM_DELUCE = 2;
    public readonly SE_SIDM_RAMAN = 3;
    public readonly SE_SIDM_USHASHASHI = 4;
    public readonly SE_SIDM_KRISHNAMURTI = 5;
    public readonly SE_SIDM_DJWHAL_KHUL = 6;
    public readonly SE_SIDM_YUKTESHWAR = 7;
    public readonly SE_SIDM_JN_BHASIN = 8;
    public readonly SE_SIDM_BABYL_KUGLER1 = 9;
    public readonly SE_SIDM_BABYL_KUGLER2 = 10;
    public readonly SE_SIDM_BABYL_KUGLER3 = 11;
    public readonly SE_SIDM_BABYL_HUBER = 12;
    public readonly SE_SIDM_BABYL_ETPSC = 13;
    public readonly SE_SIDM_ALDEBARAN_15TAU = 14;
    public readonly SE_SIDM_HIPPARCHOS = 15;
    public readonly SE_SIDM_SASSANIAN = 16;
    public readonly SE_SIDM_GALCENT_0SAG = 17;
    public readonly SE_SIDM_J2000 = 18;
    public readonly SE_SIDM_J1900 = 19;
    public readonly SE_SIDM_B1950 = 20;
    public readonly SE_SIDM_SURYASIDDHANTA = 21;
    public readonly SE_SIDM_SURYASIDDHANTA_MSUN = 22;
    public readonly SE_SIDM_ARYABHATA = 23;
    public readonly SE_SIDM_ARYABHATA_MSUN = 24;
    public readonly SE_SIDM_SS_REVATI = 25;
    public readonly SE_SIDM_SS_CITRA = 26;
    public readonly SE_SIDM_TRUE_CITRA = 27;
    public readonly SE_SIDM_TRUE_REVATI = 28;
    public readonly SE_SIDM_TRUE_PUSHYA = 29;
    public readonly SE_SIDM_GALCENT_RGILBRAND = 30;
    public readonly SE_SIDM_GALEQU_IAU1958 = 31;
    public readonly SE_SIDM_GALEQU_TRUE = 32;
    public readonly SE_SIDM_GALEQU_MULA = 33;
    public readonly SE_SIDM_GALALIGN_MARDYKS = 34;
    public readonly SE_SIDM_TRUE_MULA = 35;
    public readonly SE_SIDM_GALCENT_MULA_WILHELM = 36;
    public readonly SE_SIDM_ARYABHATA_522 = 37;
    public readonly SE_SIDM_BABYL_BRITTON = 38;
    public readonly SE_SIDM_TRUE_SHEORAN = 39;
    public readonly SE_SIDM_GALCENT_COCHRANE = 40;
    public readonly SE_SIDM_GALEQU_FIORENZA = 41;
    public readonly SE_SIDM_VALENS_MOON = 42;
    public readonly SE_SIDM_LAHIRI_1940 = 43;
    public readonly SE_SIDM_LAHIRI_VP285 = 44;
    public readonly SE_SIDM_KRISHNAMURTI_VP291 = 45;
    public readonly SE_SIDM_LAHIRI_ICRC = 46;
    // public SE_SIDM_MANJULA = 43
    /** User-defined ayanamsha, t0 is TT */
    public readonly SE_SIDM_USER = 255;
    public readonly SE_NSIDM_PREDEF = 47;
    /** Used for swe_nod_aps(): */
    /** Mean nodes/apsides */
    public readonly SE_NODBIT_MEAN = 1;
    /** Osculating nodes/apsides */
    public readonly SE_NODBIT_OSCU = 2;
    /** Same, but motion about solar system barycenter is considered */
    public readonly SE_NODBIT_OSCU_BAR = 4;
    /** Focal point of orbit instead of aphelion */
    public readonly SE_NODBIT_FOPOINT = 256;
    /** Default ephemeris used when no ephemeris flagbit is set */
    public readonly SEFLG_DEFAULTEPH = this.SEFLG_SWIEPH;
    /**
     * Maximum size of fixstar name; the parameter star in swe_fixstar must
     * allow twice this space for the returned star name.
     */
    public readonly SE_MAX_STNAME = 256;
    /** Defines for eclipse computations */
    public readonly SE_ECL_CENTRAL = 1;
    public readonly SE_ECL_NONCENTRAL = 2;
    public readonly SE_ECL_TOTAL = 4;
    public readonly SE_ECL_ANNULAR = 8;
    public readonly SE_ECL_PARTIAL = 16;
    public readonly SE_ECL_ANNULAR_TOTAL = 32;
    /** = annular-total */
    public readonly SE_ECL_HYBRID = 32;
    public readonly SE_ECL_PENUMBRAL = 64;
    public readonly SE_ECL_ALLTYPES_SOLAR =
        this.SE_ECL_CENTRAL |
        this.SE_ECL_NONCENTRAL |
        this.SE_ECL_TOTAL |
        this.SE_ECL_ANNULAR |
        this.SE_ECL_PARTIAL |
        this.SE_ECL_ANNULAR_TOTAL;

    public readonly SE_ECL_ALLTYPES_LUNAR =
        this.SE_ECL_TOTAL | this.SE_ECL_PARTIAL | this.SE_ECL_PENUMBRAL;

    public readonly SE_ECL_VISIBLE = 128;
    public readonly SE_ECL_MAX_VISIBLE = 256;
    /** Begin of partial eclipse */
    public readonly SE_ECL_1ST_VISIBLE = 512;
    /** Begin of partial eclipse */
    public readonly SE_ECL_PARTBEG_VISIBLE = 512;
    /** Begin of total eclipse */
    public readonly SE_ECL_2ND_VISIBLE = 1024;
    /** Begin of total eclipse */
    public readonly SE_ECL_TOTBEG_VISIBLE = 1024;
    /** End of total eclipse */
    public readonly SE_ECL_3RD_VISIBLE = 2048;
    /** End of total eclipse */
    public readonly SE_ECL_TOTEND_VISIBLE = 2048;
    /** End of partial eclipse */
    public readonly SE_ECL_4TH_VISIBLE = 4096;
    /** End of partial eclipse */
    public readonly SE_ECL_PARTEND_VISIBLE = 4096;
    /** Begin of penumbral eclipse */
    public readonly SE_ECL_PENUMBBEG_VISIBLE = 8192;
    /** End of penumbral eclipse */
    public readonly SE_ECL_PENUMBEND_VISIBLE = 16384;
    /** Occultation begins during the day */
    public readonly SE_ECL_OCC_BEG_DAYLIGHT = 8192;
    /** Occultation ends during the day */
    public readonly SE_ECL_OCC_END_DAYLIGHT = 16384;
    /**
     * Check if the next conjunction of the moon with a planet is an
     * occultation; don't search further
     */
    public readonly SE_ECL_ONE_TRY = 32 * 1024;
    /** For swe_rise_transit() */
    public readonly SE_CALC_RISE = 1;
    public readonly SE_CALC_SET = 2;
    public readonly SE_CALC_MTRANSIT = 4;
    public readonly SE_CALC_ITRANSIT = 8;
    /**
     * To be or'ed to SE_CALC_RISE/SET, if rise or set of disc center is
     * required
     */
    public readonly SE_BIT_DISC_CENTER = 256;
    /**
     * To be or'ed to SE_CALC_RISE/SET, if rise or set of lower limb of disc is
     * requried
     */
    public readonly SE_BIT_DISC_BOTTOM = 8192;
    /**
     * Use geocentric rather than topocentric position of object and ignore its
     * ecliptic latitude
     */
    public readonly SE_BIT_GEOCTR_NO_ECL_LAT = 128;
    /** To be or'ed to SE_CALC_RISE/SET, if refraction is to be ignored */
    public readonly SE_BIT_NO_REFRACTION = 512;
    /** To be or'ed to SE_CALC_RISE/SET */
    public readonly SE_BIT_CIVIL_TWILIGHT = 1024;
    /** To be or'ed to SE_CALC_RISE/SET */
    public readonly SE_BIT_NAUTIC_TWILIGHT = 2048;
    /** To be or'ed to SE_CALC_RISE/SET */
    public readonly SE_BIT_ASTRO_TWILIGHT = 4096;
    /** Or'ed to SE_CALC_RISE/SET: neglect the effect of distance on disc size */
    public readonly SE_BIT_FIXED_DISC_SIZE = 16384;
    /**
     * This is only an Astrodienst in-house test flag.It forces the usage of the
     * old, slow calculation of risings and settings.
     */
    public readonly SE_BIT_FORCE_SLOW_METHOD = 32768;
    public readonly SE_BIT_HINDU_RISING =
        this.SE_BIT_DISC_CENTER |
        this.SE_BIT_NO_REFRACTION |
        this.SE_BIT_GEOCTR_NO_ECL_LAT;

    /** For swe_azalt() and swe_azalt_rev() */
    public readonly SE_ECL2HOR = 0;
    public readonly SE_EQU2HOR = 1;
    public readonly SE_HOR2ECL = 0;
    public readonly SE_HOR2EQU = 1;
    /** For swe_refrac() */
    public readonly SE_TRUE_TO_APP = 0;
    public readonly SE_APP_TO_TRUE = 1;
    /**
     * Only used for experimenting with various JPL ephemeris files which are
     * available at Astrodienst's internal network
     */
    public readonly SE_DE_NUMBER = 431;
    public readonly SE_FNAME_DE200 = "de200.eph";
    public readonly SE_FNAME_DE403 = "de403.eph";
    public readonly SE_FNAME_DE404 = "de404.eph";
    public readonly SE_FNAME_DE405 = "de405.eph";
    public readonly SE_FNAME_DE406 = "de406.eph";
    public readonly SE_FNAME_DE431 = "de431.eph";
    public readonly SE_FNAME_DFT = this.SE_FNAME_DE431;
    public readonly SE_FNAME_DFT2 = this.SE_FNAME_DE406;
    public readonly SE_STARFILE_OLD = "fixstars.cat";
    public readonly SE_STARFILE = "sefstars.txt";
    public readonly SE_ASTNAMFILE = "seasnam.txt";
    public readonly SE_FICTFILE = "seorbel.txt";
    /** Defines for swe_split_deg() ( in swephlib.c) */
    public readonly SE_SPLIT_DEG_ROUND_SEC = 1;
    public readonly SE_SPLIT_DEG_ROUND_MIN = 2;
    public readonly SE_SPLIT_DEG_ROUND_DEG = 4;
    public readonly SE_SPLIT_DEG_ZODIACAL = 8;
    public readonly SE_SPLIT_DEG_NAKSHATRA = 1024;
    /**
     * Don't round to next sign, e.g. 29.9999999 will be rounded to 29d59'59" (
     * or 29d59' or 29d)
     */
    public readonly SE_SPLIT_DEG_KEEP_SIGN = 16;
    /**
     * Don't round to next degree e.g. 13.9999999 will be rounded to 13d59'59" (
     * or 13d59' or 13d)
     */
    public readonly SE_SPLIT_DEG_KEEP_DEG = 32;
    /** For heliacal functions */
    public readonly SE_HELIACAL_RISING = 1;
    public readonly SE_HELIACAL_SETTING = 2;
    public readonly SE_MORNING_FIRST = this.SE_HELIACAL_RISING;
    public readonly SE_EVENING_LAST = this.SE_HELIACAL_SETTING;
    public readonly SE_EVENING_FIRST = 3;
    public readonly SE_MORNING_LAST = 4;
    /** Still not implemented */
    public readonly SE_ACRONYCHAL_RISING = 5;
    /** Still not implemented */
    public readonly SE_ACRONYCHAL_SETTING = 6;
    public readonly SE_COSMICAL_SETTING = this.SE_ACRONYCHAL_SETTING;
    public readonly SE_HELFLAG_LONG_SEARCH = 128;
    public readonly SE_HELFLAG_HIGH_PRECISION = 256;
    public readonly SE_HELFLAG_OPTICAL_PARAMS = 512;
    public readonly SE_HELFLAG_NO_DETAILS = 1024;
    /** 2048 */
    public readonly SE_HELFLAG_SEARCH_1_PERIOD = 1 << 11;
    /** 4096 */
    public readonly SE_HELFLAG_VISLIM_DARK = 1 << 12;
    /** 8192 */
    public readonly SE_HELFLAG_VISLIM_NOMOON = 1 << 13;
    /** The following undocumented defines are for test reasons only */
    /** 16384 */
    public readonly SE_HELFLAG_VISLIM_PHOTOPIC = 1 << 14;
    /** 32768 */
    public readonly SE_HELFLAG_VISLIM_SCOTOPIC = 1 << 15;
    /** 65536 */
    public readonly SE_HELFLAG_AV = 1 << 16;
    /** 65536 */
    public readonly SE_HELFLAG_AVKIND_VR = 1 << 16;
    public readonly SE_HELFLAG_AVKIND_PTO = 1 << 17;
    public readonly SE_HELFLAG_AVKIND_MIN7 = 1 << 18;
    public readonly SE_HELFLAG_AVKIND_MIN9 = 1 << 19;
    public readonly SE_HELFLAG_AVKIND =
        this.SE_HELFLAG_AVKIND_VR |
        this.SE_HELFLAG_AVKIND_PTO |
        this.SE_HELFLAG_AVKIND_MIN7 |
        this.SE_HELFLAG_AVKIND_MIN9;

    public readonly TJD_INVALID = 99999999.0;
    public readonly SIMULATE_VICTORVB = 1;
    /** Unused and redundant */
    public readonly SE_HELIACAL_LONG_SEARCH = 128;
    public readonly SE_HELIACAL_HIGH_PRECISION = 256;
    public readonly SE_HELIACAL_OPTICAL_PARAMS = 512;
    public readonly SE_HELIACAL_NO_DETAILS = 1024;
    /** 2048 */
    public readonly SE_HELIACAL_SEARCH_1_PERIOD = 1 << 11;
    /** 4096 */
    public readonly SE_HELIACAL_VISLIM_DARK = 1 << 12;
    /** 8192 */
    public readonly SE_HELIACAL_VISLIM_NOMOON = 1 << 13;
    /** 16384 */
    public readonly SE_HELIACAL_VISLIM_PHOTOPIC = 1 << 14;
    /** 32768 */
    public readonly SE_HELIACAL_AVKIND_VR = 1 << 15;
    public readonly SE_HELIACAL_AVKIND_PTO = 1 << 16;
    public readonly SE_HELIACAL_AVKIND_MIN7 = 1 << 17;
    public readonly SE_HELIACAL_AVKIND_MIN9 = 1 << 18;
    public readonly SE_HELIACAL_AVKIND =
        this.SE_HELFLAG_AVKIND_VR |
        this.SE_HELFLAG_AVKIND_PTO |
        this.SE_HELFLAG_AVKIND_MIN7 |
        this.SE_HELFLAG_AVKIND_MIN9;

    public readonly SE_PHOTOPIC_FLAG = 0;
    public readonly SE_SCOTOPIC_FLAG = 1;
    public readonly SE_MIXEDOPIC_FLAG = 2;
    /**
     * For swe_set_tid_acc() and ephemeris-dependent delta t: intrinsic tidal
     * acceleration in the mean motion of the moon, not given in the parameters
     * list of the ephemeris files but computed by Chapront / Chapront - Touzé /
     * Francou A & A 387(2002), p. 705.
     */
    public readonly SE_TIDAL_DE200 = -23.8946;
    /** Was ( -25.8) until V. 1.76.2 */
    public readonly SE_TIDAL_DE403 = -25.58;
    /** Was ( -25.8) until V. 1.76.2 */
    public readonly SE_TIDAL_DE404 = -25.58;
    /** Was ( -25.7376) until V. 1.76.2 */
    public readonly SE_TIDAL_DE405 = -25.826;
    /** Was ( -25.7376) until V. 1.76.2 */
    public readonly SE_TIDAL_DE406 = -25.826;
    /** JPL Interoffice Memorandum 14-mar-2008 on DE421 Lunar Orbit */
    public readonly SE_TIDAL_DE421 = -25.85;
    /** JPL Interoffice Memorandum 14-mar-2008 on DE421 ( sic!) Lunar Orbit */
    public readonly SE_TIDAL_DE422 = -25.85;
    /** JPL Interoffice Memorandum 9-jul-2013 on DE430 Lunar Orbit */
    public readonly SE_TIDAL_DE430 = -25.82;
    /**
     * IPN Progress Report 42-196 • February 15, 2014, p. 15; was ( -25.82) in
     * V. 2.00.00
     */
    public readonly SE_TIDAL_DE431 = -25.8;
    /** Unpublished value, from email by Jon Giorgini to DK on 11 Apr 2021 */
    public readonly SE_TIDAL_DE441 = -25.936;
    public readonly SE_TIDAL_26 = -26.0;
    public readonly SE_TIDAL_STEPHENSON_2016 = -25.85;
    public readonly SE_TIDAL_DEFAULT = this.SE_TIDAL_DE431;
    public readonly SE_TIDAL_AUTOMATIC = 999999;
    public readonly SE_TIDAL_MOSEPH = this.SE_TIDAL_DE404;
    public readonly SE_TIDAL_SWIEPH = this.SE_TIDAL_DEFAULT;
    public readonly SE_TIDAL_JPLEPH = this.SE_TIDAL_DEFAULT;
    /** For swe_set_delta_t_userdef() */
    public readonly SE_DELTAT_AUTOMATIC = -1e-10;
    public readonly SE_MODEL_DELTAT = 0;
    public readonly SE_MODEL_PREC_LONGTERM = 1;
    public readonly SE_MODEL_PREC_SHORTTERM = 2;
    public readonly SE_MODEL_NUT = 3;
    public readonly SE_MODEL_BIAS = 4;
    public readonly SE_MODEL_JPLHOR_MODE = 5;
    public readonly SE_MODEL_JPLHORA_MODE = 6;
    public readonly SE_MODEL_SIDT = 7;
    public readonly NSE_MODELS = 8;
    /** Precession models */
    public readonly SEMOD_NPREC = 11;
    public readonly SEMOD_PREC_IAU_1976 = 1;
    public readonly SEMOD_PREC_LASKAR_1986 = 2;
    public readonly SEMOD_PREC_WILL_EPS_LASK = 3;
    public readonly SEMOD_PREC_WILLIAMS_1994 = 4;
    public readonly SEMOD_PREC_SIMON_1994 = 5;
    public readonly SEMOD_PREC_IAU_2000 = 6;
    public readonly SEMOD_PREC_BRETAGNON_2003 = 7;
    public readonly SEMOD_PREC_IAU_2006 = 8;
    public readonly SEMOD_PREC_VONDRAK_2011 = 9;
    public readonly SEMOD_PREC_OWEN_1990 = 10;
    public readonly SEMOD_PREC_NEWCOMB = 11;
    public readonly SEMOD_PREC_DEFAULT = this.SEMOD_PREC_VONDRAK_2011;
    /**
     * SE versions before 1.70 used IAU 1976 precession for a limited time range
     * of 2 centuries in combination with the long - term precession Simon
     * 1994.
     */
    public readonly SEMOD_PREC_DEFAULT_SHORT = this.SEMOD_PREC_VONDRAK_2011;
    /** Nutation models */
    public readonly SEMOD_NNUT = 5;
    public readonly SEMOD_NUT_IAU_1980 = 1;
    /**
     * Herring's ( 1987) corrections to IAU 1980 nutation series.AA(1996)
     * neglects them.
     */
    public readonly SEMOD_NUT_IAU_CORR_1987 = 2;
    /** Very time consuming ! */
    public readonly SEMOD_NUT_IAU_2000A = 3;
    /** Fast, but precision of milli-arcsec */
    public readonly SEMOD_NUT_IAU_2000B = 4;
    public readonly SEMOD_NUT_WOOLARD = 5;
    /** Fast, but precision of milli-arcsec */
    public readonly SEMOD_NUT_DEFAULT = this.SEMOD_NUT_IAU_2000B;
    /** Methods for sidereal time */
    public readonly SEMOD_NSIDT = 4;
    public readonly SEMOD_SIDT_IAU_1976 = 1;
    public readonly SEMOD_SIDT_IAU_2006 = 2;
    public readonly SEMOD_SIDT_IERS_CONV_2010 = 3;
    public readonly SEMOD_SIDT_LONGTERM = 4;
    public readonly SEMOD_SIDT_DEFAULT = this.SEMOD_SIDT_LONGTERM;
    // const  SEMOD_SIDT_DEFAULT = SEMOD_SIDT_IERS_CONV_2010
    /** Frame bias methods */
    public readonly SEMOD_NBIAS = 3;
    /** Ignore frame bias */
    public readonly SEMOD_BIAS_NONE = 1;
    /** Use frame bias matrix IAU 2000 */
    public readonly SEMOD_BIAS_IAU2000 = 2;
    /** Use frame bias matrix IAU 2006 */
    public readonly SEMOD_BIAS_IAU2006 = 3;
    public readonly SEMOD_BIAS_DEFAULT = this.SEMOD_BIAS_IAU2006;
    /**
     * Methods of JPL Horizons ( iflag & SEFLG_JPLHOR), using daily dpsi, deps;
     * see explanations below
     */
    public readonly SEMOD_NJPLHOR = 2;
    /** Daily dpsi and deps from file are */
    public readonly SEMOD_JPLHOR_LONG_AGREEMENT = 1;
    /**
     * Limited to 1962 - today.JPL uses the first and last value for all dates
     * beyond this time range.
     */
    public readonly SEMOD_JPLHOR_DEFAULT = this.SEMOD_JPLHOR_LONG_AGREEMENT;
    /**
     * Note, currently this is the only option for SEMOD_JPLHOR..
     * SEMOD_JPLHOR_LONG_AGREEMENT, if combined with SEFLG_JPLHOR provides good
     * agreement with JPL Horizons for 9998 BC(-9997) until 9999 CE.
     *
     * - After 20 - jan - 1962 until today, Horizons uses correct dpsi and deps.
     * - For dates before that, it uses dpsi and deps of 20 - jan - 1962, which
     *   provides a continuous ephemeris, but does not make sense otherwise.
     * - Before 1.1.1799 and after 1.1.2202, the precession model Owen 1990 is
     *   used, as in Horizons. An agreement with Horizons to a couple of milli
     *   arc seconds is achieved for the whole time range of Horizons. (BC 9998
     *
     *   - Mar - 20 to AD 9999 - Dec - 31 TT.) methods of approximation of JPL
     *       Horizons ( iflag & SEFLG_JPLHORA), without dpsi, deps; see
     *       explanations below
     */
    public readonly SEMOD_NJPLHORA = 3;
    public readonly SEMOD_JPLHORA_1 = 1;
    public readonly SEMOD_JPLHORA_2 = 2;
    public readonly SEMOD_JPLHORA_3 = 3;
    public readonly SEMOD_JPLHORA_DEFAULT = this.SEMOD_JPLHORA_3;
    /**
     * With SEMOD_JPLHORA_1, planetary positions are always calculated using a
     * recent precession / nutation model.Frame bias matrix is applied with some
     * correction to RA and another correction added to epsilon. this provides a
     * very good approximation of JPL Horizons positions. With SEMOD_JPLHORA_2,
     * frame bias as recommended by IERS Conventions 2003 and 2010 is not
     * applied.Instead, dpsi_bias and deps_bias are added to nutation.this
     * procedure is found in some older astronomical software. Equatorial
     * apparent positions will be close to JPL Horizons (within a few mas)
     * between 1962 and current years.Ecl.longitude will be good, latitude bad.
     * With SEMOD_JPLHORA_3 works like SEMOD_JPLHORA_3 after 1962, but like
     * SEFLG_JPLHOR before that.this allows EXTREMELY good agreement with JPL
     * Horizons over its whole time range.
     */
    public readonly SEMOD_NDELTAT = 5;
    public readonly SEMOD_DELTAT_STEPHENSON_MORRISON_1984 = 1;
    public readonly SEMOD_DELTAT_STEPHENSON_1997 = 2;
    public readonly SEMOD_DELTAT_STEPHENSON_MORRISON_2004 = 3;
    public readonly SEMOD_DELTAT_ESPENAK_MEEUS_2006 = 4;
    public readonly SEMOD_DELTAT_STEPHENSON_ETC_2016 = 5;
    /** Public SEMOD_DELTAT_DEFAULT = SEMOD_DELTAT_ESPENAK_MEEUS_2006; */
    public readonly SEMOD_DELTAT_DEFAULT =
        this.SEMOD_DELTAT_STEPHENSON_ETC_2016;

    /** The Swisseph Emscripten WebAssembly Module instance. */
    public wasm: SwissephModule;

    /**
     * Creates a new instance.
     *
     * @param wasm - Swisseph Emscripten WebAssembly Module instance
     */
    constructor(wasm: SwissephModule) {
        this.wasm = wasm;
    }

    /**
     * Static method for creating and initializing the Swisseph module.
     *
     * @returns {Promise<SwissEPH>} : Promise<SwissEPH>
     */
    static async init(): Promise<SwissEPH> {
        /** Swisseph Emscripten Module instance */
        const wasm = await Module();
        return new SwissEPH(wasm);
    }

    /**
     * Converts horizontal coordinates (azimuth and altitude) to either ecliptic
     * or equatorial coordinates, based on the observer's geographical position
     * and desired coordinate system.
     *
     * @param tjd_ut - Julian day in Universal Time (UT).
     * @param calc_flag - Calculation mode flag: `SE_HOR2ECL` for ecliptic or
     *   `SE_HOR2EQU` for equatorial conversion.
     * @param geopos - Observer's geographic position as a tuple: `[longitude,
     *   latitude, elevation]` in degrees/meters.
     * @param xin - Horizontal coordinates as `[azimuth, true altitude]` in
     *   degrees.
     * @returns {CelestialCoordinates2D} An Array of 2 numbers representing
     *   celestial coordinates in either:
     *
     *   - **Ecliptic coordinates**: (λ, β) when using `SE_HOR2ECL`
     *   - **Equatorial coordinates**: (α, δ) when using `SE_HOR2EQU`
     *
     *   Array format:
     *
     *   - `[0]` → longitude / right ascension
     *   - `[1]` → latitude / declination
     */
    swe_azalt_rev(
        tjd_ut: number,
        calc_flag: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        xin: [azimuth: number, true_altitude: number]
    ): CelestialCoordinates2D {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const xinPtr = ArrayPointer.from(this.wasm, "double", 2, xin);
        const outPtr = ArrayPointer.alloc(this.wasm, "double", 2);
        this.wasm._swe_azalt_rev(
            tjd_ut,
            calc_flag,
            geoposPtr.ptr,
            xinPtr.ptr,
            outPtr.ptr
        );
        xinPtr.free();
        geoposPtr.free();
        return outPtr.readAndFree();
    }

    /**
     * Converts ecliptic or equatorial coordinates into horizontal coordinates
     * based on observer's geographic location and atmospheric conditions.
     *
     * @param {number} tjd_ut - Julian Day in Universal Time
     * @param {number} calc_flag - Calculation flag: `0 (SE_ECL2HOR)` for
     *   ecliptic, `1 (SE_EQU2HOR)` for equatorial to horizontal
     * @param {[number, number, number]} geopos - Observer's geographic
     *   coordinates as `[longitude, latitude, elevation]`
     * @param {number} atpress - Atmospheric pressure in mbar/hPa (0 to
     *   auto-estimate)
     * @param {number} attemp - Atmospheric temperature in °C
     * @param {[number, number, number]} xin - Input coordinates:
     *   `[longitude/right ascension, latitude/declination, distance
     *   (optional)]`
     * @returns {HorizontalCoordinates} Array of 2 numbers representing
     *   horizontal coordinates of a celestial object:
     *
     *   Array format:
     *
     *   - `[0]` → Azimuth in degrees (measured from the south point, increasing
     *       westwards)
     *   - `[1]` → True altitude above the horizon in degrees
     *   - `[2]` → Apparent altitude in degrees (corrected for atmospheric
     *       refraction)
     */
    swe_azalt(
        tjd_ut: number,
        calc_flag: number,
        geopos: [number, number, number],
        atpress: number,
        attemp: number,
        xin: [number, number, number]
    ): HorizontalCoordinates {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const xinPtr = ArrayPointer.from(this.wasm, "double", 3, xin);
        const outPtr = ArrayPointer.alloc(this.wasm, "double", 3); // Allocate space for 3 doubles: az, alt, ap
        this.wasm._swe_azalt(
            tjd_ut,
            calc_flag,
            geoposPtr.ptr,
            atpress,
            attemp,
            xinPtr.ptr,
            outPtr.ptr
        );
        geoposPtr.free();
        xinPtr.free();
        return outPtr.readAndFree();
    }

    /**
     * Computes the planetocentric apparent position of a target celestial body
     * as seen from another planet. Useful for generating ephemerides from the
     * perspective of a different planet — for example, Jupiter-centric
     * positions of other planets.
     *
     * @param {number} tjd_et - Julian day (ephemeris time, TT)
     * @param {number} ipl - Target body ID (e.g., SE_MARS)
     * @param {number} iplctr - Center body ID (e.g., SE_JUPITER)
     * @param {number} iflag - Computation flags (bitwise ORed SEFLG swe)
     * @returns {CelestialCoordinatesAdvance} Array of 6 numbers representing
     *   celestial position:
     *
     *   Array format:
     *
     *   - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True
     *       Obliquity (ε) depending on flags
     *   - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
     *       depending on flags
     *   - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ)
     *       depending on flags
     *   - `[3]` → Longitude daily speed (λs), Right Ascension daily speed (αs),
     *       Cartesian X speed (xs), or Nutation in obliquity (Δε)
     *   - `[4]` → Latitude daily speed (βs), Declination daily speed (δs),
     *       Cartesian Y speed (ys)
     *   - `[5]` → Distance daily speed (aus), Cartesian Z speed (zs)
     *
     * @throws {SWEerror} - SWEerror If fails.
     */
    swe_calc_pctr(
        tjd_et: number,
        ipl: number,
        iplctr: number,
        iflag: number
    ): CelestialCoordinatesAdvance {
        const xxPtr = ArrayPointer.alloc(this.wasm, "double", 6);
        const serrPtr = StringPointer.alloc(this.wasm, this.AS_MAXCH); // Predefined buffer length for error strings
        const flag = this.wasm._swe_calc_pctr(
            tjd_et,
            ipl,
            iplctr,
            iflag,
            xxPtr.ptr,
            serrPtr.ptr
        );
        const errorMsg = serrPtr.readAndFree();
        if (flag < this.OK) throw new SWEerror(errorMsg, flag);
        return xxPtr.readAndFree();
    }

    /**
     * Computes positions of planets, asteroids, lunar nodes, and apogees for a
     * given Julian date.
     *
     * @param {number} tjd_ut - Julian day in universal time.
     * @param {number} ipl - Target object ID (planet, asteroid, etc.).
     * @param {number} iflag - Calculation flags controlling precision and
     *   output format.
     * @returns {CelestialCoordinatesAdvance} Array of 6 numbers representing
     *   celestial position:
     *
     *   Array format:
     *
     *   - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True
     *       Obliquity (ε) depending on flags
     *   - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
     *       depending on flags
     *   - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ)
     *       depending on flags
     *   - `[3]` → Longitude daily speed (λs), Right Ascension daily speed (αs),
     *       Cartesian X speed (xs), or Nutation in obliquity (Δε)
     *   - `[4]` → Latitude daily speed (βs), Declination daily speed (δs),
     *       Cartesian Y speed (ys)
     *   - `[5]` → Distance daily speed (aus), Cartesian Z speed (zs)
     *
     * @throws {SWEerror} - SWEerror If fails.
     */
    swe_calc_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number
    ): CelestialCoordinatesAdvance {
        const xxPtr = ArrayPointer.alloc(this.wasm, "double", 6);
        const serrPtr = StringPointer.alloc(
            this.wasm,
            this.AS_MAXCH
        ); /** Error buffer (char *) */
        const flag = this.wasm._swe_calc_ut(
            tjd_ut,
            ipl,
            iflag,
            xxPtr.ptr,
            serrPtr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serrPtr.readAndFree(), flag);
        return xxPtr.readAndFree();
    }

    /**
     * Compute positions of planets, asteroids, lunar nodes and apogees from
     * ephemeris time
     *
     * @param tjd_et - Julian day in terrestrial/ephemeris time.
     * @param ipl - Target object ID (planet, asteroid, etc.).
     * @param iflag - Calculation flags controlling precision and output format.
     * @returns {CelestialCoordinatesAdvance} Array of 6 numbers representing
     *   celestial position:
     *
     *   Array format:
     *
     *   - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True
     *       Obliquity (ε) depending on flags
     *   - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
     *       depending on flags
     *   - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ)
     *       depending on flags
     *   - `[3]` → Longitude daily speed (λs), Right Ascension daily speed (αs),
     *       Cartesian X speed (xs), or Nutation in obliquity (Δε)
     *   - `[4]` → Latitude daily speed (βs), Declination daily speed (δs),
     *       Cartesian Y speed (ys)
     *   - `[5]` → Distance daily speed (aus), Cartesian Z speed (zs)
     *
     * @throws {SWEerror} - SWEerror If fails.
     */
    swe_calc(
        tjd_et: number,
        ipl: number,
        iflag: number
    ): CelestialCoordinatesAdvance {
        const xxPtr = ArrayPointer.alloc(this.wasm, "double", 6);
        const serrPtr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_calc(
            tjd_et,
            ipl,
            iflag,
            xxPtr.ptr,
            serrPtr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serrPtr.readAndFree(), flag);
        return xxPtr.readAndFree();
    }

    /**
     * Reset swisseph internals and cleanup file handles Not usually required as
     * Node cleans after itself
     */
    swe_close(): void {
        this.wasm._swe_close();
    }

    /**
     * Transform between ecliptic and equatorial coordinate systems including
     * motion speeds From equatorial to ecliptic, obliquity must be positive
     * From ecliptic to equatorial, obliquity must be negative Distances are not
     * affected and can be 0
     *
     * @param {CelestialCoordinatesAdvance} xpo - Input coordinates in ecliptic
     *   or equatorial coordinates [lon, lat, dist, lonSpd, latSpd, distSpd]
     * @param {number} eps - Positive or negative obliquity of the ecliptic
     * @returns {CelestialCoordinatesAdvance} Array of 6 numbers representing
     *   celestial position:
     *
     *   Array format:
     *
     *   - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True
     *       Obliquity (ε) depending on flags
     *   - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
     *       depending on flags
     *   - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ)
     *       depending on flags
     *   - `[3]` → Longitude daily speed (λs), Right Ascension daily speed (αs),
     *       Cartesian X speed (xs), or Nutation in obliquity (Δε)
     *   - `[4]` → Latitude daily speed (βs), Declination daily speed (δs),
     *       Cartesian Y speed (ys)
     *   - `[5]` → Distance daily speed (aus), Cartesian Z speed (zs)
     */
    swe_cotrans_sp(
        xpo: CelestialCoordinatesAdvance,
        eps: number
    ): CelestialCoordinatesAdvance {
        const xpoPtr = ArrayPointer.from(this.wasm, "double", 6, xpo);
        const xpnPtr = ArrayPointer.alloc(this.wasm, "double", 6);
        this.wasm._swe_cotrans_sp(xpoPtr.ptr, xpnPtr.ptr, eps);
        xpoPtr.free();
        return xpnPtr.readAndFree();
    }

    /**
     * Transform between ecliptic and equatorial coordinate systems From
     * equatorial to ecliptic, obliquity must be positive From ecliptic to
     * equatorial, obliquity must be negative Distance is not affected and can
     * be 0
     *
     * @param {CelestialCoordinates3D} xpo - Input coordinates in ecliptic or
     *   equatorial coordinates [lon, lat, dist]
     * @param {number} eps - Positive or negative obliquity of the ecliptic
     * @returns {CelestialCoordinates3D} Array of 3 numbers representing
     *   celestial position:
     *
     *   Array format:
     *
     *   - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True
     *       Obliquity (ε) depending on flags
     *   - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
     *       depending on flags
     *   - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ)
     *       depending on flags
     */
    swe_cotrans(
        xpo: CelestialCoordinates3D,
        eps: number
    ): CelestialCoordinates3D {
        const xpoPtr = ArrayPointer.from(this.wasm, "double", 3, xpo);
        const xpnPtr = ArrayPointer.alloc(this.wasm, "double", 3);
        this.wasm._swe_cotrans(xpoPtr.ptr, xpnPtr.ptr, eps);
        xpoPtr.free();
        return xpnPtr.readAndFree();
    }

    /**
     * Convert centiseconds to degrees string
     *
     * @param csec - Centiseconds value
     * @returns String
     */
    swe_cs2degstr(csec: number): string {
        const out = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_cs2degstr(csec, out.ptr);
        return out.readAndFree();
    }

    /**
     * Convert centiseconds to longitude or latitude string with user defined
     * sign character
     *
     * @param csec - Centiseconds value
     * @param pchar - Sign character for positive values
     * @param mchar - Sign character for negative values
     * @returns String
     */
    swe_cs2lonlatstr(csec: number, pchar: string, mchar: string): string {
        const out = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_cs2lonlatstr(
            csec,
            TypeConverter.charToC(pchar),
            TypeConverter.charToC(mchar),
            out.ptr
        );
        return out.readAndFree();
    }

    /**
     * Convert centiseconds to time string
     *
     * @param csec - Centiseconds value
     * @param sep - Separator character
     * @param suppresszero - Omit seconds if they are zero
     * @returns String
     */
    swe_cs2timestr(csec: number, sep: string, suppresszero: boolean): string {
        const out = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_cs2lonlatstr(
            csec,
            TypeConverter.charToC(sep),
            TypeConverter.boolToC(suppresszero),
            out.ptr
        );
        return out.readAndFree();
    }

    /**
     * Normalize centiseconds to 360 degrees range
     *
     * @param csec - Centiseconds value
     * @returns Number
     */
    swe_csnorm(csec: number): number {
        return this.wasm._swe_csnorm(csec);
    }

    /**
     * Round centiseconds to nearest second
     *
     * @param csec - Centiseconds value
     * @returns Number
     */
    swe_csroundsec(csec: number): number {
        return this.wasm._swe_csroundsec(csec);
    }

    /**
     * Round double precision value to long integer
     *
     * @param x - Double value
     * @returns Number
     */
    swe_d2l(csec: number): number {
        return this.wasm._swe_d2l(csec);
    }

    /**
     * Calculate julian day and check if the date is valid
     *
     * @param {number} year Full year
     * @param {number} month Month (1-12)
     * @param {number} day Day (1-31)
     * @param {number} uttime Universal time in decimal Hour fraction (0-23.999)
     * @param {char} calendar: Calendar system, 'g' for gregorian calendar, 'j'
     *   for julian calendar calendar g[regorian]|j[ulian]|a[stro = greg]
     * @returns {Number} Julian day numeric value
     */
    swe_date_conversion(
        year: number,
        month: number,
        day: number,
        uttime: number,
        calendar: "g" | "j" = "j"
    ): number {
        const tjd = NumberPointer.alloc(this.wasm, "double");
        const flag = this.wasm._swe_date_conversion(
            year,
            month,
            day,
            uttime,
            TypeConverter.charToC(calendar),
            tjd.ptr
        );
        if (flag < this.OK) throw new SWEerror("illegal date", flag);
        return tjd.readAndFree();
    }

    /**
     * Find which day of the week a particular date is
     *
     * @param {number} jd Julian day value in universal time number // 0 =
     *   monday, ... 6 = sunday;
     */
    swe_day_of_week(jd: number): number {
        return this.wasm._swe_day_of_week(jd);
    }

    /**
     * Normalize degree value to 0-360 range
     *
     * @param {number} deg Degree value number // Normalized degree value;
     */
    swe_degnorm(deg: number): number {
        return this.wasm._swe_degnorm(deg);
    }

    /**
     * Obtain the Delta T value for a date using a particular ephemeris system
     *
     * @param {number} tjd Julian day value in Universal Time
     * @param {number} iflag Ephemeris flag (SEFLG_SWIEPH, SEFLG_JPLEPH or
     *   SEFLG_MOSEPH)
     * @returns {number} Delta T value
     * @throws {SWEerror} Warning message if any
     */
    swe_deltat_ex(tjd: number, iflag: number): number {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const out = this.wasm._swe_deltat_ex(tjd, iflag, serr.ptr);
        const error = serr.readAndFree();
        if (error.trim().length > 1) throw new SWEerror(error, this.ERR);
        return out;
    }

    /**
     * Obtain the Delta T value for a particular date
     *
     * @param {number} tjd Julian day value in Universal Time number // Delta T
     *   value
     */
    swe_deltat(tjd: number): number {
        return this.wasm._swe_deltat(tjd);
    }

    /**
     * Arc distance between two points in centiseconds
     *
     * @param {number} csecP1 First point in centiseconds
     * @param {number} csecP2 Second point in centiseconds number // Distance in
     *   centiseconds from -64800000 to 64800000 (negative if second point is
     *   ahead of the first)
     */
    swe_difcs2n(csecP1: number, csecP2: number): number {
        return this.wasm._swe_difcs2n(csecP1, csecP2);
    }

    /**
     * Arc distance between two points in centiseconds in a single direction
     *
     * @param {number} csec1 First point in centiseconds
     * @param {number} csec2 Second point in centiseconds number // Distance in
     *   centiseconds from 0 to 129600000
     */
    swe_difcsn(csecP1: number, csecP2: number): number {
        return this.wasm._swe_difcsn(csecP1, csecP2);
    }

    /**
     * Arc distance between two points in degrees
     *
     * @param {number} deg1 First point in degrees
     * @param {number} deg2 Second point in degrees number // Distance in
     *   degrees from -180 to 180 (negative if second point is ahead of the
     *   first)
     */
    swe_difdeg2n(deg1: number, deg2: number): number {
        return this.wasm._swe_difdeg2n(deg1, deg2);
    }

    /**
     * Arc distance between two points in degrees in a single direction
     *
     * @param {number} deg1 First point in degrees
     * @param {number} deg2 Second point in degrees number // Distance in
     *   degrees from 0 to 360
     */
    swe_difdegn(deg1: number, deg2: number): number {
        return this.wasm._swe_difdegn(deg1, deg2);
    }

    /**
     * Get the visual magnitude (brightness) of a fixed star
     *
     * @param star: Name of the star to search for in the sefstars.txt file
     * @returns Object { name: string, // The name of the matched star from the
     *   sefstars.txt file data: number // The star's magnitude value } Star:
     *   ${result.name} Magnitude: ${result.data} `)
     */
    swe_fixstar_mag(star: string): {
        /** Star name The full star name as it appears in the sefstars.txt file */
        star_name: string;
        /** Magnitude value */
        mag: number;
    } {
        const mag = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar_mag(starPtr.ptr, mag.ptr, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            mag: mag.readAndFree(),
        };
    }

    /**
     * Calculate the positions of a star from universal time
     *
     * @param star: Name of the star to search for in the sefstars.txt file
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} iflag Calculation flags
     * @returns Object { name: string, // The name of the matched star from the
     *   sefstars.txt file data: Array<number> [ lon, // Longitude, right
     *   ascension or cartesian X lat, // Latitude, declination or cartesian Y
     *   dist, // Distance in AU or cartesian Z lonSpd, // Daily speed for lon
     *   latSpd, // Daily speed for lat distSpd, // Daily speed for dist ] }
     *   Name: ${result.name} Longitude: ${result.data[0]} `);
     */
    swe_fixstar_ut(star: string, tjd_ut: number, iflag: number): FixstarResult {
        const xx = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar_ut(
            starPtr.ptr,
            tjd_ut,
            iflag,
            xx.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            data: xx.readAndFree(),
        };
    }

    /**
     * Calculates the apparent position and motion of a fixed star for a given
     * Julian date in ephemeris/terrestrial time.
     *
     * @param {string} star - Name of the star (must match an entry in
     *   `sefstars.txt`).
     * @param {number} tjd_et - Julian day number in ephemeris time (ET).
     * @param {number} iflag - Bitwise flags that control the calculation mode
     *   and output format.
     * @returns {FixstarResult} An object containing:
     *
     *   - `star_name`: Full name of the resolved star from `sefstars.txt`
     *   - `data`: Array of 6 numbers representing the star's celestial coordinates
     *       and daily motion
     *
     * @throws {SWEerror} If the star cannot be found or the calculation fails.
     */
    swe_fixstar(star: string, tjd_et: number, iflag: number): FixstarResult {
        const xx = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar(
            starPtr.ptr,
            tjd_et,
            iflag,
            xx.ptr,
            serr.ptr
        );

        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            data: xx.readAndFree(),
        };
    }

    /**
     * Get the visual magnitude (brightness) of a fixed star
     *
     * @param {string} star - Name of the star (must match an entry in
     *   `sefstars.txt`).
     * @returns {FixstarMagnitude} An object containing:
     *
     *   - `star_name`: Full name of the resolved star from `sefstars.txt`
     *   - `magnitude`: The star's magnitude value
     *
     * @throws {SWEerror} If the star cannot be found or the calculation fails.
     */
    swe_fixstar2_mag(star: string): FixstarMagnitude {
        const mag = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar2_mag(
            starPtr.ptr,
            mag.ptr,
            serr.ptr
        );

        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            magnitude: mag.readAndFree(),
        };
    }

    /**
     * Calculate the positions of a star from universal time
     *
     * @param star: Name of the star to search for in the sefstars.txt file
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} iflag Calculation flags
     * @returns Object { name: string, // The name of the matched star from the
     *   sefstars.txt file data: Array<number> [ lon, // Longitude, right
     *   ascension or cartesian X lat, // Latitude, declination or cartesian Y
     *   dist, // Distance in AU or cartesian Z lonSpd, // Daily speed for lon
     *   latSpd, // Daily speed for lat distSpd, // Daily speed for dist ] }
     *   Name: ${result.name} Longitude: ${result.data[0]} `);
     */
    swe_fixstar2_ut(
        star: string,
        tjd_ut: number,
        iflag: number
    ): {
        /** Star name The full star name as it appears in the sefstars.txt file */
        star_name: string;
        /**
         * Array of values returned by the calculation By default the values are
         * in ecliptic coordinates (longitude, latitude, distance) If
         * `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each
         * value are also retured, otherwise they are 0 If `SEFLG_EQUATORIAL` is
         * used, the values are in equatorial coordinates instead (right
         * ascension, declination, distance) If `SELFG_XYZ` is used, the values
         * are in cartesian coordinates instead (X, Y, Z)
         */
        data: CelestialCoordinatesAdvance;
    } {
        const xx = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar2_ut(
            starPtr.ptr,
            tjd_ut,
            iflag,
            xx.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            data: xx.readAndFree(),
        };
    }

    /**
     * Calculate the positions of a star from ephemeris/terrestrial time
     *
     * @param star: Name of the star to search for in the sefstars.txt file
     * @param {number} tjd_et Julian day in ephemeris/terrestrial time
     * @param {number} iflag Calculation flags
     * @returns Object { name: string, // The name of the matched star from the
     *   sefstars.txt file data: Array<number> [ lon, // Longitude, right
     *   ascension or cartesian X lat, // Latitude, declination or cartesian Y
     *   dist, // Distance in AU or cartesian Z lonSpd, // Daily speed for lon
     *   latSpd, // Daily speed for lat distSpd, // Daily speed for dist ] }
     *   Name: ${result.name} Longitude: ${result.data[0]} `);
     */
    swe_fixstar2(
        star: string,
        tjd_et: number,
        iflag: number
    ): {
        /** Star name The full star name as it appears in the sefstars.txt file */
        star_name: string;
        /**
         * Array of values returned by the calculation By default the values are
         * in ecliptic coordinates (longitude, latitude, distance) If
         * `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each
         * value are also retured, otherwise they are 0 If `SEFLG_EQUATORIAL` is
         * used, the values are in equatorial coordinates instead (right
         * ascension, declination, distance) If `SELFG_XYZ` is used, the values
         * are in cartesian coordinates instead (X, Y, Z)
         */
        data: CelestialCoordinatesAdvance;
    } {
        const xx = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starPtr = StringPointer.from(this.wasm, star.length, star);
        const flag = this.wasm._swe_fixstar2(
            starPtr.ptr,
            tjd_et,
            iflag,
            xx.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            star_name: starPtr.readAndFree(),
            data: xx.readAndFree(),
        };
    }

    /**
     * Calculates the **Gauquelin Sector** position of a celestial body or star
     * based on the observer's location and time.
     *
     * ### Parameters
     *
     * @param tjd_ut - Julian day in Universal Time
     * @param ipl - Planet/star ID (ignored if `starname` is provided)
     * @param starname - Star name (C-style string), or `null` to use `ipl`
     * @param iflag - Calculation flags (e.g., `SEFLG_SWIEPH`)
     * @param imeth - Gauquelin sector calculation method
     * @param geopos - Geographic coordinates `[longitude, latitude, elevation]`
     * @param atpress - Atmospheric pressure in mbar/hPa
     * @param attemp - Atmospheric temperature in Celsius
     * @returns `number` — The Gauquelin sector (decimal, with fraction part)
     *
     *   ### Throws
     *
     *   Throws `SWEerror` if the underlying C function returns an error flag.
     *
     *   Const result = swe_gauquelin_sector(2413256, swe.SE_MOON, null,
     *   swe.SEFLG_SWIEPH, 0, [15, 10, 0], 0, 0); console.log(`Sector:
     *   ${Math.floor(result)}`);
     */
    swe_gauquelin_sector(
        tjd_ut: number,
        ipl: number,
        starname: string | null,
        iflag: number,
        imeth: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        atpress: number,
        attemp: number
    ): number {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const dgsect = NumberPointer.alloc(this.wasm, "double");
        const flag = this.wasm._swe_gauquelin_sector(
            tjd_ut,
            ipl,
            starnamePtr.ptr,
            iflag,
            imeth,
            geoposPtr.ptr,
            atpress,
            attemp,
            dgsect.ptr,
            serr.ptr
        );
        starnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return dgsect.readAndFree();
    }

    /**
     * Computes the **Ayanamsa** value (precession correction) for a given
     * Universal Time Julian Day, using the current ephemeris mode and optional
     * nutation flags.
     *
     * ### Parameters
     *
     * @param tjd_ut - Julian day in Universal Time
     * @param iflags - Ephemeris flags (e.g., `SEFLG_SWIEPH`, `SEFLG_JPLHOR`)
     * @returns `number` — The computed Ayanamsa value (in degrees)
     *
     *   ### Throws
     *
     *   Throws `SWEerror` if computation fails or flags are incompatible.
     *
     *   Const result = swe_get_ayanamsa_ex_ut(2314234, swe.SEFLG_SWIEPH);
     *   console.log(`Ayanamsa: ${result}`);
     */
    swe_get_ayanamsa_ex_ut(tjd_ut: number, iflags: number): number {
        const ayan = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_get_ayanamsa_ex_ut(
            tjd_ut,
            iflags,
            ayan.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return ayan.readAndFree();
    }

    /**
     * Computes the **Ayanamsa** value (precession correction) for a given
     * Ephemeris/Terrestrial time Julian Day, using the current ephemeris mode
     * and optional nutation flags.
     *
     * ### Parameters
     *
     * @param tjd_ut - Julian day in ephemeris/terrestrial time.
     * @param iflags - Ephemeris flags (e.g., `SEFLG_SWIEPH`, `SEFLG_JPLHOR`)
     * @returns `number` — The computed Ayanamsa value (in degrees)
     *
     *   ### Throws
     *
     *   Throws `SWEerror` if computation fails or flags are incompatible.
     *
     *   Const result = swe_get_ayanamsa_ex(2314234, swe.SEFLG_SWIEPH);
     *   console.log(`Ayanamsa: ${result}`);
     */
    swe_get_ayanamsa_ex(tjd_et: number, iflags: number): number {
        const ayan = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_get_ayanamsa_ex_ut(
            tjd_et,
            iflags,
            ayan.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return ayan.readAndFree();
    }

    /**
     * Returns the name of a predefined **Ayanamsa** based on its constant ID.
     *
     * ### Parameters
     *
     * @param isidmode - Ayanamsa ID (e.g., `SE_SIDM_LAHIRI`, `SE_SIDM_RAMAN`,
     *   etc.)
     * @returns `string` — The name of the corresponding Ayanamsa
     */
    swe_get_ayanamsa_name(isidmode: number): string {
        return this.wasm.UTF8ToString(
            this.wasm._swe_get_ayanamsa_name(isidmode)
        );
    }

    /**
     * Computes the **Ayanamsa** (precession correction) value for a given
     * Julian day in **Universal Time** without considering nutation.
     *
     * ### Parameters
     *
     * @param tjd_ut - Julian Day in Universal Time (UT)
     * @returns `number` — Ayanamsa value in degrees for the given date
     */
    swe_get_ayanamsa_ut(tjd_ut: number): number {
        return this.wasm._swe_get_ayanamsa_ut(tjd_ut);
    }

    /**
     * Computes the **Ayanamsa** (precession correction) value for a given
     * Julian day in **Ephemeris Time (ET)**, without accounting for nutation.
     *
     * ### Parameters
     *
     * @param tjd_et - Julian Day in Ephemeris/Terrestrial Time (ET)
     * @returns `number` — Ayanamsa value in degrees for the specified date
     */
    swe_get_ayanamsa(tjd_et: number): number {
        return this.wasm._swe_get_ayanamsa(tjd_et);
    }

    /**
     * Retrieves metadata about the **most recently used ephemeris file** of a
     * given type. this function must be called _after_ a successful ephemeris
     * calculation (e.g., `calc()` or `swe_calc_ut()`).
     *
     * ### Parameters
     *
     * @param ifno - Ephemeris file type index (0 for planetary, etc.)
     * @returns `Object` — Ephemeris file metadata: { path: string; // Absolute
     *   or relative path to the ephemeris file used start: number; // Start
     *   Julian Day of ephemeris data in the file end: number; // End Julian Day
     *   of ephemeris data in the file denum: number; // JPL DE version number
     *   used (e.g., 431) }
     *
     *   // Perform a calculation to ensure ephemeris file is loaded calc(2342342,
     *   swe.SE_VENUS, swe.SEFLG_SWIEPH);
     */
    swe_get_current_file_data(ifno: number): {
        /** Path to ephemeris file */
        path: string;
        /** Ephemeris start date for this file */
        start: number;
        /** Ephemeris end date for this file */
        end: number;
        /** JPL ephemeris version used to generate the file */
        denum: number;
    } {
        const tfstart = NumberPointer.alloc(this.wasm, "double");
        const tfend = NumberPointer.alloc(this.wasm, "double");
        const denum = NumberPointer.alloc(this.wasm, "double");

        return {
            path: this.wasm.UTF8ToString(
                this.wasm._swe_get_current_file_data(
                    ifno,
                    tfstart.ptr,
                    tfend.ptr,
                    denum.ptr
                )
            ),
            start: tfstart.readAndFree(),
            end: tfend.readAndFree(),
            denum: denum.readAndFree(),
        };
    }

    /**
     * Returns the file system path to the Swiss Ephemeris library currently in
     * use.
     *
     * @returns `string` — Path to the Swiss Ephemeris shared library.
     */
    swe_get_library_path(): string {
        const path = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_get_library_path(path.ptr);
        return path.readAndFree();
    }

    /**
     * Get an object's orbital elements for a given date in
     * ephemeris/terrestrial time
     *
     * @param tjd_et - Number // Julian day in ephemeris/terrestrial time
     * @param ipl - Number // Object ID
     * @param iflag - Number // Calculation flags
     * @returns {OrbitalElements} Array of orbital elements
     */
    swe_get_orbital_elements(
        tjd_et: number,
        ipl: number,
        iflag: number
    ): OrbitalElements {
        const dataPtr = ArrayPointer.alloc(this.wasm, "double", 50);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_get_orbital_elements(
            tjd_et,
            ipl,
            iflag,
            dataPtr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return toFixedLengthArray(dataPtr.readAndFree(), 17);
    }

    /**
     * Get the name of an astronomical object by its ID.
     *
     * @param {number} ipl Object ID (planet, asteroid, etc.)
     * @returns {String} Name of the object
     */
    swe_get_planet_name(ipl: number): string {
        const planet = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_get_planet_name(ipl, planet.ptr);
        return planet.readAndFree();
    }

    /**
     * Get internal tidal acceleration
     *
     * @returns {number} Tidal acceleration
     */
    swe_get_tid_acc(): number {
        return this.wasm._swe_get_tid_acc();
    }

    /**
     * Obtain additional data used for calculation of heliacal risings and
     * settings
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number[]} dgeo Geographic coordinates [longitude, latitude,
     *   elevation]
     * @param {number[]} datm Atmospheric conditions [pressure, temperature,
     *   humidity, meteorological range]
     * @param {number[]} dobs Observer description [age, sellen ratio, optical
     *   type, optical magnification, optical aperture, optical transmission]
     * @param object_name: Name of fixed star or planet
     * @param {number} event_type Event type
     * @param {number} hel_flag Calculation flag
     * @returns {HeliacalPhenomena} Detailed heliacal visibility data
     */
    swe_heliacal_pheno_ut(
        tjd_ut: number,
        dgeo: [longitude: number, latitude: number, elevation: number],
        datm: [
            pressure: number,
            temperature: number,
            humidity: number,
            meteorological_range: number,
        ],
        dobs: [
            age: number,
            sellen_ratio: number,
            optical_type: number,
            optical_magnification: number,
            optical_aperture: number,
            optical_transmission: number,
        ],
        object_name: string,
        event_type: number,
        hel_flag: number
    ): HeliacalPhenomena {
        const dgeoPtr = ArrayPointer.from(this.wasm, "double", 3, dgeo);
        const datmPtr = ArrayPointer.from(this.wasm, "double", 4, datm);
        const dobsPtr = ArrayPointer.from(this.wasm, "double", 6, dobs);
        const object_namePtr = StringPointer.from(
            this.wasm,
            object_name.length,
            object_name
        );
        const retPtr = ArrayPointer.alloc(this.wasm, "double", 50);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);

        const flag = this.wasm._swe_heliacal_pheno_ut(
            tjd_ut,
            dgeoPtr.ptr,
            datmPtr.ptr,
            dobsPtr.ptr,
            object_namePtr.ptr,
            event_type,
            hel_flag,
            retPtr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();

        dgeoPtr.free();
        datmPtr.free();
        dobsPtr.free();
        object_namePtr.free();
        return toFixedLengthArray(retPtr.readAndFree(), 30);
    }

    /**
     * Calculate the Julian day of the next heliacal phenomenon after a given UT
     * start date. It works between geographic latitudes 60 South and 60 North.
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number[]} dgeo Geographic coordinates [longitude, latitude,
     *   elevation]
     * @param {number[]} datm Atmospheric conditions [pressure, temperature,
     *   humidity, meteorological range]
     * @param {number[]} dobs Observer description [age, sellen ratio, optical
     *   type, optical magnification, optical aperture, optical transmission]
     * @param object_name: Name of fixed star or planet
     * @param {number} event_type Event type
     * @param {number} hel_flag Calculation flag
     * @returns {HeliacalVisibilityWindow} An array of Julian Dates related to
     *   the visibility of a celestial object, depending on the selected
     *   heliacal algorithm (`hel_flag`).
     *
     *   Array format:
     *
     *   - `[0]` → Start of visibility (`vis_start`)
     *   - `[1]` → Optimum visibility (`vis_opt`) — May be `0` if `hel_flag >=
     *       SE_HELFLAG_AV`
     *   - `[2]` → End of visibility (`vis_end`) — May be `0` if `hel_flag >=
     *       SE_HELFLAG_AV`
     */
    swe_heliacal_ut(
        tjd_ut: number,
        dgeo: [longitude: number, latitude: number, elevation: number],
        datm: [
            pressure: number,
            temperature: number,
            humidity: number,
            meteorological_range: number,
        ],
        dobs: [
            age: number,
            sellen_ratio: number,
            optical_type: number,
            optical_magnification: number,
            optical_aperture: number,
            optical_transmission: number,
        ],
        object_name: string,
        event_type: number,
        hel_flag: number
    ): HeliacalVisibilityWindow {
        const dgeoPtr = ArrayPointer.from(this.wasm, "double", 3, dgeo);
        const datmPtr = ArrayPointer.from(this.wasm, "double", 4, datm);
        const dobsPtr = ArrayPointer.from(this.wasm, "double", 6, dobs);
        const object_namePtr = StringPointer.from(
            this.wasm,
            object_name.length,
            object_name
        );
        const retPtr = ArrayPointer.alloc(this.wasm, "double", 50);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);

        const flag = this.wasm._swe_heliacal_ut(
            tjd_ut,
            dgeoPtr.ptr,
            datmPtr.ptr,
            dobsPtr.ptr,
            object_namePtr.ptr,
            event_type,
            hel_flag,
            retPtr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        dgeoPtr.free();
        datmPtr.free();
        dobsPtr.free();
        object_namePtr.free();
        return toFixedLengthArray(retPtr.readAndFree(), 3);
    }

    /**
     * Compute a planets heliocentric crossing over some longitude
     *
     * @param {number} ipl Object ID
     * @param {number} x2cross Longitude point to search for
     * @param {number} jd_ut Start date in julian days in universal time
     * @param {number} flag Calculation flag
     * @param {number} dir Search direction, 0 = forwards, -1 = backwards date:
     *   number // Next crossing date in julian days in universal time
     */
    swe_helio_cross_ut(
        ipl: number,
        x2cross: number,
        jd_ut: number,
        iflag: number,
        dir: number
    ): number {
        const jd_cross = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_helio_cross_ut(
            ipl,
            x2cross,
            jd_ut,
            iflag,
            dir,
            jd_cross.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return jd_cross.readAndFree();
    }

    /**
     * Compute a planets heliocentric crossing over some longitude
     *
     * @param {number} ipl Object ID
     * @param {number} x2cross Longitude point to search for
     * @param {number} jd_et Start date in julian days in ephemeris/terrestrial
     *   time
     * @param {number} flag Calculation flag
     * @param {number} dir Search direction, 0 = forwards, -1 = backwards
     * @returns Object { date: number // Next crossing date in julian days in
     *   ephemeris/terrestrial time }
     */
    swe_helio_cross(
        ipl: number,
        x2cross: number,
        jd_et: number,
        iflag: number,
        dir: number
    ): number {
        const jd_cross = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_helio_cross(
            ipl,
            x2cross,
            jd_et,
            iflag,
            dir,
            jd_cross.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return jd_cross.readAndFree();
    }

    /**
     * Get the name of a house system
     *
     * @param hsys: House system ID House system name
     */
    swe_house_name(hsys: HouseSystems): string {
        return this.wasm.UTF8ToString(
            this.wasm._swe_house_name(TypeConverter.charToC(hsys))
        );
    }

    /**
     * Calculate the house position of an object this function attempts to
     * obtain a visually accurate house position by also taking
     * latitude/declination into account
     *
     * @param {number} armc Right ascension
     * @param {number} geolat Geographic latitude
     * @param {number} eps Obliquity of the ecliptic
     * @param hsys: House system ID
     * @param {number[]} xpin Object position in ecliptic tropical coordinates
     *   [longitude, latitude]
     * @returns {number} House position including fraction
     */
    swe_house_pos(
        armc: number,
        geolat: number,
        eps: number,
        hsys: HouseSystems,
        xpin: [longitude: number, latitude: number]
    ): number {
        const xpinPtr = ArrayPointer.from(this.wasm, "double", 2, xpin);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const house = this.wasm._swe_house_pos(
            armc,
            geolat,
            eps,
            TypeConverter.charToC(hsys),
            xpinPtr.ptr,
            serr.ptr
        );
        const error = serr.readAndFree();
        if (error.trim().length > 1) throw new SWEerror(error, this.ERR);
        return house;
    }

    /**
     * Calculate houses and other points from right ascension and obliquity
     * including momentary motion speeds this function can be used to calculate
     * houses without a date, such as composite houses It also returns an error
     * message in case something goes wrong
     *
     * @param {number} armc Right ascension of the midheaven
     * @param {number} geolat Geographic latitude
     * @param {number} eps Obliquity of the ecliptic
     * @param {string} hsys: House system ID
     * @param {number} decl? Declination of the Sun (sunshine/makransky houses
     *   only)
     * @returns Object { data: Object { houses: Array<number> [ house_1: number,
     *   // Longitude of the first house house_2: number, // Longitude of the
     *   second house house_3: number, // Longitude of the third house ... // 36
     *   houses if gauquelin sectors, 12 houses otherwise ], ascmc:
     *   Array<number> [ asc: number, // Ascendant mc: number, // Midheaven
     *   armc: number, // Right Ascension of the midheaven vertex: number, //
     *   Vertex equasc: number, // Equatorial Ascendant coasc1: number, //
     *   Co-Ascendant (Walter Koch) coasc2: number, // Co-Ascendant (Michael
     *   Munkasey) polasc: number, // Polar Ascendant (Michael Munkasey) ],
     *   housesSpeed: Array<number> [ ... // Longitude speeds for the houses ],
     *   AscendantPointsSpeed: Array<number> [ ... // Longitude speeds for the
     *   points ] } }
     */
    swe_houses_armc_ex2<HS extends HouseSystems>(
        armc: number,
        geolat: number,
        eps: number,
        hsys: HS,
        decl?: number
    ): ConditionalReturnType<HS, { G: HousesEx<37> }, HousesEx<13>> {
        const cuspLen = hsys === "G" ? 37 : 13;
        const cusps = ArrayPointer.alloc(this.wasm, "double", 37);
        const cusp_speed = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc = ArrayPointer.alloc(this.wasm, "double", 10);
        const ascmc_speed = ArrayPointer.alloc(this.wasm, "double", 10);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        if (decl !== undefined && !isNaN(decl)) {
            ascmc.add(9, decl);
        }
        const flag = this.wasm._swe_houses_armc_ex2(
            armc,
            geolat,
            eps,
            TypeConverter.charToC(hsys),
            cusps.ptr,
            ascmc.ptr,
            cusp_speed.ptr,
            ascmc_speed.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();

        const ret = {} as ConditionalReturnType<
            HS,
            { G: HousesEx<37> },
            HousesEx<13>
        >;
        ret.cusps = toFixedLengthArray(cusps.readAndFree(), cuspLen, 0);
        ret.ascmc = toFixedLengthArray(ascmc.readAndFree(), 8);
        ret.cusp_speed = toFixedLengthArray(
            cusp_speed.readAndFree(),
            cuspLen,
            0
        );
        ret.ascmc_speed = toFixedLengthArray(ascmc_speed.readAndFree(), 8);
        return ret;
    }

    /**
     * Calculate houses and other points from right ascension and obliquity this
     * function can be used to calculate houses without a date, such as
     * composite houses
     *
     * @param {number} armc Right ascension of the midheaven
     * @param {number} geolat Geographic latitude
     * @param {number} eps Obliquity of the ecliptic
     * @param hsys: House system ID
     * @param {number} decl? Declination of the Sun (sunshine/makransky houses
     *   only)
     * @returns Object { data: Object { houses: Array<number> [ house_1: number,
     *   // Longitude of the first house house_2: number, // Longitude of the
     *   second house house_3: number, // Longitude of the third house ... // 36
     *   houses if gauquelin sectors, 12 houses otherwise ], ascmc:
     *   Array<number> [ asc: number, // Ascendant mc: number, // Midheaven
     *   armc: number, // Right Ascension of the midheaven vertex: number, //
     *   Vertex equasc: number, // Equatorial Ascendant coasc1: number, //
     *   Co-Ascendant (Walter Koch) coasc2: number, // Co-Ascendant (Michael
     *   Munkasey) polasc: number, // Polar Ascendant (Michael Munkasey) ] } }
     */
    swe_houses_armc<HS extends HouseSystems>(
        armc: number,
        geolat: number,
        eps: number,
        hsys: HS,
        decl?: number
    ): ConditionalReturnType<HS, { G: Houses<37> }, Houses<13>> {
        const cuspLen = hsys === "G" ? 37 : 13;
        const cusps = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc = ArrayPointer.alloc(this.wasm, "double", 10);
        if (decl !== undefined && !isNaN(decl)) {
            ascmc.add(9, decl);
        }
        const flag = this.wasm._swe_houses_armc(
            armc,
            geolat,
            eps,
            TypeConverter.charToC(hsys),
            cusps.ptr,
            ascmc.ptr
        );
        if (flag < this.OK) throw new SWEerror("swe_houses_armc", flag);

        const ret = {} as ConditionalReturnType<
            HS,
            { G: Houses<37> },
            Houses<13>
        >;
        ret.cusps = toFixedLengthArray(cusps.readAndFree(), cuspLen, 0);
        ret.ascmc = toFixedLengthArray(ascmc.readAndFree(), 8);
        return ret;
    }

    /**
     * Calculate houses and other ascmc with support for calculation flags
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} iflag Calculation flags
     * @param {number} geolat Geographic latitude
     * @param {number} geolon Geographic longitude
     * @param hsys: House system ID
     * @returns Object { data: Object { houses: Array<number> [ house_1: number,
     *   // Longitude of the first house house_2: number, // Longitude of the
     *   second house house_3: number, // Longitude of the third house ... // 36
     *   houses if gauquelin sectors, 12 houses otherwise ], ascmc:
     *   Array<number> [ asc: number, // Ascendant mc: number, // Midheaven
     *   armc: number, // Right Ascension of the midheaven vertex: number, //
     *   Vertex equasc: number, // Equatorial Ascendant coasc1: number, //
     *   Co-Ascendant (Walter Koch) coasc2: number, // Co-Ascendant (Michael
     *   Munkasey) polasc: number, // Polar Ascendant (Michael Munkasey) ] } }
     */
    swe_houses_ex<HS extends HouseSystems>(
        tjd_ut: number,
        iflag: number,
        geolat: number,
        geolon: number,
        hsys: HS
    ): ConditionalReturnType<HS, { G: Houses<37> }, Houses<13>> {
        const cuspLen = hsys === "G" ? 37 : 13;
        const cusps = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc = ArrayPointer.alloc(this.wasm, "double", 10);
        const flag = this.wasm._swe_houses_ex(
            tjd_ut,
            iflag,
            geolat,
            geolon,
            TypeConverter.charToC(hsys),
            cusps.ptr,
            ascmc.ptr
        );
        if (flag < this.OK) throw new SWEerror("swe_houses_ex", flag);

        const ret = {} as ConditionalReturnType<
            HS,
            { G: Houses<37> },
            Houses<13>
        >;
        ret.cusps = toFixedLengthArray(cusps.readAndFree(), cuspLen, 0);
        ret.ascmc = toFixedLengthArray(ascmc.readAndFree(), 8);
        return ret;
    }

    /**
     * Calculate the houses and other ascmc with support for calculation flags
     * and including momentary motion speeds this function also outputs an error
     * message in case something goes wrong
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} iflag Calculation flags
     * @param {number} geolat Geographic latitude
     * @param {number} geolon Geographic longitude
     * @param hsys: House system ID
     * @returns Object { data: Object { houses: Array<number> [ house_1: number,
     *   // Longitude of the first house house_2: number, // Longitude of the
     *   second house house_3: number, // Longitude of the third house ... // 36
     *   houses if gauquelin sectors, 12 houses otherwise ], ascmc:
     *   Array<number> [ asc: number, // Ascendant mc: number, // Midheaven
     *   armc: number, // Right Ascension of the midheaven vertex: number, //
     *   Vertex equasc: number, // Equatorial Ascendant coasc1: number, //
     *   Co-Ascendant (Walter Koch) coasc2: number, // Co-Ascendant (Michael
     *   Munkasey) polasc: number, // Polar Ascendant (Michael Munkasey) ],
     *   housesSpeed: Array<number> [ ... // Longitude speeds for the houses ],
     *   AscendantPointsSpeeds: Array<number> [ ... // Longitude speeds for the
     *   ascmc ] } }
     */
    swe_houses_ex2<HS extends HouseSystems>(
        tjd_ut: number,
        iflag: number,
        geolat: number,
        geolon: number,
        hsys: HS
    ): ConditionalReturnType<HS, { G: HousesEx<37> }, HousesEx<13>> {
        const cuspLen = hsys === "G" ? 37 : 13;
        const cusps = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc = ArrayPointer.alloc(this.wasm, "double", 10);
        const cusp_speed = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc_speed = ArrayPointer.alloc(this.wasm, "double", 10);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_houses_ex2(
            tjd_ut,
            iflag,
            geolat,
            geolon,
            TypeConverter.charToC(hsys),
            cusps.ptr,
            ascmc.ptr,
            cusp_speed.ptr,
            ascmc_speed.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();

        const ret = {} as ConditionalReturnType<
            HS,
            { G: HousesEx<37> },
            HousesEx<13>
        >;
        ret.cusps = toFixedLengthArray(cusps.readAndFree(), cuspLen, 0);
        ret.ascmc = toFixedLengthArray(ascmc.readAndFree(), 8);
        ret.cusp_speed = toFixedLengthArray(
            cusp_speed.readAndFree(),
            cuspLen,
            0
        );
        ret.ascmc_speed = toFixedLengthArray(ascmc_speed.readAndFree(), 8);
        return ret;
    }

    /**
     * Calculate houses and other ascmc
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} geolat Geographic latitude
     * @param {number} geolon Geographic longitude
     * @param hsys: House system ID
     * @returns
     *
     *   ```ts
     *     data: {
     *        houses: [
     *                house_1: number, // Longitude of the first house
     *                house_2: number, // Longitude of the second house
     *                house_3: number, // Longitude of the third house
     *                ... // 36 houses if gauquelin sectors, 12 houses otherwise
     *        ],
     *        ascmc: [
     *                asc: number, // Ascendant
     *                mc: number, // Midheaven
     *                armc: number, // Right Ascension of the midheaven
     *                vertex: number, // Vertex
     *                equasc: number, // Equatorial Ascendant
     *                coasc1: number, // Co-Ascendant (Walter Koch)
     *                coasc2: number, // Co-Ascendant (Michael Munkasey)
     *                polasc: number, // Polar Ascendant (Michael Munkasey)
     *        ]
     *   }
     * ```
     */
    swe_houses<HS extends HouseSystems>(
        tjd_ut: number,
        geolat: number,
        geolon: number,
        hsys: HS
    ): ConditionalReturnType<HS, { G: Houses<37> }, Houses<13>> {
        const cuspLen = hsys === "G" ? 37 : 13;
        const cusps = ArrayPointer.alloc(this.wasm, "double", 37);
        const ascmc = ArrayPointer.alloc(this.wasm, "double", 10);
        const flag = this.wasm._swe_houses(
            tjd_ut,
            geolat,
            geolon,
            TypeConverter.charToC(hsys),
            cusps.ptr,
            ascmc.ptr
        );
        if (flag < this.OK) throw new SWEerror("swe_houses", flag);

        const ret = {} as ConditionalReturnType<
            HS,
            { G: Houses<37> },
            Houses<13>
        >;
        ret.cusps = toFixedLengthArray(cusps.readAndFree(), cuspLen, 0);
        ret.ascmc = toFixedLengthArray(ascmc.readAndFree(), 8);
        return ret;
    }

    /**
     * Convert julian day in ephemeris/terrestrial time to calendar date
     *
     * @param {number} tjd_et Julian day in ephemeris/terrestrial time
     * @param {number} gregflag Calendar system, SE_GREG_CAL for gregorian
     *   calendar, SE_JUL_CAL for julian calendar
     * @returns
     *
     *   ```ts
     *   {
     *        year: number; // Full year
     *        month: number; // Month (1-12)
     *        day: number; // Day (1-31)
     *        hour: number; // Hour (0-23)
     *        minute:number; // Minute (0-59)
     *        second: number; // Second including fraction   (0-59.99999)
     *   }
     * ```
     */
    swe_jdet_to_utc(tjd_et: number, gregflag: number): DateTimeObject {
        const year = NumberPointer.alloc(this.wasm, "i32");
        const month = NumberPointer.alloc(this.wasm, "i32");
        const day = NumberPointer.alloc(this.wasm, "i32");
        const hour = NumberPointer.alloc(this.wasm, "i32");
        const minute = NumberPointer.alloc(this.wasm, "i32");
        const second = NumberPointer.alloc(this.wasm, "double");
        this.wasm._swe_jdet_to_utc(
            tjd_et,
            gregflag,
            year.ptr,
            month.ptr,
            day.ptr,
            hour.ptr,
            minute.ptr,
            second.ptr
        );
        return {
            year: year.readAndFree(),
            month: month.readAndFree(),
            day: day.readAndFree(),
            hour: hour.readAndFree(),
            minute: minute.readAndFree(),
            second: second.readAndFree(),
        };
    }

    /**
     * Convert julian day in universal time to calendar date
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} gregflag Calendar system, SE_GREG_CAL for gregorian
     *   calendar, SE_JUL_CAL for julian calendar
     * @returns Object { year: number; // Full year month: number; // Month
     *   (1-12) day: number; // Day (1-31) hour: number; // Hour (0-23) minute:
     *   number; // Minute (0-59) second: number; // Second including fraction
     *   (0-59.99999) }
     */
    swe_jdut1_to_utc(tjd_ut: number, gregflag: number): DateTimeObject {
        const year = NumberPointer.alloc(this.wasm, "i32");
        const month = NumberPointer.alloc(this.wasm, "i32");
        const day = NumberPointer.alloc(this.wasm, "i32");
        const hour = NumberPointer.alloc(this.wasm, "i32");
        const minute = NumberPointer.alloc(this.wasm, "i32");
        const second = NumberPointer.alloc(this.wasm, "double");
        this.wasm._swe_jdut1_to_utc(
            tjd_ut,
            gregflag,
            year.ptr,
            month.ptr,
            day.ptr,
            hour.ptr,
            minute.ptr,
            second.ptr
        );
        return {
            year: year.readAndFree(),
            month: month.readAndFree(),
            day: day.readAndFree(),
            hour: hour.readAndFree(),
            minute: minute.readAndFree(),
            second: second.readAndFree(),
        };
    }

    /**
     * Convert a calendar date to julian day in universal time
     *
     * @param {number} year Full year
     * @param {number} month Month (1-12)
     * @param {number} day Day (1-31)
     * @param {number} hour Hour with fraction (0-23.99999)
     * @param {number} gregflag Calendar system, SE_GREG_CAL for gregorian
     *   calendar, SE_JUL_CAL for julian calendar number // Julian day value in
     *   universal time
     */
    swe_julday(
        year: number,
        month: number,
        day: number,
        hour: number,
        gregflag: number
    ): number {
        return this.wasm._swe_julday(year, month, day, hour, gregflag);
    }

    /**
     * Transform local apparent time to local mean time
     *
     * @param {number} tjd_lat Local apparent time in julian day in universal
     *   time
     * @param {number} geolon Geographic longitude
     * @returns Object { error: string, // Error message in case of error data:
     *   number // Local mean time in julian day in universal time }
     */
    swe_lat_to_lmt(tjd_lat: number, geolon: number): number {
        const tjd_lmt = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lat_to_lmt(
            tjd_lat,
            geolon,
            tjd_lmt.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return tjd_lmt.readAndFree();
    }

    /**
     * Transform local mean time to local apparent time
     *
     * @param {number} tjd_lmt Local mean time in julian day in universal time
     * @param {number} geolon Geographic longitude
     * @returns Object { error: string, // Error message in case of error data:
     *   number // Local apparent time in julian day in universal time }
     */
    swe_lmt_to_lat(tjd_lmt: number, geolon: number): number {
        const tjd_lat = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lmt_to_lat(
            tjd_lmt,
            geolon,
            tjd_lat.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return tjd_lat.readAndFree();
    }

    /**
     * Get lunar eclipse data for a given date
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ifl Ephemeris flag
     * @param {number[]} geopos Geographic coordinates [longitude, latitude,
     *   elevation]
     * @returns Object { flag: number, // ERR, eclipse type (SE_ECL_TOTAL,
     *   SE_ECL_PENUMBRAL, SE_ECL_PARTIAL) or 0 if no eclipse error: string, //
     *   Error message in case of error data: Array<number> [ umbral_mag, //
     *   Umbral magnitude at jd penumbral_mag, // Penumbral magnitude -, //
     *   Unused -, // Unused azimuth, // Azimuth of the moon at jd
     *   true_altitude, // True altitude of the moon above horizon at jd
     *   apparent_altitude, // Apparent altitude of the moon above horizon at jd
     *   distance, // Distance of the moon from opposition in degrees
     *   eclipse_mag, // Eclipse magnitude (same as umbral magnitude)
     *   saros_number, // Saros series number (if available, otherwise
     *   -99999999) saros_member // Saros series member number (if available,
     *   otherwise -99999999) ] } type: ${result.flag} magnitude:
     *   ${result.data[0]} `)
     */
    swe_lun_eclipse_how(
        tjd_ut: number,
        ifl: number,
        geopos: [longitude: number, latitude: number, elevation: number]
    ): LunarEclipseCharacteristics {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lun_eclipse_how(
            tjd_ut,
            ifl,
            geoposPtr.ptr,
            attr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return toFixedLengthArray(attr.readAndFree(), 11);
    }

    /**
     * Search for lunar eclipses at a given location
     *
     * @param {number} tjd_start Julian day in universal time to start searching
     *   from
     * @param {number} ifl Ephemeris flag
     * @param {number[]} geopos Geographic coordinates [longitude, latitude,
     *   elevation]
     * @param backwards: Boolean // Search backwards in time instead
     * @returns Object { flag: number, // ERR, eclipse type (SE_ECL_TOTAL,
     *   SE_ECL_PENUMBRAL, SE_ECL_PARTIAL) or 0 if no eclipse found error:
     *   string, // Error message in case of error data: Array<number> [
     *   eclipse_max, // Time of maximum eclipse in jd -, // Unused
     *   partial_start, // Time of partial phase start partial_end, // Time of
     *   partial phase end total_start, // Time of totality start total_end, //
     *   Time of totality end penumbral_start, // Time of penumbral phase start
     *   penumbral_end, // Time of penumbral phase end rise, // Time of
     *   moonrise, if it occurs during the eclipse set, // Time of moonset, if
     *   it occurs during the eclipse ], Array: Array<number> [ umbral_mag, //
     *   Umbral magnitude at jd penumbral_mag, // Penumbral magnitude -, //
     *   Unused -, // Unused azimuth, // Azimuth of the moon at jd
     *   true_altitude, // True altitude of the moon above horizon at jd
     *   apparent_altitude, // Apparent altitude of the moon above horizon at jd
     *   distance, // Distance of the moon from opposition in degrees
     *   eclipse_mag, // Eclipse magnitude (same as umbral magnitude)
     *   saros_number, // Saros series number (if available, otherwise
     *   -99999999) saros_member // Saros series member number (if available,
     *   otherwise -99999999) ] } type: ${result.flag} eclipse_max:
     *   ${result.data[0]} `)
     */
    swe_lun_eclipse_when_loc(
        tjd_start: number,
        ifl: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        backwards: boolean
    ): {
        /** Array of eclipse timings */
        data: EclipsePhaseTimesWithMoonriseSet;
        /** Array of additional data about the lunar eclipse */
        Array: LunarEclipseCharacteristics;
    } {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const ret = ArrayPointer.alloc(this.wasm, "double", 10);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lun_eclipse_when_loc(
            tjd_start,
            ifl,
            geoposPtr.ptr,
            ret.ptr,
            attr.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        geoposPtr.free();
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            data: ret.readAndFree(),
            Array: toFixedLengthArray(attr.readAndFree(), 11),
        };
    }

    /**
     * Search for lunar eclipses
     *
     * @param {number} tjd_start Julian day in universal time to start searching
     *   from
     * @param {number} ifl Ephemeris flag
     * @param {number} ifltype Eclipse type (SE_ECL_TOTAL, SE_ECL_PENUMBRAL,
     *   SE_ECL_PARTIAL or 0 for any)
     * @param backwards: Boolean // Search backwards in time instead
     * @returns Object { flag: number, // ERR, eclipse type (SE_ECL_TOTAL,
     *   SE_ECL_PENUMBRAL, SE_ECL_PARTIAL) or 0 if no eclipse found error:
     *   string, // Error message in case of error data: Array<number> [
     *   eclipse_max, // Time of maximum eclipse in jd -, // Unused
     *   partial_start, // Time of partial phase start partial_end, // Time of
     *   partial phase end total_start, // Time of totality start total_end, //
     *   Time of totality end penumbral_start, // Time of penumbral phase start
     *   penumbral_end, // Time of penumbral phase end ] } type: ${result.flag}
     *   eclipse_max: ${result.data[0]} `)
     */
    swe_lun_eclipse_when(
        tjd_start: number,
        ifl: number,
        ifltype: number,
        backwards: boolean
    ): EclipsePhaseTimes {
        const ret = ArrayPointer.alloc(this.wasm, "double", 10);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lun_eclipse_when(
            tjd_start,
            ifl,
            ifltype,
            ret.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return toFixedLengthArray(ret.readAndFree(), 8);
    }

    /**
     * Search for lunar eclipses globally
     *
     * @param {number} tjd_start Julian day in universal time to start searching
     *   from
     * @param {number} ipl Object ID
     * @param starname: String | null // Star name if star, otherwise set to
     *   null
     * @param {number} ifl Ephemeris flag
     * @param {number} ifltype Eclipse type (SE_ECL_TOTAL, SE_ECL_ANNULAR,
     *   SE_ECL_PARTIAL, SE_ECL_ANNULAR_TOTAL, SE_ECL_CENTRAL, SE_ECL_NONCENTRAL
     *   or 0 for any)
     * @param backwards: Boolean // Search backwards in time instead
     * @returns Object { flag: number, // ERR, eclipse type (SE_ECL_TOTAL,
     *   SE_ECL_ANNULAR, SE_ECL_PARTIAL, SE_ECL_ANNULAR_TOTAL, SE_ECL_CENTRAL,
     *   SE_ECL_NONCENTRAL) or 0 if no eclipse found error: string, // Error
     *   message in case of error data: Array<number> [ eclipse_max, // Time of
     *   maximum eclipse in jd local_noon, // Time when eclipse takes place at
     *   local apparent noon eclipse_start, // Time of eclipse start
     *   eclipse_end, // Time of eclipse end total_start, // Time of totality
     *   start total_end, // Time of totality end center_start, // Time of
     *   center line start center_end, // Time of center line end annular_total,
     *   // Time when annular-total eclipse becomes total total_annular // Time
     *   when annular-total eclipse becomes annular again ] } type:
     *   ${result.flag} eclipse_max: ${result.data[0]} `)
     */
    swe_lun_occult_when_glob(
        tjd_start: number,
        ipl: number,
        starname: string | null | undefined,
        ifl: number,
        ifltype: number,
        backwards: boolean
    ): EclipsePhaseTimesAdvance {
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const ret = ArrayPointer.alloc(this.wasm, "double", 10);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_lun_occult_when_glob(
            tjd_start,
            ipl,
            starnamePtr.ptr,
            ifl,
            ifltype,
            ret.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        starnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return ret.readAndFree();
    }

    /**
     * Search for lunar eclipses locally
     *
     * @param {number} tjd_start Julian day in universal time to start searching
     *   from
     * @param {number} ipl Object ID
     * @param starname: String | null // Star name if star, otherwise set to
     *   null
     * @param {number} ifl Ephemeris flag
     * @param {number[]} geopos Geographic coordinates [longitude, latitude,
     *   elevation]
     * @param backwards: Boolean // Search backwards in time instead
     * @returns Object { flag: number, // ERR, eclipse/occulation type or 0 if
     *   none found error: string, // Error message in case of error data:
     *   Array<number> [ max_eclipse: number, // Time of maximum eclipse
     *   first_contact: number, // Time of first contact second_contact: number,
     *   // Time of second contact third_contact: number, // Time of third
     *   contact fourth_contact: number, // Time of fourth contact sunrise:
     *   number, // Time of sunrise between first and forth contact sunset:
     *   number // Time of sunset between first and forth contact ], Array:
     *   Array<number> [ solar_diameter: number, // Fraction of solar diameter
     *   covered by moon (magnitude) lunar_diameter: number, // Ratio of lunar
     *   diameter to solar one solar_disc: number, // Fraction of solar disc
     *   covered by moon (obscuration) core_shadow: number, // Diameter of core
     *   shadow in km sun_azimuth: number, // Azimuth of sun at tjd
     *   true_altitude: number, // True altitude of sun above horizon at tjd
     *   mean_altitude: number, // Apparent altitude of sun above horizon at tjd
     *   elongation: number // Elongation of moon in degrees ] } type:
     *   ${result.flag} eclipse_max: ${result.data[0]} `)
     */
    swe_lun_occult_when_loc(
        tjd_start: number,
        ipl: number,
        starname: string | null,
        ifl: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        backwards: boolean
    ): {
        /** Array of eclipse timings */
        data: EclipseContactTimes;
        /** Array of additional data about the lunar eclipse */
        Array: EclipseCharacteristics;
    } {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const ret = ArrayPointer.alloc(this.wasm, "double", 10);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const flag = this.wasm._swe_lun_occult_when_loc(
            tjd_start,
            ipl,
            starnamePtr.ptr,
            ifl,
            geoposPtr.ptr,
            ret.ptr,
            attr.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        geoposPtr.free();
        starnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            data: toFixedLengthArray(ret.readAndFree(), 7),
            Array: toFixedLengthArray(attr.readAndFree(), 8),
        };
    }

    /**
     * Get geographical coordinates for an eclipse
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ipl Object ID
     * @param starname: String | null // Star name if star, otherwise set to
     *   null
     * @param {number} ifl Ephemeris flag
     * @returns Object { flag: number, // ERR, eclipse/occulation type or 0 if
     *   none found error: string, // Error message in case of error data:
     *   Array<number> [ central_long: number, // Geographic longitude of
     *   central line central_lat: number, // Geographic latitude of central
     *   line north_umbra_long: number, // Geographic longitude of northern
     *   limit of umbra north_umbra_lat: number, // Geographic latitude of
     *   northern limit of umbra south_umbra_long: number, // Geographic
     *   longitude of southern limit of umbra south_umbra_lat: number, //
     *   Geographic latitude of southern limit of umbra north_penumbra_long:
     *   number, // Geographic longitude of northern limit of penumbra
     *   north_penumbra_lat: number, // Geographic latitude of northern limit of
     *   penumbra south_penumbra_long: number, // Geographic longitude of
     *   southern limit of penumbra south_penumbra_lat: number // Geographic
     *   latitude of southern limit of penumbra ], Array: Array<number> [
     *   diameter_fraction: number, // Fraction of object's diameter covered by
     *   moon (magnitude) diameter_ratio: number, // Ratio of lunar diameter to
     *   object's diameter disc_fraction: number, // Fraction of object's disc
     *   covered by moon (obscuration) core_shadow: number, // Diameter of core
     *   shadow in km azimuth: number, // Azimuth of object at tjd
     *   true_altitude: number, // True altitude of object above horizon at tjd
     *   apparent_altitude: number, // Apparent altitude of object above horizon
     *   at tjd angular_distance: number, // Angular distance of moon from
     *   object in degrees ] } type: ${result.flag} longitude: ${result.data[0]}
     *   `)
     */
    swe_lun_occult_where(
        tjd_ut: number,
        ipl: number,
        starname: string | null,
        ifl: number
    ): {
        /** Array of eclipse coordinates */
        data: EclipseGeographicCoords;
        /** Array of additional data about the eclipse */
        Array: [
            /** Fraction of object's diameter covered by moon (magnitude) */
            object_diameter: number,
            /** Ratio of lunar diameter to object's diameter */
            lunar_diameter: number,
            /** Fraction of object's disc covered by moon (obscuration) */
            object_disc: number,
            /** Diameter of core shadow in km */
            core_shadow: number,
            /** Azimuth of object at tjd */
            object_azimuth: number,
            /** True altitude of object above horizon at tjd */
            true_altitude: number,
            /** Apparent altitude of object above horizon at tjd */
            apparent_altitude: number,
            /** Angular distance of moon from object in degrees */
            angular_distance: number,
        ];
    } {
        const geopos = ArrayPointer.alloc(this.wasm, "double", 10);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const flag = this.wasm._swe_lun_occult_where(
            tjd_ut,
            ipl,
            starnamePtr.ptr,
            ifl,
            geopos.ptr,
            attr.ptr,
            serr.ptr
        );
        starnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.read(), flag);
        serr.free();
        return {
            data: geopos.readAndFree(),
            Array: toFixedLengthArray(attr.readAndFree(), 8),
        };
    }

    /**
     * Compute the next Moon crossing over its node, by finding zero latitude
     * crossing
     *
     * @param {number} jd_ut Start date in julian days in universal time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   universal time error: string, // Error message if resulting date is
     *   smaller than starting date longitude: number, // Ecliptic longitude
     *   where the crossing happens latitude: number // Ecliptic latitude
     *   precision margin for the crossing date }
     */
    swe_mooncross_node_ut(
        jd_ut: number,
        flag: number
    ): {
        /** Ecliptic longitude where the crossing happens */
        longitude: number;
        /** Ecliptic latitude margin of precision for the crossing date */
        latitude: number;
        /*
         * next Moon crossing over node in UT
         */
        jd: number;
    } {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const xlon = NumberPointer.alloc(this.wasm, "double");
        const xlat = NumberPointer.alloc(this.wasm, "double");
        const jd = this.wasm._swe_mooncross_node_ut(
            jd_ut,
            flag,
            xlon.ptr,
            xlat.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            jd,
            longitude: xlon.readAndFree(),
            latitude: xlat.readAndFree(),
        };
    }

    /**
     * Compute the next Moon crossing over its node, by finding zero latitude
     * crossing
     *
     * @param {number} jd_et Start date in julian days in ephemeris/terrestrial
     *   time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   ephemeris/terrestrial time error: string, // Error message if resulting
     *   date is smaller than starting date longitude: number, // Ecliptic
     *   longitude where the crossing happens latitude: number // Ecliptic
     *   latitude precision margin for the crossing date }
     */
    swe_mooncross_node(
        jd_et: number,
        flag: number
    ): {
        /** Ecliptic longitude where the crossing happens */
        longitude: number;
        /** Ecliptic latitude margin of precision for the crossing date */
        latitude: number;
        /*
         * next Moon crossing over node in UT
         */
        jd: number;
    } {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const xlon = NumberPointer.alloc(this.wasm, "double");
        const xlat = NumberPointer.alloc(this.wasm, "double");
        const jd = this.wasm._swe_mooncross_node(
            jd_et,
            flag,
            xlon.ptr,
            xlat.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            jd,
            longitude: xlon.readAndFree(),
            latitude: xlat.readAndFree(),
        };
    }

    /**
     * Compute Moon's crossing over some longitude
     *
     * @param {number} x2cross Ecliptic latitude position to search for
     * @param {number} jd_ut Start date in julian days in universal time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   universal time error: string, // Error message if resulting date is
     *   smaller than starting date }
     */
    swe_mooncross_ut(x2cross: number, jd_ut: number, flag: number): number {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const jd = this.wasm._swe_mooncross_ut(x2cross, jd_ut, flag, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return jd;
    }

    /**
     * Compute Moon's crossing over some longitude
     *
     * @param {number} x2cross Ecliptic latitude position to search for
     * @param {number} jd_et Start date in julian days in ephemeris/terrestrial
     *   time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   ephemeris/terrestrial time error: string, // Error message if resulting
     *   date is smaller than starting date }
     */
    swe_mooncross(x2cross: number, jd_et: number, flag: number): number {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const jd = this.wasm._swe_mooncross(x2cross, jd_et, flag, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return jd;
    }

    /**
     * Calculate an object's nodes and apsides from universal time If the
     * calculation method includes `SE_NODBIT_FOPOINT`, the `aphelion` field
     * contains the values for the object's "second focus" instead
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ipl Object ID
     * @param {number} iflag Calculation flags
     * @param {number} method Calculation method flags
     * @returns Object { flag: number, // Computed flags or ERR error: string,
     *   // Error message in case of error data: Object { ascending:
     *   Array<number> [ lon, // Longitude, right ascension, or cartesian X lat,
     *   // Latitude, declination or cartesian Y dist, // Distance in AU or
     *   cartesian Z lonSpd, // Daily speed for lon latSpd, // Daily speed for
     *   lat distSpd, // Daily speed for dist ], descending: Array<number> [
     *   lon, // Longitude, right ascension, or cartesian X lat, // Latitude,
     *   declination or cartesian Y dist, // Distance in AU or cartesian Z
     *   lonSpd, // Daily speed for lon latSpd, // Daily speed for lat distSpd,
     *   // Daily speed for dist ], perihelion: Array<number> [ lon, //
     *   Longitude, right ascension, or cartesian X lat, // Latitude,
     *   declination or cartesian Y dist, // Distance in AU or cartesian Z
     *   lonSpd, // Daily speed for lon latSpd, // Daily speed for lat distSpd,
     *   // Daily speed for dist ], aphelion: Array<number> [ lon, // Longitude,
     *   right ascension, or cartesian X lat, // Latitude, declination or
     *   cartesian Y dist, // Distance in AU or cartesian Z lonSpd, // Daily
     *   speed for lon latSpd, // Daily speed for lat distSpd, // Daily speed
     *   for dist ], } }
     */
    swe_nod_aps_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number,
        method: number
    ): NodAps {
        const asc = ArrayPointer.alloc(this.wasm, "double", 6);
        const dsc = ArrayPointer.alloc(this.wasm, "double", 6);
        const per = ArrayPointer.alloc(this.wasm, "double", 6);
        const aph = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_nod_aps_ut(
            tjd_ut,
            ipl,
            iflag,
            method,
            asc.ptr,
            dsc.ptr,
            per.ptr,
            aph.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            ascending: asc.readAndFree(),
            descending: dsc.readAndFree(),
            perihelion: per.readAndFree(),
            aphelion: aph.readAndFree(),
        };
    }

    /**
     * Calculate an object's nodes and apsides from ephemeris/terrestrial time
     * If the calculation method includes `SE_NODBIT_FOPOINT`, the `aphelion`
     * field contains the values for the object's "second focus" instead
     *
     * @param {number} tjd_et Julian day in ephemeris/terrestrial time
     * @param {number} ipl Object ID
     * @param {number} iflag Calculation flags
     * @param {number} method Calculation method flags
     * @returns Object { flag: number, // Computed flags or ERR error: string,
     *   // Error message in case of error data: Object { ascending:
     *   Array<number> [ lon, // Longitude, right ascension, or cartesian X lat,
     *   // Latitude, declination or cartesian Y dist, // Distance in AU or
     *   cartesian Z lonSpd, // Daily speed for lon latSpd, // Daily speed for
     *   lat distSpd, // Daily speed for dist ], descending: Array<number> [
     *   lon, // Longitude, right ascension, or cartesian X lat, // Latitude,
     *   declination or cartesian Y dist, // Distance in AU or cartesian Z
     *   lonSpd, // Daily speed for lon latSpd, // Daily speed for lat distSpd,
     *   // Daily speed for dist ], perihelion: Array<number> [ lon, //
     *   Longitude, right ascension, or cartesian X lat, // Latitude,
     *   declination or cartesian Y dist, // Distance in AU or cartesian Z
     *   lonSpd, // Daily speed for lon latSpd, // Daily speed for lat distSpd,
     *   // Daily speed for dist ], aphelion: Array<number> [ lon, // Longitude,
     *   right ascension, or cartesian X lat, // Latitude, declination or
     *   cartesian Y dist, // Distance in AU or cartesian Z lonSpd, // Daily
     *   speed for lon latSpd, // Daily speed for lat distSpd, // Daily speed
     *   for dist ], } }
     */
    swe_nod_aps(
        tjd_et: number,
        ipl: number,
        iflag: number,
        method: number
    ): NodAps {
        const asc = ArrayPointer.alloc(this.wasm, "double", 6);
        const dsc = ArrayPointer.alloc(this.wasm, "double", 6);
        const per = ArrayPointer.alloc(this.wasm, "double", 6);
        const aph = ArrayPointer.alloc(this.wasm, "double", 6);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_nod_aps(
            tjd_et,
            ipl,
            iflag,
            method,
            asc.ptr,
            dsc.ptr,
            per.ptr,
            aph.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            ascending: asc.readAndFree(),
            descending: dsc.readAndFree(),
            perihelion: per.readAndFree(),
            aphelion: aph.readAndFree(),
        };
    }

    /**
     * Get orbital maximum and minimum possible distances
     *
     * @param {number} tjd_et Julian day in ephemeris/terrestrial time
     * @param {number} ipl Object ID
     * @param {number} iflag Calculation flags
     * @returns Object { error: string, // Error message or warning if any data:
     *   Object { max: number, // maximum possible distance min: number, //
     *   minimum possible distance true: number // current true distance } }
     */
    swe_orbit_max_min_true_distance(
        tjd_et: number,
        ipl: number,
        iflag: number
    ): {
        /** Maximum possible distance */
        max: number;
        /** Minimum possible distance */
        min: number;
        /** Current true distance */
        true: number;
    } {
        const dmax = NumberPointer.alloc(this.wasm, "double");
        const dmin = NumberPointer.alloc(this.wasm, "double");
        const dtrue = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_orbit_max_min_true_distance(
            tjd_et,
            ipl,
            iflag,
            dmax.ptr,
            dmin.ptr,
            dtrue.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            max: dmax.readAndFree(),
            min: dmin.readAndFree(),
            true: dtrue.readAndFree(),
        };
    }

    /**
     * Compute phase, phase angle, elongation, apparent diameter, apparent
     * magnitude for the Sun, the Moon, all planets and asteroids
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ipl Object ID
     * @param {number} iflag Calculation flags
     * @returns Object { error: string, // Error message or warning if any data:
     *   Array<number> [ phase_angle: number, // Phase angle (Earth-planet-sun)
     *   phase: number, // Phase (illumined fraction of disc) elongation:
     *   number, // Elongation of planet diameter: number, // Apparent diameter
     *   of disc magnitude: number // Apparent magnitude ] }
     */
    swe_pheno_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number
    ): [
        /** Phase angle (Earth-planet-sun) */
        phase_angle: number,
        /** Phase (illumined fraction of disc) */
        phase: number,
        /** Elongation of planet */
        elongation: number,
        /** Apparent diameter of disc */
        diameter: number,
        /** Apparent magnitude */
        magnitude: number,
    ] {
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_pheno_ut(
            tjd_ut,
            ipl,
            iflag,
            attr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return toFixedLengthArray(attr.readAndFree(), 5);
    }

    /**
     * Compute phase, phase angle, elongation, apparent diameter, apparent
     * magnitude for the Sun, the Moon, all planets and asteroids
     *
     * @param {number} tjd_et Julian day in ephemeris/terrestrial time
     * @param {number} ipl Object ID
     * @param {number} iflag Calculation flags
     * @returns Object { error: string, // Error message or warning if any data:
     *   Array<number> [ phase_angle: number, // Phase angle (Earth-planet-sun)
     *   phase: number, // Phase (illumined fraction of disc) elongation:
     *   number, // Elongation of planet diameter: number, // Apparent diameter
     *   of disc magnitude: number // Apparent magnitude ] }
     */
    swe_pheno(
        tjd_et: number,
        ipl: number,
        iflag: number
    ): [
        /** Phase angle (Earth-planet-sun) */
        phase_angle: number,
        /** Phase (illumined fraction of disc) */
        phase: number,
        /** Elongation of planet */
        elongation: number,
        /** Apparent diameter of disc */
        diameter: number,
        /** Apparent magnitude */
        magnitude: number,
    ] {
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_pheno(
            tjd_et,
            ipl,
            iflag,
            attr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return toFixedLengthArray(attr.readAndFree(), 5);
    }

    /**
     * Normalize radians to 0π-2π range
     *
     * @param {number} drad Degree value in radians number // Normalized radian
     *   value
     */
    swe_radnorm(drad: number): number {
        return this.wasm._swe_radnorm(drad);
    }

    /**
     * Calculate true altitude from the apparent altitude or apparent altitude
     * from true altitude Extended function also supports negative heights and
     * more
     *
     * @param {number} inalt Input altitude in degrees above the horizon
     * @param {number} geoalt Altitude of the observer above sea level in meters
     * @param {number} atpress Atmospheric pressure in mbar/hpa
     * @param {number} attemp Atmospheric temperature in celsius
     * @param {number} lapse_rate (attemp/geoalt) = [°K/m]
     * @param {number} calc_flag Calculation flag (SE_TRUE_TO_APP or
     *   SE_APP_TO_TRUE)
     * @returns Object { data: number, // Converted altitude extended:
     *   Array<number> [ true_altitude, // True altitude if possible, otherwise
     *   input value apparent_altitude, // Apparent altitude if possible,
     *   otherwise input value refraction, // Refraction value dip // Dip of the
     *   horizon ] }
     */
    swe_refrac_extended(
        inalt: number,
        geoalt: number,
        atpress: number,
        attemp: number,
        lapse_rate: number,
        calc_flag: number
    ): {
        /** Converted altitude value */
        altitude: number;
        /** Array containing additional output from altitude conversion */
        extended: [
            /** True altitude if possible, otherwise input value */
            true_altitude: number,
            /** Apparent altitude if possible, otherwise input value */
            apparent_altitude: number,
            /** Refraction value */
            refraction: number,
            /** Dip of the horizon */
            dip: number,
        ];
    } {
        const ret = ArrayPointer.alloc(this.wasm, "double", 20);
        const altitude = this.wasm._swe_refrac_extended(
            inalt,
            geoalt,
            atpress,
            attemp,
            lapse_rate,
            calc_flag,
            ret.ptr
        );
        return {
            altitude,
            extended: toFixedLengthArray(ret.readAndFree(), 4),
        };
    }

    /**
     * Calculate true altitude from the apparent altitude or apparent altitude
     * from true altitude
     *
     * @param {number} inalt Input altitude in degrees above the horizon
     * @param {number} atpress Atmospheric pressure in mbar/hpa
     * @param {number} attemp Atmospheric temperature in celsius
     * @param {number} calc_flag Calculation flag (SE_TRUE_TO_APP or
     *   SE_APP_TO_TRUE) number // Converted altitude
     */
    swe_refrac(
        inalt: number,
        atpress: number,
        attemp: number,
        calc_flag: number
    ): number {
        return this.wasm._swe_refrac(inalt, atpress, attemp, calc_flag);
    }

    /**
     * Compute year, month, day and hour from a julian day number
     *
     * @param {number} tjd Julian day in universal time
     * @param {number} gregflag Calendar system, SE_GREG_CAL for gregorian
     *   calendar, SE_JUL_CAL for julian calendar
     * @returns Object { year: number; month: number; day: number; hour: number;
     *   }
     */
    swe_revjul(
        tjd: number,
        gregflag: number
    ): {
        /** Full year */
        year: number;
        /** Month (1-12) */
        month: number;
        /** Day (1-31) */
        day: number;
        /** Hour including fraction (0-23.99999) */
        hour: number;
    } {
        const year = NumberPointer.alloc(this.wasm, "i32");
        const month = NumberPointer.alloc(this.wasm, "i32");
        const day = NumberPointer.alloc(this.wasm, "i32");
        const hour = NumberPointer.alloc(this.wasm, "double");
        this.wasm._swe_revjul(
            tjd,
            gregflag,
            year.ptr,
            month.ptr,
            day.ptr,
            hour.ptr
        );
        return {
            year: year.readAndFree(),
            month: month.readAndFree(),
            day: day.readAndFree(),
            hour: hour.readAndFree(),
        };
    }

    /**
     * Compute the times of rising, setting and meridian transits for all
     * planets, asteroids, the moon, and the fixed stars this funcation also
     * supports custom local horizon altitude
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ipl Object ID
     * @param starname: String | null // Name of the star if a star is desired,
     *   null otherwise
     * @param {number} epheflag Ephemeris flag
     * @param {number} rsmi Transit type (SE_CALC_RISE, SE_CALC_SET,
     *   SE_CALC_MTRANSIT, SE_CALC_ITRANSIT) plus additional transit flags
     * @param {number[]} geopos Geographic coordinates of the observer
     *   [longitude, latitude, elevation]
     * @param {number} atpress Atmospheric pressure in mbar/hpa
     * @param {number} attemp Atmospheric temperature in celsius
     * @param {number} horhgt Height of local horizon in degrees at the point
     *   where the body rises or sets
     * @returns Object { flag: number, // OK, ERR or -2 if circumpolar object
     *   error: string, // Error message if any data: number // Transit time in
     *   julian days in universal time }
     */
    swe_rise_trans_true_hor(
        tjd_ut: number,
        ipl: number,
        starname: string | null,
        epheflag: number,
        rsmi: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        atpress: number,
        attemp: number,
        horhgt: number
    ): number {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const ret = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const flag = this.wasm._swe_rise_trans_true_hor(
            tjd_ut,
            ipl,
            starnamePtr.ptr,
            epheflag,
            rsmi,
            geoposPtr.ptr,
            atpress,
            attemp,
            horhgt,
            ret.ptr,
            serr.ptr
        );
        geoposPtr.free();
        starnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return ret.readAndFree();
    }

    /**
     * Compute the times of rising, setting and meridian transits for all
     * planets, asteroids, the moon, and the fixed stars
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ipl Object ID
     * @param starname: String | null // Name of the star if a star is desired,
     *   null otherwise
     * @param {number} epheflag Ephemeris flag
     * @param {number} rsmi Transit type (SE_CALC_RISE, SE_CALC_SET,
     *   SE_CALC_MTRANSIT, SE_CALC_ITRANSIT) plus additional transit flags
     * @param {number[]} geopos Geographic coordinates of the observer
     *   [longitude, latitude, elevation]
     * @param {number} atpress Atmospheric pressure in mbar/hpa
     * @param {number} attemp Atmospheric temperature in celsius
     * @returns Object { flag: number, // OK, ERR or -2 if circumpolar object
     *   error: string, // Error message if any data: number // Transit time in
     *   julian days in universal time }
     */
    swe_rise_trans(
        tjd_ut: number,
        ipl: number,
        starname: string | null,
        epheflag: number,
        rsmi: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        atpress: number,
        attemp: number
    ): number {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const ret = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const starnamePtr = starname
            ? StringPointer.from(this.wasm, starname.length, starname)
            : new NullPointer();
        const flag = this.wasm._swe_rise_trans(
            tjd_ut,
            ipl,
            starnamePtr.ptr,
            epheflag,
            rsmi,
            geoposPtr.ptr,
            atpress,
            attemp,
            ret.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return ret.readAndFree();
    }

    /**
     * Sets a custom Delta T value to be used by Swiss Ephemeris time-based
     * functions.
     *
     * Once set, this Delta T value will be returned by `swe_deltat()` and
     * `swe_deltat_ex()`, and will be used internally by all functions that
     * require Universal Time (UT) as input, such as `swe_calc_ut()`, eclipse
     * calculations, and heliacal functions.
     *
     * To revert to automatic Delta T calculation, pass `SE_DELTAT_AUTOMATIC` as
     * the argument.
     *
     * @example
     *     // Set custom Delta T value
     *     swe.swe_set_delta_t_userdef(66.5);
     *
     *     // Reset to automatic Delta T
     *     swe.swe_set_delta_t_userdef(swe.SE_DELTAT_AUTOMATIC);
     *
     * @param t_acc - Custom Delta T value in seconds. Use `SE_DELTAT_AUTOMATIC`
     *   to reset to automatic mode.
     */
    swe_set_delta_t_userdef(t_acc: number): void {
        return this.wasm._swe_set_delta_t_userdef(t_acc);
    }

    /**
     * Loads ephemeris files from a remote or local path into WASM FS and sets
     * the ephemeris path.
     *
     * @example
     *     await swe.swe_set_ephe_path("https://unpkg.com/sweph-wasm/ephe/", [
     *         "seas_18.se1",
     *         "sepl_18.se1",
     *         "semo_18.se1",
     *     ]);
     *
     * @param epheUrl - Base URL or directory path containing `.se1` ephemeris
     *   files.
     * @throws {SWEerror} If no ephemeris files are successfully loaded.
     */
    async swe_set_ephe_path(
        epheUrl: string = "https://unpkg.com/sweph-wasm/ephe/",
        fileNames: Array<string> = ["seas_18.se1", "sepl_18.se1", "semo_18.se1"]
    ): Promise<void> {
        const epheDir = "/ephe";
        // Create ephemeris directory in WASM FS if it doesn't exist
        if (!this.wasm.FS.analyzePath(epheDir, true).exists) {
            this.wasm.FS.mkdir(epheDir);
        }
        const baseUrl = getBaseURLPath(epheUrl);
        const loaded: string[] = [];
        for (const { name, desc, category } of EpheFileMetadata) {
            try {
                if (fileNames && !fileNames.includes(name)) continue;
                const response = await fetch(`${baseUrl}/${name}`);
                if (response.ok && response.status === 200) {
                    const buffer = await response.arrayBuffer();
                    const data = new Uint8Array(buffer);
                    // ✅ 2. Delete file if it already exists before creating
                    const filePath = `${epheDir}/${name}`;
                    if (this.wasm.FS.analyzePath(filePath).exists) {
                        this.wasm.FS.unlink(filePath); // remove existing file
                    }
                    this.wasm.FS.createDataFile(
                        epheDir,
                        name,
                        data,
                        true, // readable
                        true, // writable
                        true // canOwn
                    );
                    loaded.push(
                        `${name.padEnd(14)}: ${category.padEnd(28)} [${desc}]`
                    );
                }
            } catch (err) {
                console.error(`Skipped ${name} due to error:`, err);
            }
        }
        if (loaded.length === 0) {
            throw new SWEerror(
                `No ephemeris files loaded from "${epheUrl}"`,
                this.ERR
            );
        }
        console.log(loaded.join("\n"));
        console.log(`Total ephemeris files loaded: ${loaded.length}`);
        // Set ephemeris path in Swiss Ephemeris
        const ephePathPtr = StringPointer.from(
            this.wasm,
            epheDir.length,
            epheDir
        );
        this.wasm._swe_set_ephe_path(ephePathPtr.ptr);
        ephePathPtr.free();
    }

    /**
     * Sets the filename of the JPL ephemeris file to be used by Swiss
     * Ephemeris.
     *
     * By default, Swiss Ephemeris uses the file defined by `SE_FNAME_DFT`,
     * typically `"de431.eph"` or `"de406.eph"`. If you want to use a different
     * JPL ephemeris file (e.g., `"de405.eph"`), use this function to specify
     * its name.
     *
     * The specified file must exist in the ephemeris path (e.g., `/ephe`) and
     * have a maximum length of 256 bytes. If the filename exceeds this limit,
     * it will be truncated, and errors may occur during subsequent ephemeris
     * calculations.
     *
     * @param file - The name of the JPL ephemeris file to use (e.g.,
     *   `"de405.eph"`).
     */
    swe_set_jpl_file(file: string): void {
        const filePathPtr = StringPointer.from(this.wasm, file.length, file);
        this.wasm._swe_set_jpl_file(filePathPtr.ptr);
        filePathPtr.free();
    }

    /**
     * Set ayanamsa for sidereal mode For predefined ayanamsas, set second and
     * third parameters to 0
     *
     * @param {number} sid_mode Ayanamsa ID
     * @param {number} t0 Reference date in jd_ut for custom ayanamsas
     * @param {number} ayan_t0 Initial value in degrees for custom ayanamsas //
     *   set ayanamsa to Lahiri swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0) //
     *   define custom ayanamsa as 25 degrees at J2000
     *   swe_set_sid_mode(swe.SE_SIDM_USER, 2451545, 25)
     */
    swe_set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): void {
        this.wasm._swe_set_sid_mode(sid_mode, t0, ayan_t0);
    }

    /**
     * Set custom tidal acceleration
     *
     * @param {number} t_acc Tidal acceleration value // set custom value
     *   set_tid_acc(25.90); // set predefined value
     *   set_tid_acc(swe.SE_TIDAL_DE403); // reset to auto
     *   set_tid_acc(swe.SE_TIDAL_AUTOMATIC);
     */
    swe_set_tid_acc(t_acc: number): void {
        this.wasm._swe_set_tid_acc(t_acc);
    }

    /**
     * Set geographic coordinates for topocentric mode
     *
     * @param {number} geolon Geographic longitude in degrees
     * @param {number} geolat Geographic latitude in degrees
     * @param {number} elevation Elevation in meters // set observer to 124'30E,
     *   23'30N, 1250 meters above sea level; set_topo(124.5, 23.5, 1250); //
     *   call swe_with topocentric flag let result = calc(2342341, swe.SE_MOON,
     *   swe.SEFLG_SWIEPH | swe.SEFLG_TOPOCTR)
     */
    swe_set_topo(geolon: number, geolat: number, elevation: number): void {
        this.wasm._swe_set_topo(geolon, geolat, elevation);
    }

    /**
     * Calculate sidereal time at the greenwich meridian
     *
     * @param {number} tjd_ut Julian day in universal time number // Sidereal
     *   time in hours (0-23.99999)
     */
    swe_sidtime(tjd_ut: number): number {
        return this.wasm._swe_sidtime(tjd_ut);
    }

    /**
     * Calculate sidereal time at the greenwich meridian with custom obliquity
     * and nutation
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} eps Obliquity of the ecliptic
     * @param {number} nut Nutation number // Sidereal time in hours
     *   (0-23.99999)
     */
    swe_sidtime0(tjd_ut: number, eps: number, nut: number): number {
        return this.wasm._swe_sidtime0(tjd_ut, eps, nut);
    }

    /**
     * Get solar eclipse data for a given date
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ifl Ephemeris flag
     * @param {number[]} geopos Geographic coordinates [longitude, latitude,
     *   elevation]
     * @returns
     *
     *   Array< [ solar_diameter, // Fraction of solar diameter covered by moon
     *   lunar_diameter, // Ratio of lunar diameter to solar one solar_disc, //
     *   Fraction of the solar disc covered by moon (obscuration) core_shadow,
     *   // Diameter of core shadow in km azimuth, // Azimuth of the sun at jd
     *   true_altitude, // True altitude of the sun above horizon at jd
     *   apparent_altitude, // Apparent altitude of the sun above horizon at jd
     *   elongation, // Elongation of moon in degrees mag, // Eclipse magnitude
     *   (same as solar_diameter if partial and lunar_diameter if annular or
     *   total) saros_number, // Saros series number (if available, otherwise
     *   -99999999) saros_member, // Saros series member number (if available,
     *   otherwise -99999999) ]
     *
     * >
     */
    swe_sol_eclipse_how(
        tjd_ut: number,
        ifl: number,
        geopos: [longitude: number, latitude: number, elevation: number]
    ): EclipseAttributes {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_sol_eclipse_how(
            tjd_ut,
            ifl,
            geoposPtr.ptr,
            attr.ptr,
            serr.ptr
        );
        geoposPtr.free();
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return toFixedLengthArray(attr.readAndFree(), 11);
    }

    /**
     * Search for solar eclipses globally
     *
     * @param {number} tjd_start Julian day in universal time to start searching
     *   from
     * @param {number} ifl Ephemeris flag
     * @param {number} ifltype Eclipse type (SE_ECL_TOTAL, SE_ECL_ANNULAR,
     *   SE_ECL_PARTIAL, SE_ECL_ANNULAR_TOTAL, SE_ECL_CENTRAL, SE_ECL_NONCENTRAL
     *   or 0 for any)
     * @param backwards: Boolean // Search backwards in time instead
     * @returns Object { flag: number, // ERR, eclipse type (SE_ECL_TOTAL,
     *   SE_ECL_ANNULAR, SE_ECL_PARTIAL, SE_ECL_ANNULAR_TOTAL, SE_ECL_CENTRAL,
     *   SE_ECL_NONCENTRAL) or 0 if no eclipse found error: string, // Error
     *   message in case of error data: Array<number> [ eclipse_max, // Time of
     *   maximum eclipse in jd local_noon, // Time when eclipse takes place at
     *   local apparent noon eclipse_start, // Time of eclipse start
     *   eclipse_end, // Time of eclipse end total_start, // Time of totality
     *   start total_end, // Time of totality end center_start, // Time of
     *   center line start center_end, // Time of center line end annular_total,
     *   // Time when annular-total eclipse becomes total total_annular // Time
     *   when annular-total eclipse becomes annular again ] } type:
     *   ${result.flag} eclipse_max: ${result.data[0]} `)
     */
    swe_sol_eclipse_when_glob(
        tjd_start: number,
        ifl: number,
        iftype: number,
        backwards: boolean
    ): EclipsePhaseTimesAdvance {
        const ret = ArrayPointer.alloc(this.wasm, "double", 10);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_sol_eclipse_when_glob(
            tjd_start,
            ifl,
            iftype,
            ret.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return ret.readAndFree();
    }

    /**
     * Calculates the local circumstances of the next (or previous) solar
     * eclipse from a given location.
     *
     * @param {number} tjd_start - Julian Day (UT) to start the search from.
     * @param {number} ifl - Ephemeris computation flag (e.g., SEFLG_SWIEPH).
     * @param {[number, number, number]} geopos - Geographic coordinates:
     *   [longitude (°), latitude (°), elevation (m)].
     * @param {boolean} backwards - If true, search backwards in time.
     * @returns {{
     *     eclipseContactTimes: number[]; // Eclipse contact times:
     *     // [0] = maximum eclipse
     *     // [1] = first contact
     *     // [2] = second contact
     *     // [3] = third contact
     *     // [4] = fourth contact
     *     // [5] = sunrise between contacts (if any)
     *     // [6] = sunset between contacts (if any)
     *     eclipseAttributes: number[]; // Eclipse attributes:
     *     // [0] = magnitude (fraction of Sun's diameter obscured)
     *     // [1] = diameter ratio (Moon/Sun)
     *     // [2] = obscuration (fraction of solar disc area)
     *     // [3] = core shadow diameter (km)
     *     // [4] = Sun's azimuth (°)
     *     // [5] = true altitude (°)
     *     // [6] = apparent altitude (°)
     *     // [7] = Moon elongation (°)
     *     // [8] = NASA magnitude
     *     // [9] = Saros series number (or -99999999)
     *     // [10] = Saros member number (or -99999999)
     * }}
     * @throws {SWEerror} - If the eclipse search fails or no eclipse is found.
     */
    swe_sol_eclipse_when_loc(
        tjd_start: number,
        ifl: number,
        geopos: [longitude: number, latitude: number, elevation: number],
        backwards: boolean
    ): {
        eclipseContactTimes: EclipseContactTimes;
        eclipseAttributes: EclipseAttributes;
    } {
        const geoposPtr = ArrayPointer.from(this.wasm, "double", 3, geopos);
        const tret = ArrayPointer.alloc(this.wasm, "double", 10);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_sol_eclipse_when_loc(
            tjd_start,
            ifl,
            geoposPtr.ptr,
            tret.ptr,
            attr.ptr,
            TypeConverter.boolToC(backwards),
            serr.ptr
        );
        geoposPtr.free();
        const error = serr.readAndFree();
        if (flag < this.OK) {
            throw new SWEerror(error, flag);
        }
        return {
            eclipseContactTimes: toFixedLengthArray(tret.readAndFree(), 7),
            eclipseAttributes: toFixedLengthArray(attr.readAndFree(), 11),
        };
    }

    /**
     * Get geographical coordinates for an eclipse
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number} ifl Ephemeris flag
     * @returns Object { flag: number, // ERR, eclipse type or 0 if none found
     *   error: string, // Error message in case of error data: Array<number> [
     *   central_long: number, // Geographic longitude of central line
     *   central_lat: number, // Geographic latitude of central line
     *   north_umbra_long: number, // Geographic longitude of northern limit of
     *   umbra north_umbra_lat: number, // Geographic latitude of northern limit
     *   of umbra south_umbra_long: number, // Geographic longitude of southern
     *   limit of umbra south_umbra_lat: number, // Geographic latitude of
     *   southern limit of umbra north_penumbra_long: number, // Geographic
     *   longitude of northern limit of penumbra north_penumbra_lat: number, //
     *   Geographic latitude of northern limit of penumbra south_penumbra_long:
     *   number, // Geographic longitude of southern limit of penumbra
     *   south_penumbra_lat: number // Geographic latitude of southern limit of
     *   penumbra ], Array: Array<number> [ diameter_fraction: number, //
     *   Fraction of solar diameter covered by moon (magnitude) diameter_ratio:
     *   number, // Ratio of lunar diameter to solar diameter disc_fraction:
     *   number, // Fraction of solar disc covered by moon (obscuration)
     *   core_shadow: number, // Diameter of core shadow in km azimuth: number,
     *   // Azimuth of the sun at tjd true_altitude: number, // True altitude of
     *   the sun above horizon at tjd apparent_altitude: number, // Apparent
     *   altitude of the sun above horizon at tjd angular_distance: number, //
     *   Angular distance of the moon from the sun in degrees mag, // Eclipse
     *   magnitude (same as solar_diameteror lunar_diameter depending on the
     *   eclipse type) saros_number, // Saros series number (if available,
     *   otherwise -99999999) saros_member // Saros series member number (if
     *   available, otherwise -99999999) ] } type: ${result.flag} longitude:
     *   ${result.data[0]} `)
     */
    swe_sol_eclipse_where(
        tjd_ut: number,
        ifl: number
    ): {
        /** Array of eclipse coordinates */
        data: EclipseGeographicCoords;
        /** Array of additional data about the solar eclipse */
        Array: EclipseAttributes;
    } {
        const geopos = ArrayPointer.alloc(this.wasm, "double", 10);
        const attr = ArrayPointer.alloc(this.wasm, "double", 20);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_sol_eclipse_where(
            tjd_ut,
            ifl,
            geopos.ptr,
            attr.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return {
            data: geopos.readAndFree(),
            Array: toFixedLengthArray(attr.readAndFree(), 11),
        };
    }

    /**
     * Compute Sun's crossing over some longitude
     *
     * @param {number} x2cross Ecliptic latitude position to search for
     * @param {number} jd_ut Start date in julian days in universal time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   universal time error: string, // Error message if resulting date is
     *   smaller than starting date }
     */
    swe_solcross_ut(x2cross: number, jd_ut: number, flag: number): number {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const jd = this.wasm._swe_solcross_ut(x2cross, jd_ut, flag, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return jd;
    }

    /**
     * Compute Sun's crossing over some longitude
     *
     * @param {number} x2cross Ecliptic latitude position to search for
     * @param {number} jd_et Start date in julian days in ephemeris/terrestrial
     *   time
     * @param {number} flag Calculation flag
     * @returns Object { date: number, // Date of the crossing in julian days in
     *   ephemeris/terrestrial time error: string, // Error message if resulting
     *   date is smaller than starting date }
     */
    swe_solcross(x2cross: number, jd_et: number, flag: number): number {
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const jd = this.wasm._swe_solcross(x2cross, jd_et, flag, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return jd;
    }

    /**
     * Convert decimal degrees value to degree, minute, second, sign and/or
     * nakshatras
     *
     * @param {number} ddeg Input degrees value
     * @param {number} roundflag Split and rounding methods
     * @returns Object { degree: number, // degrees value minute: number, //
     *   minutes value second: number, // seconds value fraction: number, //
     *   fraction of a second sign: number // sign or nakshatra number }
     */
    swe_split_deg(
        ddeg: number,
        roundflag: number
    ): {
        /** Degrees value */
        degree: number;
        /** Minutes value */
        minute: number;
        /** Seconds value */
        second: number;
        /** Seconds fraction value */
        fraction: number;
        /** Zodiac sign or nakshatra number */
        sign: number;
    } {
        const deg = NumberPointer.alloc(this.wasm, "i32");
        const min = NumberPointer.alloc(this.wasm, "i32");
        const sec = NumberPointer.alloc(this.wasm, "i32");
        const fraction = NumberPointer.alloc(this.wasm, "double");
        const sign = NumberPointer.alloc(this.wasm, "i32");
        this.wasm._swe_split_deg(
            ddeg,
            roundflag,
            deg.ptr,
            min.ptr,
            sec.ptr,
            fraction.ptr,
            sign.ptr
        );
        return {
            degree: deg.readAndFree(),
            minute: min.readAndFree(),
            second: sec.readAndFree(),
            fraction: fraction.readAndFree(),
            sign: sign.readAndFree(),
        };
    }

    /**
     * Calculate the equation of time (difference between LMT and LAT)
     *
     * @param {number} tjd_ut Julian day in universal time
     * @returns Object { error: string, // Error message if any data: number //
     *   Value of the equation of time }
     */
    swe_time_equ(tjd_ut: number): number {
        const e = NumberPointer.alloc(this.wasm, "double");
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_time_equ(tjd_ut, e.ptr, serr.ptr);
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return e.readAndFree();
    }

    /**
     * Convert between local time and UTC using a timezone offset. For time
     * zones east of Greenwich, d_timezone should be positive. For time zones
     * west of Greenwich, d_timezone should be negative. To convert from UTC
     * back to local time, invert d_timezone's sign.
     *
     * @param {number} iyear Full year
     * @param {number} imonth Month (1-12)
     * @param {number} iday Day (1-31)
     * @param {number} ihour Hour (0-23)
     * @param {number} imin Minute (0-59)
     * @param {number} dsec Seconds including fraction (0-59.99999)
     * @param {number} d_timezone Timezone offset in decimal hours (0-23.99999),
     *   positive or negative
     * @returns Object { year: number; // Full year month: number; // Month
     *   (1-12) day: number; // Day (1-31) hour: number; // Hour (0-23) minute:
     *   number; // Minute (0-59) second: number; // Second including fraction
     *   (0-59.99999) }
     */
    swe_utc_time_zone(
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number,
        d_timezone: number
    ): DateTimeObject {
        const year = NumberPointer.alloc(this.wasm, "i32");
        const month = NumberPointer.alloc(this.wasm, "i32");
        const day = NumberPointer.alloc(this.wasm, "i32");
        const hour = NumberPointer.alloc(this.wasm, "i32");
        const minute = NumberPointer.alloc(this.wasm, "i32");
        const seconds = NumberPointer.alloc(this.wasm, "double");
        this.wasm._swe_utc_time_zone(
            iyear,
            imonth,
            iday,
            ihour,
            imin,
            dsec,
            d_timezone,
            year.ptr,
            month.ptr,
            day.ptr,
            hour.ptr,
            minute.ptr,
            seconds.ptr
        );
        return {
            year: year.readAndFree(),
            month: month.readAndFree(),
            day: day.readAndFree(),
            hour: hour.readAndFree(),
            minute: minute.readAndFree(),
            second: seconds.readAndFree(),
        };
    }

    /**
     * Convert UTC date and time to julian day in ephemeris time and julian day
     * in universal time
     *
     * @param {number} iyear Full year
     * @param {number} imonth Month (1-12)
     * @param {number} iday Day (1-31)
     * @param {number} ihour Hour (0-23)
     * @param {number} imin Minute (0-59)
     * @param {number} dsec Seconds including fraction (0-59.99999)
     * @param {number} gregflag Calendar system, SE_GREG_CAL for gregorian
     *   calendar, SE_JUL_CAL for julian calendar
     * @returns Object {
     *
     *   Data: Array<number> [ et: number, // Julian day in ephemeris/terrestrial
     *   time ut: number // Julian day in universal time ] }
     */
    swe_utc_to_jd(
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number,
        gregflag: number
    ): [et: number, ut: number] {
        const ret = ArrayPointer.alloc(this.wasm, "double", 2);
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_utc_to_jd(
            iyear,
            imonth,
            iday,
            ihour,
            imin,
            dsec,
            gregflag,
            ret.ptr,
            serr.ptr
        );
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return ret.readAndFree();
    }

    /** Get current swisseph version Swisseph version */
    swe_version(): string {
        const version = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        this.wasm._swe_version(version.ptr);
        return version.readAndFree();
    }

    /**
     * Determine an object's visibility
     *
     * @param {number} tjd_ut Julian day in universal time
     * @param {number[]} dgeo Geographic coordinates [longitude, latitude,
     *   elevation]
     * @param {number[]} datm Atmospheric conditions [pressure, temperature,
     *   humidity, meteorological_range]
     * @param {number[]} dobs Observer description [age, sellen ratio, optical
     *   type, optical magnification, optical aperture, optical transmission]
     * @param objectname: Name of fixed star or planet
     * @param {number} helflag Calculation flags
     * @returns Object { flag: number, // OK, ERR, -2 if object is below
     *   horizon, 1 if scotopic vision or 2 if near limit photopic/scotopic
     *   vision
     *
     *   Data: Array<number> [ visual_mag: number, // Limiting visual magnitude
     *   (object is visible if this value is bigger than the object's magnitude
     *   value) obj_altitude: number, // Altitude of the object obj_azimuth:
     *   number, // Azimuth of the object sun_altitude: number, // Altitude of
     *   the sun sun_azimuth: number, // Azimuth of the sun moon_altitude:
     *   number, // Altitude of the moon moon_azimuth: number, // Azimuth of the
     *   moon magnitude: number // The object's magnitude ] }
     */
    swe_vis_limit_mag(
        tjd_ut: number,
        dgeo: [longitude: number, latitude: number, elevation: number],
        datm: [
            pressure: number,
            temperature: number,
            humidity: number,
            meteorological_range: number,
        ],
        dobs: [
            age: number,
            sellen_ratio: number,
            optical_type: number,
            optical_magnification: number,
            optical_aperture: number,
            optical_transmission: number,
        ],
        objectname: string,
        helflag: number
    ): [
        /**
         * Limiting visual magnitude (object is visible if this value is
         * bigger than the object's magnitude value)
         */
        visual_mag: number,
        /** Altitude of the object */
        obj_altitude: number,
        /** Azimuth of the object */
        obj_azimuth: number,
        /** Altitude of the sun */
        sun_altitude: number,
        /** Azimuth of the sun */
        sun_azimuth: number,
        /** Altitude of the moon */
        moon_altitude: number,
        /** Azimuth of the moon */
        moon_azimuth: number,
        /** The object's magnitude */
        magnitude: number,
    ] {
        const dgeoPtr = ArrayPointer.from(this.wasm, "double", 3, dgeo);
        const datmPtr = ArrayPointer.from(this.wasm, "double", 4, datm);
        const dobsPtr = ArrayPointer.from(this.wasm, "double", 6, dobs);
        const ret = ArrayPointer.alloc(this.wasm, "double", 8);
        const objectnamePtr = StringPointer.from(
            this.wasm,
            objectname.length,
            objectname
        );
        const serr = StringPointer.alloc(this.wasm, this.AS_MAXCH);
        const flag = this.wasm._swe_vis_limit_mag(
            tjd_ut,
            dgeoPtr.ptr,
            datmPtr.ptr,
            dobsPtr.ptr,
            objectnamePtr.ptr,
            helflag,
            ret.ptr,
            serr.ptr
        );
        dgeoPtr.free();
        datmPtr.free();
        dobsPtr.free();
        objectnamePtr.free();
        if (flag < this.OK) throw new SWEerror(serr.readAndFree(), flag);
        serr.free();
        return ret.readAndFree();
    }
}

/**
 * Returns a type based on a string `INPUT`, using a conditional type mapping.
 * If `INPUT` exists as a key in the `CONDITIONS` map, returns the mapped type.
 * Otherwise, returns the `DEFAULT` type.
 *
 * @example
 *     type MyReturn = ConditionalReturnType<"G", { G: number }, string>; // => number
 *     type Fallback = ConditionalReturnType<"Z", { G: number }, string>; // => string
 *
 * @template INPUT - Input string literal to check.
 * @template CONDITIONS - A record mapping string keys to specific return types.
 * @template DEFAULT - The fallback type if `INPUT` is not found in
 *   `CONDITIONS`.
 */
export type ConditionalReturnType<
    INPUT extends string,
    CONDITIONS extends Record<string, unknown>,
    DEFAULT,
> = INPUT extends keyof CONDITIONS ? CONDITIONS[INPUT] : DEFAULT;

export type HouseSystems =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "i"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y";

/** Represents a complete date and time value. */
export interface DateTimeObject {
    /** Full year (e.g., 2025) */
    year: number;
    /** Month of the year (1–12) */
    month: number;
    /** Day of the month (1–31) */
    day: number;
    /** Hour of the day (0–23) */
    hour: number;
    /** Minute of the hour (0–59) */
    minute: number;
    /** Second of the minute including fractional part (0–59.99999) */
    second: number;
}

/**
 * Represents horizontal coordinates of a celestial object:
 *
 * Array format:
 *
 * - `[0]` → Azimuth in degrees (measured from the south point, increasing
 *   westwards)
 * - `[1]` → True altitude above the horizon in degrees
 * - `[2]` → Apparent altitude in degrees (corrected for atmospheric refraction)
 */
export type HorizontalCoordinates = [az: number, alt: number, ap: number];

/**
 * Full celestial position values returned from a position calculation.
 *
 * By default, values are in ecliptic coordinates (longitude, latitude,
 * distance). If `SEFLG_SPEED` or `SEFLG_SPEED3` flags are set, daily speeds for
 * each value are included; otherwise speeds are zero. If `SEFLG_EQUATORIAL`
 * flag is set, values are in equatorial coordinates (right ascension,
 * declination, distance). If `SEFLG_XYZ` flag is set, values are in cartesian
 * coordinates (X, Y, Z). If the target object ID is `SE_ECL_NUT`, values
 * contain obliquity and nutation data instead.
 *
 * Array format:
 *
 * - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True Obliquity
 *   (ε) depending on flags
 * - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
 *   depending on flags
 */
export type CelestialCoordinates2D = [
    /**
     * - `λ`: Ecliptic longitude
     * - `α`: Equatorial right ascension if `SEFLG_EQUATORIAL`
     * - `x`: Cartesian X if `SEFLG_XYZ`
     * - `ε`: True obliquity of the ecliptic if object ID is `SE_ECL_NUT`
     */
    lon: number,
    /**
     * - `β`: Ecliptic latitude
     * - `δ`: Equatorial declination if `SEFLG_EQUATORIAL`
     * - `y`: Cartesian Y if `SEFLG_XYZ`
     * - `ε`: Mean obliquity of the ecliptic if object ID is `SE_ECL_NUT`
     */
    lat: number,
];

/**
 * Full celestial position values returned from a position calculation.
 *
 * - By default, values are in ecliptic coordinates (longitude, latitude,
 *   distance).
 * - If `SEFLG_SPEED` or `SEFLG_SPEED3` flags are set, daily speeds for each value
 *   are included; otherwise speeds are zero.
 * - If `SEFLG_EQUATORIAL` flag is set, values are in equatorial coordinates
 *   (right ascension, declination, distance).
 * - If `SEFLG_XYZ` flag is set, values are in cartesian coordinates (X, Y, Z).
 * - If the target object ID is `SE_ECL_NUT`, values contain obliquity and
 *   nutation data instead.
 *
 * Array format:
 *
 * - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True Obliquity
 *   (ε) depending on flags
 * - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
 *   depending on flags
 * - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ) depending
 *   on flags
 */
export type CelestialCoordinates3D = [
    ...CelestialCoordinates2D,
    /**
     * - `au`: Distance in astronomical units (AU)
     * - `z`: Cartesian Z if `SEFLG_XYZ`
     * - `Δψ`: Nutation in longitude if object ID is `SE_ECL_NUT`
     */
    dist: number,
];

/**
 * Full celestial position values returned from a position calculation.
 *
 * - By default, values are in ecliptic coordinates (longitude, latitude,
 *   distance).
 * - If `SEFLG_SPEED` or `SEFLG_SPEED3` flags are set, daily speeds for each value
 *   are included; otherwise speeds are zero.
 * - If `SEFLG_EQUATORIAL` flag is set, values are in equatorial coordinates
 *   (right ascension, declination, distance).
 * - If `SEFLG_XYZ` flag is set, values are in cartesian coordinates (X, Y, Z).
 * - If the target object ID is `SE_ECL_NUT`, values contain obliquity and
 *   nutation data instead.
 *
 * Array format:
 *
 * - `[0]` → Longitude (λ), Right Ascension (α), Cartesian X, or True Obliquity
 *   (ε) depending on flags
 * - `[1]` → Latitude (β), Declination (δ), Cartesian Y, or Mean Obliquity (ε)
 *   depending on flags
 * - `[2]` → Distance (AU), Cartesian Z, or Nutation in longitude (Δψ) depending
 *   on flags
 * - `[3]` → Longitude daily speed (λs), Right Ascension daily speed (αs),
 *   Cartesian X speed (xs), or Nutation in obliquity (Δε)
 * - `[4]` → Latitude daily speed (βs), Declination daily speed (δs), Cartesian Y
 *   speed (ys)
 * - `[5]` → Distance daily speed (aus), Cartesian Z speed (zs)
 */
export type CelestialCoordinatesAdvance = [
    ...CelestialCoordinates3D,
    /**
     * - `λs`: Ecliptic longitude daily speed
     * - `αs`: Equatorial right ascension daily speed if `SEFLG_EQUATORIAL`
     * - `xs`: Cartesian X daily speed if `SEFLG_XYZ`
     * - `Δε`: Nutation in obliquity if object ID is `SE_ECL_NUT`
     */
    lonSpd: number,
    /**
     * - `βs`: Ecliptic latitude daily speed
     * - `δs`: Equatorial declination daily speed if `SEFLG_EQUATORIAL`
     * - `ys`: Cartesian Y daily speed if `SEFLG_XYZ`
     */
    latSpd: number,
    /**
     * - `aus`: Distance daily speed in AU
     * - `zs`: Cartesian Z daily speed if `SEFLG_XYZ`
     */
    distSpd: number,
];

/** Result returned by the `swe_fixstar` function. */
export interface FixstarResult {
    /** Full star name as defined in `sefstars.txt`. */
    star_name: string;
    /** Celestial position and motion data of the star. */
    data: CelestialCoordinatesAdvance;
}

/** Metadata for a fixed star entry. */
export interface FixstarMagnitude {
    /** The full star name as it appears in the `sefstars.txt` catalog. */
    star_name: string;
    /** Visual magnitude of the star (brightness). */
    magnitude: number;
}

/**
 * Array of key angular points related to the Ascendant and other significant
 * positions.
 *
 * Array format:
 *
 * - `[0]` → Ascendant longitude
 * - `[1]` → Midheaven (MC) longitude
 * - `[2]` → Right Ascension of the Midheaven (ARMC)
 * - `[3]` → Vertex longitude
 * - `[4]` → Equatorial Ascendant longitude
 * - `[5]` → Walter Koch's Co-Ascendant longitude
 * - `[6]` → Michael Munkasey's Co-Ascendant longitude
 * - `[7]` → Michael Munkasey's Polar Ascendant longitude
 */
export type AscendantValues = [
    /** Longitude of the Ascendant */
    asc: number,
    /** Longitude of the Midheaven (MC) */
    mc: number,
    /** Right Ascension of the Midheaven (ARMC) */
    armc: number,
    /** Longitude of the Vertex */
    vertex: number,
    /** Longitude of the Equatorial Ascendant */
    equasc: number,
    /** Longitude of Walter Koch's Co-Ascendant */
    coasc1: number,
    /** Longitude of Michael Munkasey's Co-Ascendant */
    coasc2: number,
    /** Longitude of Michael Munkasey's Polar Ascendant */
    polasc: number,
];

/**
 * Array of momentary motion speeds for the Ascendant, Midheaven, and related
 * points.
 *
 * Values represent angular speeds in degrees per day.
 *
 * Array format:
 *
 * - `[0]` → Ascendant speed
 * - `[1]` → Midheaven speed
 * - `[2]` → Right Ascension of the Midheaven speed
 * - `[3]` → Vertex speed
 * - `[4]` → Equatorial Ascendant speed
 * - `[5]` → Walter Koch's Co-Ascendant speed
 * - `[6]` → Michael Munkasey's Co-Ascendant speed
 * - `[7]` → Michael Munkasey's Polar Ascendant speed
 */
export type AscendantPointsSpeeds = [
    /** Momentary speed of the Ascendant */
    asc_speed: number,
    /** Momentary speed of the Midheaven (MC) */
    mc_speed: number,
    /** Momentary speed of the Right Ascension of the Midheaven (ARMC) */
    armc_speed: number,
    /** Momentary speed of the Vertex */
    vertex_speed: number,
    /** Momentary speed of the Equatorial Ascendant */
    equasc_speed: number,
    /** Momentary speed of Walter Koch's Co-Ascendant */
    coasc1_speed: number,
    /** Momentary speed of Michael Munkasey's Co-Ascendant */
    coasc2_speed: number,
    /** Momentary speed of Michael Munkasey's Polar Ascendant */
    polasc_speed: number,
];

/**
 * Times of various eclipse phases (Julian Dates).
 *
 * Unused slot retained for compatibility.
 *
 * Array format:
 *
 * - `[0]` → Time of maximum eclipse (JD)
 * - `[1]` → Unused (reserved)
 * - `[2]` → Partial phase start time (JD)
 * - `[3]` → Partial phase end time (JD)
 * - `[4]` → Totality start time (JD)
 * - `[5]` → Totality end time (JD)
 * - `[6]` → Penumbral phase start time (JD)
 * - `[7]` → Penumbral phase end time (JD)
 */
export type EclipsePhaseTimes = [
    /** Time of maximum eclipse (JD) */
    max: number,
    /** Unused slot (reserved) */
    unused: number,
    /** Start time of partial phase (JD) */
    partialStart: number,
    /** End time of partial phase (JD) */
    partialEnd: number,
    /** Start time of totality (JD) */
    totalStart: number,
    /** End time of totality (JD) */
    totalEnd: number,
    /** Start time of penumbral phase (JD) */
    penumbralStart: number,
    /** End time of penumbral phase (JD) */
    penumbralEnd: number,
];

/**
 * Eclipse times including moonrise and moonset during eclipse (if applicable).
 *
 * Array format:
 *
 * - `[0]` → Time of maximum eclipse (JD)
 * - `[1]` → Unused (reserved)
 * - `[2]` → Partial phase start time (JD)
 * - `[3]` → Partial phase end time (JD)
 * - `[4]` → Totality start time (JD)
 * - `[5]` → Totality end time (JD)
 * - `[6]` → Penumbral phase start time (JD)
 * - `[7]` → Penumbral phase end time (JD)
 * - `[8]` → Moonrise time during eclipse (JD), if it occurs
 * - `[9]` → Moonset time during eclipse (JD), if it occurs
 */
export type EclipsePhaseTimesWithMoonriseSet = [
    ...phases: EclipsePhaseTimes,
    /** Moonrise time during eclipse (JD), if it occurs */
    moonrise: number,
    /** Moonset time during eclipse (JD), if it occurs */
    moonset: number,
];

/**
 * Detailed eclipse timings for local observation, including phases, centerline,
 * and annular-total transitions.
 *
 * All times are expressed in Julian Day (JD).
 *
 * Array format:
 *
 * - `[0]` → Time of maximum eclipse
 * - `[1]` → Time of local apparent noon
 * - `[2]` → Eclipse start time
 * - `[3]` → Eclipse end time
 * - `[4]` → Totality start time
 * - `[5]` → Totality end time
 * - `[6]` → Center line start time
 * - `[7]` → Center line end time
 * - `[8]` → Time when annular-total eclipse becomes total
 * - `[9]` → Time when annular-total eclipse becomes annular again
 */
export type EclipsePhaseTimesAdvance = [
    /** Time of maximum eclipse (JD) */
    max: number,
    /** Time of local apparent noon during eclipse (JD) */
    localNoon: number,
    /** Eclipse start time (JD) */
    start: number,
    /** Eclipse end time (JD) */
    end: number,
    /** Start time of totality (JD) */
    totalStart: number,
    /** End time of totality (JD) */
    totalEnd: number,
    /** Start time of center line (JD) */
    centerStart: number,
    /** End time of center line (JD) */
    centerEnd: number,
    /** Time annular-total eclipse becomes total (JD) */
    annularToTotal: number,
    /** Time annular-total eclipse becomes annular again (JD) */
    totalToAnnular: number,
];

/**
 * Contact times of an eclipse and sunrise/sunset during the event (JD).
 *
 * Array format:
 *
 * - `[0]` → Time of maximum eclipse (JD)
 * - `[1]` → Time of first contact (JD)
 * - `[2]` → Time of second contact (JD)
 * - `[3]` → Time of third contact (JD)
 * - `[4]` → Time of fourth contact (JD)
 * - `[5]` → Sunrise time during eclipse (JD)
 * - `[6]` → Sunset time during eclipse (JD)
 */
export type EclipseContactTimes = [
    /** Time of maximum eclipse (JD) */
    max: number,
    /** Time of first contact (JD) */
    first: number,
    /** Time of second contact (JD) */
    second: number,
    /** Time of third contact (JD) */
    third: number,
    /** Time of fourth contact (JD) */
    fourth: number,
    /** Sunrise time during eclipse (JD) */
    sunrise: number,
    /** Sunset time during eclipse (JD) */
    sunset: number,
];

/**
 * Geographic coordinates defining the central path and limits of an eclipse on
 * Earth.
 *
 * Array format:
 *
 * - `[0]` → Central line longitude (degrees)
 * - `[1]` → Central line latitude (degrees)
 * - `[2]` → Northern umbral limit longitude (degrees)
 * - `[3]` → Northern umbral limit latitude (degrees)
 * - `[4]` → Southern umbral limit longitude (degrees)
 * - `[5]` → Southern umbral limit latitude (degrees)
 * - `[6]` → Northern penumbral limit longitude (degrees)
 * - `[7]` → Northern penumbral limit latitude (degrees)
 * - `[8]` → Southern penumbral limit longitude (degrees)
 * - `[9]` → Southern penumbral limit latitude (degrees)
 */
export type EclipseGeographicCoords = [
    /** Central line longitude (degrees) */
    centralLongitude: number,
    /** Central line latitude (degrees) */
    centralLatitude: number,
    /** Northern umbral limit longitude (degrees) */
    northUmbraLongitude: number,
    /** Northern umbral limit latitude (degrees) */
    northUmbraLatitude: number,
    /** Southern umbral limit longitude (degrees) */
    southUmbraLongitude: number,
    /** Southern umbral limit latitude (degrees) */
    southUmbraLatitude: number,
    /** Northern penumbral limit longitude (degrees) */
    northPenumbraLongitude: number,
    /** Northern penumbral limit latitude (degrees) */
    northPenumbraLatitude: number,
    /** Southern penumbral limit longitude (degrees) */
    southPenumbraLongitude: number,
    /** Southern penumbral limit latitude (degrees) */
    southPenumbraLatitude: number,
];

/**
 * Basic characteristics of an eclipse at a given moment.
 *
 * Array format:
 *
 * - `[0]` → Fraction of solar diameter covered by the moon (magnitude)
 * - `[1]` → Ratio of lunar diameter to solar diameter
 * - `[2]` → Fraction of solar disc obscured by the moon (obscuration)
 * - `[3]` → Diameter of the core shadow in kilometers
 * - `[4]` → Azimuth of the sun (degrees)
 * - `[5]` → True altitude of the sun above the horizon (degrees)
 * - `[6]` → Apparent altitude of the sun above the horizon (degrees)
 * - `[7]` → Elongation of the moon from the sun (degrees)
 */
export type EclipseCharacteristics = [
    /** Fraction of solar diameter covered by the moon (magnitude) */
    solarDiameterFraction: number,
    /** Ratio of lunar diameter to solar diameter */
    lunarDiameterRatio: number,
    /** Fraction of solar disc covered by moon (obscuration) */
    solarDiscObscuration: number,
    /** Diameter of the core shadow in kilometers */
    coreShadowDiameterKm: number,
    /** Azimuth of the sun (degrees) */
    sunAzimuth: number,
    /** True altitude of the sun above the horizon (degrees) */
    trueSunAltitude: number,
    /** Apparent altitude of the sun above the horizon (degrees) */
    apparentSunAltitude: number,
    /** Moon elongation in degrees */
    moonElongation: number,
];

/**
 * Extended eclipse attributes including basic characteristics, magnitude, and
 * Saros series information.
 *
 * Array format:
 *
 * - `[0]` → Fraction of solar diameter covered by the moon (magnitude)
 * - `[1]` → Ratio of lunar diameter to solar diameter
 * - `[2]` → Fraction of solar disc obscured by the moon (obscuration)
 * - `[3]` → Diameter of the core shadow in kilometers
 * - `[4]` → Azimuth of the sun (degrees)
 * - `[5]` → True altitude of the sun above the horizon (degrees)
 * - `[6]` → Apparent altitude of the sun above the horizon (degrees)
 * - `[7]` → Elongation of the moon from the sun (degrees)
 * - `[8]` → Eclipse magnitude (same as solar diameter fraction or lunar diameter
 *   ratio depending on eclipse type)
 * - `[9]` → Saros series number (or `-99999999` if unknown)
 * - `[10]` → Saros series member number (or `-99999999` if unknown)
 */
export type EclipseAttributes = [
    ...base: EclipseCharacteristics,
    /**
     * Eclipse magnitude (usually matches solarDiameterFraction or
     * lunarDiameterRatio depending on eclipse type)
     */
    magnitude: number,
    /** Saros series number, or -99999999 if unknown */
    sarosSeries: number,
    /** Saros series member number, or -99999999 if unknown */
    sarosMember: number,
];

/**
 * Characteristics of a lunar eclipse at a given moment, including magnitude,
 * positions, and Saros series data.
 *
 * Array format:
 *
 * - `[0]` → Umbral magnitude at the time of observation
 * - `[1]` → Penumbral magnitude
 * - `[2]` → Unused (reserved)
 * - `[3]` → Unused (reserved)
 * - `[4]` → Azimuth of the moon (degrees)
 * - `[5]` → True altitude of the moon above the horizon (degrees)
 * - `[6]` → Apparent altitude of the moon above the horizon (degrees)
 * - `[7]` → Distance of the moon from opposition (degrees)
 * - `[8]` → Eclipse magnitude (typically same as umbral magnitude)
 * - `[9]` → Saros series number (or `-99999999` if unknown)
 * - `[10]` → Saros series member number (or `-99999999` if unknown)
 */
export type LunarEclipseCharacteristics = [
    /** Umbral magnitude at time (JD) */
    umbralMagnitude: number,
    /** Penumbral magnitude */
    penumbralMagnitude: number,
    /** Unused slot */
    unused1: number,
    /** Unused slot */
    unused2: number,
    /** Moon azimuth (degrees) */
    moonAzimuth: number,
    /** True altitude of the moon (degrees) */
    trueMoonAltitude: number,
    /** Apparent altitude of the moon (degrees) */
    apparentMoonAltitude: number,
    /** Distance of moon from opposition (degrees) */
    distanceFromOpposition: number,
    /** Eclipse magnitude (usually umbral magnitude) */
    magnitude: number,
    /** Saros series number, or -99999999 if unknown */
    sarosSeries: number,
    /** Saros series member number, or -99999999 if unknown */
    sarosMember: number,
];

/**
 * Represents calculated positions for houses and related points on the great
 * circles.
 */
export interface Houses<N extends number> {
    /**
     * Longitude positions of the houses:
     *
     * - `36` positions for Gauquelin sectors
     * - `12` positions for all other house systems
     *
     * Array format:
     *
     * - `cusp[0]` → 1st house cusp longitude
     * - ...
     * - `cusp[N-1]` → Nth house cusp longitude
     */
    cusps: FixedLengthArray<N, number>;
    /**
     * Longitude positions of other key points of interest on the great circles
     * (e.g., MC, IC, Ascendant, Descendant, etc.)
     */
    ascmc: AscendantValues;
}

/**
 * Extended house calculation result:
 *
 * Includes positions for the houses, other points, and their momentary motion
 * Speeds.
 */
export interface HousesEx<N extends number> extends Houses<N> {
    /**
     * Momentary motion speeds of the houses.
     *
     * Array format:
     *
     * - `cusp_speed[0]` → Speed of 1st house cusp in degrees/day
     * - `cusp_speed[N-1]` → Speed of Nth house cusp
     */
    cusp_speed: FixedLengthArray<N, number>;
    /**
     * Momentary motion speeds of other key points of interest on the great
     * circles (e.g., MC, IC, Ascendant, Descendant, etc.).
     *
     * Units: degrees per day.
     */
    ascmc_speed: AscendantPointsSpeeds;
}

/**
 * Object containing ascending node, descending node, aphelion and perihelion
 * values Depending on the specific object and the method flag used, the values
 * can be either "mean" or "osculating"
 */
export interface NodAps {
    /** Array of ascending node values returned by the calculation */
    ascending: CelestialCoordinatesAdvance;
    /** Array of descending node values returned by the calculation */
    descending: CelestialCoordinatesAdvance;
    /** Array of perihelion node values returned by the calculation */
    perihelion: CelestialCoordinatesAdvance;
    /** Array of aphelion values returned by the calculation */
    aphelion: CelestialCoordinatesAdvance;
}

/**
 * Data array representing heliacal phenomena computations for a celestial
 * object.
 *
 * The array contains observational, geometric, and photometric values relevant
 * to heliacal visibility (e.g. arcus visionis, azimuths, crescent width).
 *
 * Array format:
 *
 * - `[0]` → `AltO` – Topocentric (unrefracted) altitude of object (°)
 * - `[1]` → `AppAltO` – Apparent (refracted) altitude of object (°)
 * - `[2]` → `GeoAltO` – Geocentric altitude of object (°)
 * - `[3]` → `AziO` – Azimuth of object (°)
 * - `[4]` → `AltS` – Topocentric altitude of Sun (°)
 * - `[5]` → `AziS` – Azimuth of Sun (°)
 * - `[6]` → `TAVact` – Actual topocentric arcus visionis (°)
 * - `[7]` → `ARCVact` – Actual geocentric arcus visionis (°)
 * - `[8]` → `DAZact` – Actual difference in azimuth between object and Sun (°)
 * - `[9]` → `ARCLact` – Actual ecliptic longitude difference between object and
 *   Sun (°)
 * - `[10]` → `kact` – Extinction coefficient
 * - `[11]` → `minTAV` – Minimum topocentric arcus visionis (°)
 * - `[12]` → `TfistVR` – First visibility time (JD, VR method)
 * - `[13]` → `TbVR` – Best/optimum visibility time (JD, VR method)
 * - `[14]` → `TlastVR` – Last visibility time (JD, VR method)
 * - `[15]` → `TbYallop` – Best visibility time (JD, Yallop method)
 * - `[16]` → `WMoon` – Crescent width of Moon (°)
 * - `[17]` → `qYal` – Yallop Q-test value
 * - `[18]` → `qCrit` – Yallop Q-test threshold
 * - `[19]` → `ParO` – Parallax of object (°)
 * - `[20]` → `Magn` – Apparent magnitude of object
 * - `[21]` → `RiseO` – Rise/set time of object (JD)
 * - `[22]` → `RiseS` – Rise/set time of Sun (JD)
 * - `[23]` → `Lag` – Rise/set time difference (object - Sun) (JD)
 * - `[24]` → `TvisVR` – Visibility duration (JD)
 * - `[25]` → `LMoon` – Crescent length of Moon (°)
 * - `[26]` → `CVAact` – Actual crescent visibility angle (°)
 * - `[27]` → `Illum` – Moon illumination (%)
 * - `[28]` → `MSk` – MSk factor (model-specific visibility metric)
 */
export type HeliacalPhenomena = [
    /** Topocentric altitude of object in degrees (unrefracted) */
    AltO: number,
    /** Apparent altitude of object in degrees (refracted) */
    AppAltO: number,
    /** Geocentric altitude of object in degrees */
    GeoAltO: number,
    /** Azimuth of object in degrees */
    AziO: number,
    /** Topocentric altitude of Sun in degrees */
    AltS: number,
    /** Azimuth of Sun in degrees */
    AziS: number,
    /** Actual topocentric arcus visionis in degrees */
    TAVact: number,
    /** Actual (geocentric) arcus visionis in degrees */
    ARCVact: number,
    /** Actual difference between object's and sun's azimuth in degrees */
    DAZact: number,
    /** Actual longitude difference between object and sun in degrees */
    ARCLact: number,
    /** Extinction coefficient */
    kact: number,
    /** Smallest topocentric arcus visionis in degrees */
    minTAV: number,
    /** First time object is visible:number, according to VR in JD */
    TfistVR: number,
    /** Optimum time the object is visible:number, according to VR in JD */
    TbVR: number,
    /** Last time object is visible:number, according to VR in JD */
    TlastVR: number,
    /** Best time the object is visible:number, according to Yallop in JD */
    TbYallop: number,
    /** Crescent width of Moon in degrees */
    WMoon: number,
    /** Q-test value of Yallop */
    qYal: number,
    /** Q-test criterion of Yallop */
    qCrit: number,
    /** Parallax of object in degrees */
    ParO: number,
    /** Magnitude of object */
    Magn: number,
    /** Rise/set time of object in JD */
    RiseO: number,
    /** Rise/set time of Sun in JD */
    RiseS: number,
    /** Rise/set time of object minus rise/set time of Sun in JD */
    Lag: number,
    /** Visibility duration in JD */
    TvisVR: number,
    /** Crescent length of Moon in degrees */
    LMoon: number,
    /** CVAact in degrees */
    CVAact: number,
    /** Illum in percentage */
    Illum: number,
    /** CVAact in degrees */
    CVAact: number,
    /** MSk */
    MSk: number,
];

/**
 * Orbital elements returned for a celestial object at a given time.
 *
 * These values represent the shape, orientation, and position of the orbit in
 * space, including angular and distance-related parameters.
 *
 * Array format:
 *
 * - `[0]` → `a` – Semimajor axis (AU)
 * - `[1]` → `e` – Eccentricity
 * - `[2]` → `i` – Inclination (°)
 * - `[3]` → `Ω` – Longitude of ascending node (°)
 * - `[4]` → `ω` – Argument of periapsis (°)
 * - `[5]` → `ϖ` – Longitude of periapsis (°)
 * - `[6]` → `M0` – Mean anomaly at epoch (°)
 * - `[7]` → `v0` – True anomaly at epoch (°)
 * - `[8]` → `E0` – Eccentric anomaly at epoch (°)
 * - `[9]` → `L0` – Mean longitude at epoch (°)
 * - `[10]` → `sidereal_period` – Sidereal orbital period (tropical years)
 * - `[11]` → `daily_motion` – Mean daily motion (°/day)
 * - `[12]` → `tropical_period` – Tropical orbital period (years)
 * - `[13]` → `synodic_period` – Synodic period (days). May be negative for inner
 *   planets or Moon.
 * - `[14]` → `perihelion_passage` – Julian day of perihelion passage
 * - `[15]` → `perihelion_distance` – Distance at perihelion (AU)
 * - `[16]` → `aphelion_distance` – Distance at aphelion (AU)
 */
export type OrbitalElements = [
    /** Semimajor axis */
    a: number,
    /** Eccentricity */
    e: number,
    /** Inclination */
    i: number,
    /** Longitude of ascending node */
    Ω: number,
    /** Argument of periapsis */
    ω: number,
    /** Longitude of periapsis */
    ϖ: number,
    /** Mean anomaly at epoch */
    M0: number,
    /** True anomaly at epoch */
    v0: number,
    /** Eccentric anomaly at epoch */
    E0: number,
    /** Mean longitude at epoch */
    L0: number,
    /** Sidereal orbital period in tropical years */
    sidereal_period: number,
    /** Mean daily motion */
    daily_motion: number,
    /** Tropical period in years */
    tropical_period: number,
    /**
     * Synodic period in days Negative, if inner planet (Venus, Mercury, Aten
     * asteroids) or Moon
     */
    synodic_period: number,
    /** Time of perihelion passage */
    perihelion_passage: number,
    /** Perihelion distance */
    perihelion_distance: number,
    /** Aphelion distance */
    aphelion_distance: number,
];

/**
 * Julian Day results for the next heliacal visibility event.
 *
 * This tuple provides key Julian Dates related to the visibility of a celestial
 * object, depending on the selected heliacal algorithm (`hel_flag`).
 *
 * Array format:
 *
 * - `[0]` → Start of visibility (`vis_start`)
 * - `[1]` → Optimum visibility (`vis_opt`) — May be `0` if `hel_flag >=
 *   SE_HELFLAG_AV`
 * - `[2]` → End of visibility (`vis_end`) — May be `0` if `hel_flag >=
 *   SE_HELFLAG_AV`
 */
export type HeliacalVisibilityWindow = [
    /** Julian Day of first possible visibility */
    vis_start: number,
    /**
     * Julian Day of best/optimum visibility; `0` if not calculated with AV
     * methods
     */
    vis_opt: number,
    /**
     * Julian Day of last possible visibility; `0` if not calculated with AV
     * methods
     */
    vis_end: number,
];
