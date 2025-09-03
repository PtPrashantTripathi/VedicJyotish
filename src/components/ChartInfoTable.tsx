import type { Planet, PlanetEn } from "src/services/constants/Planet";
import { DMS } from "src/services/utils";

interface Props {
    grahaData: Record<PlanetEn, Planet>;
}

export default function ChartInfoTable({ grahaData }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    {[
                        "Planets",
                        "Positions",
                        "Degrees",
                        "Rasi",
                        "Rasi Lord",
                        "Nakshatra",
                        "Nakshatra Lord",
                    ].map((head, index) => (
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.values(grahaData).map(planet => {
                    return (
                        <tr key={planet.name.english}>
                            {[
                                planet.name.english,
                                DMS(planet.degree).toString(),
                                DMS(planet.rasi.degree).toString(),
                                planet.rasi.name.english,
                                planet.rasi.lord,
                                planet.nakshatra.name.english,
                                planet.nakshatra.lord,
                            ].map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
