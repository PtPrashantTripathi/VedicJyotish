import type { DateTime } from "luxon";
import { useState } from "react";
import { useSessionContext } from "src/contexts/SessionContext";
import {
    AyanamsaMods,
    type AyanamsaModsValue,
} from "src/services/constants/AyanamsaMods";
import {
    HouseSystems,
    type HouseSystemValue,
} from "src/services/constants/HouseSystems";
import { formatTimezoneOffset } from "src/utils/formatters/formatTimezoneOffset";
export default function Settings() {
    const session = useSessionContext();
    const [filteredCities, setFilteredCities] = useState<
        [string, number, number, string][]
    >([]);

    const handleCityChange = (val: string) => {
        session.updateStorageValues({ city: val });
        if (val.trim()) {
            const matches = city_database.filter(([name]) =>
                name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredCities(matches.slice(0, 10));
        } else {
            setFilteredCities([]);
        }
    };

    return (
        <div id="settings">
            <form className="space-y-6" method="GET" action="">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-2xl space-y-6">
                        {/* <!-- Location Settings  --> */}
                        <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--c-border)" }}>
                            <h3 className="mb-4 text-lg font-bold" style={{ color: "var(--c-maroon)" }}>
                                📍 स्थान सेटिंग्स — Location Settings
                            </h3>
                            <div className="mt-6 space-y-6 rounded-lg bg-gray-50 p-4">
                                <div className="relative">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Place of Birth
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                        id="city"
                                        type="search"
                                        name="city"
                                        value={session.storageValues.city}
                                        onChange={e =>
                                            handleCityChange(e.target.value)
                                        }
                                        placeholder="Enter City, State, Country Name"
                                        autoComplete="off"
                                        tabIndex={0}
                                        autoCorrect="off"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        role="textbox"
                                    />

                                    {filteredCities.length > 0 && (
                                        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                            {filteredCities.map(
                                                ([city, lat, lon, tz], idx) => (
                                                    <div
                                                        key={idx}
                                                        id={`${city}|${lat}|${lon}|${tz}`}
                                                        className="cursor-pointer border-b border-gray-100 p-3 last:border-b-0 hover:bg-purple-50"
                                                        onClick={e => {
                                                            const [
                                                                city,
                                                                lat,
                                                                lon,
                                                                tz_name,
                                                            ] =
                                                                e.currentTarget.id.split(
                                                                    "|"
                                                                );
                                                            session.updateStorageValues(
                                                                {
                                                                    city,
                                                                    lat: parseFloat(
                                                                        lat
                                                                    ),
                                                                    lon: parseFloat(
                                                                        lon
                                                                    ),
                                                                    tz_name,
                                                                    dob: session.storageValues.dob.setZone(
                                                                        tz_name,
                                                                        {
                                                                            keepLocalTime: true,
                                                                        }
                                                                    ) as DateTime<true>,
                                                                }
                                                            );
                                                            setFilteredCities(
                                                                []
                                                            );
                                                        }}>
                                                        {
                                                            // Highlights a search keyword within text using <strong> tag.
                                                            city
                                                                .split(
                                                                    new RegExp(
                                                                        `(${session.storageValues.city})`,
                                                                        "gi"
                                                                    )
                                                                )
                                                                .map(
                                                                    (
                                                                        part,
                                                                        i
                                                                    ) =>
                                                                        part.toLowerCase() ===
                                                                        session.storageValues.city.toLowerCase() ? (
                                                                            <strong
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="text-purple-600">
                                                                                {
                                                                                    part
                                                                                }
                                                                            </strong>
                                                                        ) : (
                                                                            part
                                                                        )
                                                                )
                                                        }
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <div>
                                        <label
                                            htmlFor="tz"
                                            className="mb-2 block text-sm font-medium text-gray-700">
                                            TimeZone
                                        </label>
                                        <select
                                            id="tz"
                                            className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                            value={formatTimezoneOffset(
                                                session.storageValues.tz_name,
                                                session.storageValues.dob.offset
                                            )}
                                            onChange={e => {
                                                const tz_name = e.target.value
                                                    .split("[")[0]
                                                    .trim();
                                                session.updateStorageValues({
                                                    tz_name,
                                                    dob: session.storageValues.dob.setZone(
                                                        tz_name,
                                                        { keepLocalTime: true }
                                                    ) as DateTime<true>,
                                                });
                                            }}>
                                            {Object.entries(
                                                timezone_database
                                            ).map(([tznm, tz_offset]) => {
                                                const formattedTimezone =
                                                    formatTimezoneOffset(
                                                        tznm,
                                                        tz_offset
                                                    );
                                                return (
                                                    <option
                                                        key={tznm}
                                                        value={
                                                            formattedTimezone
                                                        }>
                                                        {formattedTimezone}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Latitude
                                            </label>
                                            <input
                                                id="lat"
                                                name="lat"
                                                type="number"
                                                className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                                placeholder="26.0685"
                                                value={
                                                    session.storageValues.lat ||
                                                    ""
                                                }
                                                onChange={e =>
                                                    session.updateStorageValues(
                                                        {
                                                            lat: parseFloat(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                min="-90"
                                                max="90"
                                                step="0.00000001"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Longitude
                                            </label>
                                            <input
                                                id="lon"
                                                name="lon"
                                                type="number"
                                                className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                                placeholder="83.0108"
                                                value={
                                                    session.storageValues.lon ||
                                                    ""
                                                }
                                                onChange={e =>
                                                    session.updateStorageValues(
                                                        {
                                                            lon: parseFloat(
                                                                e.target.value
                                                            ),
                                                        }
                                                    )
                                                }
                                                min="-180"
                                                max="180"
                                                step="0.00000001"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Language & Display  --> */}
                        <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--c-border)" }}>
                            <h3 className="mb-4 text-lg font-bold" style={{ color: "var(--c-maroon)" }}>
                                🌐 भाषा और प्रदर्शन — Language &amp; Display
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Language
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                                        <option>English</option>
                                        <option>हिंदी (Hindi)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Calculation Settings  --> */}
                        <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--c-border)" }}>
                            <h3 className="mb-4 text-lg font-bold" style={{ color: "var(--c-maroon)" }}>
                                ⚙️ गणना सेटिंग्स — Calculation Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="ayanamsa"
                                        className="mb-2 block text-sm font-medium text-gray-700">
                                        Choose Ayanamsa
                                    </label>
                                    <select
                                        value={
                                            session.storageValues
                                                .ayanamsa_mod || ""
                                        }
                                        onChange={e =>
                                            session.updateStorageValues({
                                                ayanamsa_mod: e.target
                                                    .value as AyanamsaModsValue,
                                            })
                                        }
                                        id="ayanamsa"
                                        name="ayanamsa"
                                        className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                        {Object.entries(AyanamsaMods).map(
                                            ([mode, ayanamsa_name]) => (
                                                <option
                                                    key={ayanamsa_name}
                                                    value={mode}>
                                                    {ayanamsa_name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="house_sys"
                                        className="mb-2 block text-sm font-medium text-gray-700">
                                        House System
                                    </label>
                                    <select
                                        value={
                                            session.storageValues.house_sys ||
                                            ""
                                        }
                                        onChange={e =>
                                            session.updateStorageValues({
                                                house_sys: e.target
                                                    .value as HouseSystemValue,
                                            })
                                        }
                                        id="house_sys"
                                        name="house_sys"
                                        className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                        {Object.entries(HouseSystems).map(
                                            ([hs_mode, hs_name]) => (
                                                <option
                                                    key={hs_name}
                                                    value={hs_mode}>
                                                    {hs_name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Save Button  --> */}
                        <input hidden name="page" value="Home" readOnly />
                        <input hidden name="save" value="True" readOnly />

                        <div className="text-center">
                            <button
                                type="submit"
                                className="rounded-xl px-8 py-3 font-bold text-white transition-all hover:opacity-90"
                                style={{ background: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-maroon) 100%)", boxShadow: "0 4px 14px rgba(212,72,10,0.35)" }}>
                                सेटिंग्स सहेजें — Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
