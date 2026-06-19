import React from "react";
import type { ISearchParams } from "src/frontend/utils/parseSearchParams";

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
                className="mb-2 block text-sm font-medium text-slate-600"
                htmlFor={id}>
                {label}
            </label>
            <select
                {...props}
                id={id}
                // Merges the base styles with any custom classes passed in
                className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm transition-colors duration-200 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${props.className ?? ""}`}>
                {children}
            </select>
        </div>
    );
}
