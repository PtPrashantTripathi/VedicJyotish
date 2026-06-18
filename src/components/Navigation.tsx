import { FaTimes } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages";

const BOTTOM_NAV_PAGES = [
    "Home",
    "Panchang",
    "MonthlyCalendar",
    "KundliForm",
    "KundliMatching",
    "Settings",
] as const;

export default function Navigation() {
    const session = useSessionContext();
    const currentPage = session.searchParams.page;

    return (
        <>
            {/* ── Side Drawer ── */}
            <aside
                className={
                    "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col shadow-2xl transition-transform duration-300" +
                    (session.nav ? "" : " -translate-x-full")
                }
                style={{
                    background:
                        "linear-gradient(180deg, #7D1B2E 0%, #4A0F1C 100%)",
                }}>
                <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}>
                    <a href="/" className="flex items-center gap-2.5">
                        <img
                            src="assets/icon/icon-192x192.png"
                            className="h-9 w-9 rounded-xl"
                            style={{
                                border: "1px solid rgba(255,255,255,0.3)",
                            }}
                        />
                        <div>
                            <p className="text-sm font-bold text-white">
                                वैदिक ज्योतिष
                            </p>
                            <p className="text-[11px] text-white/55">
                                Vedic Astronomy
                            </p>
                        </div>
                    </a>
                    <button
                        id="closeDrawerBtn"
                        onClick={() => session.setNav(false)}
                        className="rounded-full p-2 text-white/75 transition hover:bg-white/15"
                        aria-label="Close menu">
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3">
                    {Object.entries(pageDetails)
                        .filter(([, d]) => d.nav)
                        .map(([pageId, pageDetail]) => {
                            const isActive = pageId === currentPage;
                            return (
                                <button
                                    key={pageId}
                                    onClick={() => {
                                        session.updateSearchParams({
                                            page: pageId,
                                        });
                                        session.setNav(false);
                                    }}
                                    className="mb-0.5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                                    style={{
                                        background: isActive
                                            ? "rgba(255,255,255,0.22)"
                                            : "transparent",
                                        color: isActive
                                            ? "#FFF8F0"
                                            : "rgba(255,255,255,0.7)",
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                    aria-current={
                                        isActive ? "page" : undefined
                                    }>
                                    <pageDetail.icon
                                        className="h-4 w-4 shrink-0"
                                        color="currentColor"
                                    />
                                    <span className="text-sm">
                                        {pageDetail.title}
                                    </span>
                                </button>
                            );
                        })}
                </nav>

                <div
                    className="px-4 py-3 text-center"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    <p className="text-[10px] text-white/35">
                        © 2025 Vedic Jyotish • Made with ♥ in India
                    </p>
                </div>
            </aside>

            {/* ── Bottom Navigation Bar ── */}
            <nav
                className="fixed right-0 bottom-0 left-0 z-30 flex"
                style={{
                    background:
                        "linear-gradient(0deg, #A33507 0%, #D4480A 100%)",
                    borderTop: "1px solid #C8A88C",
                    height: "var(--c-bottom-h, 60px)",
                }}>
                {BOTTOM_NAV_PAGES.map(pageId => {
                    const detail = pageDetails[pageId];
                    const isActive = pageId === currentPage;
                    return (
                        <button
                            key={pageId}
                            onClick={() =>
                                session.updateSearchParams({ page: pageId })
                            }
                            className="flex flex-1 flex-col items-center justify-center gap-0.5 px-1 transition-all"
                            style={{
                                color: isActive
                                    ? "#FFFFFF"
                                    : "rgba(255,255,255,0.55)",
                                background: isActive
                                    ? "rgba(255,255,255,0.12)"
                                    : "transparent",
                            }}>
                            <detail.icon
                                className="h-5 w-5 shrink-0"
                                color="currentColor"
                            />
                            <span className="max-w-full truncate text-[9px] font-medium">
                                {detail.title.split(" ")[0]}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
