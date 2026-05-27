import { FaBars } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages";

export default function Header() {
    const session = useSessionContext();

    const detail = pageDetails[session.searchParams.page];
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                        id="openDrawerBtn"
                        onClick={() => session.setNav(true)}
                        type="button"
                        aria-expanded={!session.nav}
                        aria-controls="drawer"
                        aria-label="Open main menu">
                        <FaBars title="abc" />
                    </button>

                    <div
                        className={
                            "flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50" +
                            (detail.icon.name.startsWith("Svg")
                                ? ""
                                : " text-sky-600")
                        }>
                        <detail.icon
                            className={
                                detail.icon.name.startsWith("Svg")
                                    ? "h-9 w-9"
                                    : "h-5 w-5"
                            }
                        />
                    </div>
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold text-slate-900 md:text-xl">
                        {detail.title}
                    </h1>
                    <p className="truncate text-xs text-slate-500 md:text-sm">
                        {detail.subtitle}
                    </p>
                </div>

                <div className="ml-auto hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:block">
                    Vedic Jyotish
                </div>
            </div>
        </header>
    );
}
