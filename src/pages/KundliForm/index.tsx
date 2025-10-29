// src/pages/KundliForm/index.tsx
import { useState } from "react";
import FormInput from "src/components/base/FormInput";
import FormSelect from "src/components/base/FormSelect";
import { useSessionContext } from "src/contexts/SessionContext";
import { formatTimezoneOffset } from "src/utils/formatters/formatTimezoneOffset";

export default function KundliForm() {
    const session = useSessionContext();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [filteredCities, setFilteredCities] = useState<
        [string, number, number, string][]
    >([]);

    const handleCityChange = (val: string) => {
        session.updateSearchParams({ city: val });
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
        <form className="space-y-6" method="GET" action="">
            <input hidden id="page" name="page" value="KundliResult" readOnly />

            <div className="mb-4 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4 text-base font-medium text-gray-700">
                <span className="block">Enter Birthdata</span>
                <span className="text-sm text-gray-600">
                    कुंडली के लिए जन्म विवरण
                </span>
            </div>

            <FormInput
                type="text"
                id="user"
                name="user"
                placeholder="Enter your full name"
                label="Full Name"
                value={
                    session.searchParams.user !== "User"
                        ? session.searchParams.user
                        : undefined
                }
                onChange={e =>
                    session.updateSearchParams({
                        user: e.target.value,
                    })
                }
            />

            <FormSelect
                id="gender"
                name="gender"
                label="Gender"
                value={session.searchParams.gender}
                onChange={e =>
                    session.updateSearchParams({
                        gender: e.target.value as "M" | "F",
                    })
                }>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </FormSelect>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                    label="Date of Birth"
                    type="date"
                    id="date"
                    name="date"
                    value={session.searchParams.date}
                    onChange={e =>
                        session.updateSearchParams({
                            date: e.target.value,
                        })
                    }
                    required
                />
                <FormInput
                    label="Time of Birth"
                    type="time"
                    id="time"
                    name="time"
                    value={session.searchParams.time}
                    onChange={e =>
                        session.updateSearchParams({
                            time: e.target.value,
                        })
                    }
                    required
                />
            </div>

            <div className="relative">
                <FormInput
                    id="city"
                    type="search"
                    name="city"
                    label="Place of Birth"
                    value={session.searchParams.city}
                    onChange={e => handleCityChange(e.target.value)}
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
                        {filteredCities.map(([city, lat, lon, tz], idx) => (
                            <div
                                key={idx}
                                id={`${city}|${lat}|${lon}|${tz}`}
                                className="cursor-pointer border-b border-gray-100 p-3 last:border-b-0 hover:bg-purple-50"
                                onClick={e => {
                                    const [city, lat, lon, tznm] =
                                        e.currentTarget.id.split("|");
                                    session.updateSearchParams({
                                        city,
                                        lat: parseFloat(lat),
                                        lon: parseFloat(lon),
                                        tznm,
                                        tz: timezone_database[tznm],
                                    });
                                    setFilteredCities([]);
                                }}>
                                {
                                    // Highlights a search keyword within text using <strong> tag.
                                    city
                                        .split(
                                            new RegExp(
                                                `(${session.searchParams.city})`,
                                                "gi"
                                            )
                                        )
                                        .map((part, i) =>
                                            part.toLowerCase() ===
                                            session.searchParams.city.toLowerCase() ? (
                                                <strong
                                                    key={i}
                                                    className="text-purple-600">
                                                    {part}
                                                </strong>
                                            ) : (
                                                part
                                            )
                                        )
                                }
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-gray-600">
                    <p className="mb-1">
                        🏙️ <strong>Tip:</strong> Type your city in{" "}
                        <strong>English</strong> and choose from the list.
                    </p>
                    <p className="mb-1">
                        📍 If not found, pick the nearest major city instead.
                    </p>
                    <p>
                        ✅ Select the correct city from the list to{" "}
                        <strong>
                            auto-fill the timezone and latitude/longitude
                        </strong>
                    </p>
                </div>
            </div>

            <div className="border-t pt-6">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="advanced_options_switch"
                        checked={showAdvanced}
                        onChange={e => setShowAdvanced(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500"
                    />
                    <label
                        htmlFor="advanced_options_switch"
                        className="cursor-pointer text-sm font-medium text-gray-700">
                        Advanced Options
                    </label>
                </div>

                {showAdvanced && (
                    <div className="mt-6 space-y-6 rounded-lg bg-gray-50 p-4">
                        <FormSelect
                            label="TimeZone"
                            id="tz"
                            name="tz"
                            value={formatTimezoneOffset(
                                session.searchParams.tznm,
                                session.searchParams.tz
                            )}
                            onChange={e => {
                                const tznm = e.target.value
                                    .split("[")[0]
                                    .trim();
                                session.updateSearchParams({
                                    tznm,
                                    tz: timezone_database[tznm],
                                });
                            }}>
                            {Object.entries(timezone_database).map(
                                ([tznm, tz_offset]) => {
                                    const formattedTimezone =
                                        formatTimezoneOffset(tznm, tz_offset);
                                    return (
                                        <option
                                            key={tznm}
                                            value={formattedTimezone}>
                                            {formattedTimezone}
                                        </option>
                                    );
                                }
                            )}
                        </FormSelect>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                id="lat"
                                name="lat"
                                type="number"
                                label="Latitude"
                                placeholder="26.0685"
                                value={session.searchParams.lat || ""}
                                onChange={e =>
                                    session.updateSearchParams({
                                        lat: parseFloat(e.target.value),
                                    })
                                }
                                min="-90"
                                max="90"
                                step="0.00000001"
                            />

                            <FormInput
                                id="lon"
                                name="lon"
                                label="Longitude"
                                type="number"
                                placeholder="83.0108"
                                value={session.searchParams.lon || ""}
                                onChange={e =>
                                    session.updateSearchParams({
                                        lon: parseFloat(e.target.value),
                                    })
                                }
                                min="-180"
                                max="180"
                                step="0.00000001"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Generate Kundli
                </button>
                <button
                    type="reset"
                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    Reset
                </button>
            </div>
        </form>
    );
}
