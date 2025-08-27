import {
    Calendar,
    Clock,
    Globe,
    Info,
    Moon,
    Star,
    Sun,
    Users,
} from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getPanchanga } from "src/backend/panchanga";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { useWASMContext } from "src/contexts/WASMContext";

export default function EnhancedPanchang() {
    const {
        data: { date, time, lat, lon, tz_name },
    } = useSessionContext();
    const swe = useWASMContext();
    const [panchanga, setPanchanga] = useState<Awaited<
        ReturnType<typeof getPanchanga>
    > | null>(null);

    useEffect(() => {
        async function fetchKundli() {
            const result = await getPanchanga(
                swe,
                DateTime.fromISO(`${date}T${time}`, {
                    zone: tz_name,
                }) as DateTime<true>,
                lat,
                lon
            );
            setPanchanga(result);
        }
        fetchKundli();
    }, [swe, date, time, lat, lon, tz_name]);

    const [selectedTab, setSelectedTab] = useState("overview");
    const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

    const toggleDetails = (key: string) => {
        setShowDetails(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const tabs = [
        {
            id: "overview",
            label: "Overview",
            icon: Calendar,
        },
        { id: "timings", label: "Timings", icon: Clock },
        {
            id: "planetary",
            label: "Planetary",
            icon: Globe,
        },
        { id: "muhurat", label: "Muhurat", icon: Star },
        { id: "calendar", label: "Calendar", icon: Users },
    ];
    if (!panchanga) {
        return <Loader />;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Navigation Tabs */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    selectedTab === tab.id
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                                <tab.icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Overview Tab */}
                {selectedTab === "overview" && (
                    <div className="space-y-6">
                        {/* Main Panchang Elements */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Panchang Elements Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Star className="w-5 h-5 mr-2 text-purple-600" />
                                    पंचांग तत्व (Panchang Elements)
                                </h3>

                                <div className="space-y-4">
                                    {/* Tithi */}
                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-400">
                                        <div className="flex justify-between items-start">
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
                                                <div className="text-xs text-orange-500 mt-1">
                                                    {panchanga.tithi.end_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDetails("tithi")
                                                }
                                                className="p-1 text-orange-400 hover:text-orange-600">
                                                <Info size={16} />
                                            </button>
                                        </div>
                                        {showDetails.tithi && (
                                            <div className="mt-3 pt-3 border-t border-orange-200 text-sm">
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <span>
                                                        Start:{" "}
                                                        {panchanga.tithi.start_dt.toFormat(
                                                            "MMMM dd, yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                    <span>
                                                        End:{" "}
                                                        {panchanga.tithi.end_dt.toFormat(
                                                            "MMMM dd, yyyy hh:mm a"
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-xs text-gray-600">
                                                    Lunar phase:{" "}
                                                    {Math.round(
                                                        panchanga.tithi
                                                            .lunarphase
                                                    )}
                                                    °
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Nakshatra */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-400">
                                        <div className="flex justify-between items-start">
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
                                                <div className="text-xs text-green-500 mt-1">
                                                    {panchanga.nakshatra.end_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDetails("nakshatra")
                                                }
                                                className="p-1 text-green-400 hover:text-green-600">
                                                <Info size={16} />
                                            </button>
                                        </div>
                                        {showDetails.nakshatra && (
                                            <div className="mt-3 pt-3 border-t border-green-200 text-sm">
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <span>
                                                        Lord:{" "}
                                                        {
                                                            panchanga.nakshatra
                                                                .lord
                                                        }
                                                    </span>
                                                    <span>
                                                        Symbol:{" "}
                                                        {
                                                            panchanga.nakshatra
                                                                .name.hindi
                                                        }
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-600">
                                                    Duration:{" "}
                                                    {panchanga.nakshatra.start_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}{" "}
                                                    -{" "}
                                                    {panchanga.nakshatra.end_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Yoga */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        <div className="flex justify-between items-start">
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
                                                <div className="text-xs text-blue-500 mt-1">
                                                    {panchanga.yoga.end_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDetails("yoga")
                                                }
                                                className="p-1 text-blue-400 hover:text-blue-600">
                                                <Info size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Karana */}
                                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-l-4 border-red-400">
                                        <div className="flex justify-between items-start">
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
                                                <div className="text-xs text-red-500 mt-1">
                                                    {panchanga.karana.end_dt.toFormat(
                                                        "MMMM dd, yyyy hh:mm a"
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDetails("karana")
                                                }
                                                className="p-1 text-red-400 hover:text-red-600">
                                                <Info size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Information */}
                            <div className="space-y-6">
                                {/* Date Info Card */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                        कैलेंडर जानकारी (Calendar Info)
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {panchanga.datetime.toFormat(
                                                    "MMMM dd, yyyy hh:mm a"
                                                )}
                                            </div>
                                            <div className="text-sm text-purple-500">
                                                {panchanga.datetime.toFormat(
                                                    "MMMM dd, yyyy hh:mm a"
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
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        संवत्सर (Era Years)
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                                            <span className="font-medium">
                                                Vikrama Samvat:
                                            </span>
                                            <span className="font-bold text-orange-600">
                                                {panchanga.vikrama_samvat}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                            <span className="font-medium">
                                                Shaka Samvat:
                                            </span>
                                            <span className="font-bold text-green-600">
                                                {panchanga.saka_samvat}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                            <span className="font-medium">
                                                Kali Yuga:
                                            </span>
                                            <span className="font-bold text-blue-600">
                                                {panchanga.kali}
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
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Sunrise/Sunset Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                                सूर्य और चंद्र उदय/अस्त (Sun & Moon Timings)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                                    <Sun className="w-8 h-8 text-yellow-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Sunrise
                                        </div>
                                        <div className="text-xl font-bold text-yellow-600">
                                            {panchanga.sunrise.toFormat(
                                                "MMMM dd, yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Sun className="w-8 h-8 text-orange-400" />
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
                                            {panchanga.sunset.toFormat(
                                                "MMMM dd, yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                                    <Moon className="w-8 h-8 text-purple-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Moonrise
                                        </div>
                                        <div className="text-xl font-bold text-purple-600">
                                            {panchanga.moonrise.toFormat(
                                                "MMMM dd, yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                                    <Moon className="w-8 h-8 text-purple-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Moonset
                                        </div>
                                        <div className="text-xl font-bold text-purple-600">
                                            {panchanga.moonset.toFormat(
                                                "MMMM dd, yyyy hh:mm a"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Day/Night Duration Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                                दिन और रात की अवधि (Day & Night Duration)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-sm text-gray-500">
                                        Day Duration
                                    </div>
                                    <div className="text-3xl font-bold text-orange-600">
                                        {panchanga.day_duration.split(" ")[0]}
                                    </div>
                                    <div className="text-sm text-orange-500">
                                        {panchanga.day_duration.split(" ")[1]}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-sm text-gray-500">
                                        Night Duration
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600">
                                        {panchanga.night_duration.split(" ")[0]}
                                    </div>
                                    <div className="text-sm text-blue-500">
                                        {panchanga.night_duration.split(" ")[1]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Planetary Tab */}
                {selectedTab === "planetary" && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Globe className="w-5 h-5 mr-2 text-pink-600" />
                                ग्रह स्थिति (Planetary Positions)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Sun Info */}
                                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                                    <Sun className="w-8 h-8 text-red-500" />
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
                                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
                                    <Moon className="w-8 h-8 text-indigo-500" />
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
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Star className="w-5 h-5 mr-2 text-purple-600" />
                                शुभ/अशुभ मुहूर्त (Auspicious/Inauspicious
                                Timings)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Auspicious timings (Example - Abhijit) */}
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 text-green-700 font-semibold mb-2">
                                        <Star size={18} />
                                        <span>Shubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center bg-white rounded-md p-3 shadow-sm">
                                            <span>Abhijit Muhurat</span>
                                            <span className="font-medium text-gray-700">
                                                12:00 PM - 12:45 PM
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white rounded-md p-3 shadow-sm">
                                            <span>Brahma Muhurat</span>
                                            <span className="font-medium text-gray-700">
                                                04:30 AM - 05:15 AM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Inauspicious timings (Example - Rahu Kalam) */}
                                <div className="bg-red-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 text-red-700 font-semibold mb-2">
                                        <Moon
                                            className="rotate-180"
                                            size={18}
                                        />
                                        <span>Ashubh Muhurat</span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center bg-white rounded-md p-3 shadow-sm">
                                            <span>Rahu Kalam</span>
                                            <span className="font-medium text-red-700">
                                                {panchanga.rahu_kalam.start_dt.toFormat(
                                                    "MMMM dd, yyyy hh:mm a"
                                                )}{" "}
                                                -{" "}
                                                {panchanga.rahu_kalam.end_dt.toFormat(
                                                    "MMMM dd, yyyy hh:mm a"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white rounded-md p-3 shadow-sm">
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
