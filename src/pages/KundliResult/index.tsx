import { DateTime } from "luxon";
import { useState } from "react";
import ChartInfoTable from "src/components/ChartInfoTable";
import KundliChartSVG from "src/components/KundliChartSVG";
import KundliYogPhala from "src/components/KundliYogPhala";
import VimsottariDasa from "src/components/VimsottariDasa";
import { useSessionContext } from "src/contexts/SessionContext";
import { Kundli } from "src/services/Kundli";
import { DMS } from "src/services/utils";

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
        <div id="phaladesh-page" className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
                <header className="relative overflow-hidden rounded-3xl border-2 border-sky-100 bg-linear-to-br from-sky-50 via-white to-slate-50 p-0 shadow-[0_16px_60px_-12px_rgba(14,116,144,0.35)]">
                    {/* Animated background elements */}
                    <div className="pointer-events-none absolute -top-32 -right-12 h-64 w-64 animate-pulse rounded-full bg-sky-200/25 blur-3xl" />
                    <div
                        className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 animate-pulse rounded-full bg-cyan-200/20 blur-3xl"
                        style={{ animationDelay: "1s" }}
                    />
                    <div className="pointer-events-none absolute top-1/2 right-1/4 h-40 w-40 rounded-full bg-blue-200/15 blur-2xl" />

                    {/* Top accent line */}
                    <div className="h-1 bg-linear-to-r from-sky-400 via-blue-500 to-cyan-400" />

                    <div className="relative space-y-5 p-6 md:p-8">
                        {/* Title Section */}
                        <div className="flex flex-wrap items-start gap-4 md:items-center md:justify-between">
                            <div className="flex items-start gap-4">
                                <button
                                    onClick={() =>
                                        session.updateSearchParams({
                                            page: "Home",
                                        })
                                    }
                                    className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-sky-200 bg-white text-lg text-sky-700 shadow-sm transition hover:-translate-x-1 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
                                    aria-label="Go back to home page">
                                    ←
                                </button>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🔮</span>
                                        <p className="text-xs font-semibold tracking-widest text-sky-600 uppercase">
                                            Your Cosmic Blueprint
                                        </p>
                                    </div>
                                    <h1 className="bg-gradient-to-r from-sky-700 via-blue-600 to-cyan-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
                                        जन्म कुंडली विश्लेषण
                                    </h1>
                                    <p className="text-sm font-medium text-slate-500">
                                        Complete astrological birth chart
                                        analysis
                                    </p>
                                </div>
                            </div>

                            {/* Right side visual element */}
                            <div className="hidden flex-col items-center justify-center space-y-1 lg:flex">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                                            style={{ opacity: 0.5 + i * 0.1 }}
                                        />
                                    ))}
                                </div>
                                <div className="text-xs font-medium text-slate-400">
                                    Premium Analysis
                                </div>
                            </div>
                        </div>

                        {/* Divider with pattern */}
                        <div className="relative h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

                        {/* Key Information Grid */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Name Card */}
                            <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                            👤 Name
                                        </p>
                                        <p className="mt-1.5 truncate text-lg font-bold text-slate-900">
                                            {session.searchParams.user ||
                                                "Guest"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Gender Card */}
                            <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-purple-50/80 to-white p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                            ⚣ Gender
                                        </p>
                                        <p className="mt-1.5 text-lg font-bold text-slate-900">
                                            {session.searchParams.gender === "M"
                                                ? "पुरुष"
                                                : "महिला"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="group col-span-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-orange-50/80 to-white p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md sm:col-span-2 lg:col-span-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                            📍 Location
                                        </p>
                                        <p className="mt-1.5 truncate text-sm font-bold text-slate-900">
                                            {session.searchParams.city}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Time Card */}
                            <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-green-50/80 to-white p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:col-span-2 lg:col-span-1">
                                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    🕐 Birth Time
                                </p>
                                <p className="mt-1.5 truncate text-sm font-bold text-slate-900">
                                    {kundliData.datetime.toFormat(
                                        "dd LLL yyyy"
                                    )}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-slate-600">
                                    {kundliData.datetime.toFormat("hh:mm a")}
                                </p>
                            </div>
                        </div>

                        {/* Bottom info chips */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50/60 px-3.5 py-1.5 text-xs font-semibold text-sky-700 backdrop-blur-sm">
                                <span>⏰</span>
                                {session.searchParams.tznm}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-cyan-50/60 px-3.5 py-1.5 text-xs font-semibold text-cyan-700 backdrop-blur-sm">
                                <span>🌍</span>
                                {session.searchParams.lat.toFixed(2)}°,{" "}
                                {session.searchParams.lon.toFixed(2)}°
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/60 px-3.5 py-1.5 text-xs font-semibold text-amber-700 backdrop-blur-sm">
                                <span>✨</span>
                                Premium Report
                            </span>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
                </header>

                {/* Navigation Tabs */}
                <div className="sticky top-16 z-10 mt-6 border-b border-slate-200 bg-white">
                    <div className="flex space-x-1 overflow-x-auto">
                        {Object.entries(tabs).map(([id, tab]) => (
                            <button
                                key={id}
                                onClick={() =>
                                    setSelectedTab(id as keyof typeof tabs)
                                }
                                className={`flex items-center space-x-2 rounded-t-2xl border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                                    selectedTab === id
                                        ? "border-sky-600 bg-sky-50 text-sky-700"
                                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}>
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {selectedTab === "overview" && (
                    <div className="space-y-6 py-6">
                        {/* Primary Facts */}
                        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {primaryFacts.map(item => (
                                <article
                                    key={item.label}
                                    className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {item.value}
                                    </p>
                                </article>
                            ))}
                        </section>

                        {/* Ascendant Chart */}
                        <section className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.7)] md:p-6">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                                    Ascendant Chart
                                </h2>
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                    Lagna View
                                </span>
                            </div>
                            <div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                <KundliChartSVG
                                    chartData={charts[0].chartData}
                                    chartSetting={{
                                        width: 300,
                                        height: 300,
                                    }}
                                />
                            </div>
                        </section>

                        {/* Information Chart */}
                        <section className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.7)] md:p-6">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                                    Information Chart
                                </h2>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                    Graha Summary
                                </span>
                            </div>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <ChartInfoTable
                                    grahaData={kundliData.planets}
                                />
                            </div>
                        </section>
                    </div>
                )}

                {selectedTab === "charts" && (
                    <div className="space-y-6 py-6">
                        <section className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.7)] md:p-6">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                                    Birth Charts
                                </h2>
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                    Divisional Views
                                </span>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {charts.map(chart => (
                                    <article
                                        key={chart.title}
                                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                        <h3 className="mb-3 text-base font-semibold text-slate-800">
                                            {chart.title}
                                        </h3>
                                        <div className="flex justify-center overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                                            <KundliChartSVG
                                                chartData={chart.chartData}
                                                chartSetting={{
                                                    width: 270,
                                                    height: 270,
                                                }}
                                            />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {selectedTab === "yoga" && (
                    <div className="space-y-6 py-6">
                        <section className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.7)] md:p-6">
                            <KundliYogPhala kundliData={kundliData} />
                        </section>
                    </div>
                )}

                {selectedTab === "dasa" && (
                    <div className="space-y-6 py-6">
                        <section className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.7)] md:p-6">
                            <VimsottariDasa kundliData={kundliData} />
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
