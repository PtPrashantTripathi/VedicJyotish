import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes,
    FaTimesCircle,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { useSessionContext } from "src/contexts/SessionContext";

export interface IErrorType {
    type: "error" | "warning" | "info" | "success";
    message: string;
}

const ErrorStyles: Record<
    IErrorType["type"],
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

    // Auto-hide after 5 seconds
    if (!session.error || !session.error.length) {
        return null;
    } else {
        setTimeout(() => session.clearErrors(), 5000);
        return (
            <section>
                {/* Backdrop with dim effect */}
                <div
                    className={`bg-opacity-50 fixed inset-0 z-50 bg-black backdrop-blur-sm transition-opacity duration-300 ${
                        session.error.length ? "opacity-30" : "opacity-0"
                    }`}
                    onClick={session.clearErrors}
                />

                {/* Error Modal */}
                <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-4 pt-16">
                    <div className="pointer-events-auto w-full max-w-md translate-y-0 scale-100 transform opacity-100 transition-all duration-300">
                        <div className="max-h-96 overflow-y-auto rounded-xl bg-white shadow-2xl">
                            {/* Session */}
                            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Notifications
                                </h3>
                                <button
                                    onClick={session.clearErrors}
                                    className="text-gray-400 transition-colors hover:text-gray-600">
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                            {/* Error Messages */}
                            <div className="space-y-3 p-4">
                                {session.error.map((error, id) => {
                                    const { color, Icon } =
                                        ErrorStyles[error.type];
                                    return (
                                        <div
                                            key={id}
                                            className={`animate-slide-in mb-3 flex items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg bg-${color}-50 border-${color}}-500 text-${color}-800`}>
                                            <Icon className="mt-0.5 flex-shrink-0 text-lg" />
                                            <div className="flex-1">
                                                <p className="text-sm leading-5 font-medium">
                                                    {error.message}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Auto-hide progress bar */}
                            <div className="h-1 w-full rounded-full bg-gray-200">
                                <div className="animate-progress-bar h-full rounded-full bg-purple-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
