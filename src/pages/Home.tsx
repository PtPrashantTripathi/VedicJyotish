import { FaClock } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";

export default function Home() {
    const session = useSessionContext();

    return (
        <div id="home-page">
            {/* <!-- Feature Buttons  --> */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
                        Astrology Services
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* <!-- Kundli Creation  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({ page: "KundliForm" })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                                    <i className="fas fa-chart-pie text-2xl text-white"></i>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Kundli Creation
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Generate your complete birth chart with
                                    detailed planetary positions
                                </p>
                                <button className="rounded-full bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700">
                                    Create Kundli
                                </button>
                            </div>
                        </div>

                        {/* <!-- Kundli Matching  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({ page: "KundliMatching" })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500">
                                    <i className="fas fa-heart text-2xl text-white"></i>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Kundli Matching
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Check compatibility between partners for
                                    marriage
                                </p>
                                <button className="rounded-full bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700">
                                    Check Matching
                                </button>
                            </div>
                        </div>

                        {/* <!-- Dasha Analysis  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({ page: "HinduTime" })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500">
                                    <FaClock className="text-2xl text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Hindu Time
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Hinud Time periods
                                </p>
                                <button className="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
                                    View Dasha
                                </button>
                            </div>
                        </div>

                        {/* <!-- Phaladesh  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({ page: "About" })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                                    <i className="fas fa-scroll text-2xl text-white"></i>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Phaladesh
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Detailed predictions based on your birth
                                    chart
                                </p>
                                <button className="rounded-full bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700">
                                    Get Predictions
                                </button>
                            </div>
                        </div>

                        {/* <!-- Panchang Calendar  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({
                                    page: "MonthlyCalendar",
                                })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                                    <i className="fas fa-calendar-alt text-2xl text-white"></i>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Panchang Calendar
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    View detailed panchang for any date
                                </p>
                                <button className="rounded-full bg-yellow-600 px-6 py-2 text-white transition-colors hover:bg-yellow-700">
                                    View Calendar
                                </button>
                            </div>
                        </div>

                        {/* <!-- Settings  --> */}
                        <div
                            className="feature-card card-shadow cursor-pointer rounded-xl bg-white p-6"
                            onClick={() =>
                                session.updateData({ page: "Settings" })
                            }>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-700">
                                    <i className="fas fa-cog text-2xl text-white"></i>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Settings
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Configure location, language and preferences
                                </p>
                                <button className="rounded-full bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700">
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
