import { useSessionContext } from "src/contexts/SessionContext";
export default function MonthlyCalendar() {
    const session = useSessionContext();

    // Calendar navigation
    let currentMonth = 7; // August (0-based)
    let currentYear = 2025;

    function changeMonth(direction: number) {
        currentMonth += direction;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const calendarmonthyear = document.getElementById(
            "calendar-month-year"
        );
        if (calendarmonthyear) {
            calendarmonthyear.textContent = `${months[currentMonth]} ${currentYear}`;
        }
    }
    // Show date details
    function showDateDetails(date: string) {
        const [year, month, day] = date.split("-").map(parseInt);
        const dateObj = new Date(year, month - 1, day);

        const detaildate = document.getElementById("detail-date");
        if (detaildate)
            detaildate.textContent = dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        session.updateData({ page: "Home" }); // date-details
    }
    return (
        <div id="panchang-calendar">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => session.updateData({ page: "Home" })}
                            className="mr-4 text-yellow-600 hover:text-yellow-800">
                            <i className="fas fa-arrow-left text-xl"></i>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Panchang Calendar
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 text-gray-600 hover:text-gray-800">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <h3
                            id="calendar-month-year"
                            className="text-lg font-semibold">
                            August 2025
                        </h3>
                        <button
                            onClick={() => changeMonth(1)}
                            className="p-2 text-gray-600 hover:text-gray-800">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 card-shadow">
                    {/* <!-- Calendar Header  --> */}
                    <div className="calendar-grid mb-2">
                        <div className="text-center font-semibold text-red-600 p-3">
                            Sun
                        </div>
                        <div className="text-center font-semibold text-gray-700 p-3">
                            Mon
                        </div>
                        <div className="text-center font-semibold text-gray-700 p-3">
                            Tue
                        </div>
                        <div className="text-center font-semibold text-gray-700 p-3">
                            Wed
                        </div>
                        <div className="text-center font-semibold text-gray-700 p-3">
                            Thu
                        </div>
                        <div className="text-center font-semibold text-gray-700 p-3">
                            Fri
                        </div>
                        <div className="text-center font-semibold text-blue-600 p-3">
                            Sat
                        </div>
                    </div>

                    {/* <!-- Calendar Days  --> */}
                    <div className="calendar-grid bg-gray-100 rounded-lg">
                        {/* <!-- Week 1  --> */}
                        <div className="bg-gray-100 p-3"></div>
                        <div className="bg-gray-100 p-3"></div>
                        <div className="bg-gray-100 p-3"></div>
                        <div className="bg-gray-100 p-3"></div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-01")}>
                            <div className="font-semibold">1</div>
                            <div className="text-xs text-purple-600">
                                Purnima
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-02")}>
                            <div className="font-semibold">2</div>
                            <div className="text-xs text-orange-600">
                                Pratipada
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-03")}>
                            <div className="font-semibold">3</div>
                            <div className="text-xs text-green-600">
                                Dwitiya
                            </div>
                        </div>

                        {/* <!-- Week 2  --> */}
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-04")}>
                            <div className="font-semibold text-red-600">4</div>
                            <div className="text-xs text-blue-600">Tritiya</div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-05")}>
                            <div className="font-semibold">5</div>
                            <div className="text-xs text-purple-600">
                                Chaturthi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-06")}>
                            <div className="font-semibold">6</div>
                            <div className="text-xs text-orange-600">
                                Panchami
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-07")}>
                            <div className="font-semibold">7</div>
                            <div className="text-xs text-green-600">
                                Shashthi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-08")}>
                            <div className="font-semibold">8</div>
                            <div className="text-xs text-red-600">Saptami</div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-09")}>
                            <div className="font-semibold">9</div>
                            <div className="text-xs text-blue-600">Ashtami</div>
                        </div>
                        <div
                            className="calendar-day bg-blue-100 border p-3 hover:bg-blue-200 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-09")}>
                            <div className="font-semibold text-blue-700">9</div>
                            <div className="text-xs text-blue-700">Today</div>
                        </div>

                        {/* <!-- Week 3  --> */}
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-11")}>
                            <div className="font-semibold text-red-600">11</div>
                            <div className="text-xs text-orange-600">
                                Dashami
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-12")}>
                            <div className="font-semibold">12</div>
                            <div className="text-xs text-green-600">
                                Ekadashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-13")}>
                            <div className="font-semibold">13</div>
                            <div className="text-xs text-purple-600">
                                Dwadashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-14")}>
                            <div className="font-semibold">14</div>
                            <div className="text-xs text-red-600">
                                Trayodashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-15")}>
                            <div className="font-semibold">15</div>
                            <div className="text-xs text-orange-600">
                                Chaturdashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-16")}>
                            <div className="font-semibold">16</div>
                            <div className="text-xs text-green-600">
                                Amavasya
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-17")}>
                            <div className="font-semibold text-blue-600">
                                17
                            </div>
                            <div className="text-xs text-blue-600">
                                Pratipada
                            </div>
                        </div>

                        {/* <!-- Week 4  --> */}
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-18")}>
                            <div className="font-semibold text-red-600">18</div>
                            <div className="text-xs text-purple-600">
                                Dwitiya
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-19")}>
                            <div className="font-semibold">19</div>
                            <div className="text-xs text-orange-600">
                                Tritiya
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-20")}>
                            <div className="font-semibold">20</div>
                            <div className="text-xs text-green-600">
                                Chaturthi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-21")}>
                            <div className="font-semibold">21</div>
                            <div className="text-xs text-red-600">Panchami</div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-22")}>
                            <div className="font-semibold">22</div>
                            <div className="text-xs text-blue-600">
                                Shashthi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-23")}>
                            <div className="font-semibold">23</div>
                            <div className="text-xs text-purple-600">
                                Saptami
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-24")}>
                            <div className="font-semibold text-blue-600">
                                24
                            </div>
                            <div className="text-xs text-orange-600">
                                Ashtami
                            </div>
                        </div>

                        {/* <!-- Week 5  --> */}
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-25")}>
                            <div className="font-semibold text-red-600">25</div>
                            <div className="text-xs text-green-600">Navami</div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-26")}>
                            <div className="font-semibold">26</div>
                            <div className="text-xs text-red-600">Dashami</div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-27")}>
                            <div className="font-semibold">27</div>
                            <div className="text-xs text-blue-600">
                                Ekadashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-28")}>
                            <div className="font-semibold">28</div>
                            <div className="text-xs text-purple-600">
                                Dwadashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-29")}>
                            <div className="font-semibold">29</div>
                            <div className="text-xs text-orange-600">
                                Trayodashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-30")}>
                            <div className="font-semibold">30</div>
                            <div className="text-xs text-green-600">
                                Chaturdashi
                            </div>
                        </div>
                        <div
                            className="calendar-day bg-white border p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => showDateDetails("2025-08-31")}>
                            <div className="font-semibold text-blue-600">
                                31
                            </div>
                            <div className="text-xs text-red-600">Purnima</div>
                        </div>
                    </div>
                </div>

                {/* <!-- Legend  --> */}
                <div className="mt-6 bg-white rounded-xl p-4 card-shadow">
                    <h3 className="font-semibold mb-3">Legend</h3>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
                            <span>Purnima/Amavasya</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-orange-600 rounded mr-2"></div>
                            <span>Special Tithi</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
                            <span>Auspicious Day</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
                            <span>Festival</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
