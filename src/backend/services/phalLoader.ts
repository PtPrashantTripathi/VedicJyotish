// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PhalDatabase = Record<string, any>;

let _db: PhalDatabase | null = null;
let _promise: Promise<PhalDatabase> | null = null;

const FILES = [
    "maha_dasha_phal",
    "antar_dasha_phal",
    "phala_deepika_ascendant",
    "phala_deepika_planet_house",
    "brihat_jataka_moon_nakshatra",
    "bphs_upagraha",
    "bphs_lordship",
    "bhrigu_samhita_planet_rasi_house",
    "saravali_aspect",
    "saravali_house_position",
    "saravali_rasi_position",
] as const;

export function getPhalDb(): PhalDatabase | null {
    return _db;
}

export async function loadPhalDb(): Promise<PhalDatabase> {
    if (_db) return _db;
    if (_promise) return _promise;

    _promise = (async () => {
        const base = "./assets/database/phal/";
        const results = await Promise.all(
            FILES.map(name =>
                fetch(`${base}${name}.json`).then(r => {
                    if (!r.ok)
                        throw new Error(
                            `Failed to load ${name}.json: ${r.status}`
                        );
                    return r.json();
                })
            )
        );
        const db: PhalDatabase = {};
        FILES.forEach((name, i) => {
            db[name] = results[i];
        });
        _db = db;
        return db;
    })();

    return _promise;
}
