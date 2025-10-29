<<<<<<< HEAD
import pako from "pako";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import {
    AyanamsaMods,
    type AyanamsaModsKey,
} from "src/services/constants/AyanamsaMods";
import { formatTimezoneOffset } from "src/utils/formatTimezoneOffset";
=======
// src/pages/KundliForm/index.tsx
import { useState } from "react";
import FormInput from "src/components/base/FormInput";
import FormSelect from "src/components/base/FormSelect";
import { useSessionContext } from "src/contexts/SessionContext";
import { formatTimezoneOffset } from "src/utils/formatters/formatTimezoneOffset";
>>>>>>> 391cf0f (last commit)

export default function KundliForm() {
    const session = useSessionContext();
    const [showAdvanced, setShowAdvanced] = useState(false);
<<<<<<< HEAD

    const [state, setState] = useState<{
        cityList: [string, number, number, string][];
        filteredCities: [string, number, number, string][];
        timezoneMap: Record<string, number>;
    }>({
        cityList: [],
        filteredCities: [],
        timezoneMap: {
            "Asia/Kolkata": 5.5,
        },
    });

    // Auto-detect location on first mount use gps
    // navigator.geolocation?.getCurrentPosition(pos => {
    //     session.updateData("lat", parseFloat(pos.coords.latitude.toFixed(8)));
    //     session.updateData("lon", parseFloat(pos.coords.longitude.toFixed(8)));
    // });

    useEffect(() => {
        // Fetches a city data.gz JSON file and decompresses it to an JSON object.
        fetch("assets/database/city_database.cjson")
            .then(response => response.arrayBuffer())
            .then(data => {
                setState(prev => ({
                    ...prev,
                    cityList: JSON.parse(
                        pako.ungzip(new Uint8Array(data), {
                            to: "string",
                        })
                    ),
                }));
            })
            .catch(error => {
                throw Error(`Error fetching or decompressing JSON: ${error}`);
            });

        // Load timezone data from zipped JSON
        fetch("assets/database/tz_offset.json")
            .then(res => res.json())
            .then(timezoneMap => {
                setState(prev => ({
                    ...prev,
                    timezoneMap,
                }));
            })
            .catch(err => {
                throw Error(`Failed to fetch tz_offset data: ${err}`);
            });
    }, []);

    // Filter cities dynamically on input change
    const setFilteredCities = (
        filteredCities: [string, number, number, string][]
    ) =>
        setState(prev => ({
            ...prev,
            filteredCities,
        }));

    const handleCityChange = (val: string) => {
        session.updateData({ city: val });
        if (val.trim()) {
            const matches = state.cityList.filter(([name]) =>
=======
    const [filteredCities, setFilteredCities] = useState<
        [string, number, number, string][]
    >([]);

    const handleCityChange = (val: string) => {
        session.updateSearchParams({ city: val });
        if (val.trim()) {
            const matches = city_database.filter(([name]) =>
>>>>>>> 391cf0f (last commit)
                name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredCities(matches.slice(0, 10));
        } else {
            setFilteredCities([]);
        }
    };
<<<<<<< HEAD

    return (
        <div id="kundli-form" className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <button
                                onClick={() =>
                                    session.updateData({ page: "Home" })
                                }
                                className="mr-4 text-purple-600 transition-colors hover:text-purple-800">
                                <FaChevronLeft className="h-6 w-6 text-xl" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Create Kundli
                            </h2>
                        </div>

                        <form className="space-y-6" method="GET" action="">
                            <div className="mb-4 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4 text-base font-medium text-gray-700">
                                <span className="block">Enter Birthdata</span>
                                <span className="text-sm text-gray-600">
                                    कुंडली के लिए जन्म विवरण
                                </span>
                            </div>

                            <input
                                hidden
                                name="page"
                                value="KundliResult"
                                readOnly
                            />

                            <div>
                                <label
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                    htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your full name"
                                    value={
                                        session.data.name !== "User"
                                            ? session.data.name
                                            : ""
                                    }
                                    onChange={e =>
                                        session.updateData({
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                        value={session.data.date}
                                        onChange={e =>
                                            session.updateData({
                                                date: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Time of Birth
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                        value={session.data.time}
                                        onChange={e =>
                                            session.updateData({
                                                time: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Place of Birth
                                </label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                                    id="city"
                                    type="search"
                                    name="city"
                                    value={session.data.city}
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

                                {state.filteredCities.length > 0 && (
                                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                        {state.filteredCities.map(
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
                                                            tznm,
                                                        ] =
                                                            e.currentTarget.id.split(
                                                                "|"
                                                            );
                                                        session.updateData({
                                                            city,
                                                            lat: parseFloat(
                                                                lat
                                                            ),
                                                            lon: parseFloat(
                                                                lon
                                                            ),
                                                            tznm,
                                                            tz: state
                                                                .timezoneMap[
                                                                tznm
                                                            ],
                                                        });
                                                        setFilteredCities([]);
                                                    }}>
                                                    {
                                                        // Highlights a search keyword within text using <strong> tag.
                                                        city
                                                            .split(
                                                                new RegExp(
                                                                    `(${session.data.city})`,
                                                                    "gi"
                                                                )
                                                            )
                                                            .map((part, i) =>
                                                                part.toLowerCase() ===
                                                                session.data.city.toLowerCase() ? (
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
                                            )
                                        )}
                                    </div>
                                )}

                                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-gray-600">
                                    <p className="mb-1">
                                        🏙️ <strong>Tip:</strong> Type your city
                                        in <strong>English</strong> and choose
                                        from the list.
                                    </p>
                                    <p className="mb-1">
                                        📍 If not found, pick the nearest major
                                        city instead.
                                    </p>
                                    <p>
                                        ✅ Select the correct city from the list
                                        to{" "}
                                        <strong>
                                            auto-fill the timezone and
                                            latitude/longitude
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
                                        onChange={e =>
                                            setShowAdvanced(e.target.checked)
                                        }
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
                                                    session.data.tznm,
                                                    session.data.tz
                                                )}
                                                onChange={e => {
                                                    const tznm = e.target.value
                                                        .split("[")[0]
                                                        .trim();
                                                    session.updateData({
                                                        tznm,
                                                        tz: state.timezoneMap[
                                                            tznm
                                                        ],
                                                    });
                                                }}>
                                                {Object.entries(
                                                    state.timezoneMap
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
                                                        session.data.lat || ""
                                                    }
                                                    onChange={e =>
                                                        session.updateData({
                                                            lat: parseFloat(
                                                                e.target.value
                                                            ),
                                                        })
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
                                                        session.data.lon || ""
                                                    }
                                                    onChange={e =>
                                                        session.updateData({
                                                            lon: parseFloat(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    min="-180"
                                                    max="180"
                                                    step="0.00000001"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="ayanamsa"
                                                className="mb-2 block text-sm font-medium text-gray-700">
                                                Choose Ayanamsa
                                            </label>
                                            <select
                                                value={session.data.ayan || ""}
                                                onChange={e =>
                                                    session.updateData({
                                                        ayan: parseInt(
                                                            e.target.value
                                                        ) as AyanamsaModsKey,
                                                    })
                                                }
                                                id="ayanamsa"
                                                name="ayanamsa"
                                                className="w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                                {Object.entries(
                                                    AyanamsaMods
                                                ).map(
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
                    </div>
                </div>
            </div>
        </div>
=======
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
>>>>>>> 391cf0f (last commit)
    );
}
