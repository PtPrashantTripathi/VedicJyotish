import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import ChartInfoTable from "src/components/ChartInfoTable";
import KundliChartSVG from "src/components/KundliChartSVG";
import KundliYogPhala from "src/components/KundliYogPhala";
import Loader from "src/components/Loader";
import VimsottariDasa from "src/components/VimsottariDasa";
import { useSessionContext } from "src/contexts/SessionContext";
import { Kundli, type KundliData } from "src/services/Kundli";
import { DMS } from "src/services/utils";

export default function KundliResult() {
    const session = useSessionContext();

    const [kundliData, setKundliData] = useState<KundliData | null>(null);

    useEffect(() => {
        async function fetchKundli() {
            const result = await Kundli(
                DateTime.fromISO(`${session.data.date}T${session.data.time}`, {
                    zone: session.data.tz_name,
                }) as DateTime<true>,
                session.data.lon,
                session.data.lat
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
                                <td>{kundliData.panchanga.datetime.toISO()}</td>
                            </tr>
                            <tr>
                                <td>weekday</td>
                                <td>{kundliData.panchanga.vara.name.hindi}</td>
                            </tr>
                            <tr>
                                <td>daybirth</td>
                                <td>{String(kundliData.daybirth)}</td>
                            </tr>
                            <tr>
                                <td>latitude</td>
                                <td>
                                    {DMS(
                                        kundliData.panchanga.latitude
                                    ).toString()}
                                </td>
                            </tr>
                            <tr>
                                <td>longitude</td>
                                <td>
                                    {DMS(
                                        kundliData.panchanga.longitude
                                    ).toString()}
                                </td>
                            </tr>
                            <tr>
                                <td>julian_datetime</td>
                                <td>{kundliData.panchanga.tjd_ut}</td>
                            </tr>
                            <tr>
                                <td>sunrise</td>
                                <td>
                                    {kundliData.panchanga.sunrise.dt.toISO()}
                                </td>
                            </tr>
                            <tr>
                                <td>sunset</td>
                                <td>
                                    {kundliData.panchanga.sunset.dt.toISO()}
                                </td>
                            </tr>
                            <tr>
                                <td>ayanamsa</td>
                                <td>{DMS(kundliData.ayanamsa).toString()}</td>
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

                <KundliYogPhala kundliData={kundliData} />

                <VimsottariDasa kundliData={kundliData} />
            </>
        );
    } else {
        return <Loader />;
    }
}
