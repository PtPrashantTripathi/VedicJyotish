/// <reference types="emscripten" />

/**
 * TypeScript bindings for the Swisseph Emscripten-generated WebAssembly module.
 * Extends the EmscriptenModule with custom wrapped native functions.
 */
export interface SwissephModule extends EmscriptenModule {
    // --- Standard Emscripten Runtime Methods ---
    /* [MDN Reference](https://developer.mozilla.org/docs/WebAssembly/Reference/JavaScript_interface/Memory) */
    wasmMemory: WebAssembly.Memory;

    /** Sets a value in the WebAssembly heap memory. */
    setValue: typeof setValue;

    /** Retrieves a value from the WebAssembly heap memory. */
    getValue: typeof getValue;

    /**
     * Converts a JavaScript string to a UTF-8 encoded string in the WebAssembly
     * memory.
     */
    stringToUTF8: typeof stringToUTF8;

    /**
     * Converts a UTF-8 encoded string from the WebAssembly memory to a
     * JavaScript string.
     */
    UTF8ToString: typeof UTF8ToString;

    /**
     * Returns the number of bytes required to encode a JavaScript string as
     * UTF-8.
     */
    lengthBytesUTF8: typeof lengthBytesUTF8;

    /** Provides access to the Emscripten virtual file system. */
    FS: typeof FS;

    /**
     * Frees allocated memory in the WebAssembly heap.
     *
     * Equivalent to `free(void* ptr)` in C.
     *
     * @param ptr Pointer to the memory location to free.
     */
    _free(ptr: number): void;

    /**
     * Allocates memory in the WebAssembly heap.
     *
     * Equivalent to `malloc(size_t size)` in C.
     *
     * @param size Number of bytes to allocate.
     * @returns A pointer to the beginning of the allocated memory block.
     */
    _malloc(size: number): number;

