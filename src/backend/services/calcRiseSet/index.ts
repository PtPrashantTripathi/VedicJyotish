export function calcRiseSet(
    jd: number,
    ipl: number,
    geopos: [longitude: number, latitude: number, elevation: number]
) {
    const flag = swe.SE_BIT_DISC_CENTER | swe.SE_BIT_NO_REFRACTION;

    /** Call swe_rise_trans for rise */
    const rise_jd = swe.swe_rise_trans(
        jd,
        ipl,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_RISE | flag,
        geopos,
        0,
        0
    );

    /** Call swe_rise_trans for set */
    const set_jd = swe.swe_rise_trans(
        rise_jd,
        ipl,
        null,
        swe.SEFLG_SWIEPH,
        swe.SE_CALC_SET | flag,
        geopos,
        0,
        0
    );

    return {
        rise_jd,
        set_jd,
    };
}
