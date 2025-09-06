import { DateTime } from "luxon";
import { DasaTable } from "src/components/DasaTable";
import { calcVimsottariDasa } from "src/services/calcVimsottariDasa";
import type { KundliData } from "src/services/Kundli";

export default function VimsottariDasa({
    kundliData,
}: {
    kundliData: KundliData;
}) {
    const now = DateTime.now();
    const dasaData = calcVimsottariDasa(
        kundliData.panchanga.tjd_ut,
        kundliData.planets.Moon.nakshatra,
        kundliData.panchanga.datetime
    );
    const mahadasa = dasaData.filter(
        d => d.StartDate <= now && now <= d.EndDate
    )[0];

    const antardasha = mahadasa.ChildDasha.filter(
        d => d.StartDate <= now && now <= d.EndDate
    )[0];

    // const pratyantardasha = antardasha.ChildDasha.filter(
    //     d => d.StartDate <= now && now <= d.EndDate
    // )[0];

    // const sookshmadasha = pratyantardasha.ChildDasha.filter(
    //     d => d.StartDate <= now && now <= d.EndDate
    // )[0];

    // const praanadasha = sookshmadasha.ChildDasha.filter(
    //     d => d.StartDate <= now && now <= d.EndDate
    // )[0];

    // const dehadasha = praanadasha.ChildDasha.filter(
    //     d => d.StartDate <= now && now <= d.EndDate
    // )[0];

    return (
        <section>
            <h1>Vimsottari Dasha</h1>
            <h3>Maha Dasa</h3>
            <DasaTable dasa={mahadasa} />

            <h3> Antar Dasha</h3>
            <DasaTable dasa={antardasha} />

            {/* <h3> Pratyantar Dasha</h3>
            <DasaTable dasa={pratyantardasha} />

            <h3> Sookshma Dasha</h3>
            <DasaTable dasa={sookshmadasha} />

            <h3> Praana Dasha</h3>
            <DasaTable dasa={praanadasha} />

            <h3> Deha Dasha</h3>
            <DasaTable dasa={dehadasha} /> */}
        </section>
    );
}
