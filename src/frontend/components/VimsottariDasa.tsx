import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { usePhalDb } from "src/frontend/hooks/usePhalDb";
import {
    calcVimsottariDasa,
    type Dasha,
    type DashaPhal,
} from "src/backend/services/calcVimsottariDasa";
import type { NavagrahaEn } from "src/backend/services/constants/Planet";
import type { KundliData } from "src/backend/services/Kundli";
import { fmtDate, fmtDateRange, fmtDuration } from "src/frontend/utils/formatDate";

// ── Planet display metadata ───────────────────────────────────────────────────

const PLANET_HINDI: Record<NavagrahaEn, string> = {
    Sun: "सूर्य",
    Moon: "चंद्र",
    Mars: "मंगल",
    Mercury: "बुध",
    Jupiter: "गुरु",
    Venus: "शुक्र",
    Saturn: "शनि",
    Rahu: "राहु",
    Ketu: "केतु",
};

const PLANET_SYMBOL: Record<NavagrahaEn, string> = {
    Sun: "☉",
    Moon: "☽",
    Mars: "♂",
    Mercury: "☿",
    Jupiter: "♃",
    Venus: "♀",
    Saturn: "♄",
    Rahu: "☊",
    Ketu: "☋",
};

const PLANET_COLOR: Record<NavagrahaEn, string> = {
    Sun: "#D97706",
    Moon: "#2563EB",
    Mars: "#DC2626",
    Mercury: "#8B9A8F",
    Jupiter: "#EA580C",
    Venus: "#DB2777",
    Saturn: "#4F46E5",
    Rahu: "#64748B",
    Ketu: "#78716C",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function isCurrent(d: Dasha, now: DateTime): boolean {
    return d.StartDate <= now && now <= d.EndDate;
}

function isPast(d: Dasha, now: DateTime): boolean {
    return d.EndDate < now;
}

function getProgress(d: Dasha, now: DateTime): number {
    const total = d.EndDate.diff(d.StartDate, "days").days;
    const elapsed = now.diff(d.StartDate, "days").days;
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PlanetBadge({
    lord,
    size = "sm",
}: {
    lord: NavagrahaEn;
    size?: "sm" | "xs";
}) {
    const color = PLANET_COLOR[lord];
    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${size === "sm" ? "h-7 w-7 text-sm" : "h-5 w-5 text-xs"}`}
            style={{
                background: `${color}22`,
                color,
                border: `1.5px solid ${color}55`,
            }}
            title={lord}>
            {PLANET_SYMBOL[lord]}
        </span>
    );
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
    return (
        <div
            className="mt-1.5 h-1 w-full overflow-hidden rounded-full"
            style={{ background: `${color}22` }}>
            <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: color }}
            />
        </div>
    );
}

// ── Phal (result text) card ───────────────────────────────────────────────────

function DashaPhalCard({ phal }: { phal: DashaPhal }) {
    const entries = Object.entries(phal).filter(([, v]) => v?.hindi);
    if (entries.length === 0) return null;

    return (
        <div className="mb-3 space-y-2">
            {entries.map(([book, translation]) => (
                <details
                    key={book}
                    className="overflow-hidden rounded-lg"
                    style={{
                        background: "rgba(212,163,115,0.04)",
                        border: "1px solid var(--c-border)",
                    }}>
                    <summary
                        className="cursor-pointer px-3 py-2 text-[10px] font-semibold tracking-wider uppercase select-none"
                        style={{ color: "var(--c-primary)" }}>
                        <FaBookOpen className="inline-block h-3 w-3 mr-1 align-middle" /> {book} — फल
                    </summary>
                    <p
                        className="px-3 pt-1 pb-3 text-xs leading-relaxed"
                        style={{ color: "var(--c-text-2)" }}>
                        {translation?.hindi}
                    </p>
                </details>
            ))}
        </div>
    );
}

// ── Pratyantar Dasha Row ──────────────────────────────────────────────────────

function PratyantarRow({ dasha, now }: { dasha: Dasha; now: DateTime }) {
    const current = isCurrent(dasha, now);
    const past = isPast(dasha, now);
    const color = PLANET_COLOR[dasha.Lord];

    return (
        <div
            className="flex items-start gap-2 rounded-md px-2 py-1.5"
            style={{
                background: current ? "#EDF2EE" : "transparent",
                border: current ? "1px solid #C8D5CA" : "1px solid transparent",
                opacity: past && !current ? 0.5 : 1,
            }}>
            <span
                className="mt-0.5 shrink-0 text-xs font-bold"
                style={{ color, fontFamily: "monospace" }}>
                {PLANET_SYMBOL[dasha.Lord]}
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                    <span
                        className="text-xs font-semibold"
                        style={{
                            color: current ? "#5F7063" : "var(--c-text)",
                        }}>
                        {dasha.Lord}
                    </span>
                    <span
                        className="text-[10px]"
                        style={{ color: "var(--c-text-m)" }}>
                        {PLANET_HINDI[dasha.Lord]}
                    </span>
                    {current && (
                        <span
                            className="rounded-sm px-1 text-[9px] font-bold"
                            style={{ background: "#C8D5CA", color: "#5F7063" }}>
                            ★ चालू
                        </span>
                    )}
                </div>
                <p className="text-[10px]" style={{ color: "var(--c-text-m)" }}>
                    {fmtDate(dasha.StartDate)} → {fmtDate(dasha.EndDate)}&ensp;
                    <span>({fmtDuration(dasha.StartDate, dasha.EndDate)})</span>
                </p>
                {current && (
                    <ProgressBar
                        pct={getProgress(dasha, now)}
                        color="#8B9A8F"
                    />
                )}
            </div>
        </div>
    );
}

// ── Antar Dasha Row ───────────────────────────────────────────────────────────

function AntarRow({
    dasha,
    now,
    isExpanded,
    onToggle,
}: {
    dasha: Dasha;
    now: DateTime;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const current = isCurrent(dasha, now);
    const past = isPast(dasha, now);
    const color = PLANET_COLOR[dasha.Lord];
    const pct = current ? getProgress(dasha, now) : past ? 100 : 0;

    return (
        <div>
            <button
                onClick={onToggle}
                className="w-full rounded-lg px-3 py-2 text-left"
                style={{
                    background: current
                        ? "#EDF2EE"
                        : isExpanded
                          ? "rgba(212,163,115,0.06)"
                          : "transparent",
                    border: current
                        ? "1px solid #C8D5CA"
                        : "1px solid transparent",
                    opacity: past && !current ? 0.6 : 1,
                }}>
                <div className="flex items-center gap-2">
                    <PlanetBadge lord={dasha.Lord} size="xs" />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span
                                className="text-xs font-bold"
                                style={{ color: current ? "#5F7063" : color }}>
                                {dasha.Lord}
                            </span>
                            <span
                                className="text-[10px]"
                                style={{ color: "var(--c-text-m)" }}>
                                {PLANET_HINDI[dasha.Lord]}
                            </span>
                            {current && (
                                <span
                                    className="rounded-sm px-1 text-[9px] font-bold"
                                    style={{
                                        background: "#C8D5CA",
                                        color: "#5F7063",
                                    }}>
                                    ★ चालू
                                </span>
                            )}
                        </div>
                        <p
                            className="text-[10px]"
                            style={{ color: "var(--c-text-m)" }}>
                            {fmtDateRange(dasha.StartDate, dasha.EndDate)}&ensp;
                            <span>
                                ({fmtDuration(dasha.StartDate, dasha.EndDate)})
                            </span>
                        </p>
                        {(current || isExpanded) && (
                            <ProgressBar
                                pct={pct}
                                color={current ? "#8B9A8F" : color}
                            />
                        )}
                    </div>
                    {dasha.ChildDasha.length > 0 && (
                        <span
                            className="shrink-0 text-[10px] font-bold"
                            style={{
                                color: "var(--c-text-m)",
                                display: "inline-block",
                                transform: isExpanded
                                    ? "rotate(90deg)"
                                    : "none",
                                transition: "transform 0.2s",
                            }}>
                            ▶
                        </span>
                    )}
                </div>
            </button>

            {isExpanded && (
                <div
                    className="mt-0.5 ml-4 rounded-lg py-2 pr-1 pl-2"
                    style={{
                        borderLeft: `2px solid ${color}44`,
                        background: "rgba(255,255,255,0.55)",
                    }}>
                    <DashaPhalCard phal={dasha.Phal} />
                    {dasha.ChildDasha.length > 0 && (
                        <>
                            <p
                                className="pb-0.5 text-[10px] font-semibold tracking-wider uppercase"
                                style={{ color: "var(--c-text-m)" }}>
                                प्रत्यंतर्दशा
                            </p>
                            <div className="space-y-0.5">
                                {dasha.ChildDasha.map((child, i) => (
                                    <PratyantarRow
                                        key={i}
                                        dasha={child}
                                        now={now}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Maha Dasha Row ────────────────────────────────────────────────────────────

function MahaRow({
    dasha,
    now,
    isExpanded,
    expandedAntarIdx,
    onToggle,
    onAntarToggle,
}: {
    dasha: Dasha;
    now: DateTime;
    isExpanded: boolean;
    expandedAntarIdx: number;
    onToggle: () => void;
    onAntarToggle: (idx: number) => void;
}) {
    const current = isCurrent(dasha, now);
    const past = isPast(dasha, now);
    const color = PLANET_COLOR[dasha.Lord];
    const pct = current ? getProgress(dasha, now) : past ? 100 : 0;

    return (
        <div
            className="mb-2 overflow-hidden rounded-xl"
            style={{
                border: current
                    ? "2px solid #8B9A8F"
                    : isExpanded
                      ? `2px solid ${color}66`
                      : "1px solid var(--c-border)",
                background: current
                    ? "#F2F5F2"
                    : isExpanded
                      ? "rgba(255,255,255,0.92)"
                      : "var(--c-surface)",
                opacity: past && !current ? 0.72 : 1,
                boxShadow: current
                    ? "0 2px 12px rgba(26,110,59,0.15)"
                    : isExpanded
                      ? "0 2px 8px rgba(0,0,0,0.08)"
                      : "none",
            }}>
            <button onClick={onToggle} className="w-full px-3 py-3 text-left">
                <div className="flex items-center gap-3">
                    <PlanetBadge lord={dasha.Lord} size="sm" />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className="text-sm font-bold"
                                style={{ color: current ? "#5F7063" : color }}>
                                {dasha.Lord}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: "var(--c-text-2)" }}>
                                {PLANET_HINDI[dasha.Lord]}
                            </span>
                            {current && (
                                <span
                                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                    style={{
                                        background: "#8B9A8F",
                                        color: "#fff",
                                    }}>
                                    ★ महादशा चालू
                                </span>
                            )}
                            {past && !current && (
                                <span
                                    className="rounded-full px-2 py-0.5 text-[10px]"
                                    style={{
                                        background: "var(--c-warm)",
                                        color: "var(--c-text-m)",
                                    }}>
                                    समाप्त
                                </span>
                            )}
                        </div>
                        <p
                            className="mt-0.5 text-[11px]"
                            style={{ color: "var(--c-text-m)" }}>
                            {fmtDateRange(dasha.StartDate, dasha.EndDate)}&ensp;
                            <span
                                style={{
                                    color: "var(--c-primary)",
                                    fontWeight: 600,
                                }}>
                                ({fmtDuration(dasha.StartDate, dasha.EndDate)})
                            </span>
                        </p>
                        <ProgressBar
                            pct={pct}
                            color={
                                current ? "#8B9A8F" : past ? "#9CA3AF" : color
                            }
                        />
                    </div>
                    <span
                        className="shrink-0 text-xs font-bold"
                        style={{
                            color: "var(--c-text-m)",
                            display: "inline-block",
                            transform: isExpanded ? "rotate(90deg)" : "none",
                            transition: "transform 0.2s",
                        }}>
                        ▶
                    </span>
                </div>
            </button>

            {isExpanded && (
                <div
                    className="px-3 pb-3"
                    style={{ borderTop: `1px solid ${color}33` }}>
                    <div className="pt-2">
                        <DashaPhalCard phal={dasha.Phal} />
                    </div>
                    {dasha.ChildDasha.length > 0 && (
                        <>
                            <p
                                className="pb-1 text-[10px] font-semibold tracking-wider uppercase"
                                style={{ color: "var(--c-text-m)" }}>
                                अंतर्दशा (Antar Dasha)
                            </p>
                            <div className="space-y-0.5">
                                {dasha.ChildDasha.map((antar, i) => (
                                    <AntarRow
                                        key={i}
                                        dasha={antar}
                                        now={now}
                                        isExpanded={expandedAntarIdx === i}
                                        onToggle={() => onAntarToggle(i)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Current Dasha Status Banner ───────────────────────────────────────────────

function CurrentStatusBanner({
    dasaData,
    now,
}: {
    dasaData: Dasha[];
    now: DateTime;
}) {
    const maha = dasaData.find(d => isCurrent(d, now));
    const antar = maha?.ChildDasha.find(d => isCurrent(d, now));
    const pratyantar = antar?.ChildDasha.find(d => isCurrent(d, now));

    if (!maha) return null;

    const rows = [
        { label: "महादशा", dasha: maha },
        antar ? { label: "अंतर्दशा", dasha: antar } : null,
        pratyantar ? { label: "प्रत्यंतर", dasha: pratyantar } : null,
    ].filter(Boolean) as { label: string; dasha: Dasha }[];

    return (
        <div
            className="mb-5 overflow-hidden rounded-xl"
            style={{
                border: "1px solid var(--c-border-s)",
                background: "var(--c-surface)",
            }}>
            <div
                className="px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase"
                style={{
                    background:
                        "linear-gradient(90deg, var(--c-maroon) 0%, var(--c-primary) 100%)",
                }}>
                वर्तमान दशा स्थिति — Current Dasha Status
            </div>
            <div
                className="divide-y"
                style={{ borderColor: "var(--c-border)" }}>
                {rows.map(({ label, dasha }) => {
                    const color = PLANET_COLOR[dasha.Lord];
                    const pct = getProgress(dasha, now);
                    return (
                        <div
                            key={label}
                            className="flex items-center gap-3 px-4 py-2.5">
                            <PlanetBadge lord={dasha.Lord} size="sm" />
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span
                                        className="text-[10px] font-semibold"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {label}
                                    </span>
                                    <span
                                        className="text-sm font-bold"
                                        style={{ color }}>
                                        {dasha.Lord}
                                    </span>
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--c-text-2)" }}>
                                        {PLANET_HINDI[dasha.Lord]}
                                    </span>
                                </div>
                                <p
                                    className="text-[10px]"
                                    style={{ color: "var(--c-text-m)" }}>
                                    {fmtDateRange(
                                        dasha.StartDate,
                                        dasha.EndDate
                                    )}
                                    &ensp;(
                                    {fmtDuration(
                                        dasha.StartDate,
                                        dasha.EndDate
                                    )}
                                    )
                                </p>
                                <div className="mt-1 flex items-center gap-2">
                                    <div
                                        className="h-1.5 flex-1 overflow-hidden rounded-full"
                                        style={{ background: `${color}22` }}>
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${pct}%`,
                                                background: color,
                                            }}
                                        />
                                    </div>
                                    <span
                                        className="text-[10px] font-medium"
                                        style={{ color: "var(--c-text-m)" }}>
                                        {Math.round(pct)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function VimsottariDasa({
    kundliData,
}: {
    kundliData: KundliData;
}) {
    const now = DateTime.now();
    const phalLoaded = usePhalDb();
    const dasaData = useMemo(
        () =>
            calcVimsottariDasa(
                kundliData.panchanga.tjd_ut,
                kundliData.planets.Moon.nakshatra,
                kundliData.panchanga.datetime
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            kundliData.panchanga.tjd_ut,
            kundliData.planets.Moon.nakshatra,
            kundliData.panchanga.datetime,
            phalLoaded,
        ]
    );

    const currentMahaIdx = dasaData.findIndex(d => isCurrent(d, now));
    const currentMaha = dasaData[currentMahaIdx];
    const currentAntarIdx = currentMaha
        ? currentMaha.ChildDasha.findIndex(d => isCurrent(d, now))
        : -1;

    const [expandedMaha, setExpandedMaha] = useState<number>(currentMahaIdx);
    const [expandedAntar, setExpandedAntar] = useState<number>(currentAntarIdx);

    function toggleMaha(idx: number) {
        if (expandedMaha === idx) {
            setExpandedMaha(-1);
            setExpandedAntar(-1);
        } else {
            setExpandedMaha(idx);
            setExpandedAntar(-1);
        }
    }

    function toggleAntar(idx: number) {
        setExpandedAntar(prev => (prev === idx ? -1 : idx));
    }

    return (
        <section id="phaladesh-page">
            <div className="mb-4 flex items-center gap-2">
                <h1 style={{ margin: 0, color: "var(--c-maroon)" }}>
                    विंशोत्तरी दशा चक्र
                </h1>
                <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                        background: "var(--c-warm)",
                        color: "var(--c-text-m)",
                        border: "1px solid var(--c-border)",
                    }}>
                    120 वर्ष
                </span>
            </div>

            <CurrentStatusBanner dasaData={dasaData} now={now} />

            <p
                className="mb-3 text-[11px] font-semibold tracking-wider uppercase"
                style={{ color: "var(--c-text-m)" }}>
                सभी महादशा — All Maha Dashas
            </p>

            {dasaData.map((maha, i) => (
                <MahaRow
                    key={i}
                    dasha={maha}
                    now={now}
                    isExpanded={expandedMaha === i}
                    expandedAntarIdx={expandedMaha === i ? expandedAntar : -1}
                    onToggle={() => toggleMaha(i)}
                    onAntarToggle={idx => toggleAntar(idx)}
                />
            ))}
        </section>
    );
}
