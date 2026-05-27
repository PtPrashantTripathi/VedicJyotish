import { FaTimes } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages";

export default function Navigation() {
    const session = useSessionContext();

    return (
        <aside
            className={
                "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform border-r border-slate-200 bg-[#f8fbff] shadow-xl transition-transform duration-300" +
                (session.nav ? "" : " -translate-x-full")
            }>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                <a href={"/"} className="flex items-center space-x-3">
                    <img
                        src="assets/icon/icon-192x192.png"
                        className="h-8 w-8 rounded-xl border border-slate-200 bg-white p-1"
                    />
                    <span className="text-lg font-semibold text-slate-800">
                        Vedic Astronomy
                    </span>
                </a>
                <button
                    id="closeDrawerBtn"
                    onClick={() => session.setNav(false)}
                    className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-200 focus:outline-none"
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
                                        session.updateSearchParams({
                                            page: pageId,
                                        })
                                    }
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                                        pageId === session.searchParams.page
                                            ? "bg-sky-600 text-white shadow-sm"
                                            : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                    aria-current={
                                        pageId === session.searchParams.page
                                            ? "page"
                                            : undefined
                                    }>
                                    <pageDetail.icon
                                        className="h-5 w-5"
                                        color={
                                            pageId === session.searchParams.page
                                                ? "#ffffff"
                                                : "#0284c7"
                                        }
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
