import { DateTime } from "luxon";
import { type Dispatch, type SetStateAction, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSessionContext } from "src/frontend/contexts/SessionContext";
import { useLang } from "src/frontend/i18n";
import {
    type AshtakootResult,
    calcAshtakoot,
} from "src/backend/services/calcAshtakoot";
import { Kundli } from "src/backend/services/Kundli";
import { formatTimezoneOffset } from "src/frontend/utils/formatters/formatTimezoneOffset";

interface PersonForm {
    name: string;
    date: string;
    time: string;
    city: string;
    lat: number;
    lon: number;
    tz: string;
}

const DEFAULT_FORM: PersonForm = {
    name: "",
    date: "",
    time: "06:00",
    city: "Ujjain, Madhya Pradesh, India",
    lat: 23.1793,
    lon: 75.784912,
    tz: "Asia/Kolkata",
};

const VERDICT_COLORS: Record<
    string,
    { bg: string; border: string; text: string }
> = {
    Excellent: { bg: "#EDF2EE", border: "#8B9A8F", text: "#8B9A8F" },
    "Very Good": { bg: "#FFFBEB", border: "#D97706", text: "#D97706" },
    Good: { bg: "#EFF6FF", border: "#2563EB", text: "#2563EB" },
    Average: { bg: "#FFF7ED", border: "#EA580C", text: "#EA580C" },
    Poor: { bg: "#FFF5F5", border: "#DC2626", text: "#DC2626" },
};

function verdictKey(verdict: string): string {
    for (const k of Object.keys(VERDICT_COLORS)) {
        if (verdict.startsWith(k)) return k;
    }
    return "Poor";
}

