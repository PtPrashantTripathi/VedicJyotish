import { getSamvatsara } from "src/services/constants/Samvatsara";

// Samvatsara
export function calcSamvatsara(tjd_ut: number, masa_num: number) {
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

    return {
        kali,
        saka_samvat,
        vikrama_samvat,
        ...getSamvatsara(samvatsara_num),
    };
}
