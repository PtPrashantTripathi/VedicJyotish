import type { KundliData } from "src/services/Kundli";
import { calcYogPhala } from "src/services/YogPhala";

// Color scheme for different yoga categories
const yogaColorMap: Record<
    string,
    {
        bg: string;
        border: string;
        badge: string;
        badgeText: string;
        icon: string;
    }
> = {
    "Raja Yoga": {
        bg: "from-amber-50 to-orange-50",
        border: "border-amber-200",
        badge: "bg-amber-100",
        badgeText: "text-amber-700",
        icon: "👑",
    },
    "Dhana Yoga": {
        bg: "from-green-50 to-emerald-50",
        border: "border-green-200",
        badge: "bg-green-100",
        badgeText: "text-green-700",
        icon: "💰",
    },
    "Bhagya Yoga": {
        bg: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        badge: "bg-blue-100",
        badgeText: "text-blue-700",
        icon: "✨",
    },
    "Vidya Yoga": {
        bg: "from-purple-50 to-pink-50",
        border: "border-purple-200",
        badge: "bg-purple-100",
        badgeText: "text-purple-700",
        icon: "📚",
    },
    "Kavya Yoga": {
        bg: "from-rose-50 to-pink-50",
        border: "border-rose-200",
        badge: "bg-rose-100",
        badgeText: "text-rose-700",
        icon: "🎭",
    },
    "Yogini Yoga": {
        bg: "from-cyan-50 to-blue-50",
        border: "border-cyan-200",
        badge: "bg-cyan-100",
        badgeText: "text-cyan-700",
        icon: "🌙",
    },
};

const getYogaStyle = (source: string) => {
    return (
        yogaColorMap[source] || {
            bg: "from-slate-50 to-slate-100",
            border: "border-slate-200",
            badge: "bg-slate-100",
            badgeText: "text-slate-700",
            icon: "🔮",
        }
    );
};

export default function KundliYogPhala({
    kundliData,
}: {
    kundliData: KundliData;
}) {
    const yogPhala = calcYogPhala(kundliData.planets);
    const entries = Object.entries(yogPhala).filter(
        ([, phalas]) => phalas && phalas.length > 0
    );

    if (entries.length === 0) {
        return (
            <section>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center">
                    <p className="text-sm text-slate-600">
                        कोई योग फल उपलब्ध नहीं (No Yoga Phala available)
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    योग फल विश्लेषण
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    आपकी कुंडली में पाए गए शुभ योग और उनके प्रभाव
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map(([source, phalas]) => {
                    const style = getYogaStyle(source);
                    return (
                        <article
                            key={source}
                            className={`group overflow-hidden rounded-3xl border-2 ${style.border} bg-linear-to-br ${style.bg} p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md`}>
                            {/* Header with Icon and Badge */}
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">
                                            {style.icon}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {source}
                                        </h3>
                                    </div>
                                </div>
                                <span
                                    className={`rounded-full ${style.badge} ${style.badgeText} inline-block px-3 py-1 text-xs font-semibold whitespace-nowrap`}>
                                    {phalas.length}{" "}
                                    {phalas.length === 1 ? "Yoga" : "Yogas"}
                                </span>
                            </div>

                            {/* Description and Effects */}
                            <div className="space-y-3">
                                {phalas.map(
                                    ({ description, effect }, index) => (
                                        <div
                                            key={index}
                                            className="space-y-1.5 rounded-2xl border border-white/60 bg-white/50 p-3 backdrop-blur-sm">
                                            {/* Description */}
                                            <div className="flex gap-2">
                                                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                                        योग
                                                    </p>
                                                    <p className="text-sm leading-snug font-semibold text-slate-800">
                                                        {description.hindi}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Effect/Phala */}
                                            <div className="flex gap-2 pl-2">
                                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-lg">
                                                    ➡️
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                                        प्रभाव (Effect)
                                                    </p>
                                                    <p className="text-sm leading-relaxed text-slate-700">
                                                        {effect.hindi}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Footer indicator */}
                            <div className="mt-4 border-t border-white/40 pt-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-slate-500">
                                        {source}
                                    </span>
                                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-linear-to-r from-sky-400 to-blue-500" />
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Summary Section */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                    📊 योग सारांश (Summary)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3">
                        <p className="text-xs font-medium text-slate-500">
                            कुल योग
                        </p>
                        <p className="mt-1 text-2xl font-bold text-sky-700">
                            {entries.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-medium text-slate-500">
                            कुल फल
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-700">
                            {entries.reduce(
                                (sum, [, phalas]) => sum + phalas.length,
                                0
                            )}
                        </p>
                    </div>
                    <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-3">
                        <p className="text-xs font-medium text-slate-500">
                            स्थिति
                        </p>
                        <p className="mt-1 text-lg font-bold text-amber-700">
                            ✨ शुभ
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
