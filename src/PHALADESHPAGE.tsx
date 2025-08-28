export default function component({
    showPage,
}: {
    showPage(pageId: string): void;
}) {
    return (
        <div id="phaladesh-page">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center">
                    <button
                        onClick={() => showPage("home")}
                        className="mr-4 text-green-600 hover:text-green-800">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Phaladesh (Predictions)
                    </h2>
                </div>

                <div className="space-y-6">
                    {/* <!-- General Predictions  --> */}
                    <div className="card-shadow rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-purple-600">
                            General Life Predictions
                        </h3>
                        <div className="prose max-w-none">
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Your 10th house Mars suggests careers in
                                engineering, technology, defense, or management.
                                You have natural leadership qualities and will
                                excel in positions of authority.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Financial stability will come after the age of
                                30. Multiple income sources are indicated.
                                Investments in property and stocks will prove
                                beneficial during Jupiter's transit.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Avoid partnerships in business during Saturn's
                                transit. Focus on skill development and higher
                                education for better career prospects.
                            </p>
                        </div>
                    </div>

                    {/* <!-- Career Predictions  --> */}
                    <div className="card-shadow rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-blue-600">
                            Career & Finance
                        </h3>
                        <div className="prose max-w-none">
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Your birth chart indicates a strong Jupiter in
                                the 1st house, which blesses you with wisdom,
                                knowledge, and spiritual inclinations. This
                                placement suggests that you are naturally
                                optimistic and have a philosophical approach to
                                life.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Mars in the 10th house indicates strong career
                                prospects and leadership abilities. You are
                                likely to achieve success through your own
                                efforts and determination. Your professional
                                life will see significant growth between the
                                ages of 28-35.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Venus in the 7th house suggests a harmonious
                                married life and good relationships with
                                partners. You may attract a spouse who is
                                artistic or involved in creative fields.
                            </p>
                        </div>
                    </div>

                    {/* <!-- Health Predictions  --> */}
                    <div className="card-shadow rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-red-600">
                            Health & Well-being
                        </h3>
                        <div className="prose max-w-none">
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Sun in the 6th house indicates good vitality and
                                resistance to diseases. However, you should be
                                cautious about digestive issues and maintain a
                                balanced diet.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Regular exercise and yoga practice will keep you
                                healthy. Avoid stress-related activities during
                                Mercury's unfavorable transit.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Wearing a yellow sapphire during Jupiter's
                                mahadasha will enhance your immunity and overall
                                well-being.
                            </p>
                        </div>
                    </div>

                    {/* <!-- Marriage & Family  --> */}
                    <div className="card-shadow rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-pink-600">
                            Marriage & Family
                        </h3>
                        <div className="prose max-w-none">
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Venus in the 7th house indicates a loving and
                                supportive spouse. Marriage is likely to happen
                                between ages 25-28. Your life partner will be
                                understanding and contribute to your success.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Children will be a source of joy and pride. Your
                                first child is likely to be academically
                                inclined and may pursue higher studies abroad.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Family relationships will be harmonious. Parents
                                will be supportive of your decisions and
                                contribute to your growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
