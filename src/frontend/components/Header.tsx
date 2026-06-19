import { FaBars } from "react-icons/fa";
import { useSessionContext } from "src/frontend/contexts/SessionContext";
import { pageDetails } from "src/frontend/pages";

export default function Header() {
    const session = useSessionContext();
    const detail = pageDetails[session.searchParams.page];

    return (
        <header
            className="sticky top-0 z-30 shadow-md"
            style={{
                background:
                    "linear-gradient(135deg, #6B5245 0%, #4A3B32 55%, #2E2520 100%)",
            }}>
            <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-3 py-2.5 md:px-5">
                <button
                    id="openDrawerBtn"
                    onClick={() => session.setNav(true)}
                    type="button"
                    aria-expanded={session.nav}
                    aria-controls="drawer"
                    aria-label="Open main menu"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 active:bg-white/25">
                    <FaBars className="h-4 w-4" />
                </button>

                <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(255,255,255,0.18)" }}>
                    <detail.icon
                        className={
                            detail.icon.name?.startsWith("Svg")
                                ? "h-6 w-6"
                                : "h-4 w-4"
                        }
                        color="#FDFBF7"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-base leading-tight font-bold text-white">
                        {detail.title}
                    </h1>
                    <p className="truncate text-[11px] leading-tight text-white/70">
                        {detail.subtitle}
                    </p>
                </div>

                <span
                    className="hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white/90 sm:block"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
                    ॐ वैदिक ज्योतिष
                </span>
            </div>
        </header>
    );
}
