import { useState } from "react";
import FormInput from "src/components/base/FormInput";
import FormSelect from "src/components/base/FormSelect";
import { useSessionContext } from "src/contexts/SessionContext";
import { useLang } from "src/i18n";
import { formatTimezoneOffset } from "src/utils/formatters/formatTimezoneOffset";

export default function KundliForm() {
    const session = useSessionContext();
    const { t } = useLang();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [filteredCities, setFilteredCities] = useState<[string, number, number, string][]>([]);

    const handleCityChange = (val: string) => {
        session.updateSearchParams({ city: val });
        if (val.trim()) {
            const matches = city_database.filter(([name]) =>
                name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredCities(matches.slice(0, 10));
        } else {
            setFilteredCities([]);
        }
    };

    return (
        <div style={{ background: "var(--c-bg)" }}>
            {/* Header */}
            <div
                className="mb-5 overflow-hidden rounded-2xl px-4 py-4"
                style={{ background: "linear-gradient(135deg, #D4480A 0%, #7D1B2E 100%)", boxShadow: "0 4px 20px rgba(212,72,10,0.28)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">ज्योतिष गणना</p>
                <h1 className="mt-0.5 text-xl font-bold text-white">{t("generateKundli")}</h1>
                <p className="mt-0.5 text-xs text-white/70">{t("birthDataSubtitle")}</p>
            </div>

            <form
                className="space-y-4 rounded-2xl p-4"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                method="GET"
                action="">
                <input hidden id="page" name="page" value="KundliResult" readOnly />

                <FormInput
                    type="text"
                    id="user"
                    name="user"
                    placeholder={t("fullName")}
                    label={t("fullName")}
                    value={session.searchParams.user !== "User" ? session.searchParams.user : undefined}
                    onChange={e => session.updateSearchParams({ user: e.target.value })}
                />

                <FormSelect
                    id="gender"
                    name="gender"
                    label={t("gender")}
                    value={session.searchParams.gender}
                    onChange={e => session.updateSearchParams({ gender: e.target.value as "M" | "F" })}>
                    <option value="M">{t("male")}</option>
                    <option value="F">{t("female")}</option>
                </FormSelect>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormInput
                        label={t("dateOfBirth")}
                        type="date"
                        id="date"
                        name="date"
                        value={session.searchParams.date}
                        onChange={e => session.updateSearchParams({ date: e.target.value })}
                        required
                    />
                    <FormInput
                        label={t("timeOfBirth")}
                        type="time"
                        id="time"
                        name="time"
                        value={session.searchParams.time}
                        onChange={e => session.updateSearchParams({ time: e.target.value })}
                        required
                    />
                </div>

                {/* City Search */}
                <div className="relative">
                    <FormInput
                        id="city"
                        type="search"
                        name="city"
                        label={t("placeOfBirth")}
                        value={session.searchParams.city}
                        onChange={e => handleCityChange(e.target.value)}
                        placeholder="Enter City, State, Country"
                        autoComplete="off"
                        tabIndex={0}
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                        role="textbox"
                    />

                    {filteredCities.length > 0 && (
                        <div
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-xl shadow-xl"
                            style={{ border: "1px solid var(--c-border-s)", background: "var(--c-surface)" }}>
                            {filteredCities.map(([city, lat, lon, tz], idx) => (
                                <div
                                    key={idx}
                                    id={`${city}|${lat}|${lon}|${tz}`}
                                    className="cursor-pointer border-b p-3 text-sm last:border-b-0"
                                    style={{ borderColor: "var(--c-border)", color: "var(--c-text)" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--c-warm)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--c-surface)"; }}
                                    onClick={e => {
                                        const [city, lat, lon, tznm] = e.currentTarget.id.split("|");
                                        session.updateSearchParams({ city, lat: parseFloat(lat), lon: parseFloat(lon), tznm, tz: timezone_database[tznm] });
                                        setFilteredCities([]);
                                    }}>
                                    {city.split(new RegExp(`(${session.searchParams.city})`, "gi")).map((part, i) =>
                                        part.toLowerCase() === session.searchParams.city.toLowerCase()
                                            ? <strong key={i} style={{ color: "var(--c-primary)" }}>{part}</strong>
                                            : part
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-2 rounded-xl p-3 text-xs space-y-0.5" style={{ background: "var(--c-warm)", border: "1px solid var(--c-border)" }}>
                        <p style={{ color: "var(--c-text-2)" }}>🏙️ {t("cityTip")}</p>
                        <p style={{ color: "var(--c-text-m)" }}>📍 {t("cityTip2")}</p>
                        <p style={{ color: "var(--c-text-m)" }}>✅ {t("cityTip3")}</p>
                    </div>
                </div>

                {/* Advanced Options */}
                <div style={{ borderTop: "1px solid var(--c-border)" }} className="pt-4">
                    <label className="flex cursor-pointer items-center gap-2.5">
                        <input
                            type="checkbox"
                            checked={showAdvanced}
                            onChange={e => setShowAdvanced(e.target.checked)}
                            className="h-4 w-4 rounded accent-[var(--c-primary)]"
                        />
                        <span className="text-sm font-medium" style={{ color: "var(--c-text-2)" }}>
                            {t("advancedOptions")}
                        </span>
                    </label>

                    {showAdvanced && (
                        <div className="mt-4 space-y-4 rounded-xl p-4" style={{ background: "var(--c-warm)", border: "1px solid var(--c-border)" }}>
                            <FormSelect
                                label={t("timezone")}
                                id="tz"
                                name="tz"
                                value={formatTimezoneOffset(session.searchParams.tznm, session.searchParams.tz)}
                                onChange={e => {
                                    const tznm = e.target.value.split("[")[0].trim();
                                    session.updateSearchParams({ tznm, tz: timezone_database[tznm] });
                                }}>
                                {Object.entries(timezone_database).map(([tznm, tz_offset]) => {
                                    const formatted = formatTimezoneOffset(tznm, tz_offset);
                                    return <option key={tznm} value={formatted}>{formatted}</option>;
                                })}
                            </FormSelect>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    id="lat" name="lat" type="number" label={t("latitude")}
                                    placeholder="22.75" value={session.searchParams.lat || ""}
                                    onChange={e => session.updateSearchParams({ lat: parseFloat(e.target.value) })}
                                    min="-90" max="90" step="0.00000001"
                                />
                                <FormInput
                                    id="lon" name="lon" type="number" label={t("longitude")}
                                    placeholder="77.72" value={session.searchParams.lon || ""}
                                    onChange={e => session.updateSearchParams({ lon: parseFloat(e.target.value) })}
                                    min="-180" max="180" step="0.00000001"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-maroon) 100%)", boxShadow: "0 4px 14px rgba(212,72,10,0.35)" }}>
                        {t("generateKundli")} →
                    </button>
                    <button
                        type="reset"
                        className="rounded-xl border px-5 py-3 text-sm font-medium transition-all hover:opacity-80"
                        style={{ borderColor: "var(--c-border-s)", color: "var(--c-text-2)", background: "var(--c-surface)" }}>
                        {t("reset")}
                    </button>
                </div>
            </form>
        </div>
    );
}
