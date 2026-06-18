import { DateTime } from "luxon";
import { useState } from "react";
import ChartInfoTable from "src/components/ChartInfoTable";
import KundliChartSVG from "src/components/KundliChartSVG";
import KundliYogPhala from "src/components/KundliYogPhala";
import VimsottariDasa from "src/components/VimsottariDasa";
import { useSessionContext } from "src/contexts/SessionContext";
import { Kundli } from "src/services/Kundli";
import { DMS } from "src/services/utils";
import { fmtDate, fmtTime } from "src/utils/formatDate";

export default function KundliResult() {
    const session = useSessionContext();

    const kundliData = Kundli(
        DateTime.fromISO(
            `${session.searchParams.date}T${session.searchParams.time}`,
            {
                zone: session.searchParams.tznm,
            }
        ) as DateTime<true>,
        session.searchParams.lon,
        session.searchParams.lat
    );

    const primaryFacts = [
        {
            label: "वार",
            value: kundliData.panchanga.vara.name.hindi,
        },
        {
            label: "दिन जन्म",
            value: kundliData.daybirth ? "हाँ" : "नहीं",
        },
        {
            label: "अक्षांश",
            value: DMS(kundliData.panchanga.latitude).toString(),
        },
        {
            label: "देशांतर",
            value: DMS(kundliData.panchanga.longitude).toString(),
        },
        {
            label: "सूर्योदय",
            value: kundliData.panchanga.sunrise.dt.toFormat("hh:mm a"),
        },
        {
            label: "सूर्यास्त",
            value: kundliData.panchanga.sunset.dt.toFormat("hh:mm a"),
        },
        {
            label: "अयनांश",
            value: DMS(kundliData.panchanga.ayanamsa).toString(),
        },
        {
            label: "जूलियन दिनांक",
            value: kundliData.panchanga.tjd_ut.toFixed(4),
        },
    ];

    const charts = [
        {
            title: "Ascendant Chart",
            chartData: Object.values(kundliData.planets).map(planet => ({
                planet_name: planet.name.english,
                degree: planet.rasi.degree,
                rasi_num: planet.rasi.rasi_num,
            })),
        },
        {
            title: "Hora Chart",
            chartData: Object.values(kundliData.planets).map(planet => ({
                planet_name: planet.name.english,
                degree: planet.divisional.hora.degree,
                rasi_num: planet.divisional.hora.rasi_num,
            })),
        },
        {
            title: "Shashthamsa Chart",
            chartData: Object.values(kundliData.planets).map(planet => ({
                planet_name: planet.name.english,
                degree: planet.divisional.shashtamsa.degree,
                rasi_num: planet.divisional.shashtamsa.rasi_num,
            })),
        },
        {
            title: "Ashthamsa Chart",
            chartData: Object.values(kundliData.planets).map(planet => ({
                planet_name: planet.name.english,
                degree: planet.divisional.ashtamsa.degree,
                rasi_num: planet.divisional.ashtamsa.rasi_num,
            })),
        },
        {
            title: "Navamsa Chart",
            chartData: Object.values(kundliData.planets).map(planet => ({
                planet_name: planet.name.english,
                degree: planet.divisional.navamsa.degree,
                rasi_num: planet.divisional.navamsa.rasi_num,
            })),
        },
    ];

    const tabs = {
        overview: { label: "Overview", icon: "📋" },
        charts: { label: "Divisional Charts", icon: "📊" },
        yoga: { label: "Yoga Analysis", icon: "✨" },
        dasa: { label: "Dasa Analysis", icon: "⏳" },
    };

    const [selectedTab, setSelectedTab] =
        useState<keyof typeof tabs>("overview");

    return (
        <div id="phaladesh-page" className="min-h-screen" style={{ background: "var(--c-bg)" }}>
            <div className="mx-auto max-w-7xl px-0 py-0 md:py-2">

                {/* ── Chart Header ── */}
                <div
                    className="mb-4 overflow-hidden rounded-2xl"
                    style={{ border: "1px solid var(--c-border-s)", boxShadow: "0 4px 20px rgba(125,27,46,0.15)" }}>
                    <div
                        className="px-4 py-4"
                        style={{ background: "linear-gradient(135deg, #D4480A 0%, #7D1B2E 100%)" }}>
                        <div className="flex items-start gap-3">
                            <button
                                onClick={() => session.updateSearchParams({ page: "Home" })}
                                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20"
                                aria-label="Go back">
                                ←
                            </button>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                                    जन्म कुंडली विश्लेषण
                                </p>
                                <h1 className="mt-0.5 text-xl font-bold text-white">
                                    {session.searchParams.user || "Guest"}
                                </h1>
                                <p className="mt-0.5 text-xs text-white/75">
                                    {fmtDate(kundliData.datetime)} • {fmtTime(kundliData.datetime)} • {session.searchParams.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick facts row */}
                    <div
                        className="grid grid-cols-2 divide-x sm:grid-cols-4"
                        style={{ background: "var(--c-warm)", borderTop: "1px solid var(--c-border)", borderColor: "var(--c-border)" }}>
                        <div className="px-3 py-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-m)" }}>वार</p>
                            <p className="text-sm font-bold" style={{ color: "var(--c-text)" }}>{kundliData.panchanga.vara.name.hindi}</p>
                        </div>
                        <div className="px-3 py-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-m)" }}>लिंग</p>
                            <p className="text-sm font-bold" style={{ color: "var(--c-text)" }}>
                                {session.searchParams.gender === "M" ? "पुरुष" : "महिला"}
                            </p>
                        </div>
                        <div className="px-3 py-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-m)" }}>सूर्योदय</p>
                            <p className="text-sm font-bold" style={{ color: "var(--c-text)" }}>{kundliData.panchanga.sunrise.dt.toFormat("hh:mm a")}</p>
                        </div>
                        <div className="px-3 py-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-m)" }}>टाइमज़ोन</p>
                            <p className="truncate text-xs font-bold" style={{ color: "var(--c-text)" }}>{session.searchParams.tznm}</p>
                        </div>
                    </div>
                </div>

                {/* ── Navigation Tabs ── */}
                <div
                    className="sticky z-10 mb-4 flex overflow-x-auto"
                    style={{ top: "var(--c-header-h, 52px)", background: "var(--c-bg)", borderBottom: "2px solid var(--c-border)" }}>
                    {Object.entries(tabs).map(([id, tab]) => (
                        <button
                            key={id}
                            onClick={() => setSelectedTab(id as keyof typeof tabs)}
                            className="flex shrink-0 items-center gap-1.5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all"
                            style={{
                                borderBottom: selectedTab === id ? "3px solid var(--c-primary)" : "3px solid transparent",
                                color: selectedTab === id ? "var(--c-primary)" : "var(--c-text-m)",
                                background: selectedTab === id ? "rgba(212,72,10,0.06)" : "transparent",
                                marginBottom: "-2px",
                            }}>
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                {selectedTab === "overview" && (
                    <div className="space-y-4">
                        {/* Primary Facts Grid */}
                        <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            {primaryFacts.map(item => (
                                <article
                                    key={item.label}
                                    className="rounded-xl px-4 py-3"
                                    style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-m)" }}>
                                        {item.label}
                                    </p>
                                    <p className="mt-0.5 text-sm font-bold" style={{ color: "var(--c-text)" }}>
                                        {item.value}
                                    </p>
                                </article>
                            ))}
                        </section>

                        {/* Ascendant Chart */}
                        <section className="rounded-2xl p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-base font-bold" style={{ color: "var(--c-maroon)" }}>Ascendant Chart — लग्न कुंडली</h2>
                                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(212,72,10,0.1)", color: "var(--c-primary)" }}>
                                    Lagna
                                </span>
                            </div>
                            <div className="flex justify-center rounded-xl p-2" style={{ background: "var(--c-warm)", border: "1px solid var(--c-border)" }}>
                                <KundliChartSVG chartData={charts[0].chartData} chartSetting={{ width: 300, height: 300 }} />
                            </div>
                        </section>

                        {/* Information Chart */}
                        <section className="rounded-2xl p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-base font-bold" style={{ color: "var(--c-maroon)" }}>ग्रह स्थिति — Planet Positions</h2>
                                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "var(--c-warm)", color: "var(--c-text-m)", border: "1px solid var(--c-border)" }}>
                                    Graha
                                </span>
                            </div>
                            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--c-border)" }}>
                                <ChartInfoTable grahaData={kundliData.planets} />
                            </div>
                        </section>
                    </div>
                )}

                {selectedTab === "charts" && (
                    <div className="space-y-4">
                        <section className="rounded-2xl p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                            <h2 className="mb-4 text-base font-bold" style={{ color: "var(--c-maroon)" }}>विभागीय चार्ट — Divisional Charts</h2>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {charts.map(chart => (
                                    <article key={chart.title} className="rounded-xl p-3" style={{ background: "var(--c-warm)", border: "1px solid var(--c-border)" }}>
                                        <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--c-text)" }}>{chart.title}</h3>
                                        <div className="flex justify-center overflow-x-auto rounded-lg p-2" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                                            <KundliChartSVG chartData={chart.chartData} chartSetting={{ width: 260, height: 260 }} />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {selectedTab === "yoga" && (
                    <div>
                        <section className="rounded-2xl p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                            <KundliYogPhala kundliData={kundliData} />
                        </section>
                    </div>
                )}

                {selectedTab === "dasa" && (
                    <div>
                        <section className="rounded-2xl p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                            <VimsottariDasa kundliData={kundliData} />
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
