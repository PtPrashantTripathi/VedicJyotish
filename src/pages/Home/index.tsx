import { pageDetails } from "src/pages";

export default function Home() {
    return (
        <div className="py-4 md:py-8">
            <div className="mx-auto max-w-7xl px-1">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
                    <p className="text-sm font-medium text-sky-600">
                        Dashboard
                    </p>
                    <h2 className="mt-1 text-3xl font-bold text-slate-900">
                        Astrology Services
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                        अपने ज्योतिषीय विश्लेषण, पंचांग और दैनिक गणनाओं के लिए
                        किसी भी सेवा का चयन करें।
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Object.entries(pageDetails)
                        .filter(([, detail]) => detail.nav)
                        .map(([pageId, detail]) => {
                            return (
                                <a href={`?page=${pageId}`} key={pageId}>
                                    <div className="group h-full cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
                                        <div className="mb-4 flex items-center justify-between">
                                            <detail.icon
                                                className={
                                                    detail.icon.name.startsWith(
                                                        "Svg"
                                                    )
                                                        ? "h-11 w-11"
                                                        : "h-7 w-7 text-sky-600"
                                                }
                                            />
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                                Open
                                            </span>
                                        </div>

                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            {detail.title}
                                        </h3>

                                        <p className="mb-4 text-sm leading-relaxed text-slate-500">
                                            {detail.description}
                                        </p>

                                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 group-hover:border-sky-200 group-hover:text-sky-700">
                                            {detail.actionMessage}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
