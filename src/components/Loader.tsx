import { FaSpinner } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="fixed inset-0 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
                {/* Spinning Icon */}
                <div className="relative">
                    <FaSpinner className="text-6xl text-purple-600 animate-spin" />
                    {/* Optional: Add a pulse effect background */}
                    <div className="absolute inset-0 rounded-full bg-purple-100 opacity-20 animate-pulse -z-10"></div>
                </div>

                {/* Loading Message */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Loading...
                    </h3>
                </div>
            </div>
        </div>
    );
}
