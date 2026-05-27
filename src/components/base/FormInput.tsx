import React from "react";
import type { ISearchParams } from "src/utils/parseSearchParams";

/** Standardized component for all form inputs to ensure visual consistency. */
export default function FormInput({
    label,
    id, // Destructure id to use it in htmlFor
    ...props
}: React.JSX.IntrinsicElements["input"] & {
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
            <input
                {...props}
                id={id}
                // Merges the base styles with any custom classes passed in
                className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm transition-colors duration-200 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${props.className ?? ""}`}
            />
        </div>
    );
}
