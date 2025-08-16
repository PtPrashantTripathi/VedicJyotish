import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes,
    FaTimesCircle,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useSessionContext } from "src/contexts/SessionContext";
import { ErrorType } from "src/types";

const ErrorStyles: Record<
    ErrorType["type"],
    {
        color: string;
        Icon: IconType;
    }
> = {
    error: { color: "red", Icon: FaTimesCircle },
    warning: { color: "yellow", Icon: FaExclamationTriangle },
    info: { color: "blue", Icon: FaInfoCircle },
    success: { color: "green", Icon: FaCheckCircle },
};

export default function Errors() {
    const session = useSessionContext();
    // Clear errors from session after fade animation
    const clearErrors = () => session.updateData({ error: [] });
    // Auto-hide after 5 seconds
    setTimeout(() => clearErrors(), 5000);
    if (!session.data.error || !session.data.error.length) {
        return null;
    }

    return (
        <>
            {/* Backdrop with dim effect */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                    session.data.error.length ? "opacity-30" : "opacity-0"
                }`}
                onClick={clearErrors}
            />

            {/* Error Modal */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-md transform transition-all duration-300 translate-y-0 opacity-100 scale-100">
                    <div className="bg-white rounded-xl shadow-2xl max-h-96 overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Notifications
                            </h3>
                            <button
                                onClick={clearErrors}
                                className="text-gray-400 hover:text-gray-600 transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Error Messages */}
                        <div className="p-4 space-y-3">
                            {session.data.error.map((error, id) => {
                                const { color, Icon } = ErrorStyles[error.type];
                                return (
                                    <div
                                        key={id}
                                        className={`p-4 rounded-lg mb-3 flex items-start gap-3 shadow-lg border-l-4 animate-slide-in bg-${color}-50 border-${color}}-500 text-${color}-800`}>
                                        <Icon className="text-lg mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium leading-5">
                                                {error.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Auto-hide progress bar */}
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                            <div className="h-full bg-purple-500 rounded-full animate-progress-bar" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
