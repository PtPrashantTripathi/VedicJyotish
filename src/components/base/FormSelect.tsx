import React from "react";
import type { ISearchParams } from "src/utils/parseSearchParams";

/** Standardized component for all form selects to ensure visual consistency. */
export default function FormSelect({
    label,
    children,
    id,
    ...props
}: React.JSX.IntrinsicElements["select"] & {
    name: keyof ISearchParams;
    id: keyof ISearchParams;
    label: string;
}) {
    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor={id}>
                {label}
            </label>
            <select
                {...props}
                id={id}
                // Merges the base styles with any custom classes passed in
                className={`w-full rounded-lg border border-gray-300 p-3 transition-colors duration-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 ${props.className ?? ""}`}>
                {children}
            </select>
        </div>
    );
}
