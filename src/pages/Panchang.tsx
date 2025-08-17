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
import { useState } from "react";

// Mock data - replace with your actual data from getPanchanga
const mockPanchangData = {
    datetime: new Date(),
    sun_info: { rashi: { name: { hindi: "सिंह", english: "Leo" } } },
    moon_info: { rashi: { name: { hindi: "वृष", english: "Taurus" } } },
    sunrise: new Date("2025-01-15T06:42:00"),
    sunset: new Date("2025-01-15T18:48:00"),
    moonrise: new Date("2025-01-15T09:23:00"),
    moonset: new Date("2025-01-15T22:45:00"),
    day_duration: "12h 06m 00s",
    night_duration: "11h 54m 00s",
    vara: { name: { hindi: "मंगलवार", english: "Tuesday" }, num: 2 },
    tithi: {
        name: { hindi: "पंचमी", english: "Panchami" },
        pakshaname: { hindi: "कृष्ण पक्ष", english: "Krishna Paksha" },
        start_dt: new Date("2025-01-15T04:30:00"),
        end_dt: new Date("2025-01-16T06:15:00"),
        lunarphase: 156.5,
    },
    nakshatra: {
        name: { hindi: "रोहिणी", english: "Rohini" },
        start_dt: new Date("2025-01-15T02:20:00"),
        end_dt: new Date("2025-01-15T23:45:00"),
        lord: "Moon",
        symbol: "Cart",
    },
    yoga: {
        name: { hindi: "सिद्ध", english: "Siddha" },
        start_dt: new Date("2025-01-15T03:30:00"),
        end_dt: new Date("2025-01-15T15:30:00"),
    },
    karana: {
        name: { hindi: "वणिज", english: "Vanija" },
        start_dt: new Date("2025-01-15T04:30:00"),
        end_dt: new Date("2025-01-15T16:23:00"),
    },
    masa: { name: { hindi: "श्रावण", english: "Shravana" }, num: 5 },
    samvatsara: { name: { hindi: "क्रोधी", english: "Krodhi" } },
    kali: 5126,
    saka_samvat: 1946,
    vikrama_samvat: 2081,
    rahu_kalam: {
        start_dt: new Date("2025-01-15T15:00:00"),
        end_dt: new Date("2025-01-15T16:30:00"),
    },
};

