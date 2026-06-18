import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { useLang } from "src/i18n";
import { getPanchanga } from "src/services/calcPanchanga";

const TAB_ICONS = {
    overview: "📋",
    timings: "⏰",
    planetary: "🪐",
    muhurat: "⭐",
};

export default function Panchang() {
    const session = useSessionContext();
    const { t } = useLang();

    const panchanga = useMemo(
        () =>
            getPanchanga(
                DateTime.fromISO(session.searchParams.date, {
                    zone: session.searchParams.tznm,
                }) as DateTime<true>,
                session.searchParams.lon,
                session.searchParams.lat
            ),
        [
            session.searchParams.date,
            session.searchParams.lat,
            session.searchParams.lon,
            session.searchParams.tznm,
        ]
    );

    const tabs = [
        {
            id: "overview",
            label: t("panchangOverview"),
            icon: TAB_ICONS.overview,
        },
        { id: "timings", label: t("timings"), icon: TAB_ICONS.timings },
        { id: "planetary", label: t("planetary"), icon: TAB_ICONS.planetary },
        { id: "muhurat", label: t("muhurat"), icon: TAB_ICONS.muhurat },
    ] as const;

    const [selectedTab, setSelectedTab] = useState<
        "overview" | "timings" | "planetary" | "muhurat"
    >("overview");

    if (!panchanga) return <Loader />;

    return (
        <div className="min-h-screen" style={{ background: "var(--c-bg)" }}>
            {/* Page Header */}
            <div
                className="mb-4 overflow-hidden rounded-2xl px-4 py-4"
                style={{
                    background:
                        "linear-gradient(135deg, #D4480A 0%, #7D1B2E 100%)",
                    boxShadow: "0 4px 20px rgba(212,72,10,0.28)",
                }}>
                <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                    दैनिक
                </p>
                <h1 className="mt-0.5 text-xl font-bold text-white">
                    {t("dailyPanchang")}
                </h1>
                <p className="mt-0.5 text-xs text-white/70">
                    {panchanga.datetime.toFormat("dd MMMM yyyy")} •{" "}
                    {session.searchParams.city}
                </p>
            </div>

            {/* Tabs */}
            <div
                className="sticky z-10 mb-4 flex overflow-x-auto rounded-xl"
                style={{
                    top: "var(--c-header-h, 52px)",
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className="flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-xs font-semibold whitespace-nowrap transition-all"
                        style={{
                            borderBottom:
                                selectedTab === tab.id
                                    ? "3px solid var(--c-primary)"
                                    : "3px solid transparent",
                            color:
                                selectedTab === tab.id
                                    ? "var(--c-primary)"
                                    : "var(--c-text-m)",
                            background:
                                selectedTab === tab.id
                                    ? "rgba(212,72,10,0.06)"
                                    : "transparent",
                        }}>
                        <span className="text-base">{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ── Overview ── */}
            {selectedTab === "overview" && (
                <div className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                        {/* Panchang Elements */}
                        <div
                            className="rounded-2xl p-4"
                            style={{
                                background: "var(--c-surface)",
                                border: "1px solid var(--c-border)",
                            }}>
                            <h3
                                className="mb-4 flex items-center gap-2 text-base font-bold"
                                style={{ color: "var(--c-maroon)" }}>
                                <span>✨</span> पंचांग तत्व
                            </h3>
                            <div className="space-y-3">
                                {[
                                    {
                                        label: "तिथि (Tithi)",
                                        name: panchanga.tithi.name.hindi,
                                        en: panchanga.tithi.name.english,
                                        color: "#D97706",
                                        bg: "#FFFBEB",
                                        time: `${panchanga.tithi.start.dt.toFormat("hh:mm a")} → ${panchanga.tithi.end.dt.toFormat("hh:mm a")}`,
                                    },
                                    {
                                        label: "नक्षत्र (Nakshatra)",
                                        name: panchanga.nakshatra.name.hindi,
                                        en: panchanga.nakshatra.name.english,
                                        color: "#16A34A",
                                        bg: "#ECFDF5",
                                        time: `→ ${panchanga.nakshatra.end.dt.toFormat("dd MMM hh:mm a")}`,
                                    },
                                    {
                                        label: "योग (Yoga)",
                                        name: panchanga.yoga.name.hindi,
                                        en: panchanga.yoga.name.english,
                                        color: "#2563EB",
                                        bg: "#EFF6FF",
                                        time: `→ ${panchanga.yoga.end.dt.toFormat("dd MMM hh:mm a")}`,
                                    },
                                    {
                                        label: "करण (Karana)",
                                        name: panchanga.karana.name.hindi,
                                        en: panchanga.karana.name.english,
                                        color: "#7D1B2E",
                                        bg: "#FFF5F7",
                                        time: `→ ${panchanga.karana.end.dt.toFormat("dd MMM hh:mm a")}`,
                                    },
                                ].map(item => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between rounded-xl p-3"
                                        style={{
                                            background: item.bg,
                                            borderLeft: `4px solid ${item.color}`,
                                        }}>
                                        <div>
                                            <p
                                                className="text-[10px] font-semibold tracking-wider uppercase"
                                                style={{ color: item.color }}>
                                                {item.label}
                                            </p>
                                            <p
                                                className="text-base font-bold"
                                                style={{ color: item.color }}>
                                                {item.name}
                                            </p>
                                            <p
                                                className="text-xs"
                                                style={{
                                                    color: "var(--c-text-m)",
                                                }}>
                                                {item.en}
                                            </p>
                                        </div>
                                        <p
                                            className="text-right text-[10px]"
                                            style={{ color: item.color }}>
                                            {item.time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Info */}
                        <div className="space-y-4">
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: "var(--c-surface)",
                                    border: "1px solid var(--c-border)",
                                }}>
                                <h3
                                    className="mb-3 flex items-center gap-2 text-base font-bold"
                                    style={{ color: "var(--c-maroon)" }}>
                                    <span>📅</span> कैलेंडर जानकारी
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div
                                        className="rounded-xl p-3 text-center"
                                        style={{
                                            background: "rgba(212,72,10,0.08)",
                                            border: "1px solid rgba(212,72,10,0.2)",
                                        }}>
                                        <p
                                            className="text-xs font-semibold"
                                            style={{
                                                color: "var(--c-primary)",
                                            }}>
                                            तिथि
                                        </p>
                                        <p
                                            className="text-lg font-bold"
                                            style={{
                                                color: "var(--c-primary)",
                                            }}>
                                            {panchanga.datetime.toFormat(
                                                "dd MMM"
                                            )}
                                        </p>
                                        <p
                                            className="text-xs"
                                            style={{
                                                color: "var(--c-text-m)",
                                            }}>
                                            {panchanga.datetime.toFormat(
                                                "hh:mm a"
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1.5">
                                        {[
                                            {
                                                k: "माह",
                                                v: panchanga.masa.name.hindi,
                                            },
                                            {
                                                k: "पक्ष",
                                                v: panchanga.tithi.paksha_name
                                                    .hindi,
                                            },
                                            {
                                                k: "वार",
                                                v: panchanga.vara.name.hindi,
                                            },
                                        ].map(r => (
                                            <div
                                                key={r.k}
                                                className="flex justify-between rounded-lg px-3 py-1.5 text-xs"
                                                style={{
                                                    background: "var(--c-warm)",
                                                    border: "1px solid var(--c-border)",
                                                }}>
                                                <span
                                                    style={{
                                                        color: "var(--c-text-m)",
                                                    }}>
                                                    {r.k}
                                                </span>
                                                <span
                                                    className="font-semibold"
                                                    style={{
                                                        color: "var(--c-text)",
                                                    }}>
                                                    {r.v}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: "var(--c-surface)",
                                    border: "1px solid var(--c-border)",
                                }}>
                                <h3
                                    className="mb-3 text-base font-bold"
                                    style={{ color: "var(--c-maroon)" }}>
                                    संवत्सर
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        {
                                            k: "विक्रम संवत",
                                            v: `${panchanga.samvatsara.vikrama_samvat}  ${panchanga.samvatsara.name.hindi}`,
                                            c: "var(--c-primary)",
                                        },
                                        {
                                            k: "शक संवत",
                                            v: String(
                                                panchanga.samvatsara.saka_samvat
                                            ),
                                            c: "var(--c-maroon)",
                                        },
                                        {
                                            k: "कलि युग",
                                            v: String(
                                                panchanga.samvatsara.kali
                                            ),
                                            c: "var(--c-gold)",
                                        },
                                    ].map(r => (
                                        <div
                                            key={r.k}
                                            className="flex items-center justify-between rounded-xl p-3 text-sm"
                                            style={{
                                                background: "var(--c-warm)",
                                                border: "1px solid var(--c-border)",
                                            }}>
                                            <span
                                                style={{
                                                    color: "var(--c-text-2)",
                                                }}>
                                                {r.k}
                                            </span>
                                            <span
                                                className="font-bold"
                                                style={{ color: r.c }}>
                                                {r.v}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Timings ── */}
            {selectedTab === "timings" && (
                <div className="grid gap-4 lg:grid-cols-2">
                    <div
                        className="rounded-2xl p-4"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <h3
                            className="mb-4 flex items-center gap-2 text-base font-bold"
                            style={{ color: "var(--c-maroon)" }}>
                            <span>🌅</span> सूर्य और चंद्र उदय / अस्त
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    icon: "☀️",
                                    label: "Sunrise / सूर्योदय",
                                    val: panchanga.sunrise.dt.toFormat(
                                        "hh:mm a"
                                    ),
                                    color: "#D97706",
                                    bg: "#FFFBEB",
                                },
                                {
                                    icon: "🌇",
                                    label: "Sunset / सूर्यास्त",
                                    val: panchanga.sunset.dt.toFormat(
                                        "hh:mm a"
                                    ),
                                    color: "#EA580C",
                                    bg: "#FFF7ED",
                                },
                                {
                                    icon: "🌙",
                                    label: "Moonrise / चंद्रोदय",
                                    val: panchanga.moonrise.dt.toFormat(
                                        "hh:mm a"
                                    ),
                                    color: "#4F46E5",
                                    bg: "#EEF2FF",
                                },
                                {
                                    icon: "🌑",
                                    label: "Moonset / चंद्रास्त",
                                    val: panchanga.moonset.dt.toFormat(
                                        "hh:mm a"
                                    ),
                                    color: "#64748B",
                                    bg: "#F8FAFC",
                                },
                            ].map(item => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3 rounded-xl p-3"
                                    style={{
                                        background: item.bg,
                                        border: `1px solid ${item.color}33`,
                                    }}>
                                    <span className="text-2xl">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p
                                            className="text-[9px] font-semibold uppercase"
                                            style={{ color: item.color }}>
                                            {item.label}
                                        </p>
                                        <p
                                            className="text-sm font-bold"
                                            style={{ color: item.color }}>
                                            {item.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="rounded-2xl p-4"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <h3
                            className="mb-4 flex items-center gap-2 text-base font-bold"
                            style={{ color: "var(--c-maroon)" }}>
                            <span>⏱️</span> दिन और रात की अवधि
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    label: "Day Duration",
                                    val: panchanga.kalavelas.day_duration,
                                    color: "var(--c-primary)",
                                    bg: "rgba(212,72,10,0.07)",
                                },
                                {
                                    label: "Night Duration",
                                    val: panchanga.kalavelas.night_duration,
                                    color: "var(--c-maroon)",
                                    bg: "rgba(125,27,46,0.07)",
                                },
                            ].map(item => (
                                <div
                                    key={item.label}
                                    className="rounded-xl p-4 text-center"
                                    style={{ background: item.bg }}>
                                    <p
                                        className="text-xs font-semibold"
                                        style={{ color: item.color }}>
                                        {item.label}
                                    </p>
                                    <p
                                        className="mt-1 text-2xl font-bold"
                                        style={{ color: item.color }}>
                                        {item.val.split(" ")[0]}
                                    </p>
                                    <p
                                        className="text-xs"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {item.val.split(" ").slice(1).join(" ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Planetary ── */}
            {selectedTab === "planetary" && (
                <div
                    className="rounded-2xl p-4"
                    style={{
                        background: "var(--c-surface)",
                        border: "1px solid var(--c-border)",
                    }}>
                    <h3
                        className="mb-4 flex items-center gap-2 text-base font-bold"
                        style={{ color: "var(--c-maroon)" }}>
                        <span>🪐</span> ग्रह स्थिति (Planetary Positions)
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                        {[
                            {
                                icon: "☉",
                                label: "Sun / सूर्य",
                                name: panchanga.sun_rashi.name,
                                color: "#D97706",
                            },
                            {
                                icon: "☽",
                                label: "Moon / चंद्र",
                                name: panchanga.moon_rashi.name,
                                color: "#4F46E5",
                            },
                        ].map(item => (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 rounded-xl p-4"
                                style={{
                                    background: "var(--c-warm)",
                                    border: "1px solid var(--c-border)",
                                }}>
                                <span
                                    className="text-3xl"
                                    style={{ color: item.color }}>
                                    {item.icon}
                                </span>
                                <div>
                                    <p
                                        className="text-[10px] font-semibold tracking-wider uppercase"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {item.label}
                                    </p>
                                    <p
                                        className="text-base font-bold"
                                        style={{ color: item.color }}>
                                        {item.name.hindi}
                                    </p>
                                    <p
                                        className="text-xs"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {item.name.english}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Muhurat ── */}
            {selectedTab === "muhurat" && (
                <div
                    className="rounded-2xl p-4"
                    style={{
                        background: "var(--c-surface)",
                        border: "1px solid var(--c-border)",
                    }}>
                    <h3
                        className="mb-4 flex items-center gap-2 text-base font-bold"
                        style={{ color: "var(--c-maroon)" }}>
                        <span>⭐</span> शुभ / अशुभ मुहूर्त
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: "var(--c-green-bg)",
                                border: "1px solid var(--c-green)",
                            }}>
                            <p
                                className="mb-3 flex items-center gap-1.5 font-semibold"
                                style={{ color: "var(--c-green)" }}>
                                <span>✨</span> शुभ मुहूर्त
                            </p>
                            {[
                                {
                                    name: "Abhijit Muhurat",
                                    time: "12:00 PM – 12:45 PM",
                                },
                                {
                                    name: "Brahma Muhurat",
                                    time: "04:30 AM – 05:15 AM",
                                },
                            ].map(m => (
                                <div
                                    key={m.name}
                                    className="mb-2 flex items-center justify-between rounded-lg border border-white bg-white p-2.5 text-sm shadow-sm">
                                    <span style={{ color: "var(--c-text)" }}>
                                        {m.name}
                                    </span>
                                    <span
                                        className="font-semibold"
                                        style={{ color: "var(--c-green)" }}>
                                        {m.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: "#FFF5F5",
                                border: "1px solid #DC2626",
                            }}>
                            <p className="mb-3 flex items-center gap-1.5 font-semibold text-red-700">
                                <span>⚠️</span> अशुभ मुहूर्त
                            </p>
                            {[
                                {
                                    name: "Rahu Kalam",
                                    time: `${panchanga.rahu_kalam.start} – ${panchanga.rahu_kalam.end}`,
                                },
                                {
                                    name: "Yamaganda Kalam",
                                    time: "09:00 AM – 10:30 AM",
                                },
                            ].map(m => (
                                <div
                                    key={m.name}
                                    className="mb-2 flex items-center justify-between rounded-lg border border-white bg-white p-2.5 text-sm shadow-sm">
                                    <span style={{ color: "var(--c-text)" }}>
                                        {m.name}
                                    </span>
                                    <span className="font-semibold text-red-600">
                                        {m.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
