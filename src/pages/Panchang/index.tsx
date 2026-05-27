import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { FaCalendar, FaClock, FaGlobe, FaStar } from "react-icons/fa";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { getPanchanga } from "src/services/calcPanchanga";

export default function Panchang() {
    const session = useSessionContext();
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

    const tabs = {
        overview: {
            label: "Overview",
            icon: FaCalendar,
        },
        timings: { label: "Timings", icon: FaClock },
        planetary: {
            label: "Planetary",
            icon: FaGlobe,
        },
        muhurat: { label: "Muhurat", icon: FaStar },
    };

    const [selectedTab, setSelectedTab] =
        useState<keyof typeof tabs>("overview");

    if (!panchanga) {
        return <Loader />;
    }
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Tabs */}
            <div className="sticky top-16 z-10 border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex space-x-1 overflow-x-auto">
                        {Object.entries(tabs).map(([id, tab]) => (
                            <button
                                key={id}
                                onClick={() => setSelectedTab(id)}
                                className={`flex items-center space-x-2 rounded-t-2xl border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                                    selectedTab === id
                                        ? "border-sky-600 bg-sky-50 text-sky-700"
                                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}>
                                <tab.icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6">
                {/* Overview Tab */}
                {selectedTab === "overview" && (
                    <div className="space-y-6">
                        {/* Main Panchang Elements */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Panchang Elements Card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-6 flex items-center text-xl font-bold text-slate-900">
                                    <span className="mr-3 text-2xl">✨</span>
                                    पंचांग तत्व (Panchang Elements)
                                </h3>

                                <div className="space-y-4">
                                    {/* Tithi */}
                                    <div className="rounded-2xl border-l-4 border-amber-400 bg-linear-to-r from-amber-50 to-orange-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-amber-700">
                                                    तिथि (Tithi)
                                                </div>
                                                <div className="text-lg font-bold text-amber-600">
                                                    {panchanga.tithi.name.hindi}
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    {
                                                        panchanga.tithi.name
                                                            .english
                                                    }{" "}
                                                    •{" "}
                                                    {
                                                        panchanga.tithi
                                                            .paksha_name.english
                                                    }
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-xs text-amber-500">
                                                        Start:{" "}
                                                        {panchanga.tithi.start.dt.toFormat(
                                                            "dd MMM yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-amber-500">
                                                        End:{" "}
                                                        {panchanga.tithi.end.dt.toFormat(
                                                            "dd MMM yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-t border-amber-200 pt-3 text-sm">
                                            <div className="mt-2 text-xs text-slate-600">
                                                Lunar phase:{" "}
                                                {Math.round(
                                                    panchanga.tithi.lunarphase
                                                )}
                                                °
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nakshatra */}
                                    <div className="rounded-2xl border-l-4 border-emerald-400 bg-linear-to-r from-emerald-50 to-teal-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-emerald-700">
                                                    नक्षत्र (Nakshatra)
                                                </div>
                                                <div className="text-lg font-bold text-emerald-600">
                                                    {
                                                        panchanga.nakshatra.name
                                                            .hindi
                                                    }
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    {
                                                        panchanga.nakshatra.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-emerald-500">
                                                    {panchanga.nakshatra.end.dt.toFormat(
                                                        "dd MMM yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-t border-emerald-200 pt-3 text-sm">
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <span>
                                                    Lord:{" "}
                                                    {panchanga.nakshatra.lord}
                                                </span>
                                                <span>
                                                    Symbol:{" "}
                                                    {
                                                        panchanga.nakshatra.name
                                                            .hindi
                                                    }
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-600">
                                                Duration:{" "}
                                                {panchanga.nakshatra.start.dt.toFormat(
                                                    "dd MMM yyyy hh:mm a"
                                                )}{" "}
                                                -{" "}
                                                {panchanga.nakshatra.end.dt.toFormat(
                                                    "dd MMM yyyy hh:mm a"
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Yoga */}
                                    <div className="rounded-2xl border-l-4 border-sky-400 bg-linear-to-r from-sky-50 to-blue-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-sky-700">
                                                    योग (Yoga)
                                                </div>
                                                <div className="text-lg font-bold text-sky-600">
                                                    {panchanga.yoga.name.hindi}
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    {
                                                        panchanga.yoga.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-sky-500">
                                                    {panchanga.yoga.end.dt.toFormat(
                                                        "dd MMM yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Karana */}
                                    <div className="rounded-2xl border-l-4 border-rose-400 bg-linear-to-r from-rose-50 to-pink-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-rose-700">
                                                    करण (Karana)
                                                </div>
                                                <div className="text-lg font-bold text-rose-600">
                                                    {
                                                        panchanga.karana.name
                                                            .hindi
                                                    }
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    {
                                                        panchanga.karana.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-rose-500">
                                                    {panchanga.karana.end.dt.toFormat(
                                                        "dd MMM yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Information */}
                            <div className="space-y-6">
                                {/* Date Info Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-4 flex items-center text-xl font-bold text-slate-900">
                                        <span className="mr-3 text-2xl">
                                            📅
                                        </span>
                                        कैलेंडर जानकारी (Calendar Info)
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-center">
                                            <div className="mb-2 text-sm font-semibold text-sky-600">
                                                Date & Time
                                            </div>
                                            <div className="text-lg font-bold text-sky-700">
                                                {panchanga.datetime.toFormat(
                                                    "dd MMM"
                                                )}
                                            </div>
                                            <div className="mt-1 text-xs text-sky-500">
                                                {panchanga.datetime.toFormat(
                                                    "hh:mm a"
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                                                <span className="text-slate-600">
                                                    Hindu Month:
                                                </span>
                                                <span className="font-semibold text-slate-900">
                                                    {
                                                        panchanga.masa.name
                                                            .english
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                                                <span className="text-slate-600">
                                                    Paksha:
                                                </span>
                                                <span className="font-semibold text-slate-900">
                                                    {
                                                        panchanga.tithi
                                                            .paksha_name.english
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                                                <span className="text-slate-600">
                                                    Season:
                                                </span>
                                                <span className="font-semibold text-slate-900">
                                                    Varsha (Monsoon)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Samvat Info */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-4 text-lg font-bold text-slate-900">
                                        संवत्सर (Era Years)
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center justify-between rounded-xl border border-amber-100 bg-linear-to-r from-amber-50 to-orange-50 p-4">
                                            <span className="font-medium text-slate-700">
                                                Vikrama Samvat:
                                            </span>
                                            <span className="font-bold text-amber-600">
                                                {
                                                    panchanga.samvatsara
                                                        .vikrama_samvat
                                                }
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-linear-to-r from-emerald-50 to-teal-50 p-4">
                                            <span className="font-medium text-slate-700">
                                                Shaka Samvat:
                                            </span>
                                            <span className="font-bold text-emerald-600">
                                                {
                                                    panchanga.samvatsara
                                                        .saka_samvat
                                                }
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-linear-to-r from-sky-50 to-cyan-50 p-4">
                                            <span className="font-medium text-slate-700">
                                                Kali Yuga:
                                            </span>
                                            <span className="font-bold text-sky-600">
                                                {panchanga.samvatsara.kali}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Timings Tab */}
                {selectedTab === "timings" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Sunrise/Sunset Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-slate-900">
                                <span className="mr-3 text-2xl">🌅</span>
                                सूर्य और चंद्र उदय/अस्त (Sun & Moon Timings)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center space-x-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                                    <span className="text-3xl">☀️</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Sunrise
                                        </div>
                                        <div className="text-lg font-bold text-amber-600">
                                            {panchanga.sunrise.dt.toFormat(
                                                "hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                    <span className="text-3xl">🌇</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Sunset
                                        </div>
                                        <div className="text-lg font-bold text-orange-600">
                                            {panchanga.sunset.dt.toFormat(
                                                "hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                                    <span className="text-3xl">🌙</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Moonrise
                                        </div>
                                        <div className="text-lg font-bold text-indigo-600">
                                            {panchanga.moonrise.dt.toFormat(
                                                "hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <span className="text-3xl">🌑</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Moonset
                                        </div>
                                        <div className="text-lg font-bold text-slate-700">
                                            {panchanga.moonset.dt.toFormat(
                                                "hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Day/Night Duration Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-slate-900">
                                <span className="mr-3 text-2xl">⏱️</span>
                                दिन और रात की अवधि (Day & Night Duration)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-center">
                                    <div className="text-sm text-slate-600">
                                        Day Duration
                                    </div>
                                    <div className="mt-2 text-3xl font-bold text-amber-600">
                                        {
                                            panchanga.kalavelas.day_duration.split(
                                                " "
                                            )[0]
                                        }
                                    </div>
                                    <div className="text-sm text-amber-500">
                                        {
                                            panchanga.kalavelas.day_duration.split(
                                                " "
                                            )[1]
                                        }
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-center">
                                    <div className="text-sm text-slate-600">
                                        Night Duration
                                    </div>
                                    <div className="mt-2 text-3xl font-bold text-sky-600">
                                        {
                                            panchanga.kalavelas.night_duration.split(
                                                " "
                                            )[0]
                                        }
                                    </div>
                                    <div className="text-sm text-sky-500">
                                        {
                                            panchanga.kalavelas.night_duration.split(
                                                " "
                                            )[1]
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Planetary Tab */}
                {selectedTab === "planetary" && (
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-slate-900">
                                <span className="mr-3 text-2xl">🪐</span>
                                ग्रह स्थिति (Planetary Positions)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Sun Info */}
                                <div className="flex items-center space-x-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                                    <span className="text-3xl">☀️</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Sun Sign
                                        </div>
                                        <div className="text-lg font-bold text-amber-600">
                                            {panchanga.sun_rashi.name.english}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            ({panchanga.sun_rashi.name.hindi})
                                        </div>
                                    </div>
                                </div>
                                {/* Moon Info */}
                                <div className="flex items-center space-x-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                                    <span className="text-3xl">🌙</span>
                                    <div>
                                        <div className="text-sm text-slate-600">
                                            Moon Sign
                                        </div>
                                        <div className="text-lg font-bold text-indigo-600">
                                            {panchanga.moon_rashi.name.english}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            ({panchanga.moon_rashi.name.hindi})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Muhurat Tab */}
                {selectedTab === "muhurat" && (
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-slate-900">
                                <span className="mr-3 text-2xl">⭐</span>
                                शुभ/अशुभ मुहूर्त (Auspicious/Inauspicious
                                Timings)
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Auspicious timings (Example - Abhijit) */}
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                                    <div className="mb-3 flex items-center space-x-2 font-semibold text-emerald-700">
                                        <span>✨</span>
                                        <span>Shubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                                            <span className="text-slate-700">
                                                Abhijit Muhurat
                                            </span>
                                            <span className="font-medium text-emerald-600">
                                                12:00 PM - 12:45 PM
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                                            <span className="text-slate-700">
                                                Brahma Muhurat
                                            </span>
                                            <span className="font-medium text-emerald-600">
                                                04:30 AM - 05:15 AM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Inauspicious timings (Example - Rahu Kalam) */}
                                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                                    <div className="mb-3 flex items-center space-x-2 font-semibold text-rose-700">
                                        <span>⚠️</span>
                                        <span>Ashubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-xl border border-rose-100 bg-white p-3 shadow-sm">
                                            <span className="text-slate-700">
                                                Rahu Kalam
                                            </span>
                                            <span className="font-medium text-rose-600">
                                                {panchanga.rahu_kalam.start} -{" "}
                                                {panchanga.rahu_kalam.end}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border border-rose-100 bg-white p-3 shadow-sm">
                                            <span className="text-slate-700">
                                                Yamaganda Kalam
                                            </span>
                                            <span className="font-medium text-rose-600">
                                                09:00 AM - 10:30 AM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
