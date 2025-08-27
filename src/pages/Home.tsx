import { FaClock } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";

export default function Home() {
    const session = useSessionContext();

    return (
        <div id="home-page">
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
