import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Kundli } from "src/backend/Kundli";
import { DMS } from "src/backend/utils";
import ChartInfoTable from "src/components/ChartInfoTable";
import KundliChartSVG from "src/components/KundliChartSVG";
import KundliYogPhala from "src/components/KundliYogPhala";
import Loader from "src/components/Loader";
import VimsottariDasa from "src/components/VimsottariDasa";
import { useSessionContext } from "src/contexts/SessionContext";

export default function KundliResult() {
    const session = useSessionContext();
    const [kundliData, setKundliData] = useState<Awaited<
        ReturnType<typeof Kundli>
    > | null>(null);

    useEffect(() => {
        async function fetchKundli() {
            const result = await Kundli(
                DateTime.fromISO(`${session.data.date}T${session.data.time}`, {
                    zone: session.data.tz_name,
                }) as DateTime<true>,
                session.data.lon,
                session.data.lat,
                0
            );
            setKundliData(result);
        }

        fetchKundli();
    }, [session.data]);

    if (kundliData) {
        return (
            <>
                <section>
                    <h1>Basic Birth Details</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>datetime</td>
                                <td>{kundliData.datetime.toISO()}</td>
                            </tr>
                            <tr>
                                <td>weekday</td>
                                <td>{kundliData.vara.name.hindi}</td>
                            </tr>
                            <tr>
                                <td>daybirth</td>
                                <td>{String(kundliData.daybirth)}</td>
                            </tr>
                            <tr>
                                <td>latitude</td>
                                <td>{DMS(kundliData.latitude).toString()}</td>
                            </tr>
                            <tr>
                                <td>longitude</td>
                                <td>{DMS(kundliData.longitude).toString()}</td>
                            </tr>
                            <tr>
                                <td>julian_datetime</td>
                                <td>{kundliData.julian_datetime}</td>
                            </tr>
                            <tr>
                                <td>sunrise</td>
                                <td>{kundliData.sunrise.toISO()}</td>
                            </tr>
                            <tr>
                                <td>sunset</td>
                                <td>{kundliData.sunset.toISO()}</td>
                            </tr>
                            <tr>
                                <td>ayanamsa</td>
                                <td>
                                    {session.data.ayanamsa} (
                                    {DMS(kundliData.ayanamsa).toString()})
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h1>Information Chart</h1>
                    <ChartInfoTable grahaData={kundliData.planets} />
                </section>

                <section>
                    <h1>Birth Chart</h1>

                    <h3>Ascendant Chart</h3>
                    <KundliChartSVG
                        chartData={Object.values(kundliData.planets).map(
                            planet => ({
                                planet_name: planet.name.english,
                                degree: planet.rasi.degree,
                                rasi_num: planet.rasi.rasi_num,
                            })
                        )}
                    />
                    <h3>Hora Chart</h3>
                    <KundliChartSVG
                        chartData={Object.values(kundliData.planets).map(
                            planet => ({
                                planet_name: planet.name.english,
                                degree: planet.divisional.hora.degree,
                                rasi_num: planet.divisional.hora.rasi_num,
                            })
                        )}
                    />
                    <h3>Shashthamsa Chart</h3>
                    <KundliChartSVG
                        chartData={Object.values(kundliData.planets).map(
                            planet => ({
                                planet_name: planet.name.english,
                                degree: planet.divisional.shashtamsa.degree,
                                rasi_num: planet.divisional.shashtamsa.rasi_num,
                            })
                        )}
                    />
                    <h3>Ashthamsa chart</h3>
                    <KundliChartSVG
                        chartData={Object.values(kundliData.planets).map(
                            planet => ({
                                planet_name: planet.name.english,
                                degree: planet.divisional.ashtamsa.degree,
                                rasi_num: planet.divisional.ashtamsa.rasi_num,
                            })
                        )}
                    />
                    <h3>Navamsa chart</h3>
                    <KundliChartSVG
                        chartData={Object.values(kundliData.planets).map(
                            planet => ({
                                planet_name: planet.name.english,
                                degree: planet.divisional.navamsa.degree,
                                rasi_num: planet.divisional.navamsa.rasi_num,
                            })
                        )}
                    />
                </section>

                <KundliYogPhala yogPhala={kundliData.yogPhala} />

                <VimsottariDasa dasaData={kundliData.vimsottari_dasa} />
            </>
        );
    } else {
        return <Loader />;
    }
}
