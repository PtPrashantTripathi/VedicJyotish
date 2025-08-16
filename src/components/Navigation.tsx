import { FaTimes } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages/pageDetails";

export default function Navigation() {
    const session = useSessionContext();

    return (
        <aside
            className={
                "fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-white shadow-xl transform transition-transform duration-300 z-50" +
                (session.data.nav ? "" : " -translate-x-full")
            }>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <a href={"?page=Home"} className="flex items-center space-x-3">
                    <img
                        src="icon/android-chrome-192x192.png"
                        className="h-6 w-6 text-blue-700"
                    />
                    <span className="text-xl font-semibold">
                        Hindu Calendar
                    </span>
                </a>
                <button
                    id="closeDrawerBtn"
                    onClick={() => session.updateData({ nav: false })}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-label="Close menu">
                    <FaTimes className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation List */}
            <nav className="p-3">
                <ul className="flex flex-col font-medium rounded-lg space-y-1">
                    {pageDetails.map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={"?page=" + item.page}
                                className={`flex items-center gap-3 py-2 px-3 rounded-sm cursor-pointer transition-colors ${
                                    item.page === session.data.page
                                        ? "text-white bg-blue-700"
                                        : "text-gray-900 hover:bg-gray-100"
                                }`}
                                aria-current={
                                    item.page === session.data.page
                                        ? "page"
                                        : undefined
                                }>
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
