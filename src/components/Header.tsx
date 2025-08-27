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
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                        <button
                            className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                            id="openDrawerBtn"
                            onClick={() => session.updateData({ nav: true })}
                            type="button"
                            aria-expanded={!session.data.nav}
                            aria-controls="drawer"
                            aria-label="Open main menu">
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <pageDetail.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold">
                                    {pageDetail.title}
                                </h1>
                                <p className="text-purple-100 text-sm">
                                    {pageDetail.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold">
                                {currentTime.toLocaleTimeString("en-IN", {
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </div>
                            <div className="text-purple-200 text-sm flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {session.data.city}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Share2 size={18} />
                            </button>
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
