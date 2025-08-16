import { FaClock } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";

export default function Home() {
    const session = useSessionContext();
    // Current time and date updates
    function updateDateTime() {
        const now = new Date();
        const timeElement = document.getElementById("current-time");
        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString();
        }
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    return (
        <div id="home-page">
            {/* <!-- Current Panchang Header  --> */}
            <div className="panchang-bg text-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            आज का पंचांग
                        </h2>
                        <p className="text-lg opacity-80">Today's Panchang</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* <!-- Date & Time  --> */}
                        <div className="bg-white rounded-xl p-6 card-shadow">
                            <h3 className="font-semibold text-lg mb-4 text-purple-700">
                                Date & Time
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Date:</span>
                                    <span
                                        id="current-date"
                                        className="font-semibold">
                                        09 Aug 2025
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Day:</span>
                                    <span
                                        id="current-day"
                                        className="font-semibold">
                                        Saturday
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Time:</span>
                                    <span
                                        id="current-time"
                                        className="font-semibold pulse-animation">
                                        --:--:--
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Location:</span>
                                    <span className="font-semibold text-sm">
                                        Azamgarh, UP
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Lat: 26.0685°N</span>
                                    <span>Long: 83.1840°E</span>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Panchang Elements  --> */}
                        <div className="bg-white rounded-xl p-6 card-shadow">
                            <h3 className="font-semibold text-lg mb-4 text-purple-700">
                                Panchang Elements
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Tithi:</span>
                                    <span className="font-semibold text-orange-600">
                                        Chaturthi
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nakshatra:</span>
                                    <span className="font-semibold text-green-600">
                                        Rohini
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Yoga:</span>
                                    <span className="font-semibold text-blue-600">
                                        Siddha
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Karana:</span>
                                    <span className="font-semibold text-red-600">
                                        Vanija
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rashi:</span>
                                    <span className="font-semibold text-purple-600">
                                        Vrishabha
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Gati Pal  --> */}
                        <div className="bg-white rounded-xl p-6 card-shadow">
                            <h3 className="font-semibold text-lg mb-4 text-purple-700">
                                Muhurat & Timings
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Sunrise:</span>
                                    <span className="font-semibold text-yellow-600">
                                        05:42 AM
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunset:</span>
                                    <span className="font-semibold text-orange-600">
                                        06:48 PM
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Moonrise:</span>
                                    <span className="font-semibold text-blue-400">
                                        09:23 AM
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Moonset:</span>
                                    <span className="font-semibold text-indigo-600">
                                        10:45 PM
                                    </span>
                                </div>
                                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                    <div className="flex justify-between text-sm">
                                        <span>Shubh Muhurat:</span>
                                        <span className="font-semibold text-green-700">
                                            10:30-11:45
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Feature Buttons  --> */}
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Astrology Services
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* <!-- Kundli Creation  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({ page: "KundliForm" })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-chart-pie text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Kundli Creation
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Generate your complete birth chart with
                                    detailed planetary positions
                                </p>
                                <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                                    Create Kundli
                                </button>
                            </div>
                        </div>

                        {/* <!-- Kundli Matching  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({ page: "KundliMatching" })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-heart text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Kundli Matching
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Check compatibility between partners for
                                    marriage
                                </p>
                                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                                    Check Matching
                                </button>
                            </div>
                        </div>

                        {/* <!-- Dasha Analysis  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({ page: "HinduTime" })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <FaClock className=" text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Hindu Time
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Hinud Time periods
                                </p>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                                    View Dasha
                                </button>
                            </div>
                        </div>

                        {/* <!-- Phaladesh  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({ page: "About" })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-scroll text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Phaladesh
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Detailed predictions based on your birth
                                    chart
                                </p>
                                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                                    Get Predictions
                                </button>
                            </div>
                        </div>

                        {/* <!-- Panchang Calendar  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({
                                    page: "MonthlyCalendar",
                                })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-calendar-alt text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Panchang Calendar
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    View detailed panchang for any date
                                </p>
                                <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors">
                                    View Calendar
                                </button>
                            </div>
                        </div>

                        {/* <!-- Settings  --> */}
                        <div
                            className="feature-card bg-white rounded-xl p-6 card-shadow cursor-pointer"
                            onClick={() =>
                                session.updateData({ page: "Settings" })
                            }>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-cog text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Settings
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Configure location, language and preferences
                                </p>
                                <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors">
                                    Open Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
