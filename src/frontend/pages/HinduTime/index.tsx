import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import Clock from "src/frontend/components/Clock";
import { useSessionContext } from "src/frontend/contexts/SessionContext";
import { calcHinduTime } from "src/backend/services/calcHinduTime";
import { calcRiseSet } from "src/backend/services/calcRiseSet";

export default function HinduTime() {
    const session = useSessionContext();

    // Convert current system time to Julian Day UT
    const datetime = DateTime.fromISO(session.searchParams.date, {
        zone: session.searchParams.tznm,
    });
    const utc_dt = datetime.toUTC();
    const tjd_ut = swe.swe_utc_to_jd(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        utc_dt.hour,
        utc_dt.minute,
        utc_dt.second,
        swe.SE_GREG_CAL
    )[1];

    // Calculate Hindu Today Sunrise and SunSet
    const today_sun = useMemo(
        () =>
            calcRiseSet(tjd_ut, swe.SE_SUN, [
                session.searchParams.lon,
                session.searchParams.lat,
                0,
            ]),
        [session.searchParams.lat, session.searchParams.lon, tjd_ut]
    );
    const [hinduTime, setHinduTime] = useState(
        calcHinduTime(today_sun.rise_jd - tjd_ut)
    );
    useEffect(() => {
        const timer = setInterval(() => {
            setHinduTime(calcHinduTime(today_sun.rise_jd - tjd_ut));
        }, 400);
        return () => clearInterval(timer);
    }, [tjd_ut, today_sun.rise_jd]);

    return (
        <div className="font-inter flex flex-col items-center justify-center p-4" style={{ background: "var(--c-bg)" }}>
            <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-xl p-6 shadow-xl" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <h1 className="mb-4 text-2xl font-semibold" style={{ color: "var(--c-maroon)" }}>
                    Hindu Time
                </h1>
                <Clock today_sun={today_sun} hinduTime={hinduTime} />

                <div className="mt-6 flex flex-col items-center gap-2 text-center">
                    <span className="text-4xl font-extrabold drop-shadow" style={{ color: "var(--c-text)" }}>
                        {`${String(hinduTime.ghati).padStart(2, "0")}:${String(hinduTime.pal).padStart(2, "0")}:${String(hinduTime.vipal).padStart(2, "0")}`}
                    </span>
                    <div className="text-sm font-medium" style={{ color: "var(--c-text-m)" }}>
                        <div>
                            Sunrise:{" "}
                            <span className="font-semibold" style={{ color: "var(--c-text)" }}>
                                {datetime
                                    .plus({
                                        days: today_sun.rise_jd - tjd_ut,
                                    })
                                    .toFormat("hh:mm a")}
                            </span>
                        </div>
                        <div>
                            Sunset:{" "}
                            <span className="font-semibold" style={{ color: "var(--c-text)" }}>
                                {datetime
                                    .plus({
                                        days: today_sun.set_jd - tjd_ut,
                                    })
                                    .toFormat("hh:mm a")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
