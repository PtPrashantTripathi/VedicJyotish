import { useSessionContext } from "src/contexts/SessionContext";
import { pageDetails } from "src/pages";

export default function Home() {
    const session = useSessionContext();

    return (
        <div id="home-page">
            {/* <!-- Feature Buttons  --> */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
                        Astrology Services
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(pageDetails)
                            .filter(([, detail]) => detail.nav)
                            .map(([pageId, detail]) => {
                                return (
                                    <div
                                        key={pageId}
                                        className="cursor-pointer rounded-xl bg-white p-6"
                                        onClick={() =>
                                            session.updateData({ page: pageId })
                                        }>
                                        <div className="text-center">
                                            <div
                                                className={
                                                    "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" +
                                                    (detail.icon.name.startsWith(
                                                        "Svg"
                                                    )
                                                        ? ""
                                                        : " bg-gradient-to-br from-orange-600 to-amber-500 shadow-lg")
                                                }>
                                                <detail.icon
                                                    className={
                                                        detail.icon.name.startsWith(
                                                            "Svg"
                                                        )
                                                            ? "h-10 w-10"
                                                            : "h-6 w-6 text-4xl text-white drop-shadow-md"
                                                    }
                                                />
                                            </div>

                                            <h3 className="mb-3 text-xl font-semibold text-gray-800">
                                                {detail.title}
                                            </h3>

                                            <p className="mb-4 text-gray-600">
                                                {detail.description}
                                            </p>

                                            <button className="rounded-full bg-purple-600 px-6 py-2 text-white transition-all hover:bg-purple-700 hover:shadow-md">
                                                {detail.subtitle}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
