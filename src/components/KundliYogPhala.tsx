import type { KundliData } from "src/backend/Kundli";
import { calcYogPhala } from "src/backend/YogPhala";

export default function KundliYogPhala({
    kundliData,
}: {
    kundliData: KundliData;
}) {
    const yogPhala = calcYogPhala(kundliData.planets);
    return (
        <section className="container my-4">
            <h1 className="border-bottom mb-4 pb-2">Yoga Phala</h1>

            {Object.entries(yogPhala).map(([source, phalas]) => {
                if (!phalas || phalas.length === 0) return null;

                return (
                    <div key={source} className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary fw-bold text-white">
                            {source}
                        </div>
                        <ul className="list-group list-group-flush">
                            {phalas.map(({ description, effect }, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex flex-column">
                                    <span className="fw-semibold">
                                        {description.hindi}
                                    </span>
                                    <small className="text-muted">
                                        ➡ {effect.hindi}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </section>
    );
}
