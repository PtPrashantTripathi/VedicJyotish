import { FaBars } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages/pageDetails";

export default function Header() {
    const session = useSessionContext();

    const pageDetail = pageDetails[session.data.page];
    return (
        <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 flex items-center space-x-3 lg:mb-0">
                        <button
                            className="rounded-lg bg-white/10 p-2 backdrop-blur-sm"
                            id="openDrawerBtn"
                            onClick={() => session.setNav(true)}
                            type="button"
                            aria-expanded={!session.nav}
                            aria-controls="drawer"
                            aria-label="Open main menu">
                            <FaBars title="abc" />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                                <pageDetail.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold lg:text-3xl">
                                    {pageDetail.title}
                                </h1>
                                <p className="text-sm text-purple-100">
                                    {pageDetail.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