export default function KundliMatching() {
    const session = useSessionContext();
    const { t, isHindi } = useLang();

    const [male, setMale] = useState<PersonForm>({ ...DEFAULT_FORM });
    const [female, setFemale] = useState<PersonForm>({ ...DEFAULT_FORM });
    const [mCities, setMCities] = useState<[string, number, number, string][]>(
        []
    );
    const [fCities, setFCities] = useState<[string, number, number, string][]>(
        []
    );
    const [result, setResult] = useState<AshtakootResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const searchCities = (
        val: string,
        setter: Dispatch<SetStateAction<[string, number, number, string][]>>
    ) => {
        if (!val.trim()) {
            setter([]);
            return;
        }
        setter(
            city_database
                .filter(([n]) => n.toLowerCase().includes(val.toLowerCase()))
                .slice(0, 8)
        );
    };

    const handleCalculate = () => {
        setError(null);
        try {
            if (!male.date || !male.time || !female.date || !female.time) {
                setError("Please enter birth date and time for both.");
                return;
            }
            const maleDt = DateTime.fromISO(`${male.date}T${male.time}`, {
                zone: male.tz,
            }) as DateTime<true>;
            const femaleDt = DateTime.fromISO(`${female.date}T${female.time}`, {
                zone: female.tz,
            }) as DateTime<true>;
            const mK = Kundli(maleDt, male.lon, male.lat);
            const fK = Kundli(femaleDt, female.lon, female.lat);
            const ashtakoot = calcAshtakoot(
                mK.planets.Moon.rasi.rasi_num,
                mK.planets.Moon.nakshatra.nakshatra_num,
                fK.planets.Moon.rasi.rasi_num,
                fK.planets.Moon.nakshatra.nakshatra_num
            );
            setResult(ashtakoot);
            setTimeout(() => {
                document
                    .getElementById("matching-result")
                    ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (e) {
            setError(
                `Calculation error: ${e instanceof Error ? e.message : String(e)}`
            );
        }
    };

    return (
        <div className="min-h-screen" style={{ background: "var(--c-bg)" }}>
            {/* Header */}
            <div
                className="mb-5 overflow-hidden rounded-2xl px-4 py-4"
                style={{
                    background:
                        "linear-gradient(135deg, #D4A373 0%, #4A3B32 100%)",
                    boxShadow: "0 4px 20px rgba(212,163,115,0.28)",
                }}>
                <button
                    onClick={() => session.updateSearchParams({ page: "Home" })}
                    className="mb-1 text-sm text-white/70 hover:text-white">
                    ← {t("back")}
                </button>
                <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                    अष्टकूट गुण मिलाप
                </p>
                <h1 className="mt-0.5 text-xl font-bold text-white">
                    {t("kundliMatching")}
                </h1>
                <p className="mt-0.5 text-xs text-white/70">
                    8-fold compatibility — 36 points system
                </p>
            </div>

            {/* Forms Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <PersonCard
                    title={t("maleDetails")}
                    titleColor="var(--c-primary)"
                    icon="♂"
                    form={male}
                    setForm={setMale}
                    cities={mCities}
                    setCities={setMCities}
                    searchCities={searchCities}
                />
                <PersonCard
                    title={t("femaleDetails")}
                    titleColor="var(--c-maroon)"
                    icon="♀"
                    form={female}
                    setForm={setFemale}
                    cities={fCities}
                    setCities={setFCities}
                    searchCities={searchCities}
                />
            </div>

            {/* Error */}
            {error && (
                <div
                    className="mt-4 rounded-xl p-3 text-sm"
                    style={{
                        background: "#FFF5F5",
                        border: "1px solid #DC2626",
                        color: "#DC2626",
                    }}>
                    <FaExclamationTriangle className="inline-block h-3.5 w-3.5 mr-1.5 align-middle" /> {error}
                </div>
            )}

            {/* Calculate Button */}
            <div className="mt-5 text-center">
                <button
                    type="button"
                    onClick={handleCalculate}
                    className="rounded-xl px-10 py-3 text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--c-primary) 0%, var(--c-maroon) 100%)",
                        boxShadow: "0 4px 14px rgba(212,163,115,0.35)",
                    }}>
                    {t("checkCompatibility")} →
                </button>
            </div>

            {/* Results */}
            {result && (
                <div id="matching-result" className="mt-6 space-y-4">
                    {/* Summary Card */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}>
                        <div
                            className="px-5 py-4"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--c-primary), var(--c-maroon))",
                            }}>
                            <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                                {t("totalScore")}
                            </p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-bold text-white">
                                    {result.total}
                                </span>
                                <span className="mb-1 text-xl text-white/70">
                                    / 36
                                </span>
                            </div>
                            <div
                                className="mt-2 h-2.5 w-full overflow-hidden rounded-full"
                                style={{
                                    background: "rgba(255,255,255,0.25)",
                                }}>
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${(result.total / 36) * 100}%`,
                                        background: "#fff",
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="px-5 py-3"
                            style={(() => {
                                const vk = verdictKey(result.verdict);
                                return VERDICT_COLORS[vk];
                            })()}>
                            <p
                                className="text-center text-sm font-bold"
                                style={{
                                    color: VERDICT_COLORS[
                                        verdictKey(result.verdict)
                                    ].text,
                                }}>
                                {isHindi ? result.verdictHi : result.verdict}
                            </p>
                        </div>
                    </div>

                    {/* Koot Table */}
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <div
                            className="px-4 py-3"
                            style={{
                                background: "var(--c-warm)",
                                borderBottom: "1px solid var(--c-border)",
                            }}>
                            <h3
                                className="text-base font-bold"
                                style={{ color: "var(--c-maroon)" }}>
                                अष्टकूट विवरण — Koot Breakdown
                            </h3>
                        </div>
                        <div
                            className="divide-y"
                            style={{ borderColor: "var(--c-border)" }}>
                            {Object.values(result)
                                .filter(
                                    (v): v is typeof result.varna =>
                                        v &&
                                        typeof v === "object" &&
                                        "label" in v
                                )
                                .map(koot => {
                                    const pct = koot.score / koot.max;
                                    const barColor =
                                        pct >= 0.8
                                            ? "var(--c-green)"
                                            : pct >= 0.5
                                              ? "var(--c-gold)"
                                              : "#DC2626";
                                    return (
                                        <div
                                            key={koot.label}
                                            className="flex items-center gap-3 px-4 py-3">
                                            <div className="w-24 shrink-0">
                                                <p
                                                    className="text-xs font-bold"
                                                    style={{
                                                        color: "var(--c-text)",
                                                    }}>
                                                    {isHindi
                                                        ? koot.labelHi
                                                        : koot.label}
                                                </p>
                                                <p
                                                    className="text-[10px]"
                                                    style={{
                                                        color: "var(--c-text-m)",
                                                    }}>
                                                    {koot.detail}
                                                </p>
                                            </div>
                                            <div className="flex-1">
                                                <div
                                                    className="h-2 w-full overflow-hidden rounded-full"
                                                    style={{
                                                        background:
                                                            "var(--c-border)",
                                                    }}>
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${pct * 100}%`,
                                                            background:
                                                                barColor,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-16 shrink-0 text-right">
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{ color: barColor }}>
                                                    {koot.score}
                                                </span>
                                                <span
                                                    className="text-xs"
                                                    style={{
                                                        color: "var(--c-text-m)",
                                                    }}>
                                                    /{koot.max}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{
                                background: "var(--c-warm)",
                                borderTop: "2px solid var(--c-border-s)",
                            }}>
                            <span
                                className="text-sm font-bold"
                                style={{ color: "var(--c-maroon)" }}>
                                कुल / Total
                            </span>
                            <span
                                className="text-lg font-bold"
                                style={{ color: "var(--c-primary)" }}>
                                {result.total} / 36
                            </span>
                        </div>
                    </div>

                    {/* Dosha / Notes */}
                    {result.nadi.score === 0 && (
                        <div
                            className="rounded-xl p-3 text-sm"
                            style={{
                                background: "#FFF5F5",
                                border: "1px solid #DC2626",
                            }}>
                            <p className="font-semibold text-red-700">
                                <FaExclamationTriangle className="inline-block h-3.5 w-3.5 mr-1.5 align-middle" /> नाड़ी दोष (Nadi Dosha)
                            </p>
                            <p className="mt-0.5 text-xs text-red-600">
                                Same Nadi detected. This is a significant dosha.
                                Consult an astrologer for remedies.
                            </p>
                        </div>
                    )}
                    {result.bhakoot.score === 0 && (
                        <div
                            className="rounded-xl p-3 text-sm"
                            style={{
                                background: "#FFF5F5",
                                border: "1px solid #DC2626",
                            }}>
                            <p className="font-semibold text-red-700">
                                <FaExclamationTriangle className="inline-block h-3.5 w-3.5 mr-1.5 align-middle" /> भकूट दोष (Bhakoot Dosha)
                            </p>
                            <p className="mt-0.5 text-xs text-red-600">
                                Unfavorable Rashi combination. Consult an
                                astrologer.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── PersonCard Component ─────────────────────────────────────────────────────

function PersonCard({
    title,
    titleColor,
    icon,
    form,
    setForm,
    cities,
    setCities,
    searchCities,
}: {
    title: string;
    titleColor: string;
    icon: string;
    form: PersonForm;
    setForm: (f: PersonForm) => void;
    cities: [string, number, number, string][];
    setCities: Dispatch<SetStateAction<[string, number, number, string][]>>;
    searchCities: (
        val: string,
        setter: Dispatch<SetStateAction<[string, number, number, string][]>>
    ) => void;
}) {
    const inputStyle = {
        width: "100%",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid var(--c-border-s)",
        background: "var(--c-surface)",
        color: "var(--c-text)",
        fontSize: "13px",
        outline: "none",
    } as React.CSSProperties;

    const labelStyle = {
        display: "block",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "0.04em",
        color: "var(--c-text-m)",
        marginBottom: "4px",
    };

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
            <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                    background: `${titleColor}14`,
                    borderBottom: "1px solid var(--c-border)",
                }}>
                <span
                    className="text-xl font-bold"
                    style={{ color: titleColor }}>
                    {icon}
                </span>
                <h3
                    className="text-base font-bold"
                    style={{ color: titleColor }}>
                    {title}
                </h3>
            </div>
            <div className="space-y-3 p-4">
                <div>
                    <label style={labelStyle}>Name / नाम</label>
                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="Full name"
                        value={form.name}
                        onChange={e =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label style={labelStyle}>DOB / जन्म तिथि</label>
                        <input
                            style={inputStyle}
                            type="date"
                            value={form.date}
                            onChange={e =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Time / समय</label>
                        <input
                            style={inputStyle}
                            type="time"
                            value={form.time}
                            onChange={e =>
                                setForm({ ...form, time: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="relative">
                    <label style={labelStyle}>City / जन्म स्थान</label>
                    <input
                        style={inputStyle}
                        type="search"
                        placeholder="Enter city name"
                        value={form.city}
                        autoComplete="off"
                        onChange={e => {
                            setForm({ ...form, city: e.target.value });
                            searchCities(e.target.value, setCities);
                        }}
                    />
                    {cities.length > 0 && (
                        <div
                            className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl shadow-xl"
                            style={{
                                border: "1px solid var(--c-border-s)",
                                background: "var(--c-surface)",
                            }}>
                            {cities.map(([city, lat, lon, tz], idx) => (
                                <div
                                    key={idx}
                                    className="cursor-pointer border-b p-2.5 text-xs last:border-0"
                                    style={{
                                        borderColor: "var(--c-border)",
                                        color: "var(--c-text)",
                                    }}
                                    onMouseEnter={e => {
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.background = "var(--c-warm)";
                                    }}
                                    onMouseLeave={e => {
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.background = "var(--c-surface)";
                                    }}
                                    onClick={() => {
                                        setForm({
                                            ...form,
                                            city,
                                            lat,
                                            lon,
                                            tz,
                                        });
                                        setCities([]);
                                    }}>
                                    {city}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <label style={labelStyle}>Timezone</label>
                    <select
                        style={{ ...inputStyle, appearance: "auto" as never }}
                        value={formatTimezoneOffset(
                            form.tz,
                            timezone_database[form.tz] ?? 330
                        )}
                        onChange={e => {
                            const tz = e.target.value.split("[")[0].trim();
                            setForm({ ...form, tz });
                        }}>
                        {Object.entries(timezone_database).map(
                            ([tznm, tz_offset]) => {
                                const formatted = formatTimezoneOffset(
                                    tznm,
                                    tz_offset
                                );
                                return (
                                    <option key={tznm} value={formatted}>
                                        {formatted}
                                    </option>
                                );
                            }
                        )}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label style={labelStyle}>Lat</label>
                        <input
                            style={inputStyle}
                            type="number"
                            step="0.0001"
                            value={form.lat}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    lat: parseFloat(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Lon</label>
                        <input
                            style={inputStyle}
                            type="number"
                            step="0.0001"
                            value={form.lon}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    lon: parseFloat(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
