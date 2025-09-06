import { useSessionContext } from "src/contexts/SessionContext";
export default function Settings() {
    const session = useSessionContext();
    return (
        <div id="settings">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center">
                    <button
                        onClick={() => session.updateData({ page: "Home" })}
                        className="mr-4 text-gray-600 hover:text-gray-800">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Settings
                    </h2>
                </div>

                <div className="mx-auto max-w-2xl space-y-6">
                    {/* <!-- Location Settings  --> */}
                    <div className="rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-purple-600">
                            Location Settings
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Azamgarh"
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue="26.0685"
                                        step="0.0001"
                                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue="83.1840"
                                        step="0.0001"
                                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Timezone
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-purple-500">
                                    <option>IST (UTC +5:30)</option>
                                    <option>EST (UTC -5:00)</option>
                                    <option>PST (UTC -8:00)</option>
                                    <option>GMT (UTC +0:00)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Language & Display  --> */}
                    <div className="rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-blue-600">
                            Language & Display
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Language
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                                    <option>English</option>
                                    <option>हिंदी (Hindi)</option>
                                    <option>বাংলা (Bengali)</option>
                                    <option>தமிழ் (Tamil)</option>
                                    <option>తెలుగు (Telugu)</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Calendar System
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                                    <option>Gregorian + Hindu</option>
                                    <option>Hindu Only</option>
                                    <option>Gregorian Only</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Show Hindu Months
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={true}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    24-Hour Time Format
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Calculation Settings  --> */}
                    <div className="rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-green-600">
                            Calculation Settings
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Ayanamsha
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500">
                                    <option>Lahiri (Chitrapaksha)</option>
                                    <option>Raman</option>
                                    <option>Krishnamurti</option>
                                    <option>True Chitrapaksha</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    House System
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500">
                                    <option>Placidus</option>
                                    <option>Koch</option>
                                    <option>Equal House</option>
                                    <option>Whole Sign</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Use True Node (Rahu/Ketu)
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={true}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Notifications  --> */}
                    <div className="rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-orange-600">
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Daily Panchang Reminder
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={true}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-orange-600 peer-focus:ring-4 peer-focus:ring-orange-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Festival Alerts
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={true}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-orange-600 peer-focus:ring-4 peer-focus:ring-orange-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Muhurat Reminders
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-orange-600 peer-focus:ring-4 peer-focus:ring-orange-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Save Button  --> */}
                    <div className="text-center">
                        <button className="rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700">
                            <i className="fas fa-save mr-2"></i>
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
