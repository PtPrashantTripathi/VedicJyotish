import { FaBars } from "react-icons/fa";
import { useSessionContext } from "src/contexts/SessionContext";
export default function Header() {
    const session = useSessionContext();
    return (
        <header className="border-b border-gray-200 bg-gray-50">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a
                    href={"?page=Home"}
                    className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="icon/android-chrome-192x192.png"
                        className="h-6 w-6 text-blue-700"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        Vedic Kundli
                    </span>
                </a>

                {/* <!-- Hamburger  --> */}
                <button
                    id="openDrawerBtn"
                    onClick={() => session.updateData({ nav: true })}
                    type="button"
                    className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-expanded={!session.data.nav}
                    aria-controls="drawer"
                    aria-label="Open main menu">
                    <FaBars className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
