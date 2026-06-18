import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "src/components/Loader";
import { useSessionContext } from "src/contexts/SessionContext";
import { useLang } from "src/i18n";
import { getPanchanga } from "src/services/calcPanchanga";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthlyCalendar() {
    const session = useSessionContext();
    const { t } = useLang();

    const today = DateTime.now();
    const [currentMonth, setCurrentMonth] = useState(today);
    const [currentIndex, setCurrentIndex] = useState(today.day - 1);

    const monthData = useMemo(() => {
        const startOfMonth = currentMonth.startOf("month");
        const daysInMonth = currentMonth.endOf("month").day;
        return Array.from({ length: daysInMonth }, (_, i) =>
            getPanchanga(
                startOfMonth.set({ day: i + 1 }) as DateTime<true>,
                session.searchParams.lon,
                session.searchParams.lat
            )
        );
    }, [currentMonth, session.searchParams.lon, session.searchParams.lat]);

    if (monthData.length === 0) return <Loader />;

    const safeIndex = Math.min(currentIndex, monthData.length - 1);
    const currentData = monthData[safeIndex];

    // Calendar grid — pad with empty cells for weekday alignment
    const firstWeekday = currentMonth.startOf("month").weekday % 7; // 0=Sun

    const DETAIL_ROWS = [
        {
            key: "तिथि",
            val: `${currentData.tithi.name.hindi}, ${currentData.tithi.paksha_name.hindi}`,
            time: `${currentData.tithi.start.dt.toFormat("dd-MMM hh:mma")} → ${currentData.tithi.end.dt.toFormat("dd-MMM hh:mma")}`,
        },
        {
            key: "नक्षत्र",
            val: currentData.nakshatra.name.hindi,
            time: `${currentData.nakshatra.start.dt.toFormat("dd-MMM hh:mma")} → ${currentData.nakshatra.end.dt.toFormat("dd-MMM hh:mma")}`,
        },
        {
            key: "योग",
            val: currentData.yoga.name.hindi,
            time: `${currentData.yoga.start.dt.toFormat("dd-MMM hh:mma")} → ${currentData.yoga.end.dt.toFormat("dd-MMM hh:mma")}`,
        },
        {
            key: "करण",
            val: currentData.karana.name.hindi,
            time: `${currentData.karana.start.dt.toFormat("dd-MMM hh:mma")} → ${currentData.karana.end.dt.toFormat("dd-MMM hh:mma")}`,
        },
        { key: "वार", val: currentData.vara.name.hindi, time: "" },
        { key: "माह", val: currentData.masa.name.hindi, time: "" },
        {
            key: "वर्ष",
            val: `${currentData.samvatsara.vikrama_samvat} — ${currentData.samvatsara.name.hindi}`,
            time: "",
        },
        { key: "चंद्र राशि", val: currentData.moon_rashi.name.hindi, time: "" },
        { key: "सूर्य राशि", val: currentData.sun_rashi.name.hindi, time: "" },
        {
            key: "सूर्योदय",
            val: currentData.sunrise.dt.toFormat("hh:mm:ss a"),
            time: "",
        },
        {
            key: "सूर्यास्त",
            val: currentData.sunset.dt.toFormat("hh:mm:ss a"),
            time: "",
        },
    ];

    return (
        <div
            className="min-h-screen pb-4"
            style={{ background: "var(--c-bg)" }}>
            {/* Page header */}
            <div
                className="mb-4 overflow-hidden rounded-2xl px-4 py-4"
                style={{
                    background:
                        "linear-gradient(135deg, #D4480A 0%, #7D1B2E 100%)",
                    boxShadow: "0 4px 20px rgba(212,72,10,0.28)",
                }}>
                <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                    मासिक
                </p>
                <h1 className="mt-0.5 text-xl font-bold text-white">
                    {t("monthlyCalendar")}
                </h1>
                <p className="mt-0.5 text-xs text-white/70">
                    {session.searchParams.city}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* ── Left Panel: Day Details ── */}
                <div className="lg:col-span-1">
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}>
                        {/* Day Header */}
                        <div
                            className="px-4 py-3"
                            style={{
                                background: "var(--c-warm)",
                                borderBottom: "1px solid var(--c-border)",
                            }}>
                            <h4
                                className="text-base font-bold"
                                style={{ color: "var(--c-maroon)" }}>
                                {currentData.datetime.toFormat(
                                    "EEE, dd MMM yyyy"
                                )}
                            </h4>
                            <div className="mt-2 flex items-center gap-2">
                                <img
                                    height={32}
                                    width={32}
                                    src={`./assets/icon/moon/moon${currentData.tithi.tithi_num}.png`}
                                    alt=""
                                />
                                <p
                                    className="text-sm"
                                    style={{ color: "var(--c-text-2)" }}>
                                    {currentData.tithi.name.hindi},{" "}
                                    {currentData.tithi.paksha_name.hindi}
                                    <br />
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {currentData.masa.name.hindi},{" "}
                                        {currentData.samvatsara.vikrama_samvat}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Details Table */}
                        <div className="px-4 py-2">
                            <table className="w-full text-sm">
                                <tbody>
                                    {DETAIL_ROWS.map(row => (
                                        <tr
                                            key={row.key}
                                            className="border-b last:border-b-0"
                                            style={{
                                                borderColor: "var(--c-border)",
                                            }}>
                                            <td
                                                className="py-2 pr-2 text-xs font-semibold whitespace-nowrap"
                                                style={{
                                                    color: "var(--c-text-m)",
                                                    width: "28%",
                                                }}>
                                                {row.key}
                                            </td>
                                            <td
                                                className="py-2 font-medium"
                                                style={{
                                                    color: "var(--c-maroon)",
                                                }}>
                                                {row.val}
                                            </td>
                                            {row.time && (
                                                <td
                                                    className="py-2 text-right text-[10px] whitespace-nowrap"
                                                    style={{
                                                        color: "var(--c-primary)",
                                                    }}>
                                                    {row.time}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Sunrise/Sunset quick bar */}
                        <div
                            className="grid grid-cols-2 gap-0"
                            style={{ borderTop: "1px solid var(--c-border)" }}>
                            <div
                                className="flex items-center gap-2 px-4 py-3"
                                style={{
                                    background: "#FFFBEB",
                                    borderRight: "1px solid var(--c-border)",
                                }}>
                                <span className="text-lg">☀️</span>
                                <div>
                                    <p
                                        className="text-[9px] font-semibold uppercase"
                                        style={{ color: "#D97706" }}>
                                        सूर्योदय
                                    </p>
                                    <p
                                        className="text-xs font-bold"
                                        style={{ color: "#D97706" }}>
                                        {currentData.sunrise.dt.toFormat(
                                            "hh:mm a"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-2 px-4 py-3"
                                style={{ background: "#FFF7ED" }}>
                                <span className="text-lg">🌇</span>
                                <div>
                                    <p
                                        className="text-[9px] font-semibold uppercase"
                                        style={{ color: "#EA580C" }}>
                                        सूर्यास्त
                                    </p>
                                    <p
                                        className="text-xs font-bold"
                                        style={{ color: "#EA580C" }}>
                                        {currentData.sunset.dt.toFormat(
                                            "hh:mm a"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Panel: Monthly Calendar Grid ── */}
                <div className="lg:col-span-2">
                    <div
                        className="overflow-hidden rounded-2xl"
                        style={{
                            background: "var(--c-surface)",
                            border: "1px solid var(--c-border)",
                        }}>
                        {/* Month Navigation */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{
                                background: "var(--c-warm)",
                                borderBottom: "1px solid var(--c-border)",
                            }}>
                            <button
                                onClick={() => {
                                    setCurrentMonth(m => m.minus({ month: 1 }));
                                    setCurrentIndex(0);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full transition"
                                style={{
                                    color: "var(--c-primary)",
                                    background: "rgba(212,72,10,0.1)",
                                }}>
                                <FaArrowLeft size={12} />
                            </button>
                            <h3
                                className="text-base font-bold"
                                style={{ color: "var(--c-maroon)" }}>
                                {currentMonth.toFormat("MMMM yyyy")}
                            </h3>
                            <button
                                onClick={() => {
                                    setCurrentMonth(m => m.plus({ month: 1 }));
                                    setCurrentIndex(0);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full transition"
                                style={{
                                    color: "var(--c-primary)",
                                    background: "rgba(212,72,10,0.1)",
                                }}>
                                <FaArrowRight size={12} />
                            </button>
                        </div>

                        {/* Weekday headers */}
                        <div
                            className="grid grid-cols-7 border-b"
                            style={{ borderColor: "var(--c-border)" }}>
                            {WEEKDAYS.map(wd => (
                                <div
                                    key={wd}
                                    className="py-2 text-center text-[10px] font-bold uppercase"
                                    style={{
                                        color:
                                            wd === "Sun"
                                                ? "var(--c-primary)"
                                                : "var(--c-text-m)",
                                    }}>
                                    {wd}
                                </div>
                            ))}
                        </div>

                        {/* Day cells */}
                        <div className="grid grid-cols-7">
                            {Array.from({ length: firstWeekday }, (_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {monthData.map((dayData, idx) => {
                                const dayNum = idx + 1;
                                const isToday =
                                    currentMonth.hasSame(today, "month") &&
                                    dayNum === today.day;
                                const isSelected = idx === safeIndex;
                                const isWeekend =
                                    (firstWeekday + idx) % 7 === 0;

                                return (
                                    <button
                                        key={dayNum}
                                        onClick={() => setCurrentIndex(idx)}
                                        className="flex flex-col items-center p-1.5 transition-all"
                                        style={{
                                            background: isSelected
                                                ? "linear-gradient(135deg, var(--c-primary), var(--c-maroon))"
                                                : isToday
                                                  ? "rgba(212,72,10,0.08)"
                                                  : "transparent",
                                            borderRadius:
                                                isSelected || isToday
                                                    ? "10px"
                                                    : "0",
                                        }}>
                                        <span
                                            className="text-sm leading-none font-bold"
                                            style={{
                                                color: isSelected
                                                    ? "#fff"
                                                    : isToday
                                                      ? "var(--c-primary)"
                                                      : isWeekend
                                                        ? "#DC2626"
                                                        : "var(--c-text)",
                                            }}>
                                            {dayNum}
                                        </span>
                                        <span
                                            className="mt-0.5 max-w-full truncate text-[8px] leading-none"
                                            style={{
                                                color: isSelected
                                                    ? "rgba(255,255,255,0.8)"
                                                    : "var(--c-text-m)",
                                            }}>
                                            {dayData.tithi.name.hindi.slice(
                                                0,
                                                6
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div
                            className="flex items-center gap-4 px-4 py-2 text-[10px]"
                            style={{
                                borderTop: "1px solid var(--c-border)",
                                color: "var(--c-text-m)",
                            }}>
                            <span>● = Selected</span>
                            <span style={{ color: "var(--c-primary)" }}>
                                ● = Today
                            </span>
                            <span style={{ color: "#DC2626" }}>
                                Sun = Sunday
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
