import { pageDetails } from "src/frontend/pages";

export default function Home() {
    return (
        <div className="py-2">
            {/* Banner */}
            <div
                className="mb-5 overflow-hidden rounded-2xl px-5 py-5"
                style={{
                    background:
                        "linear-gradient(135deg, #D4A373 0%, #4A3B32 100%)",
                    boxShadow: "0 4px 20px rgba(212,163,115,0.3)",
                }}>
                <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                    ॐ श्री गणेशाय नमः
                </p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                    वैदिक ज्योतिष सेवाएं
                </h2>
                <p className="mt-1 text-sm text-white/75">
                    जन्म कुंडली, पंचांग, मुहूर्त और ज्योतिष गणनाएं
                </p>
            </div>

            {/* Service Cards */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Object.entries(pageDetails)
                    .filter(([, detail]) => detail.nav)
                    .map(([pageId, detail]) => (
                        <a
                            key={pageId}
                            href={`?page=${pageId}`}
                            className="block no-underline">
                            <div
                                className="group flex h-full cursor-pointer items-start gap-4 rounded-2xl p-4 transition-all"
                                style={{
                                    background: "var(--c-surface)",
                                    border: "1px solid var(--c-border)",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                                onMouseEnter={e => {
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.boxShadow =
                                        "0 4px 16px rgba(212,163,115,0.18)";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.borderColor = "var(--c-primary)";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={e => {
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.boxShadow =
                                        "0 1px 4px rgba(0,0,0,0.06)";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.borderColor = "var(--c-border)";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.transform = "none";
                                }}>
                                {/* Icon */}
                                <div
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "rgba(212,163,115,0.08)",
                                        border: "1px solid rgba(212,163,115,0.2)",
                                    }}>
                                    <detail.icon
                                        className={
                                            detail.icon.name?.startsWith("Svg")
                                                ? "h-8 w-8"
                                                : "h-6 w-6"
                                        }
                                        color="var(--c-primary)"
                                    />
                                </div>

                                {/* Text */}
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="text-base font-bold"
                                        style={{ color: "var(--c-text)" }}>
                                        {detail.title}
                                    </h3>
                                    <p
                                        className="mt-0.5 text-xs leading-relaxed"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {detail.description}
                                    </p>
                                    <span
                                        className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                        style={{
                                            background: "rgba(212,163,115,0.08)",
                                            color: "var(--c-primary)",
                                            border: "1px solid rgba(212,163,115,0.2)",
                                        }}>
                                        {detail.actionMessage} →
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
            </div>
        </div>
    );
}