    // --- Exported Swisseph C Functions ---
    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} calc_flag - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} xin - C Type: `double*`
     * @param {number} xaz - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_azalt(
        tjd_ut: number,
        calc_flag: number,
        geopos: number,
        atpress: number,
        attemp: number,
        xin: number,
        xaz: number
    ): void;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} calc_flag - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} xin - C Type: `double*`
     * @param {number} xout - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_azalt_rev(
        tjd_ut: number,
        calc_flag: number,
        geopos: number,
        xin: number,
        xout: number
    ): void;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ipl - C Type: `int`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_calc(
        tjd: number,
        ipl: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iplctr - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xxret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_calc_pctr(
        tjd: number,
        ipl: number,
        iplctr: number,
        iflag: number,
        xxret: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_calc_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /** @returns {void} - C Type: `void` */
    _swe_close(): void;

    /**
     * @param {number} xpo - C Type: `double*`
     * @param {number} xpn - C Type: `double*`
     * @param {number} eps - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_cotrans(xpo: number, xpn: number, eps: number): void;

    /**
     * @param {number} xpo - C Type: `double*`
     * @param {number} xpn - C Type: `double*`
     * @param {number} eps - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_cotrans_sp(xpo: number, xpn: number, eps: number): void;

    /**
     * @param {number} t - C Type: `CSEC`
     * @param {number} a - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_cs2degstr(t: number, a: number): number;

    /**
     * @param {number} t - C Type: `CSEC`
     * @param {number} pchar - C Type: `char`
     * @param {number} mchar - C Type: `char`
     * @param {number} s - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_cs2lonlatstr(
        t: number,
        pchar: number,
        mchar: number,
        s: number
    ): number;

    /**
     * @param {number} t - C Type: `CSEC`
     * @param {number} sep - C Type: `int`
     * @param {number} suppressZero - C Type: `AS_BOOL`
     * @param {number} a - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_cs2timestr(
        t: number,
        sep: number,
        suppressZero: number,
        a: number
    ): number;

    /**
     * @param {number} p - C Type: `centisec`
     * @returns {number} - C Type: `centisec`
     */
    _swe_csnorm(p: number): number;

    /**
     * @param {number} x - C Type: `centisec`
     * @returns {number} - C Type: `centisec`
     */
    _swe_csroundsec(x: number): number;

    /**
     * @param {number} x - C Type: `double`
     * @returns {number} - C Type: `int32`
     */
    _swe_d2l(x: number): number;

    /**
     * @param {number} y - C Type: `int`
     * @param {number} m - C Type: `int`
     * @param {number} d - C Type: `int`
     * @param {number} utime - C Type: `double`
     * @param {number} c - C Type: `char`
     * @param {number} tjd - C Type: `double*`
     * @returns {number} - C Type: `int`
     */
    _swe_date_conversion(
        y: number,
        m: number,
        d: number,
        utime: number,
        c: number,
        tjd: number
    ): number;

    /**
     * @param {number} jd - C Type: `double`
     * @returns {number} - C Type: `int`
     */
    _swe_day_of_week(jd: number): number;

    /**
     * @param {number} x1 - C Type: `double`
     * @param {number} x0 - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_deg_midp(x1: number, x0: number): number;

    /**
     * @param {number} x - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_degnorm(x: number): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_deltat(tjd: number): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_deltat_ex(tjd: number, iflag: number, serr: number): number;

    /**
     * @param {number} p1 - C Type: `centisec`
     * @param {number} p2 - C Type: `centisec`
     * @returns {number} - C Type: `centisec`
     */
    _swe_difcs2n(p1: number, p2: number): number;

    /**
     * @param {number} p1 - C Type: `centisec`
     * @param {number} p2 - C Type: `centisec`
     * @returns {number} - C Type: `centisec`
     */
    _swe_difcsn(p1: number, p2: number): number;

    /**
     * @param {number} p1 - C Type: `double`
     * @param {number} p2 - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_difdeg2n(p1: number, p2: number): number;

    /**
     * @param {number} p1 - C Type: `double`
     * @param {number} p2 - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_difdegn(p1: number, p2: number): number;

    /**
     * @param {number} p1 - C Type: `double`
     * @param {number} p2 - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_difrad2n(p1: number, p2: number): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} tjd - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar(
        star: number,
        tjd: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} tjd - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar2(
        star: number,
        tjd: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} mag - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar2_mag(star: number, mag: number, serr: number): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar2_ut(
        star: number,
        tjd_ut: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} mag - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar_mag(star: number, mag: number, serr: number): number;

    /**
     * @param {number} star - C Type: `char*`
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} xx - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_fixstar_ut(
        star: number,
        tjd_ut: number,
        iflag: number,
        xx: number,
        serr: number
    ): number;

    /**
     * @param {number} t_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} iflag - C Type: `int32`
     * @param {number} imeth - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} dgsect - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_gauquelin_sector(
        t_ut: number,
        ipl: number,
        starname: number,
        iflag: number,
        imeth: number,
        geopos: number,
        atpress: number,
        attemp: number,
        dgsect: number,
        serr: number
    ): number;

    /**
     * @param {number} samod - C Type: `char*`
     * @param {number} sdet - C Type: `char*`
     * @param {number} iflag - C Type: `int32`
     * @returns {void} - C Type: `void`
     */
    _swe_get_astro_models(samod: number, sdet: number, iflag: number): void;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_get_ayanamsa(tjd_et: number): number;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} daya - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_get_ayanamsa_ex(
        tjd_et: number,
        iflag: number,
        daya: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} daya - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_get_ayanamsa_ex_ut(
        tjd_ut: number,
        iflag: number,
        daya: number,
        serr: number
    ): number;

    /**
     * @param {number} isidmode - C Type: `int32`
     * @returns {number} - C Type: `char*`
     */
    _swe_get_ayanamsa_name(isidmode: number): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_get_ayanamsa_ut(tjd_ut: number): number;

    /**
     * @param {number} ifno - C Type: `int`
     * @param {number} tfstart - C Type: `double*`
     * @param {number} tfend - C Type: `double*`
     * @param {number} denum - C Type: `int*`
     * @returns {number} - C Type: `char*`
     */
    _swe_get_current_file_data(
        ifno: number,
        tfstart: number,
        tfend: number,
        denum: number
    ): number;

    /**
     * @param {number} s - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_get_library_path(s: number): number;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_get_orbital_elements(
        tjd_et: number,
        ipl: number,
        iflag: number,
        dret: number,
        serr: number
    ): number;

    /**
     * @param {number} ipl - C Type: `int`
     * @param {number} spname - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_get_planet_name(ipl: number, spname: number): number;

    /** @returns {number} - C Type: `double` */
    _swe_get_tid_acc(): number;

    /**
     * @param {number} tjdut - C Type: `double`
     * @param {number} dgeo - C Type: `double*`
     * @param {number} datm - C Type: `double*`
     * @param {number} dobs - C Type: `double*`
     * @param {number} helflag - C Type: `int32`
     * @param {number} mag - C Type: `double`
     * @param {number} azi_obj - C Type: `double`
     * @param {number} azi_sun - C Type: `double`
     * @param {number} azi_moon - C Type: `double`
     * @param {number} alt_moon - C Type: `double`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_heliacal_angle(
        tjdut: number,
        dgeo: number,
        datm: number,
        dobs: number,
        helflag: number,
        mag: number,
        azi_obj: number,
        azi_sun: number,
        azi_moon: number,
        alt_moon: number,
        dret: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} geopos - C Type: `double*`
     * @param {number} datm - C Type: `double*`
     * @param {number} dobs - C Type: `double*`
     * @param {number} ObjectName - C Type: `char*`
     * @param {number} TypeEvent - C Type: `int32`
     * @param {number} helflag - C Type: `int32`
     * @param {number} darr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_heliacal_pheno_ut(
        tjd_ut: number,
        geopos: number,
        datm: number,
        dobs: number,
        ObjectName: number,
        TypeEvent: number,
        helflag: number,
        darr: number,
        serr: number
    ): number;

    /**
     * @param {number} tjdstart_ut - C Type: `double`
     * @param {number} geopos - C Type: `double*`
     * @param {number} datm - C Type: `double*`
     * @param {number} dobs - C Type: `double*`
     * @param {number} ObjectName - C Type: `char*`
     * @param {number} TypeEvent - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_heliacal_ut(
        tjdstart_ut: number,
        geopos: number,
        datm: number,
        dobs: number,
        ObjectName: number,
        TypeEvent: number,
        iflag: number,
        dret: number,
        serr: number
    ): number;

    /**
     * @param {number} ipl - C Type: `int32`
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_et - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} dir - C Type: `int32`
     * @param {number} jd_cross - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_helio_cross(
        ipl: number,
        x2cross: number,
        jd_et: number,
        iflag: number,
        dir: number,
        jd_cross: number,
        serr: number
    ): number;

    /**
     * @param {number} ipl - C Type: `int32`
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} dir - C Type: `int32`
     * @param {number} jd_cross - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_helio_cross_ut(
        ipl: number,
        x2cross: number,
        jd_ut: number,
        iflag: number,
        dir: number,
        jd_cross: number,
        serr: number
    ): number;

    /**
     * @param {number} hsys - C Type: `int`
     * @returns {number} - C Type: `char*`
     */
    _swe_house_name(hsys: number): number;

    /**
     * @param {number} armc - C Type: `double`
     * @param {number} geolat - C Type: `double`
     * @param {number} eps - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} xpin - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_house_pos(
        armc: number,
        geolat: number,
        eps: number,
        hsys: number,
        xpin: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} geolat - C Type: `double`
     * @param {number} geolon - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} cusps - C Type: `double*`
     * @param {number} ascmc - C Type: `double*`
     * @returns {number} - C Type: `int`
     */
    _swe_houses(
        tjd_ut: number,
        geolat: number,
        geolon: number,
        hsys: number,
        cusps: number,
        ascmc: number
    ): number;

    /**
     * @param {number} armc - C Type: `double`
     * @param {number} geolat - C Type: `double`
     * @param {number} eps - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} cusps - C Type: `double*`
     * @param {number} ascmc - C Type: `double*`
     * @returns {number} - C Type: `int`
     */
    _swe_houses_armc(
        armc: number,
        geolat: number,
        eps: number,
        hsys: number,
        cusps: number,
        ascmc: number
    ): number;

    /**
     * @param {number} armc - C Type: `double`
     * @param {number} geolat - C Type: `double`
     * @param {number} eps - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} cusps - C Type: `double*`
     * @param {number} ascmc - C Type: `double*`
     * @param {number} cusp_speed - C Type: `double*`
     * @param {number} ascmc_speed - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int`
     */
    _swe_houses_armc_ex2(
        armc: number,
        geolat: number,
        eps: number,
        hsys: number,
        cusps: number,
        ascmc: number,
        cusp_speed: number,
        ascmc_speed: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} geolat - C Type: `double`
     * @param {number} geolon - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} cusps - C Type: `double*`
     * @param {number} ascmc - C Type: `double*`
     * @returns {number} - C Type: `int`
     */
    _swe_houses_ex(
        tjd_ut: number,
        iflag: number,
        geolat: number,
        geolon: number,
        hsys: number,
        cusps: number,
        ascmc: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} iflag - C Type: `int32`
     * @param {number} geolat - C Type: `double`
     * @param {number} geolon - C Type: `double`
     * @param {number} hsys - C Type: `int`
     * @param {number} cusps - C Type: `double*`
     * @param {number} ascmc - C Type: `double*`
     * @param {number} cusp_speed - C Type: `double*`
     * @param {number} ascmc_speed - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int`
     */
    _swe_houses_ex2(
        tjd_ut: number,
        iflag: number,
        geolat: number,
        geolon: number,
        hsys: number,
        cusps: number,
        ascmc: number,
        cusp_speed: number,
        ascmc_speed: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @param {number} gregflag - C Type: `int32`
     * @param {number} iyear - C Type: `int32*`
     * @param {number} imonth - C Type: `int32*`
     * @param {number} iday - C Type: `int32*`
     * @param {number} ihour - C Type: `int32*`
     * @param {number} imin - C Type: `int32*`
     * @param {number} dsec - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_jdet_to_utc(
        tjd_et: number,
        gregflag: number,
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number
    ): void;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} gregflag - C Type: `int32`
     * @param {number} iyear - C Type: `int32*`
     * @param {number} imonth - C Type: `int32*`
     * @param {number} iday - C Type: `int32*`
     * @param {number} ihour - C Type: `int32*`
     * @param {number} imin - C Type: `int32*`
     * @param {number} dsec - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_jdut1_to_utc(
        tjd_ut: number,
        gregflag: number,
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number
    ): void;

    /**
     * @param {number} year - C Type: `int`
     * @param {number} month - C Type: `int`
     * @param {number} day - C Type: `int`
     * @param {number} hour - C Type: `double`
     * @param {number} gregflag - C Type: `int`
     * @returns {number} - C Type: `double`
     */
    _swe_julday(
        year: number,
        month: number,
        day: number,
        hour: number,
        gregflag: number
    ): number;

    /**
     * @param {number} tjd_lat - C Type: `double`
     * @param {number} geolon - C Type: `double`
     * @param {number} tjd_lmt - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lat_to_lmt(
        tjd_lat: number,
        geolon: number,
        tjd_lmt: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_lmt - C Type: `double`
     * @param {number} geolon - C Type: `double`
     * @param {number} tjd_lat - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lmt_to_lat(
        tjd_lmt: number,
        geolon: number,
        tjd_lat: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_eclipse_how(
        tjd_ut: number,
        ifl: number,
        geopos: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} ifltype - C Type: `int32`
     * @param {number} tret - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_eclipse_when(
        tjd_start: number,
        ifl: number,
        ifltype: number,
        tret: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} tret - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_eclipse_when_loc(
        tjd_start: number,
        ifl: number,
        geopos: number,
        tret: number,
        attr: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} ifl - C Type: `int32`
     * @param {number} ifltype - C Type: `int32`
     * @param {number} tret - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_occult_when_glob(
        tjd_start: number,
        ipl: number,
        starname: number,
        ifl: number,
        ifltype: number,
        tret: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} tret - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_occult_when_loc(
        tjd_start: number,
        ipl: number,
        starname: number,
        ifl: number,
        geopos: number,
        tret: number,
        attr: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_lun_occult_where(
        tjd: number,
        ipl: number,
        starname: number,
        ifl: number,
        geopos: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_et - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_mooncross(
        x2cross: number,
        jd_et: number,
        flag: number,
        serr: number
    ): number;

    /**
     * @param {number} jd_et - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} xlon - C Type: `double*`
     * @param {number} xlat - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_mooncross_node(
        jd_et: number,
        flag: number,
        xlon: number,
        xlat: number,
        serr: number
    ): number;

    /**
     * @param {number} jd_ut - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} xlon - C Type: `double*`
     * @param {number} xlat - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_mooncross_node_ut(
        jd_ut: number,
        flag: number,
        xlon: number,
        xlat: number,
        serr: number
    ): number;

    /**
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_ut - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_mooncross_ut(
        x2cross: number,
        jd_ut: number,
        flag: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} method - C Type: `int32`
     * @param {number} xnasc - C Type: `double*`
     * @param {number} xndsc - C Type: `double*`
     * @param {number} xperi - C Type: `double*`
     * @param {number} xaphe - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_nod_aps(
        tjd_et: number,
        ipl: number,
        iflag: number,
        method: number,
        xnasc: number,
        xndsc: number,
        xperi: number,
        xaphe: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} method - C Type: `int32`
     * @param {number} xnasc - C Type: `double*`
     * @param {number} xndsc - C Type: `double*`
     * @param {number} xperi - C Type: `double*`
     * @param {number} xaphe - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_nod_aps_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number,
        method: number,
        xnasc: number,
        xndsc: number,
        xperi: number,
        xaphe: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_et - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} dmax - C Type: `double*`
     * @param {number} dmin - C Type: `double*`
     * @param {number} dtrue - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_orbit_max_min_true_distance(
        tjd_et: number,
        ipl: number,
        iflag: number,
        dmax: number,
        dmin: number,
        dtrue: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_pheno(
        tjd: number,
        ipl: number,
        iflag: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} iflag - C Type: `int32`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_pheno_ut(
        tjd_ut: number,
        ipl: number,
        iflag: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} x1 - C Type: `double`
     * @param {number} x0 - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_rad_midp(x1: number, x0: number): number;

    /**
     * @param {number} x - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_radnorm(x: number): number;

    /**
     * @param {number} inalt - C Type: `double`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} calc_flag - C Type: `int32`
     * @returns {number} - C Type: `double`
     */
    _swe_refrac(
        inalt: number,
        atpress: number,
        attemp: number,
        calc_flag: number
    ): number;

    /**
     * @param {number} inalt - C Type: `double`
     * @param {number} geoalt - C Type: `double`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} lapse_rate - C Type: `double`
     * @param {number} calc_flag - C Type: `int32`
     * @param {number} dret - C Type: `double*`
     * @returns {number} - C Type: `double`
     */
    _swe_refrac_extended(
        inalt: number,
        geoalt: number,
        atpress: number,
        attemp: number,
        lapse_rate: number,
        calc_flag: number,
        dret: number
    ): number;

    /**
     * @param {number} jd - C Type: `double`
     * @param {number} gregflag - C Type: `int`
     * @param {number} jyear - C Type: `int*`
     * @param {number} jmon - C Type: `int*`
     * @param {number} jday - C Type: `int*`
     * @param {number} jut - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_revjul(
        jd: number,
        gregflag: number,
        jyear: number,
        jmon: number,
        jday: number,
        jut: number
    ): void;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} epheflag - C Type: `int32`
     * @param {number} rsmi - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} tret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_rise_trans(
        tjd_ut: number,
        ipl: number,
        starname: number,
        epheflag: number,
        rsmi: number,
        geopos: number,
        atpress: number,
        attemp: number,
        tret: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} ipl - C Type: `int32`
     * @param {number} starname - C Type: `char*`
     * @param {number} epheflag - C Type: `int32`
     * @param {number} rsmi - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} atpress - C Type: `double`
     * @param {number} attemp - C Type: `double`
     * @param {number} horhgt - C Type: `double`
     * @param {number} tret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_rise_trans_true_hor(
        tjd_ut: number,
        ipl: number,
        starname: number,
        epheflag: number,
        rsmi: number,
        geopos: number,
        atpress: number,
        attemp: number,
        horhgt: number,
        tret: number,
        serr: number
    ): number;

    /**
     * @param {number} samod - C Type: `char*`
     * @param {number} iflag - C Type: `int32`
     * @returns {void} - C Type: `void`
     */
    _swe_set_astro_models(samod: number, iflag: number): void;

    /**
     * @param {number} dt - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_set_delta_t_userdef(dt: number): void;

    /**
     * @param {number} path - C Type: `char*`
     * @returns {void} - C Type: `void`
     */
    _swe_set_ephe_path(path: number): void;

    /**
     * @param {number} do_interpolate - C Type: `AS_BOOL`
     * @returns {void} - C Type: `void`
     */
    _swe_set_interpolate_nut(do_interpolate: number): void;

    /**
     * @param {number} fname - C Type: `char*`
     * @returns {void} - C Type: `void`
     */
    _swe_set_jpl_file(fname: number): void;

    /**
     * @param {number} lapse_rate - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_set_lapse_rate(lapse_rate: number): void;

    /**
     * @param {number} sid_mode - C Type: `int32`
     * @param {number} t0 - C Type: `double`
     * @param {number} ayan_t0 - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): void;

    /**
     * @param {number} t_acc - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_set_tid_acc(t_acc: number): void;

    /**
     * @param {number} geolon - C Type: `double`
     * @param {number} geolat - C Type: `double`
     * @param {number} geoalt - C Type: `double`
     * @returns {void} - C Type: `void`
     */
    _swe_set_topo(geolon: number, geolat: number, geoalt: number): void;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_sidtime(tjd_ut: number): number;

    /**
     * @param {number} tjd_ut - C Type: `double`
     * @param {number} eps - C Type: `double`
     * @param {number} nut - C Type: `double`
     * @returns {number} - C Type: `double`
     */
    _swe_sidtime0(tjd_ut: number, eps: number, nut: number): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_sol_eclipse_how(
        tjd: number,
        ifl: number,
        geopos: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} ifltype - C Type: `int32`
     * @param {number} tret - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_sol_eclipse_when_glob(
        tjd_start: number,
        ifl: number,
        ifltype: number,
        tret: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd_start - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} tret - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} backward - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_sol_eclipse_when_loc(
        tjd_start: number,
        ifl: number,
        geopos: number,
        tret: number,
        attr: number,
        backward: number,
        serr: number
    ): number;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} ifl - C Type: `int32`
     * @param {number} geopos - C Type: `double*`
     * @param {number} attr - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_sol_eclipse_where(
        tjd: number,
        ifl: number,
        geopos: number,
        attr: number,
        serr: number
    ): number;

    /**
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_et - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_solcross(
        x2cross: number,
        jd_et: number,
        flag: number,
        serr: number
    ): number;

    /**
     * @param {number} x2cross - C Type: `double`
     * @param {number} jd_ut - C Type: `double`
     * @param {number} flag - C Type: `int32`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `double`
     */
    _swe_solcross_ut(
        x2cross: number,
        jd_ut: number,
        flag: number,
        serr: number
    ): number;

    /**
     * @param {number} ddeg - C Type: `double`
     * @param {number} roundflag - C Type: `int32`
     * @param {number} ideg - C Type: `int32*`
     * @param {number} imin - C Type: `int32*`
     * @param {number} isec - C Type: `int32*`
     * @param {number} dsecfr - C Type: `double*`
     * @param {number} isgn - C Type: `int32*`
     * @returns {void} - C Type: `void`
     */
    _swe_split_deg(
        ddeg: number,
        roundflag: number,
        ideg: number,
        imin: number,
        isec: number,
        dsecfr: number,
        isgn: number
    ): void;

    /**
     * @param {number} tjd - C Type: `double`
     * @param {number} te - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_time_equ(tjd: number, te: number, serr: number): number;

    /**
     * @param {number} tjdut - C Type: `double`
     * @param {number} dgeo - C Type: `double*`
     * @param {number} datm - C Type: `double*`
     * @param {number} dobs - C Type: `double*`
     * @param {number} helflag - C Type: `int32`
     * @param {number} mag - C Type: `double`
     * @param {number} azi_obj - C Type: `double`
     * @param {number} alt_obj - C Type: `double`
     * @param {number} azi_sun - C Type: `double`
     * @param {number} azi_moon - C Type: `double`
     * @param {number} alt_moon - C Type: `double`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_topo_arcus_visionis(
        tjdut: number,
        dgeo: number,
        datm: number,
        dobs: number,
        helflag: number,
        mag: number,
        azi_obj: number,
        alt_obj: number,
        azi_sun: number,
        azi_moon: number,
        alt_moon: number,
        dret: number,
        serr: number
    ): number;

    /**
     * @param {number} iyear - C Type: `int32`
     * @param {number} imonth - C Type: `int32`
     * @param {number} iday - C Type: `int32`
     * @param {number} ihour - C Type: `int32`
     * @param {number} imin - C Type: `int32`
     * @param {number} dsec - C Type: `double`
     * @param {number} d_timezone - C Type: `double`
     * @param {number} iyear_out - C Type: `int32*`
     * @param {number} imonth_out - C Type: `int32*`
     * @param {number} iday_out - C Type: `int32*`
     * @param {number} ihour_out - C Type: `int32*`
     * @param {number} imin_out - C Type: `int32*`
     * @param {number} dsec_out - C Type: `double*`
     * @returns {void} - C Type: `void`
     */
    _swe_utc_time_zone(
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number,
        d_timezone: number,
        iyear_out: number,
        imonth_out: number,
        iday_out: number,
        ihour_out: number,
        imin_out: number,
        dsec_out: number
    ): void;

    /**
     * @param {number} iyear - C Type: `int32`
     * @param {number} imonth - C Type: `int32`
     * @param {number} iday - C Type: `int32`
     * @param {number} ihour - C Type: `int32`
     * @param {number} imin - C Type: `int32`
     * @param {number} dsec - C Type: `double`
     * @param {number} gregflag - C Type: `int32`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_utc_to_jd(
        iyear: number,
        imonth: number,
        iday: number,
        ihour: number,
        imin: number,
        dsec: number,
        gregflag: number,
        dret: number,
        serr: number
    ): number;

    /**
     * @param {number} s - C Type: `char*`
     * @returns {number} - C Type: `char*`
     */
    _swe_version(s: number): number;

    /**
     * @param {number} tjdut - C Type: `double`
     * @param {number} geopos - C Type: `double*`
     * @param {number} datm - C Type: `double*`
     * @param {number} dobs - C Type: `double*`
     * @param {number} ObjectName - C Type: `char*`
     * @param {number} helflag - C Type: `int32`
     * @param {number} dret - C Type: `double*`
     * @param {number} serr - C Type: `char*`
     * @returns {number} - C Type: `int32`
     */
    _swe_vis_limit_mag(
        tjdut: number,
        geopos: number,
        datm: number,
        dobs: number,
        ObjectName: number,
        helflag: number,
        dret: number,
        serr: number
    ): number;
}

/**
 * Initializes and returns the Swisseph WebAssembly module.
 *
 * @param moduleArg - Optional configuration object for the Emscripten module.
 * @returns A Promise that resolves to the initialized Swisseph instance.
 */
export default function Module(
    moduleArg?: Partial<EmscriptenModule>
): Promise<SwissephModule>;
