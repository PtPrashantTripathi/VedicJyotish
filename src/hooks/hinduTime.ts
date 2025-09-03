export function calcHinduTime(sunriseDecimal: number) {
    const now = new Date();
    let t =
        now.getHours() / 24 +
        now.getMinutes() / (24 * 60) +
        (now.getSeconds() + now.getMilliseconds() / 1000) / (24 * 3600) -
        sunriseDecimal;
    if (t < 0) t += 1;

    const ghati = Math.floor(t * 60);
    const pal = Math.floor((t * 60 - ghati) * 60);
    const vipal = Math.floor((t * 3600 - ghati * 60 - pal) * 60);
    return { ghati, pal, vipal };
}
