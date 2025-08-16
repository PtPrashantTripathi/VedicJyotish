import { useSessionContext } from "src/contexts/SessionContext";

export default function KundliMatching() {
    const session = useSessionContext();
    return (
        <div id="matching-form">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-8 card-shadow">
                        <div className="flex items-center mb-6">
                            <button
                                onClick={() =>
                                    session.updateData({ page: "Home" })
                                }
                                className="mr-4 text-red-600 hover:text-red-800">
                                <i className="fas fa-arrow-left text-xl"></i>
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Kundli Matching
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* <!-- Male Details  --> */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                                    Male Details
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="time"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Birth Place"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="Latitude"
                                        />
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="Longitude"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Female Details  --> */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-pink-600">
                                    Female Details
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="time"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Birth Place"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="Latitude"
                                        />
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="Longitude"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                type="button"
                                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                                Check Compatibility
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
