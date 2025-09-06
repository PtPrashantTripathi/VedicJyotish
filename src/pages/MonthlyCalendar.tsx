import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function MonthlyCalendar() {
    return (

        <div className="container mx-auto pt-4">
            {/* Main Content */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Panel - Day Details */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b bg-gray-50 p-4">
                            <h4
                                className="text-lg font-semibold text-gray-800"
                                id="day_info">
                                Sat Sep 06 2025
                            </h4>
                            <div className="mt-2 flex items-center">
                                <img className="mr-2" height={32} width={32} src='./assets/moon/moon8.png' />
                                <div
                                    className="text-sm text-gray-600"
                                    id="selected_tithi">
                                    चतुर्दशी, शुक्ल
                                    <br />
                                    भाद्रपद, 2082 विश्वावसु
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <table
                                className="w-full text-sm"
                                id="tithi_details">
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            तिथि
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            चतुर्दशी
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            नक्षत्र
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            शतभिष, गो
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            योग
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            सुकर्मा
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            करण
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            वाणिज
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            वार
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            रविवार
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            माह
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            भाद्रपद शुक्ल पक्ष
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            वर्ष
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            2082 विश्वावसु
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            चंद्रमा राशि
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            ♒ कुंभ
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्य राशि
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            ♌ सिंह
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्योदय
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            06:12:18
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-2 text-gray-600">
                                            सूर्यास्त
                                        </td>
                                        <td className="py-2 font-medium text-green-700">
                                            18:37:23
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Calendar */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border bg-white shadow-sm">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                September 2025
                            </h2>
                            <div className="flex space-x-2">
                                <button
                                    className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    id="prev-month">
                                    <FaArrowLeft />
                                </button>
                                <button
                                    className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    id="next-month">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="p-4">
                            {/* Days of week header */}
                            <div className="mb-2 grid grid-cols-7 gap-1">
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Sun
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Mon
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Tue
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Wed
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Thu
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Fri
                                </div>
                                <div className="p-2 text-center text-sm font-medium text-gray-600">
                                    Sat
                                </div>
                            </div>

                            {/* Calendar days */}
                            <div
                                className="grid grid-cols-7 gap-1"
                                id="calendar-grid">
                                {/* Week 1 */}
                                <div className="h-20 cursor-pointer rounded border p-1 text-gray-400 hover:bg-gray-50">
                                    <div className="text-sm">31</div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        1
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            अष्टमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        2
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            नवमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        3
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            दशमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        4
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            एकादशी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        5
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            द्वादशी
                                        </div>
                                    </div>
                                </div>
                                <div className="today-highlight h-20 cursor-pointer rounded border border-yellow-300 p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        6
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            चतुर्दशी
                                        </div>
                                    </div>
                                </div>

                                {/* Week 2 */}
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        7
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            प्रथम
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        8
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            द्वितीया
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        9
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            तृतीया
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        10
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            चतुर्थी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        11
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            पंचमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        12
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            षष्ठी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        13
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            सप्तमी
                                        </div>
                                    </div>
                                </div>

                                {/* Week 3 */}
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        14
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            अष्टमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        15
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            नवमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        16
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            दशमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        17
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            द्वादशी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        18
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            त्रयोदशी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        19
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            चतुर्दशी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        20
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            चतुर्दशी
                                        </div>
                                    </div>
                                </div>

                                {/* Week 4 */}
                                <div className="amavasya-highlight h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        21
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            अमावस्या
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        22
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            प्रथम
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        23
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            द्वितीया
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        24
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            तृतीया
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        25
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            चतुर्थी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        26
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            पंचमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        27
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            षष्ठी
                                        </div>
                                    </div>
                                </div>

                                {/* Week 5 */}
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        28
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            सप्तमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        29
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            अष्टमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 hover:bg-gray-50">
                                    <div className="text-sm font-medium">
                                        30
                                    </div>
                                    <div className="text-center text-xs">
                                        <img className="mx-auto mb-1 scale-75" height={32} width={32} src='./assets/moon/moon8.png' />
                                        <div className="text-xs">
                                            नवमी
                                        </div>
                                    </div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 text-gray-400 hover:bg-gray-50">
                                    <div className="text-sm">1</div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 text-gray-400 hover:bg-gray-50">
                                    <div className="text-sm">2</div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 text-gray-400 hover:bg-gray-50">
                                    <div className="text-sm">3</div>
                                </div>
                                <div className="h-20 cursor-pointer rounded border p-1 text-gray-400 hover:bg-gray-50">
                                    <div className="text-sm">4</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div >
    );
}
