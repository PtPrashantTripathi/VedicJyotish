import pako from "pako";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ayanamsaNames } from "src/backend/Ayanamsa";
import { useSessionContext } from "src/contexts/SessionContext";
import { formatTimezoneOffset } from "src/utils/formatTimezoneOffset";

export default function KundliForm() {
    const session = useSessionContext();
    const [showAdvanced, setShowAdvanced] = useState(false);

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
        fetch("database/city_database.cjson")
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
        fetch("database/tz_offset.json")
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
                name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredCities(matches.slice(0, 10));
        } else {
            setFilteredCities([]);
        }
    };

    return (
        <div id="kundli-form" className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex items-center mb-6">
                            <button
                                onClick={() =>
                                    session.updateData({ page: "Home" })
                                }
                                className="mr-4 text-purple-600 hover:text-purple-800 transition-colors">
                                <FaChevronLeft className="text-xl w-6 h-6" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Create Kundli
                            </h2>
                        </div>

                        <form className="space-y-6" method="GET" action="">
                            <div className="text-base font-medium text-gray-700 mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time of Birth
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Place of Birth
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {state.filteredCities.map(
                                            ([city, lat, lon, tz], idx) => (
                                                <div
                                                    key={idx}
                                                    id={`${city}|${lat}|${lon}|${tz}`}
                                                    className="p-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0"
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
                                                        session.updateData({
                                                            city,
                                                            lat: parseFloat(
                                                                lat
                                                            ),
                                                            lon: parseFloat(
                                                                lon
                                                            ),
                                                            tz_name,
                                                            tz: state
                                                                .timezoneMap[
                                                                tz_name
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

                                <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
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
                                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="advanced_options_switch"
                                        className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Advanced Options
                                    </label>
                                </div>

                                {showAdvanced && (
                                    <div className="mt-6 space-y-6 p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <label
                                                htmlFor="tz"
                                                className="block text-sm font-medium text-gray-700 mb-2">
                                                TimeZone
                                            </label>
                                            <select
                                                id="tz"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                                value={formatTimezoneOffset(
                                                    session.data.tz_name,
                                                    session.data.tz
                                                )}
                                                onChange={e => {
                                                    const tz_name =
                                                        e.target.value
                                                            .split("[")[0]
                                                            .trim();
                                                    session.updateData({
                                                        tz_name,
                                                        tz: state.timezoneMap[
                                                            tz_name
                                                        ],
                                                    });
                                                }}>
                                                {Object.entries(
                                                    state.timezoneMap
                                                ).map(
                                                    ([tz_name, tz_offset]) => {
                                                        const formattedTimezone =
                                                            formatTimezoneOffset(
                                                                tz_name,
                                                                tz_offset
                                                            );
                                                        return (
                                                            <option
                                                                key={tz_name}
                                                                value={
                                                                    formattedTimezone
                                                                }>
                                                                {
                                                                    formattedTimezone
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Latitude
                                                </label>
                                                <input
                                                    id="lat"
                                                    name="lat"
                                                    type="number"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Longitude
                                                </label>
                                                <input
                                                    id="lon"
                                                    name="lon"
                                                    type="number"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                                                className="block text-sm font-medium text-gray-700 mb-2">
                                                Choose Ayanamsa
                                            </label>
                                            <select
                                                value={
                                                    session.data.ayanamsa || ""
                                                }
                                                onChange={e =>
                                                    session.updateData({
                                                        ayanamsa:
                                                            e.target.value,
                                                    })
                                                }
                                                id="ayanamsa"
                                                name="ayanamsa"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors">
                                                {ayanamsaNames.map(name => (
                                                    <option
                                                        key={name}
                                                        value={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-semibold">
                                    Generate Kundli
                                </button>
                                <button
                                    type="reset"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
