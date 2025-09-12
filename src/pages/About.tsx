import React from "react";

export default function About() {
    return (
        <section className="space-y-8 p-4 md:p-8">
            {/* --- Section: The Panchang --- */}
            <section className="space-y-6">
                <h2 className="border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    Understanding the Panchang
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    The Hindu calendar is a sun + lunar based system, with each
                    day starting at sunrise. A day is defined by five key
                    "properties" called the{" "}
                    <strong className="text-indigo-600">Panchangas</strong>.
                </p>
                <ul className="nested-lists list-inside list-disc space-y-2 text-lg leading-relaxed text-gray-700">
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Tithi and Paksha:
                        </strong>{" "}
                        <strong className="font-semibold text-gray-900">
                            Tithi
                        </strong>{" "}
                        is a lunar day, and as it changes, so does the phase of
                        the moon. A lunar month is split into two halves, called{" "}
                        <strong className="font-semibold text-gray-900">
                            Pakshas
                        </strong>
                        :
                        <ul className="mt-2 px-4 py-2">
                            <li>
                                <strong className="font-semibold text-gray-900">
                                    Shukla Paksha (Waxing Phase):
                                </strong>{" "}
                                The moon's size increases from Amavasya (new
                                moon) to Purnima (full moon).
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-900">
                                    Krishna Paksha (Waning Phase):
                                </strong>{" "}
                                The moon's size decreases from Purnima to
                                Amavasya.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Vaasara:
                        </strong>{" "}
                        The weekday (e.g., Ravi-vaar, Som-vaar).
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Nakshatra:
                        </strong>{" "}
                        One of 27 lunar constellations the moon resides in at
                        sunrise.
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Yoga:
                        </strong>{" "}
                        One of 27 divisions based on the combined longitude of
                        the sun and moon.
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Karana:
                        </strong>{" "}
                        A half-tithi, active at sunrise.
                    </li>
                </ul>
            </section>

            <hr className="my-8 border-t-2 border-indigo-200" />

            {/* --- Section: Key Astronomical Concepts --- */}
            <section className="space-y-8">
                <h2 className="border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    Key Concepts in Jyotish
                </h2>

                {/* --- Subsection: Rashi & Months --- */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Rashi and Months
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        A{" "}
                        <strong className="font-semibold text-gray-900">
                            Rashi
                        </strong>{" "}
                        is one of the 12 zodiac constellations through which the
                        planets and the sun pass. The name of a lunar month is
                        determined by the Rashi the sun is transiting in. For
                        example, when the sun is in the Mesha Rashi, the lunar
                        month is called Chaitra.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-lg md:grid-cols-4">
                        <span className="rounded-md bg-gray-100 p-2">
                            Mesha
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Vrishabha
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Mithuna
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">Kark</span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Simha
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Kanya
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">Tula</span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Vrishchika
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Dhanu
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Makar
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">
                            Kumbha
                        </span>
                        <span className="rounded-md bg-gray-100 p-2">Meen</span>
                    </div>
                </div>

                {/* --- Subsection: Ayanamsa --- */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Ayanamsa
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        <strong className="font-semibold text-gray-900">
                            Ayanamsa
                        </strong>{" "}
                        is the correction factor for the precession of the
                        Earth's axis. It's the longitudinal difference between
                        the tropical (Sayana) and sidereal (Nirayana) zodiacs.
                        This value is added to planetary longitudes to align
                        them with historical star charts. This application
                        defaults to the Lahiri/Chitrapaksha Ayanamsa, but you
                        can also choose Raman or Krishnamurti (Old) in the
                        settings.
                    </p>
                </div>

                {/* --- Subsection: Rahu and Ketu --- */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Rahu and Ketu
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        In Hindu mythology, Rahu and Ketu are celestial beings
                        blamed for eclipses. Astronomically, they are not
                        planets but the two intersection points (ascending and
                        descending nodes) of the Sun's and Moon's paths on the
                        celestial sphere. An eclipse occurs when the Moon is
                        near one of these nodes during a new moon (for a solar
                        eclipse) or a full moon (for a lunar eclipse).
                    </p>
                    <div className="flex justify-center">
                        <img
                            width="300px"
                            height="200px"
                            src="assets/icon/Raahu-and-Ketu-shown-as-Northern-and-Southern-Lunar-nodes-respectively.png"
                            alt="Diagram showing the nodes of the moon's orbit - src : https://www.researchgate.net/publication/229449364_Meteorological_predictions_preserved_in_the_Panchangam_versus_real-time_observations_-_a_case_study_over_Tirupati_region_-_a_semi-arid_tropical_site_in_India"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            <hr className="my-8 border-t-2 border-indigo-200" />

            {/* --- Section: The Significance of Location --- */}
            <section className="space-y-6">
                <h2 className="border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    Location & Time
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    A place's longitude, latitude, and time zone are crucial for
                    calculating the Panchang, as it's defined relative to the
                    local sunrise. While astronomical events happen
                    simultaneously for all, the local time and sky positions
                    differ significantly. For a broad approximation in India,
                    Ujjain is often used as a reference point.
                </p>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Sunrise and Sunset
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Western astronomy defines sunrise as the moment the
                        sun's upper edge appears above the horizon, accounting
                        for atmospheric refraction. However, Hindu convention
                        defines it as the moment the center of the sun's disk
                        crosses the horizon. This application uses the latter,
                        which can cause a difference of a couple of minutes, a
                        crucial detail for accurate Jyotish calculations.
                    </p>
                </div>
            </section>

            <hr className="my-8 border-t-2 border-indigo-200" />

            {/* --- Section: Kundali and Jyotish Terms --- */}
            <section className="space-y-8">
                <h2 className="border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    Kundali and Jyotish Terms
                </h2>

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Kundali
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        A{" "}
                        <strong className="font-semibold text-gray-900">
                            Kundali
                        </strong>{" "}
                        is a birth chart, a graphical representation of the
                        positions of the planets (Grahas) within the 12 Rashis
                        at the time of birth.
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-lg leading-relaxed text-gray-700">
                        <li>
                            <strong className="font-semibold text-gray-900">
                                Northern Style:
                            </strong>{" "}
                            The Lagna (Ascendant or Rising Rashi) is centered,
                            and the other Rashis are arranged counter-clockwise.
                        </li>
                        <li>
                            <strong className="font-semibold text-gray-900">
                                Southern Style:
                            </strong>{" "}
                            The Rashi positions are fixed. The Lagna is
                            indicated by a cross in its corresponding box.
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Match Making (Kundali Milan)
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        <strong className="font-semibold text-gray-900">
                            Kundali Milan
                        </strong>
                        , or Ashta Koota Milan, is the traditional practice of
                        comparing the birth charts of a bride and groom. This is
                        done on a 36-point scale based on eight criteria, each
                        corresponding to different aspects of the marriage.
                    </p>
                    <ul className="grid list-inside list-disc grid-cols-2 gap-2 text-lg md:grid-cols-4">
                        <li>Varn</li>
                        <li>Vashya</li>
                        <li>Tara</li>
                        <li>Yoni</li>
                        <li>Grah Maitri</li>
                        <li>Gana</li>
                        <li>Bhakoot</li>
                        <li>Nadi</li>
                    </ul>
                </div>
            </section>

            <hr className="my-8 border-t-2 border-indigo-200" />

            {/* --- Section: Other Jyotish Terms --- */}
            <section className="space-y-6">
                <h2 className="border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    Other Key Terms
                </h2>
                <ul className="list-inside space-y-4 text-lg leading-relaxed text-gray-700">
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Hindu Time Units:
                        </strong>{" "}
                        The Hindu day starts at sunrise and is divided into 60{" "}
                        <strong className="font-semibold text-gray-900">
                            Ghatis
                        </strong>{" "}
                        (24 minutes each). A Ghati is 60{" "}
                        <strong className="font-semibold text-gray-900">
                            Pals
                        </strong>
                        , and a Pal is 60{" "}
                        <strong className="font-semibold text-gray-900">
                            Vipals
                        </strong>
                        . Two Ghatis make one{" "}
                        <strong className="font-semibold text-gray-900">
                            Muhurta
                        </strong>
                        .
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Choghadiya & Hora:
                        </strong>{" "}
                        The day and night are each divided into 8 Choghadiyas
                        and 12 Horas, each with its own auspiciousness, used to
                        determine favorable times for starting activities.
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">
                            Lagna:
                        </strong>{" "}
                        The zodiac sign that is rising on the eastern horizon at
                        a specific time.
                    </li>
                </ul>
            </section>

            <section className="space-y-6">
                <h2 className="flex items-center gap-2 border-b-2 border-indigo-200 pb-2 text-3xl font-semibold text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-12 w-12 text-indigo-600">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Contribute & About
                </h2>
                <a
                    href="https://github.com/nielsVoogt/nice-forms.css"
                    className="inline-flex transform items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Check out the Repo
                </a>
                <div className="space-y-6 text-gray-700">
                    <p className="text-xl leading-relaxed">
                        Found a bug or have a suggestion? We'd love your help!
                        Feel free to{" "}
                        <a
                            href="https://github.com/nielsVoogt/nice-forms.css/issues"
                            className="text-indigo-600 hover:underline">
                            open an issue
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://github.com/nielsVoogt/nice-forms.css/pulls"
                            className="text-indigo-600 hover:underline">
                            submit a pull request
                        </a>
                        . Your contribution helps make this project better for
                        everyone.
                    </p>

                    <p className="border-l-4 border-indigo-500 bg-indigo-50 p-4 text-xl text-gray-800 italic">
                        "यथा शिखा मयूराणां नागानां मणयो यथा ।<br />
                        तद्वद्वेदांगशास्त्राणां ज्यौतिषं मूर्धानि स्थितम् ॥ ४॥"
                        <br />
                        <span className="mt-2 block text-sm text-gray-600 not-italic">
                            "Like the regal crest of a peacock or the precious
                            gem on a cobra's hood, Jyotish (Astrology) holds the
                            highest place among the Vedanga Sastras."
                        </span>
                    </p>
                </div>
            </section>
        </section>
    );
}
