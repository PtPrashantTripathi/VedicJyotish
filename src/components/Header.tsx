import { MapPin, Menu, Settings, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages/pageDetails";

export default function Header() {
    const session = useSessionContext();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const pageDetail = pageDetails[session.data.page];
    return (
        <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 flex items-center space-x-3 lg:mb-0">
                        <button
                            className="rounded-lg bg-white/10 p-2 backdrop-blur-sm"
                            id="openDrawerBtn"
                            onClick={() => session.updateData({ nav: true })}
                            type="button"
                            aria-expanded={!session.data.nav}
                            aria-controls="drawer"
                            aria-label="Open main menu">
                            <Menu size={24} />
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

                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <div className="font-mono text-2xl font-bold">
                                {currentTime.toLocaleTimeString("en-IN", {
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </div>
                            <div className="flex items-center text-sm text-purple-200">
                                <MapPin size={14} className="mr-1" />
                                {session.data.city}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                                <Share2 size={18} />
                            </button>
                            <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
