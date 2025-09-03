import { useEffect, useState } from "react";
import { percentage } from "src/services/utils";
import type SwissEPH from "sweph-wasm/index";

export default function HinduTime({ swe }: { swe: SwissEPH }) {
    console.log(swe.swe_version());
    const settings = {
        size: 400,
    };

    // for now i am keeping hardcode
    const times = {
        sunrise: { Hours: 6, Minutes: 8, Seconds: 0 },
        sunset: { Hours: 18, Minutes: 51, Seconds: 0 },
    };

    const sunriseDecimal =
        times.sunrise.Hours / 24 +
        times.sunrise.Minutes / (24 * 60) +
        times.sunrise.Seconds / (24 * 3600);

    const sunsetDecimal =
        times.sunset.Hours / 24 +
        times.sunset.Minutes / (24 * 60) +
        times.sunset.Seconds / (24 * 3600);

    const [hinduTime, setHinduTime] = useState({
        ghati: 0,
        pal: 0,
        vipal: 0,
    });

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();

            let t =
                now.getHours() / 24 +
                now.getMinutes() / (24 * 60) +
                (now.getSeconds() + now.getMilliseconds() / 1000) /
                    (24 * 3600) -
                sunriseDecimal;
            if (t < 0) t += 1;

            const ghati = Math.floor(t * 60);
            const pal = Math.floor((t * 60 - ghati) * 60);
            const vipal = Math.floor((t * 3600 - ghati * 60 - pal) * 60);
            setHinduTime({ ghati, pal, vipal });

            setCurrentTime(now);
        }, 400);
        return () => clearInterval(timer);
    }, [sunriseDecimal]);

    const padding = percentage(5, settings.size);
    const outer_most_radius = percentage(50, settings.size);
    const outer_radius = percentage(47.5, settings.size);
    const inner_radius = percentage(45, settings.size);
    const center = percentage(50, settings.size);

    // Calculate arc path (more complex, requires trigonometry)
    const startAngle =
        2 * Math.PI * (sunsetDecimal - sunriseDecimal) - Math.PI / 2;
    const endAngle = 2 * Math.PI - Math.PI / 2;
    // Calculate arc coordinates
    const startX = center + inner_radius * Math.cos(startAngle);
    const startY = center + inner_radius * Math.sin(startAngle);
    const endX = center + inner_radius * Math.cos(endAngle);
    const endY = center + inner_radius * Math.sin(endAngle);
    // Determine if we need the large arc flag
    let arcSpan = endAngle - startAngle;
    if (arcSpan < 0) arcSpan += 360;
    const largeArcFlag = arcSpan > 180 ? 1 : 0;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
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
                {/* Time period labels */}
                <g
                    id="time_period_labels"
                    transform={`translate(${center}, ${center})`}>
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
                            x="0"
                            y={-outer_most_radius}
                            fill="#000000"
                            textAnchor="middle"
                            fontSize={12}
                            transform={`rotate(${i * 45 - 20})`}>
                            {period_name}
                        </text>
                    ))}
                </g>

                {/* Outer circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={outer_radius}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                />

                {/* Inner circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={inner_radius}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                />

                {/* Numbers (12-hour format) */}
                <g id="numbers" transform={`translate(${center}, ${center})`}>
                    {Array.from({ length: 12 }, (_, i) => {
                        i += 1;
                        return (
                            <g key={i} transform={`rotate(${i * 30})`}>
                                <text
                                    x="0"
                                    y={-percentage(36.25, settings.size)}
                                    textAnchor="middle"
                                    fontSize={percentage(4.5, settings.size)}
                                    fontWeight="bold"
                                    fill="#000000">
                                    {i * 5}
                                </text>
                            </g>
                        );
                    })}
                </g>

                {/* Tick marks */}
                <g id="ticks" transform={`translate(${center}, ${center})`}>
                    {Array.from({ length: 60 }, (_, i) => {
                        return (
                            <g key={`tick-${i}`} transform={`rotate(${i * 6})`}>
                                <line
                                    x1="0"
                                    y1={-percentage(45, settings.size)}
                                    x2="0"
                                    y2={
                                        i % 5
                                            ? -percentage(42.5, settings.size)
                                            : -percentage(40, settings.size)
                                    }
                                    stroke="#000000"
                                    strokeWidth={
                                        i % 5
                                            ? percentage(0.25, settings.size)
                                            : percentage(0.5, settings.size)
                                    }
                                />
                            </g>
                        );
                    })}
                </g>

                {/* Day/Night Arc (Night time shaded) */}
                <path
                    d={`M ${center} ${center} L ${startX} ${startY} A ${inner_radius} ${inner_radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                    fill="#00000030"
                    stroke="#000000"
                    strokeWidth={percentage(0.5, settings.size)}
                />

                {/* Ghati hand (hour equivalent) */}
                <g
                    id="Ghati-hand"
                    transform={`translate(${center}, ${center}) rotate(${hinduTime.ghati * 6})`}>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2={-percentage(20, settings.size)}
                        stroke="#000000"
                        strokeWidth={percentage(1.5, settings.size)}
                        strokeLinecap="round"
                    />
                    <circle
                        cx="0"
                        cy="0"
                        r={percentage(2, settings.size)}
                        fill="#000000"
                    />
                </g>

                {/* Pal hand (minute equivalent) */}
                <g
                    id="Pal-hand"
                    transform={`translate(${center}, ${center}) rotate(${hinduTime.pal * 6})`}>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2={-percentage(30, settings.size)}
                        stroke="#000000"
                        strokeWidth={percentage(1, settings.size)}
                        strokeLinecap="round"
                    />
                    <circle
                        cx="0"
                        cy="0"
                        r={percentage(1.5, settings.size)}
                        fill="#000000"
                    />
                </g>

                {/* Vipal hand (second equivalent) */}
                <g
                    id="vipal-hand"
                    transform={`translate(${center}, ${center}) rotate(${hinduTime.vipal * 6})`}>
                    <line
                        x1="0"
                        y1={percentage(5, settings.size)}
                        x2="0"
                        y2={-percentage(35, settings.size)}
                        stroke="#000000"
                        strokeWidth={percentage(0.5, settings.size)}
                        strokeLinecap="round"
                    />
                    <circle
                        cx="0"
                        cy="0"
                        r={percentage(1, settings.size)}
                        fill="#000000"
                    />
                </g>

                {/* Center dot */}
                <circle
                    cx={center}
                    cy={center}
                    r={percentage(1.5, settings.size)}
                    fill="#fff"
                />
            </svg>

            <div className="mt-4 text-center">
                <span
                    id="hindutime"
                    className="block text-2xl font-bold text-gray-800">
                    {`${String(hinduTime.ghati).padStart(2, "0")}:${String(hinduTime.pal).padStart(2, "0")}:${String(hinduTime.vipal).padStart(2, "0")}`}
                </span>

                <span
                    id="time"
                    className="block font-mono text-xl text-gray-600">
                    {currentTime.toLocaleTimeString()}
                </span>

                <div className="mt-2 text-sm text-gray-500">
                    <div>
                        Sunrise:{" "}
                        {times.sunrise.Hours.toString().padStart(2, "0")}:
                        {times.sunrise.Minutes.toString().padStart(2, "0")}:
                        {times.sunrise.Seconds.toString().padStart(2, "0")}
                    </div>
                    <div>
                        Sunset: {times.sunset.Hours.toString().padStart(2, "0")}
                        :{times.sunset.Minutes.toString().padStart(2, "0")}:
                        {times.sunset.Seconds.toString().padStart(2, "0")}
                    </div>
                </div>
            </div>
        </div>
    );
}
