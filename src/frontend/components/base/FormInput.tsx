import React from "react";
import type { ISearchParams } from "src/frontend/utils/parseSearchParams";

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
                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                style={{ color: "var(--c-text-2)" }}
                htmlFor={id}>
                {label}
            </label>
            <input
                {...props}
                id={id}
                // Merges the base styles with any custom classes passed in
                className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition-colors duration-200 outline-none placeholder:text-[var(--c-text-m)] ${props.className ?? ""}`}
                style={{
                    background: "var(--c-surface)",
                    borderColor: "var(--c-border-s)",
                    color: "var(--c-text)",
                }}
                onFocus={e => {
                    e.currentTarget.style.borderColor = "var(--c-primary)";
                    e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(212,163,115,0.12)";
                }}
                onBlur={e => {
                    e.currentTarget.style.borderColor = "var(--c-border-s)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            />
        </div>
    );
}
