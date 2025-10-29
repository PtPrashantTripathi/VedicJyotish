import { MOD } from "src/services/utils";

interface Props {
    today_sun: {
        rise_jd: number;
        set_jd: number;
    };
    hinduTime: { ghati: number; pal: number; vipal: number };
}

export default function Clock(input: Props) {
    const size = 400;
    const padding = size * 0.01;
    const outerRadius = size * 0.5;
    const innerRadius = size * 0.475;
    const center = size / 2;

    // Calculate arc path (more complex, requires trigonometry)
    const startAngle =
        2 * Math.PI * (input.today_sun.set_jd - input.today_sun.rise_jd) -
        Math.PI / 2;
    const endAngle = 2 * Math.PI - Math.PI / 2;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`${-padding} ${-padding} ${size + padding * 2} ${size + padding * 2}`}
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
                    `0 ${MOD(endAngle - startAngle, 2 * Math.PI) > Math.PI ? 1 : 0} 1 ` +
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
                        Math.sin((input.hinduTime.ghati * 6 * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.7 *
                        Math.cos((input.hinduTime.ghati * 6 * Math.PI) / 180)
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
                        Math.sin((input.hinduTime.pal * 6 * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.8 *
                        Math.cos((input.hinduTime.pal * 6 * Math.PI) / 180)
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
                        Math.sin((input.hinduTime.vipal * Math.PI) / 180)
                }
                y2={
                    center -
                    innerRadius *
                        0.9 *
                        Math.cos((input.hinduTime.vipal * Math.PI) / 180)
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
