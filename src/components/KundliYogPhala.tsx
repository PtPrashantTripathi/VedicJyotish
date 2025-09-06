import type { KundliData } from "src/services/Kundli";
import { calcYogPhala } from "src/services/YogPhala";

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
                    <div key={source} className="rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-purple-600">
                            {source}
                        </h3>
                        <div className="prose max-w-none">
                            {phalas.map(({ description, effect }, index) => (
                                <p
                                    key={index}
                                    className="mb-4 leading-relaxed text-gray-700">
                                    {description.hindi} ➡ {effect.hindi}
                                </p>
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
