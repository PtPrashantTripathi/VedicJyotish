// KundliChartSVG.tsx
// Renders a Vedic astrology chart SVG with planets positioned in respective houses
import {
    type PlanetDetail,
    PlanetDetails,
    type PlanetEn,
} from "src/services/constants/Planet";
import type { RasiNumber } from "src/services/constants/Rasi";
import type { LanguageTypes } from "src/services/types";
import { NORMALIZE12, percentage } from "src/services/utils";

interface PlanetInfo {
    planet: PlanetDetail;
    degree: number;
}

interface ChartData {
    planet_name: PlanetEn;
    degree: number;
    rasi_num: RasiNumber;
}

interface ChartSetting {
    width: number;
    height: number;
    lang: LanguageTypes; // Language for planet names
    shortName: boolean; // Whether to show short names for planets
    printAscendant: boolean; // Toggle display of "Ascendant" in chart
    printOuterPlanets: boolean; // Toggle display of "Ascendant" in chart
}
interface Props {
    chartData: ChartData[];
    chartSetting?: Partial<ChartSetting>;
}

// Zodiac and house positioning coordinates
const zodic_coords = [
    [50, 25],
    [25, 10.25],
    [10, 25],
    [25, 50],
    [10, 75],
    [25, 87.5],
    [50, 75],
    [75, 87.5],
    [90, 75],
    [75, 50],
    [90, 25],
    [75, 10.25],
];

const house_coords = [
    [50, 46],
    [25, 21],
    [21, 25],
    [46, 50],
    [21, 75],
    [25, 79],
    [50, 54],
    [75, 79],
    [79, 75],
    [54, 50],
    [79, 25],
    [75, 21],
];

const xy_coords = [
    [0, 0],
    [0, 50],
    [0, 100],
    [25, 25],
    [25, 75],
    [50, 0],
    [50, 50],
    [50, 100],
    [75, 25],
    [75, 75],
    [100, 0],
    [100, 50],
    [100, 100],
];

const polylines_coords = [
    [5, 8, 6, 3, 5],
    [1, 3, 6, 4, 1],
    [4, 6, 9, 7, 4],
    [6, 8, 11, 9, 6],
    [0, 5, 3, 0],
    [0, 3, 1, 0],
    [1, 4, 2, 1],
    [2, 4, 7, 2],
    [7, 9, 12, 7],
    [9, 11, 12, 9],
    [8, 10, 11, 8],
    [5, 8, 10, 5],
];

/**
 * Converts raw planetary chart data into a structured array of 12 houses, each
 * containing its house number and the planets in that house.
 *
 * @param chartData - List of planet positions with their sign and degree.
 * @param chartSetting - Chart Setting.
 * @returns Array of 12 houses with associated planets.
 */
function getHouseChart(
    chartData: ChartData[],
    chartSetting: ChartSetting
): Array<{ house_num: number; planets: PlanetInfo[] }> {
    let lagnaIndex = 0;
    // Group planets by their Rasi number
    const signChart: Record<number, PlanetInfo[]> = {};
    for (const { planet_name, degree, rasi_num } of chartData) {
        if (!signChart[rasi_num]) {
            signChart[rasi_num] = [];
        }
        const planet = PlanetDetails[planet_name];

        if (planet_name === "Ascendant") {
            lagnaIndex = rasi_num;
            if (!chartSetting.printAscendant) {
                continue;
            }
        }

        if (planet.type === "Bahyagraha" && !chartSetting.printOuterPlanets) {
            continue;
        }

        if (["Bahyagraha", "Upagraha", "Kalavelas"].includes(planet.type)) {
            continue;
        }

        signChart[rasi_num].push({ planet, degree });
    }

    // Generate the 12-house chart starting from Ascendant
    return Array.from({ length: 12 }, (_, i) => {
        const house_num = NORMALIZE12(lagnaIndex + i);
        return {
            house_num,
            planets: signChart[house_num] || [],
        };
    });
}

export default function KundliChartSVG(input: Props) {
    const settings: ChartSetting = {
        width: 300,
        height: 300,
        lang: "hindi",
        shortName: false,
        printAscendant: true,
        printOuterPlanets: false,
    };

    if (input.chartSetting) {
        Object.assign(settings, input.chartSetting);
    }
    const val_x = percentage(0.8, settings.width);
    const val_y = percentage(0.8, settings.height);
    const fontHeight = percentage(5, settings.height);
    const houseChart = getHouseChart(input.chartData, settings);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={settings.width}
            height={settings.height}
            viewBox={`${-val_x} ${-val_y} ${settings.width + val_x * 2} ${settings.height + val_y * 2}`}
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd">
            {/* Draw house shapes */}
            {polylines_coords.map((linePoints, i) => (
                <polyline
                    key={i}
                    points={linePoints
                        .map(
                            idx =>
                                `${percentage(xy_coords[idx][0], settings.width)},${percentage(xy_coords[idx][1], settings.height)}`
                        )
                        .join(" ")}
                    fill={linePoints.length === 5 ? "#fff" : "#fdf7e3"}
                    stroke="#b78b03"
                    strokeWidth="1"
                />
            ))}

            {/* Render planets inside each house */}
            {houseChart.map((houseValue, i) => {
                if (houseValue.planets.length === 0) return null;

                const x = percentage(zodic_coords[i][0], settings.width);
                const y =
                    percentage(zodic_coords[i][1], settings.height) -
                    (houseValue.planets.length * fontHeight * 1.1) / 2;

                return (
                    <g key={i} transform={`translate(${x}, ${y})`}>
                        <text
                            textAnchor="middle"
                            alignmentBaseline="central"
                            x="0"
                            y="0">
                            {houseValue.planets.map(p => {
                                return (
                                    <tspan
                                        key={p.planet.name.english}
                                        x="0"
                                        dy={fontHeight}
                                        fontSize={fontHeight}
                                        fill={p.planet.color}>
                                        {settings.lang === "english"
                                            ? settings.shortName
                                                ? (p.planet.shortname
                                                      ?.english ??
                                                  p.planet.name.english)
                                                : p.planet.name.english
                                            : settings.shortName
                                              ? (p.planet.shortname?.hindi ??
                                                p.planet.name.hindi)
                                              : p.planet.name.hindi}
                                        <tspan
                                            baselineShift="super"
                                            textAnchor="end"
                                            alignmentBaseline="baseline"
                                            fontSize={fontHeight / 2}
                                            fontWeight="bold"
                                            fill="gray"
                                            dx="2"
                                            dy="0">
                                            {p.degree.toFixed(2)}
                                        </tspan>
                                    </tspan>
                                );
                            })}
                        </text>
                    </g>
                );
            })}

            {/* Render house numbers */}
            {houseChart.map((houseValue, i) => (
                <text
                    key={i}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    x={percentage(house_coords[i][0], settings.width)}
                    y={percentage(house_coords[i][1], settings.height)}
                    fill="#489624"
                    fontSize="12"
                    fontWeight="bold">
                    {houseValue.house_num}
                </text>
            ))}
        </svg>
    );
}
