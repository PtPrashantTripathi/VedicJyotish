import { FaSpinner } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="mx-4 flex max-w-sm flex-col items-center space-y-4 p-8">
                {/* Spinning Icon */}
                <div className="relative">
                    <FaSpinner className="animate-spin text-6xl text-purple-600" />
                    {/* Optional: Add a pulse effect background */}
                    <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-purple-100 opacity-20"></div>
                </div>

                {/* Loading Message */}
                <div className="text-center">
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                        Loading...
                    </h3>
                </div>
            </div>
        </div>
    );
}
