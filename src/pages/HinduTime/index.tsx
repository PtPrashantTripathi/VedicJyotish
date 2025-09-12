import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "src/contexts/SessionContext";
import { calcHinduTime } from "src/services/calcHinduTime";
import { calcRiseSet } from "src/services/calcRiseSet";
import { MOD360 } from "src/services/utils";

export default function HinduTime() {
    const session = useSessionContext();

    // Convert current system time to Julian Day UT
    const datetime = DateTime.fromISO(session.data.date, {
        zone: session.data.tznm,
    });
    const utc_dt = datetime.toUTC();
    const tjd_ut = swe.swe_utc_to_jd(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        utc_dt.hour,
        utc_dt.minute,
        utc_dt.second,
        swe.SE_GREG_CAL
    )[1];

    // Calculate Hindu Today Sunrise and SunSet
    const today_sun = useMemo(
        () =>
            calcRiseSet(tjd_ut, swe.SE_SUN, [
                session.data.lon,
                session.data.lat,
                0,
            ]),
        [session.data.lat, session.data.lon, tjd_ut]
    );
    const [hinduTime, setHinduTime] = useState(
        calcHinduTime(today_sun.rise_jd - tjd_ut)
    );
    useEffect(() => {
        const timer = setInterval(() => {
            setHinduTime(calcHinduTime(today_sun.rise_jd - tjd_ut));
        }, 400);
        return () => clearInterval(timer);
    }, [tjd_ut, today_sun.rise_jd]);

    const settings = { size: 400 };
    const padding = settings.size * 0.01;
    const outerRadius = settings.size * 0.5;
    const innerRadius = settings.size * 0.475;
    const center = settings.size / 2;

    // Calculate arc path (more complex, requires trigonometry)
    const startAngle =
        2 * Math.PI * (today_sun.set_jd - today_sun.rise_jd) - Math.PI / 2;
    const endAngle = 2 * Math.PI - Math.PI / 2;

    return (
        <div className="font-inter flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
                <h1 className="mb-4 text-2xl font-semibold text-gray-800">
                    Hindu Time
                </h1>
                {newFunction(
                    settings,
                    padding,
                    center,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    hinduTime
                )}

                <div className="mt-6 flex flex-col items-center gap-2 text-center">
                    <span className="text-4xl font-extrabold text-gray-900 drop-shadow">
                        {`${String(hinduTime.ghati).padStart(2, "0")}:${String(hinduTime.pal).padStart(2, "0")}:${String(hinduTime.vipal).padStart(2, "0")}`}
                    </span>
                    <div className="text-sm font-medium text-gray-500">
                        <div>
                            Sunrise:{" "}
                            <span className="font-semibold text-gray-700">
                                {datetime
                                    .plus({
                                        days: today_sun.rise_jd - tjd_ut,
                                    })
                                    .toISO()}
                            </span>
                        </div>
                        <div>
                            Sunset:{" "}
                            <span className="font-semibold text-gray-700">
                                {datetime
                                    .plus({
                                        days: today_sun.set_jd - tjd_ut,
                                    })
                                    .toISO()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function newFunction(
    settings: { size: number },
    padding: number,
    center: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    hinduTime: { ghati: number; pal: number; vipal: number }
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={settings.size}
            height={settings.size}
            viewBox={`${-padding} ${-padding} ${settings.size + padding * 2} ${settings.size + padding * 2}`}
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd">
            {/* Time Period Labels (8 parts of the day) */}
            <g id="time_period_labels">
                {[
                    "Ushaa",
                    "Purvaanha",
                    "Madhyaanha",
                    "Aparaahnha",
                    "Saayankala",
                    "Pradosha",
                    "Nishitha",
                    "Triyaama",
                ].map((period_name, i) => (
                    <text
                        key={period_name}
                        x={
                            center +
                            innerRadius *
                                0.75 *
                                Math.sin(((2 * i - 1) * Math.PI) / 8)
                        }
                        y={
                            center -
                            innerRadius *
                                0.75 *
                                Math.cos(((2 * i - 1) * Math.PI) / 8)
                        }
                        fill="#000000"
                        textAnchor="middle"
                        fontSize={10}
                        alignmentBaseline="middle">
                        {period_name}
                    </text>
                ))}
            </g>

            {/* Outer Circle */}
            <circle
                id="outer_circle"
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="#2D3748"
                strokeWidth={2}
            />
            {/* Inner circle */}
            <circle
                id="inner_circle"
                cx={center}
                cy={center}
                r={innerRadius}
                fill="none"
                stroke="#000000"
                strokeWidth={1}
            />

            {/* Numbers (12-hour format) */}
            <g id="numbers">
                {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 + 180) % 360;
                    const r = innerRadius * 0.9;
                    return (
                        <text
                            key={i}
                            x={center + r * Math.sin((angle * Math.PI) / 180)}
                            y={center + r * Math.cos((angle * Math.PI) / 180)}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize={12}
                            fontWeight="bold"
                            fill="#000000">
                            {60 - i * 5}
                        </text>
                    );
                })}
            </g>

            {/* Tick Marks (60 ticks for Ghati/Pal) */}
            <g id="ticks">
                {Array.from({ length: 60 }, (_, i) => {
                    const isMajor = i % 5 === 0;
                    const length = innerRadius * (1 - (isMajor ? 0.05 : 0.035));

                    return (
                        <line
                            key={`tick-${i}`}
                            x1={
                                center +
                                innerRadius * Math.sin((i * Math.PI) / 30)
                            }
                            y1={
                                center -
                                innerRadius * Math.cos((i * Math.PI) / 30)
                            }
                            x2={center + length * Math.sin((i * Math.PI) / 30)}
                            y2={center - length * Math.cos((i * Math.PI) / 30)}
                            stroke="#2D3748"
                            strokeWidth={isMajor ? 1.5 : 0.75}
                            strokeLinecap="round"
                        />
                    );
                })}
            </g>

            {/* Day/Night Arc (Night time shaded) */}
            <path
                d={
                    `M ${center},${center} ` +
                    `L ${center + innerRadius * Math.cos(startAngle)},${center + innerRadius * Math.sin(startAngle)} ` +
                    `A ${innerRadius},${innerRadius} ` +
                    `0 ${MOD360(endAngle - startAngle) > 180 ? 1 : 0} 1 ` +
                    `${center + innerRadius * Math.cos(endAngle)} ${center + innerRadius * Math.sin(endAngle)} ` +
                    `Z`
                }
                fill="#33333333"
                stroke="#000000"
                strokeWidth={2}
            />

            {/* Ghati Hand */}
            <line
                x1={center}
                y1={center}
                x2={
                    center +
                    innerRadius *
                        0.7 *
                        Math.sin((hinduTime.ghati * 6 * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.7 *
                        Math.cos((hinduTime.ghati * 6 * Math.PI) / 180)
                }
                stroke="#2D3748"
                strokeWidth="3"
                strokeLinecap="round"
            />
            {/* Pal Hand */}
            <line
                x1={center}
                y1={center}
                x2={
                    center +
                    innerRadius *
                        0.8 *
                        Math.sin((hinduTime.pal * 6 * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.8 *
                        Math.cos((hinduTime.pal * 6 * Math.PI) / 180)
                }
                stroke="#2D3748"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Vipal Hand */}
            <line
                x1={center}
                y1={center}
                x2={
                    center +
                    innerRadius *
                        0.9 *
                        Math.sin((hinduTime.vipal * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.9 *
                        Math.cos((hinduTime.vipal * Math.PI) / 180)
                }
                stroke="#DC2626"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Center Cap */}
            <circle
                cx={center}
                cy={center}
                r="6"
                fill="#fff"
                stroke="#2D3748"
                strokeWidth="2"
            />
        </svg>
    );
}
