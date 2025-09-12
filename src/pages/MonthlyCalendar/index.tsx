import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { getPanchanga } from "src/services/calcPanchanga";

export default function MonthlyCalendar() {
    const session = useSessionContext();

    // State for current month and year
    const today = DateTime.now();

    const [currentMonth, setCurrentMonth] = useState(today);
    const [currentIndex, setCurrentIndex] = useState(today.day - 1);

    // Panchanga data for the month
    const [monthData, setMonthData] = useState<
        Array<ReturnType<typeof getPanchanga>>
    >([]);

    // Generate the panchanga data whenever month changes
    useEffect(() => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth = currentMonth.endOf("month");
        const daysInMonth = endOfMonth.day;

        const newMonthData = Array.from({ length: daysInMonth }, (_, i) => {
            const date = startOfMonth.set({ day: i + 1 });
            return getPanchanga(date, session.data.lon, session.data.lat);
        });
        setMonthData(newMonthData);
    }, [currentMonth, session.data.lon, session.data.lat]);

    // Handle month navigation
    const goToPreviousMonth = () =>
        setCurrentMonth(currentMonth.minus({ month: 1 }));
    const goToNextMonth = () =>
        setCurrentMonth(currentMonth.plus({ month: 1 }));

    if (monthData.length === 0) {
        return <Loader />;
    }

    const currentData = monthData[currentIndex];

    return (
        <div className="container mx-auto px-4 pt-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Panel - Selected Day Details */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="rounded-lg border-b bg-gray-50 p-4">
                            <h4
                                className="text-lg font-semibold text-gray-800"
                                id="day_info">
                                {currentData.datetime.toFormat(
                                    "EEE, dd MMM yyyy"
                                )}
                            </h4>
                            <div className="mt-2 flex items-center">
                                <img
                                    className="mr-2"
                                    height={32}
                                    width={32}
                                    src={`./assets/icon/moon/moon${currentData.tithi.tithi_num}.png`}
                                />
                                <div
                                    className="text-sm text-gray-600"
                                    id="selected_tithi">
                                    {currentData.tithi.name.hindi},{" "}
                                    {currentData.tithi.paksha_name.hindi}
                                    <br />
                                    {currentData.masa.name.hindi},{" "}
                                    {currentData.samvatsara.vikrama_samvat}{" "}
                                    {currentData.samvatsara.name.hindi}
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <table
                                className="w-full text-sm"
                                id="tithi_details">
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            तिथि
                                        </td>

                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.tithi.name.hindi},{" "}
                                            {
                                                currentData.tithi.paksha_name
                                                    .hindi
                                            }
                                        </td>

                                        <td className="py-2 font-medium text-orange-500">
                                            {monthData[
                                                currentIndex
                                            ].tithi.start.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                            {" → "}
                                            {monthData[
                                                currentIndex
                                            ].tithi.end.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            नक्षत्र
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.nakshatra.name.hindi}
                                        </td>
                                        <td className="py-2 font-medium text-orange-500">
                                            {monthData[
                                                currentIndex
                                            ].nakshatra.start.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                            {" → "}
                                            {monthData[
                                                currentIndex
                                            ].nakshatra.end.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            योग
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.yoga.name.hindi}
                                        </td>
                                        <td className="py-2 font-medium text-orange-500">
                                            {monthData[
                                                currentIndex
                                            ].yoga.start.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                            {" → "}
                                            {monthData[
                                                currentIndex
                                            ].yoga.end.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            करण
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.karana.name.hindi}
                                        </td>
                                        <td className="py-2 font-medium text-orange-500">
                                            {monthData[
                                                currentIndex
                                            ].karana.start.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                            {" → "}
                                            {monthData[
                                                currentIndex
                                            ].karana.end.dt.toFormat(
                                                "dd-MMM hh:mma"
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            वार
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.vara.name.hindi}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            माह
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {currentData.masa.name.hindi}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            वर्ष
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            {
                                                currentData.samvatsara
                                                    .vikrama_samvat
                                            }{" "}
                                            {currentData.samvatsara.name.hindi}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            चंद्रमा राशि
                                        </td>
                                        <td className="flex items-center py-2 font-medium text-green-700">
                                            <currentData.moon_rashi.symbol />
                                            {currentData.moon_rashi.name.hindi}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्य राशि
                                        </td>
                                        <td className="flex items-center py-2 font-medium text-green-700">
                                            <currentData.sun_rashi.symbol />

                                            {currentData.sun_rashi.name.hindi}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्योदय
                                        </td>
                                        <td
                                            className="py-2 font-medium text-green-700"
                                            colSpan={2}>
                                            {monthData[
                                                currentIndex
                                            ].sunrise.dt.toFormat(
                                                "dd-MMM hh:mm:ss a"
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्यास्त
                                        </td>
                                        <td
                                            className="py-2 font-medium text-green-700"
                                            colSpan={2}>
                                            {monthData[
                                                currentIndex
                                            ].sunset.dt.toFormat(
                                                "dd-MMM hh:mm:ss a"
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Calendar */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border bg-white shadow-sm">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {currentMonth.toFormat("MMMM yyyy")}
                            </h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={goToPreviousMonth}
                                    className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={goToNextMonth}
                                    className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="p-4">
                            {/* Days of week header */}
                            <div className="mb-2 grid grid-cols-7 text-center text-sm font-medium text-gray-600">
                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                ].map(day => (
                                    <div key={day} className="p-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
                                {Array.from(
                                    {
                                        length: monthData[0]?.vara.num ?? 0,
                                    },
                                    (_, i) => {
                                        return <div key={i}></div>;
                                    }
                                )}
                                {monthData.map((day, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                setCurrentIndex(
                                                    day.datetime.day - 1
                                                )
                                            }
                                            className={`flex cursor-pointer flex-col justify-between rounded border p-1 hover:bg-gray-50 ${
                                                day.datetime.toISODate() ===
                                                today.toISODate()
                                                    ? "border-yellow-400 bg-yellow-50"
                                                    : ""
                                            }`}>
                                            {/* Top Section with Sunrise & Sunset */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-center">
                                                    <WiSunrise className="mx-auto mb-1 h-4 w-4" />
                                                    {day.sunrise.dt.toFormat(
                                                        "HH:mm"
                                                    )}
                                                </span>

                                                <span className="text-center">
                                                    <WiSunset className="mx-auto mb-1 h-4 w-4" />
                                                    {day.sunset.dt.toFormat(
                                                        "HH:mm"
                                                    )}
                                                </span>
                                            </div>

                                            {/* Small lunar day */}
                                            <span className="text-center text-xl text-gray-400">
                                                {day.datetime.toFormat("dd")}
                                            </span>

                                            {/* Tithi */}
                                            <span className="text-center text-[11px] text-green-700">
                                                {day.tithi.name.english}{" "}
                                                {day.tithi.paksha_name.english}
                                            </span>

                                            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-700">
                                                <img
                                                    className="h-4 w-4"
                                                    src={`./assets/icon/moon/moon${day.tithi.tithi_num}.png`}
                                                    alt="Moon"
                                                />
                                                {day.nakshatra.name.english}{" "}
                                                {day.nakshatra.end.dt.toFormat(
                                                    "HH:mm"
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
