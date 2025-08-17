import type { Phala } from "src/backend/YogPhala";

interface Props {
    yogPhala: Record<string, Phala[]>;
}

export default function KundliYogPhala({ yogPhala }: Props) {
    return (
        <section className="container my-4">
            <h1 className="mb-4 border-bottom pb-2">Yoga Phala</h1>

            {Object.entries(yogPhala).map(([source, phalas]) => {
                if (!phalas || phalas.length === 0) return null;

                return (
                    <div key={source} className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary text-white fw-bold">
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
