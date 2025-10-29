import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import Clock from "src/components/Clock";
import { useSessionContext } from "src/contexts/SessionContext";
import { calcHinduTime } from "src/services/calcHinduTime";
import { calcRiseSet } from "src/services/calcRiseSet";

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
        <div className="font-inter flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
                <h1 className="mb-4 text-2xl font-semibold text-gray-800">
                    Hindu Time
                </h1>
                <Clock today_sun={today_sun} hinduTime={hinduTime} />

                <div className="mt-6 flex flex-col items-center gap-2 text-center">
                    <span className="text-4xl font-extrabold text-gray-900 drop-shadow">
                        {`${String(hinduTime.ghati).padStart(2, "0")}:${String(hinduTime.pal).padStart(2, "0")}:${String(hinduTime.vipal).padStart(2, "0")}`}
                    </span>
                    <div className="text-sm font-medium text-gray-500">
                        <div>
                            Sunrise:{" "}
                            <span className="font-semibold text-gray-700">
                                {datetime
                                    .plus({
                                        days: today_sun.rise_jd - tjd_ut,
                                    })
                                    .toISO()}
                            </span>
                        </div>
                        <div>
                            Sunset:{" "}
                            <span className="font-semibold text-gray-700">
                                {datetime
                                    .plus({
                                        days: today_sun.set_jd - tjd_ut,
                                    })
                                    .toISO()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
