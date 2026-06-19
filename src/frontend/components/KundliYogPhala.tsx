import type { ReactNode } from "react";
import { useMemo } from "react";
import {
FaArrowRight,
FaBookOpen,
    FaChartBar,
FaCoins,     FaCrown, FaGem, FaMoon, FaStar,     FaTheaterMasks, } from "react-icons/fa";
import { usePhalDb } from "src/frontend/hooks/usePhalDb";
import type { KundliData } from "src/backend/services/Kundli";
import { calcYogPhala } from "src/backend/services/YogPhala";

const YOGA_ACCENT: Record<string, { color: string; icon: ReactNode }> = {
    "Raja Yoga":   { color: "#C49A0A", icon: <FaCrown /> },
    "Dhana Yoga":  { color: "#8B9A8F", icon: <FaCoins /> },
    "Bhagya Yoga": { color: "#2563EB", icon: <FaStar /> },
    "Vidya Yoga":  { color: "#7C3AED", icon: <FaBookOpen /> },
    "Kavya Yoga":  { color: "#DB2777", icon: <FaTheaterMasks /> },
    "Yogini Yoga": { color: "#0891B2", icon: <FaMoon /> },
};

const getAccent = (source: string) =>
    YOGA_ACCENT[source] ?? { color: "#D4A373", icon: <FaGem /> };

export default function KundliYogPhala({
    kundliData,
}: {
    kundliData: KundliData;
}) {
    const phalLoaded = usePhalDb();
    const yogPhala = useMemo(
        () => calcYogPhala(kundliData.planets),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [kundliData.planets, phalLoaded]
    );
    const entries = Object.entries(yogPhala).filter(
        ([, phalas]) => phalas && phalas.length > 0
    );

    if (entries.length === 0) {
        return (
            <div
                className="rounded-2xl px-4 py-8 text-center"
                style={{
                    background: "var(--c-warm)",
                    border: "1px solid var(--c-border)",
                }}>
                <p className="text-sm" style={{ color: "var(--c-text-m)" }}>
                    कोई योग फल उपलब्ध नहीं — No Yoga Phala available
                </p>
            </div>
        );
    }

    return (
        <section>
            {/* Section header */}
            <div className="mb-5">
                <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--c-maroon)" }}>
                    योग फल विश्लेषण
                </h2>
                <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--c-text-m)" }}>
                    आपकी कुंडली में पाए गए शुभ योग और उनके प्रभाव
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map(([source, phalas]) => {
                    const { color, icon } = getAccent(source);
                    return (
                        <article
                            key={source}
                            className="overflow-hidden rounded-2xl"
                            style={{
                                background: "var(--c-surface)",
                                border: "1px solid var(--c-border)",
                                borderLeft: `3px solid ${color}`,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            }}>
                            {/* Card header */}
                            <div
                                className="flex items-center justify-between gap-3 px-4 py-3"
                                style={{
                                    borderBottom: "1px solid var(--c-border)",
                                    background: "var(--c-warm)",
                                }}>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center" style={{ color }}>{icon}</span>
                                    <h3
                                        className="text-sm font-bold"
                                        style={{ color: "var(--c-maroon)" }}>
                                        {source}
                                    </h3>
                                </div>
                                <span
                                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap"
                                    style={{
                                        background: `${color}18`,
                                        color,
                                        border: `1px solid ${color}44`,
                                    }}>
                                    {phalas.length}{" "}
                                    {phalas.length === 1 ? "Yoga" : "Yogas"}
                                </span>
                            </div>

                            {/* Yoga entries */}
                            <div className="space-y-2 p-3">
                                {phalas.map(
                                    ({ description, effect }, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl p-3"
                                            style={{
                                                background: "var(--c-warm)",
                                                border: "1px solid var(--c-border)",
                                            }}>
                                            <div className="mb-2 flex gap-2">
                                                <span
                                                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                                                    style={{
                                                        background: `${color}20`,
                                                        color,
                                                    }}>
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className="mb-0.5 text-[10px] font-semibold tracking-wider uppercase"
                                                        style={{
                                                            color: "var(--c-text-m)",
                                                        }}>
                                                        योग
                                                    </p>
                                                    <p
                                                        className="text-sm leading-snug font-semibold"
                                                        style={{
                                                            color: "var(--c-text)",
                                                        }}>
                                                        {description.hindi}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pl-1">
                                                <span className="mt-0.5 shrink-0 flex h-4 w-4 items-center justify-center" style={{ color: "var(--c-text-m)" }}>
                                                    <FaArrowRight className="h-3 w-3" />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className="mb-0.5 text-[10px] font-semibold tracking-wider uppercase"
                                                        style={{
                                                            color: "var(--c-text-m)",
                                                        }}>
                                                        प्रभाव
                                                    </p>
                                                    <p
                                                        className="text-xs leading-relaxed"
                                                        style={{
                                                            color: "var(--c-text-2)",
                                                        }}>
                                                        {effect.hindi}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Card footer */}
                            <div
                                className="flex items-center justify-between px-4 py-2"
                                style={{
                                    borderTop: "1px solid var(--c-border)",
                                }}>
                                <span
                                    className="text-[10px] font-medium"
                                    style={{ color: "var(--c-text-m)" }}>
                                    {source}
                                </span>
                                <span
                                    className="inline-flex h-2 w-2 rounded-full"
                                    style={{ background: color }}
                                />
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Summary */}
            <div
                className="mt-6 rounded-2xl p-4"
                style={{
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-border)",
                }}>
                <h3
                    className="mb-3 text-sm font-semibold"
                    style={{ color: "var(--c-maroon)" }}>
                    <FaChartBar className="inline-block h-3.5 w-3.5 mr-1.5 align-middle" /> योग सारांश — Summary
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: "var(--c-warm)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <p
                            className="text-[10px] font-medium"
                            style={{ color: "var(--c-text-m)" }}>
                            कुल योग
                        </p>
                        <p
                            className="mt-1 text-2xl font-bold"
                            style={{ color: "var(--c-primary)" }}>
                            {entries.length}
                        </p>
                    </div>
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: "var(--c-warm)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <p
                            className="text-[10px] font-medium"
                            style={{ color: "var(--c-text-m)" }}>
                            कुल फल
                        </p>
                        <p
                            className="mt-1 text-2xl font-bold"
                            style={{ color: "var(--c-maroon)" }}>
                            {entries.reduce(
                                (sum, [, ph]) => sum + ph.length,
                                0
                            )}
                        </p>
                    </div>
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: "var(--c-warm)",
                            border: "1px solid var(--c-border)",
                        }}>
                        <p
                            className="text-[10px] font-medium"
                            style={{ color: "var(--c-text-m)" }}>
                            स्थिति
                        </p>
                        <p
                            className="mt-1 text-sm font-bold"
                            style={{ color: "#8B9A8F" }}>
                            <FaStar className="inline-block h-3 w-3 mr-1 align-middle" /> शुभ
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
