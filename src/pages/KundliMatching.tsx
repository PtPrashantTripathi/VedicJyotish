import { useSessionContext } from "src/contexts/SessionContext";

export default function KundliMatching() {
    const session = useSessionContext();
    return (
        <div id="matching-form">
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-xl bg-white p-8">
                        <div className="mb-6 flex items-center">
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

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* <!-- Male Details  --> */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-blue-600">
                                    Male Details
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                    />
                                    <input
                                        type="time"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                    />
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                        placeholder="Birth Place"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full rounded-lg border border-gray-300 p-3"
                                            placeholder="Latitude"
                                        />
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full rounded-lg border border-gray-300 p-3"
                                            placeholder="Longitude"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Female Details  --> */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-pink-600">
                                    Female Details
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                    />
                                    <input
                                        type="time"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                    />
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 p-3"
                                        placeholder="Birth Place"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full rounded-lg border border-gray-300 p-3"
                                            placeholder="Latitude"
                                        />
                                        <input
                                            type="number"
                                            step="0.0001"
                                            className="w-full rounded-lg border border-gray-300 p-3"
                                            placeholder="Longitude"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                type="button"
                                className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700">
                                Check Compatibility
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
