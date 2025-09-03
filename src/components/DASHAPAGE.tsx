export default function component({
    showPage,
}: {
    showPage(pageId: string): void;
}) {
    /** Show dasha details (placeholder for future implementation) */
    function showDashaDetails(planet: string) {
        alert(
            `Showing detailed ${planet} dasha information. This will be implemented with your backend integration.`
        );
    }
    return (
        <div id="dasha-page">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center">
                    <button
                        onClick={() => showPage("home")}
                        className="mr-4 text-blue-600 hover:text-blue-800">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Vimshottari Dasha
                    </h2>
                </div>

                <div className="card-shadow rounded-xl bg-white p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                                        Mahadasha
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                                        End Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                                        Duration
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-purple-600">
                                        Jupiter (Guru)
                                    </td>
                                    <td className="px-4 py-3">15 Mar 2024</td>
                                    <td className="px-4 py-3">15 Mar 2040</td>
                                    <td className="px-4 py-3">16 Years</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() =>
                                                showDashaDetails("jupiter")
                                            }
                                            className="text-blue-600 hover:text-blue-800">
                                            <i className="fas fa-eye"></i> View
                                            Details
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-red-600">
                                        Saturn (Shani)
                                    </td>
                                    <td className="px-4 py-3">15 Mar 2040</td>
                                    <td className="px-4 py-3">15 Mar 2059</td>
                                    <td className="px-4 py-3">19 Years</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() =>
                                                showDashaDetails("saturn")
                                            }
                                            className="text-blue-600 hover:text-blue-800">
                                            <i className="fas fa-eye"></i> View
                                            Details
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-green-600">
                                        Mercury (Budh)
                                    </td>
                                    <td className="px-4 py-3">15 Mar 2059</td>
                                    <td className="px-4 py-3">15 Mar 2076</td>
                                    <td className="px-4 py-3">17 Years</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() =>
                                                showDashaDetails("mercury")
                                            }
                                            className="text-blue-600 hover:text-blue-800">
                                            <i className="fas fa-eye"></i> View
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 rounded-lg bg-blue-50 p-6">
                        <h3 className="mb-3 text-lg font-semibold text-blue-800">
                            Current Running Dasha
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Mahadasha
                                </p>
                                <p className="font-semibold text-purple-600">
                                    Jupiter
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Antardasha
                                </p>
                                <p className="font-semibold text-orange-600">
                                    Venus
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Pratyantardasha
                                </p>
                                <p className="font-semibold text-green-600">
                                    Mars
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