export default function EnhancedPanchang() {
    const [data] = useState(mockPanchangData);

    // const {
    //     data: { date, time, lat, lon, tz_name },
    // } = useSessionContext();

    // const [data, setData] = useState<Awaited<
    //     ReturnType<typeof getPanchanga>
    // > | null>(mockPanchangData);

    // useEffect(() => {
    //     async function fetchKundli() {
    //         const result = await getPanchanga(
    //             DateTime.fromISO(`${date}T${time}`, {
    //                 zone: tz_name,
    //             }) as DateTime<true>,
    //             lat,
    //             lon
    //         );
    //         console.log(result);
    //         setData(result);
    //     }

    //     fetchKundli();
    // }, [date, time, lat, lon, tz_name]);

    const [selectedTab, setSelectedTab] = useState("overview");
    const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-IN", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getMoonPhase = () => {
        const phase = data.tithi.lunarphase;
        if (phase < 45)
            return {
                name: "New Moon",
                icon: "🌑",
                percent: Math.round((phase / 45) * 100),
            };
        if (phase < 135)
            return {
                name: "Waxing",
                icon: "🌒",
                percent: Math.round(((phase - 45) / 90) * 100),
            };
        if (phase < 225)
            return {
                name: "Full Moon",
                icon: "🌕",
                percent: Math.round(((phase - 135) / 90) * 100),
            };
        return {
            name: "Waning",
            icon: "🌘",
            percent: Math.round(((phase - 225) / 90) * 100),
        };
    };

    const toggleDetails = (key: string) => {
        setShowDetails(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const moonPhase = getMoonPhase();

    // Calculate remaining time for current elements
    const getTimeRemaining = (endTime: Date) => {
        const now = new Date();
        const diff = endTime.getTime() - now.getTime();

        if (diff <= 0) return "Expired";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m remaining`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Quick Stats Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Date
                            </span>
                            <span className="font-semibold text-purple-700">
                                {formatDate(data.datetime).split(",")[1]}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Day
                            </span>
                            <span className="font-semibold text-blue-600">
                                {data.vara.name.english}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Tithi
                            </span>
                            <span className="font-semibold text-orange-600">
                                {data.tithi.name.english}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Nakshatra
                            </span>
                            <span className="font-semibold text-green-600">
                                {data.nakshatra.name.english}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Yoga
                            </span>
                            <span className="font-semibold text-blue-500">
                                {data.yoga.name.english}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Karana
                            </span>
                            <span className="font-semibold text-red-500">
                                {data.karana.name.english}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase">
                                Moon
                            </span>
                            <span className="text-xl">{moonPhase.icon}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8 overflow-x-auto">
                        {[
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
                        ].map(tab => (
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
                                                    {data.tithi.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {data.tithi.name.english} •{" "}
                                                    {
                                                        data.tithi.pakshaname
                                                            .english
                                                    }
                                                </div>
                                                <div className="text-xs text-orange-500 mt-1">
                                                    {getTimeRemaining(
                                                        data.tithi.end_dt
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
                                                        {formatTime(
                                                            data.tithi.start_dt
                                                        )}
                                                    </span>
                                                    <span>
                                                        End:{" "}
                                                        {formatTime(
                                                            data.tithi.end_dt
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-xs text-gray-600">
                                                    Lunar phase:{" "}
                                                    {Math.round(
                                                        data.tithi.lunarphase
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
                                                    {data.nakshatra.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        data.nakshatra.name
                                                            .english
                                                    }
                                                </div>
                                                <div className="text-xs text-green-500 mt-1">
                                                    {getTimeRemaining(
                                                        data.nakshatra.end_dt
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
                                                        {data.nakshatra.lord}
                                                    </span>
                                                    <span>
                                                        Symbol:{" "}
                                                        {data.nakshatra.symbol}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-600">
                                                    Duration:{" "}
                                                    {formatTime(
                                                        data.nakshatra.start_dt
                                                    )}{" "}
                                                    -{" "}
                                                    {formatTime(
                                                        data.nakshatra.end_dt
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
                                                    {data.yoga.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {data.yoga.name.english}
                                                </div>
                                                <div className="text-xs text-blue-500 mt-1">
                                                    {getTimeRemaining(
                                                        data.yoga.end_dt
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
                                                    {data.karana.name.hindi}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {data.karana.name.english}
                                                </div>
                                                <div className="text-xs text-red-500 mt-1">
                                                    {getTimeRemaining(
                                                        data.karana.end_dt
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
                                                {data.datetime.getDate()}
                                            </div>
                                            <div className="text-sm text-purple-500">
                                                {
                                                    formatDate(
                                                        data.datetime
                                                    ).split(",")[0]
                                                }
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Hindu Month:</span>
                                                <span className="font-semibold">
                                                    {data.masa.name.english}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Paksha:</span>
                                                <span className="font-semibold">
                                                    {
                                                        data.tithi.pakshaname
                                                            .english
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
                                                {data.vikrama_samvat}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                            <span className="font-medium">
                                                Shaka Samvat:
                                            </span>
                                            <span className="font-bold text-green-600">
                                                {data.saka_samvat}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                            <span className="font-medium">
                                                Kali Yuga:
                                            </span>
                                            <span className="font-bold text-blue-600">
                                                {data.kali}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Moon Phase */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                                        चंद्र कला (Moon Phase)
                                    </h3>
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">
                                            {moonPhase.icon}
                                        </div>
                                        <div className="text-lg font-semibold text-indigo-600">
                                            {moonPhase.name}
                                        </div>
                                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                                                style={{
                                                    width: `${moonPhase.percent}%`,
                                                }}></div>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {moonPhase.percent}% complete
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
                                            {formatTime(data.sunrise)}
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
                                            {formatTime(data.sunset)}
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
                                            {formatTime(data.moonrise)}
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
                                            {formatTime(data.moonset)}
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
                                        {data.day_duration.split(" ")[0]}
                                    </div>
                                    <div className="text-sm text-orange-500">
                                        {data.day_duration.split(" ")[1]}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-sm text-gray-500">
                                        Night Duration
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600">
                                        {data.night_duration.split(" ")[0]}
                                    </div>
                                    <div className="text-sm text-blue-500">
                                        {data.night_duration.split(" ")[1]}
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
                                            {data.sun_info.rashi.name.english}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({data.sun_info.rashi.name.hindi})
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
                                            {data.moon_info.rashi.name.english}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({data.moon_info.rashi.name.hindi})
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
                                                {formatTime(
                                                    data.rahu_kalam.start_dt
                                                )}{" "}
                                                -{" "}
                                                {formatTime(
                                                    data.rahu_kalam.end_dt
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
