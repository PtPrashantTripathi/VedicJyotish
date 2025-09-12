import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import {
    FaCalendar,
    FaClock,
    FaGlobe,
    FaMoon,
    FaStar,
    FaSun,
} from "react-icons/fa";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { getPanchanga } from "src/services/calcPanchanga";

export default function Panchang() {
    const session = useSessionContext();
    const panchanga = useMemo(
        () =>
            getPanchanga(
                DateTime.fromISO(session.data.date, {
                    zone: session.data.tznm,
                }) as DateTime<true>,
                session.data.lon,
                session.data.lat
            ),
        [
            session.data.date,
            session.data.lat,
            session.data.lon,
            session.data.tznm,
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Navigation Tabs */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex space-x-8 overflow-x-auto">
                        {Object.entries(tabs).map(([id, tab]) => (
                            <button
                                key={id}
                                onClick={() => setSelectedTab(id)}
                                className={`flex items-center space-x-2 border-b-2 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                    selectedTab === id
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
                            <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-lg">
                                <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                                    <FaStar className="mr-2 h-5 w-5 text-purple-600" />
                                    पंचांग तत्व (Panchang Elements)
                                </h3>

                                <div className="space-y-4">
                                    {/* Tithi */}
                                    <div className="rounded-lg border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-orange-700">
                                                    तिथि (Tithi)
                                                </div>
                                                <div className="text-lg font-bold text-orange-600">
                                                    {panchanga.tithi.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
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
                                                    <span className="text-xs text-orange-500">
                                                        Start:{" "}
                                                        {panchanga.tithi.start.dt.toFormat(
                                                            "dd MMM yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-orange-500">
                                                        End:{" "}
                                                        {panchanga.tithi.end.dt.toFormat(
                                                            "dd MMM yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-t border-orange-200 pt-3 text-sm">
                                            <div className="mt-2 text-xs text-gray-600">
                                                Lunar phase:{" "}
                                                {Math.round(
                                                    panchanga.tithi.lunarphase
                                                )}
                                                °
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nakshatra */}
                                    <div className="rounded-lg border-l-4 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-green-700">
                                                    नक्षत्र (Nakshatra)
                                                </div>
                                                <div className="text-lg font-bold text-green-600">
                                                    {
                                                        panchanga.nakshatra.name
                                                            .hindi
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        panchanga.nakshatra.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-green-500">
                                                    {panchanga.nakshatra.end.dt.toFormat(
                                                        "dd MMM yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-t border-green-200 pt-3 text-sm">
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
                                            <div className="mt-1 text-xs text-gray-600">
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
                                    <div className="rounded-lg border-l-4 border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-blue-700">
                                                    योग (Yoga)
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    {panchanga.yoga.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        panchanga.yoga.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-blue-500">
                                                    {panchanga.yoga.end.dt.toFormat(
                                                        "dd MMM yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Karana */}
                                    <div className="rounded-lg border-l-4 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-red-700">
                                                    करण (Karana)
                                                </div>
                                                <div className="text-lg font-bold text-red-600">
                                                    {
                                                        panchanga.karana.name
                                                            .hindi
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        panchanga.karana.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="mt-1 text-xs text-red-500">
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
                                <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
                                    <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                        <FaCalendar className="mr-2 h-5 w-5 text-blue-600" />
                                        कैलेंडर जानकारी (Calendar Info)
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-purple-50 p-4 text-center">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {panchanga.datetime.toFormat(
                                                    "dd MMM yyyy hh:mm a"
                                                )}
                                            </div>
                                            <div className="text-sm text-purple-500">
                                                {panchanga.datetime.toFormat(
                                                    "dd MMM yyyy hh:mm a"
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Hindu Month:</span>
                                                <span className="font-semibold">
                                                    {
                                                        panchanga.masa.name
                                                            .english
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Paksha:</span>
                                                <span className="font-semibold">
                                                    {
                                                        panchanga.tithi
                                                            .paksha_name.english
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Season:</span>
                                                <span className="font-semibold">
                                                    Varsha (Monsoon)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Samvat Info */}
                                <div className="rounded-xl border border-green-100 bg-white p-6 shadow-lg">
                                    <h3 className="mb-4 text-lg font-bold text-gray-800">
                                        संवत्सर (Era Years)
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-3">
                                            <span className="font-medium">
                                                Vikrama Samvat:
                                            </span>
                                            <span className="font-bold text-orange-600">
                                                {
                                                    panchanga.samvatsara
                                                        .vikrama_samvat
                                                }
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-3">
                                            <span className="font-medium">
                                                Shaka Samvat:
                                            </span>
                                            <span className="font-bold text-green-600">
                                                {
                                                    panchanga.samvatsara
                                                        .saka_samvat
                                                }
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                                            <span className="font-medium">
                                                Kali Yuga:
                                            </span>
                                            <span className="font-bold text-blue-600">
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
                        <div className="rounded-xl border border-yellow-100 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                                <FaSun className="mr-2 h-5 w-5 text-yellow-500" />
                                सूर्य और चंद्र उदय/अस्त (Sun & Moon Timings)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center space-x-4 rounded-lg bg-yellow-50 p-4">
                                    <FaSun className="h-8 w-8 text-yellow-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Sunrise
                                        </div>
                                        <div className="text-xl font-bold text-yellow-600">
                                            {panchanga.sunrise.dt.toFormat(
                                                "dd MMM yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4">
                                    <div className="flex items-center space-x-3">
                                        <FaSun className="h-8 w-8 text-orange-400" />
                                        <div>
                                            <div className="font-semibold text-orange-700">
                                                Sunset
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                सूर्यास्त
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-orange-600">
                                            {panchanga.sunset.dt.toFormat(
                                                "dd MMM yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-lg bg-purple-50 p-4">
                                    <FaMoon className="h-8 w-8 text-purple-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Moonrise
                                        </div>
                                        <div className="text-xl font-bold text-purple-600">
                                            {panchanga.moonrise.dt.toFormat(
                                                "dd MMM yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-lg bg-purple-50 p-4">
                                    <FaMoon className="h-8 w-8 text-purple-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Moonset
                                        </div>
                                        <div className="text-xl font-bold text-purple-600">
                                            {panchanga.moonset.dt.toFormat(
                                                "dd MMM yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Day/Night Duration Card */}
                        <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                                <FaClock className="mr-2 h-5 w-5 text-orange-500" />
                                दिन और रात की अवधि (Day & Night Duration)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg bg-orange-50 p-4 text-center">
                                    <div className="text-sm text-gray-500">
                                        Day Duration
                                    </div>
                                    <div className="text-3xl font-bold text-orange-600">
                                        {
                                            panchanga.kalavelas.day_duration.split(
                                                " "
                                            )[0]
                                        }
                                    </div>
                                    <div className="text-sm text-orange-500">
                                        {
                                            panchanga.kalavelas.day_duration.split(
                                                " "
                                            )[1]
                                        }
                                    </div>
                                </div>
                                <div className="rounded-lg bg-blue-50 p-4 text-center">
                                    <div className="text-sm text-gray-500">
                                        Night Duration
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600">
                                        {
                                            panchanga.kalavelas.night_duration.split(
                                                " "
                                            )[0]
                                        }
                                    </div>
                                    <div className="text-sm text-blue-500">
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
                        <div className="rounded-xl border border-pink-100 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                                <FaGlobe className="mr-2 h-5 w-5 text-pink-600" />
                                ग्रह स्थिति (Planetary Positions)
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Sun Info */}
                                <div className="flex items-center space-x-4 rounded-lg bg-red-50 p-4">
                                    <FaSun className="h-8 w-8 text-red-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Sun Sign
                                        </div>
                                        <div className="text-xl font-bold text-red-600">
                                            {panchanga.sun_rashi.name.english}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({panchanga.sun_rashi.name.hindi})
                                        </div>
                                    </div>
                                </div>
                                {/* Moon Info */}
                                <div className="flex items-center space-x-4 rounded-lg bg-indigo-50 p-4">
                                    <FaMoon className="h-8 w-8 text-indigo-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Moon Sign
                                        </div>
                                        <div className="text-xl font-bold text-indigo-600">
                                            {panchanga.moon_rashi.name.english}
                                        </div>
                                        <div className="text-sm text-gray-600">
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
                        <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                                <FaStar className="mr-2 h-5 w-5 text-purple-600" />
                                शुभ/अशुभ मुहूर्त (Auspicious/Inauspicious
                                Timings)
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Auspicious timings (Example - Abhijit) */}
                                <div className="rounded-lg bg-green-50 p-4">
                                    <div className="mb-2 flex items-center space-x-2 font-semibold text-green-700">
                                        <FaStar size={18} />
                                        <span>Shubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
                                            <span>Abhijit Muhurat</span>
                                            <span className="font-medium text-gray-700">
                                                12:00 PM - 12:45 PM
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
                                            <span>Brahma Muhurat</span>
                                            <span className="font-medium text-gray-700">
                                                04:30 AM - 05:15 AM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Inauspicious timings (Example - Rahu Kalam) */}
                                <div className="rounded-lg bg-red-50 p-4">
                                    <div className="mb-2 flex items-center space-x-2 font-semibold text-red-700">
                                        <FaMoon
                                            className="rotate-180"
                                            size={18}
                                        />
                                        <span>Ashubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
                                            <span>Rahu Kalam</span>
                                            <span className="font-medium text-red-700">
                                                {panchanga.rahu_kalam.start} -{" "}
                                                {panchanga.rahu_kalam.end}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
                                            <span>Yamaganda Kalam</span>
                                            <span className="font-medium text-gray-700">
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
