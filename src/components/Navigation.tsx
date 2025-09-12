import { FaTimes } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages";

export default function Navigation() {
    const session = useSessionContext();

    return (
        <aside
            className={
                "fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] transform bg-white shadow-xl transition-transform duration-300" +
                (session.nav ? "" : " -translate-x-full")
            }>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <a href={"/"} className="flex items-center space-x-3">
                    <img
                        src="assets/icon/icon-192x192.png"
                        className="h-6 w-6 text-blue-700"
                    />
                    <span className="text-xl font-semibold">
                        Vedic Astronomy
                    </span>
                </a>
                <button
                    id="closeDrawerBtn"
                    onClick={() => session.setNav(false)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    aria-label="Close menu">
                    <FaTimes className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation List */}
            <nav className="p-3">
                <ul className="flex flex-col space-y-1 rounded-lg font-medium">
                    {Object.entries(pageDetails)
                        .filter(value => value[1].nav)
                        .map(([pageId, pageDetail]) => (
                            <li key={pageId}>
                                <a
                                    onClick={() =>
                                        session.updateData({
                                            page: pageId,
                                        })
                                    }
                                    className={`flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 transition-colors ${
                                        pageId === session.data.page
                                            ? "bg-blue-700 text-white"
                                            : "text-gray-900 hover:bg-gray-100"
                                    }`}
                                    aria-current={
                                        pageId === session.data.page
                                            ? "page"
                                            : undefined
                                    }>
                                    <pageDetail.icon
                                        className="h-5 w-5"
                                        color="#FF8C00"
                                    />
                                    <span>{pageDetail.title}</span>
                                </a>
                            </li>
                        ))}
                </ul>
            </nav>
        </aside>
    );
}
