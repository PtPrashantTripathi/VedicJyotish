const rashiNames = [
    "मेष",
    "वृषभ",
    "मिथुन",
    "कर्क",
    "सिंह",
    "कन्या",
    "तुला",
    "वृश्चिक",
    "धनु",
    "मकर",
    "कुम्भ",
    "मीन",
];
const tithiNames = [
    "प्रतिपदा, शुक्ल पक्ष",
    "द्वितीया, शुक्ल पक्ष",
    "तृतीया, शुक्ल पक्ष",
    "चतुर्थी, शुक्ल पक्ष",
    "पञ्चमी, शुक्ल पक्ष",
    "षष्ठी, शुक्ल पक्ष",
    "सप्तमी, शुक्ल पक्ष",
    "अष्टमी, शुक्ल पक्ष",
    "नवमी, शुक्ल पक्ष",
    "दशमी, शुक्ल पक्ष",
    "एकादशी, शुक्ल पक्ष",
    "द्वादशी, शुक्ल पक्ष",
    "त्रयोदशी, शुक्ल पक्ष",
    "चतुर्दशी, शुक्ल पक्ष",
    "पूर्णिमा, शुक्ल पक्ष",
    "प्रतिपदा, कृष्ण पक्ष",
    "द्वितीया, कृष्ण पक्ष",
    "तृतीया, कृष्ण पक्ष",
    "चतुर्थी, कृष्ण पक्ष",
    "पञ्चमी, कृष्ण पक्ष",
    "षष्ठी, कृष्ण पक्ष",
    "सप्तमी, कृष्ण पक्ष",
    "अष्टमी, कृष्ण पक्ष",
    "नवमी, कृष्ण पक्ष",
    "दशमी, कृष्ण पक्ष",
    "एकादशी, कृष्ण पक्ष",
    "द्वादशी, कृष्ण पक्ष",
    "त्रयोदशी, कृष्ण पक्ष",
    "चतुर्दशी, शुक्ल पक्ष",
    "अमावस्या",
];

const padaNames = [
    "चु",
    "चे",
    "चो",
    "ला",
    "ली",
    "लू",
    "ले",
    "लो",
    "अ",
    "ई",
    "उ",
    "ए ",
    "ओ",
    "वा",
    "वी",
    "वु",
    "वे",
    "वो",
    "का",
    "की",
    "कु",
    "घ",
    "ङ",
    "छ",
    "के",
    "को",
    "हा",
    "ही ",
    "हु",
    "हे",
    "हो",
    "ड ",
    "डी",
    "डू",
    "डे",
    "डो",
    "मा",
    "मी",
    "मू",
    "मे",
    "मो ",
    "टा",
    "टी",
    "टू",
    "टे",
    "टो",
    "पा",
    "पी",
    "पू",
    "ष",
    "ण",
    "ठ",
    "पे",
    "पो",
    "रा",
    "री",
    "रू",
    "रे",
    "रो",
    "ता",
    "ती",
    "तू",
    "ते",
    "तो",
    "ना",
    "नी",
    "नू",
    "ने",
    "नो",
    "या",
    "यी",
    "यू",
    "ये",
    "यो",
    "भा",
    "भी",
    "भू",
    "धा",
    "फा",
    "ढा",
    "भे",
    "भो",
    "जा",
    "जी",
    "खी",
    "खू",
    "खे",
    "खो",
    "गा",
    "गी",
    "गु",
    "गे",
    "गो",
    "सा",
    "सी",
    "सू",
    "से",
    "सो",
    "दा",
    "दी",
    "दू",
    "थ",
    "झ",
    "ञ",
    "दे",
    "दो",
    "च",
    "ची",
];

const nakshatraNames = [
    "अश्विनी",
    "भरणी",
    "कृत्तिका",
    "रोहिणी",
    "मृगशिरा",
    "आर्द्रा",
    "पुनर्वसु",
    "पुष्य",
    "आश्लेषा",
    "मघा",
    "पूर्वा फाल्गुनी",
    "उत्तरा फाल्गुनी",
    "हस्त",
    "चित्रा",
    "स्वाति",
    "विशाखा",
    "अनुराधा",
    "ज्येष्ठा",
    "मूल",
    "पूर्वाषाढा",
    "उत्तराषाढा",
    "श्रवण",
    "धनिष्ठा",
    "शतभिषा",
    "पूर्वा भाद्रपदा",
    "उत्तरा भाद्रपदा",
    "रेवती",
];
var yogaNames = [
    "विश्कुम्भ",
    "प्रीति",
    "आयुष्मान",
    "सौभाग्य",
    "शोभन",
    "अतिगंड",
    "सुकर्मा",
    "धृति",
    "शूल",
    "गण्ड",
    "वृद्वि",
    "ध्रुव",
    "व्याघात",
    "हर्शण",
    "वज्र",
    "सिद्वि",
    "व्यतापता",
    "वरियान",
    "परिघ",
    "शिव",
    "सिद्ध",
    "साध्य",
    "शुभ",
    "शुक्ल",
    "ब्रह्म",
    "ऐन्द्र",
    "वैधृति",
];
var daysOfWeek = [
    "रविवार",
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
];
var karan_list = [
    "किन्स्तुघ्न",
    "बव",
    "बालव",
    "कौलव",
    "तैतुल",
    "गर",
    "वणिज",
    "विष्टि भद्र",
    "शकुनी",
    "चतुष्पद",
    "नागव",
];

/**
 * Calculates and returns basic Panchang details as an HTML string. Uses the
 * planet data stored from the last drawWheel call.
 *
 * @param {Date} date - The date for which to calculate Vaar (day of week).
 * @returns {string} HTML string with Panchang details.
 */
function getPanchang(date, grahaData) {
    if (!date || isNaN(date.getTime())) return "Invalid Date";
    if (!grahaData || grahaData.length === 0) {
        return "Planet data not available for Panchang.";
    }

    const sun = grahaData.find(p => p.id === "sun");
    const moon = grahaData.find(p => p.id === "moon");

    if (!sun || !moon || isNaN(sun.longitude) || isNaN(moon.longitude)) {
        return "पंचांग गणना हेतु सूर्य/चंद्र डेटा अपूर्ण है।";
    }

    // Tithi (0-29 index)
    const tithiAngle = (moon.longitude - sun.longitude + 360) % 360;
    const tithiIndex = Math.floor(tithiAngle / 12);

    // Nakshatra (0-26 index)
    const nakshatraIndex = Math.floor(moon.longitude / (360 / 27));

    // Yoga (0-26 index)
    const yogaAngle = (moon.longitude + sun.longitude) % 360; // Sum of longitudes
    const yogaIndex = Math.floor(yogaAngle / (360 / 27));

    // Karana (complex logic based on tithi half)
    const karanaNum = Math.floor(tithiAngle / 6); // Index 0-59
    const karanaName = getKaran(karanaNum); // Use the function from panchang.js

    // Vaar (Day of week, 0 = Sunday)
    const vaarIndex = date.getDay(); // Use the provided date for the day

    return `<b>पञ्चाङ्ग</b><br>
        <b>तिथि:</b> ${tithiNames[tithiIndex] || "?"}<br>
        <b>वार:</b> ${daysOfWeek[vaarIndex] || "?"}<br>
        <b>नक्षत्र:</b> ${nakshatraNames[nakshatraIndex] || "?"}<br>
        <b>योग:</b> ${yogaNames[yogaIndex] || "?"}<br>
        <b>करण:</b> ${karanaName || "?"}`;
}

function julianCenturies(jd) {
    const J2000 = 2451545.0; // Julian Day for J2000.0 noon UT
    // The formula calculates centuries from J2000.0
    var jd;
    return (jd - J2000) / 36525.0;
}
function getAyanamsa(date, sayan = false) {
    if (sayan) return 0;

    //TODO Correct Julian day . mismatch of few days
    var jd = daysSinceKaliYugaStart(date) + 588465;
    const t = julianCenturies(jd); // ASSUMING julianCenturies(tee) exists
    // Calculate Mean Lunar Node (Longitude of the ascending node)
    const ln = 125.044555 - 1934.1361849 * t + 0.0020762 * t * t;
    // Calculate Mean Sun longitude
    let off = 280.466449 + 36000.7698231 * t + 0.0003106 * t * t;
    // Calculate the precession correction term (in arcseconds initially)
    // Note: Math.sin in JavaScript expects radians, so we convert ln and off
    off =
        17.23 * Math.sin((ln * Math.PI) / 180) +
        1.27 * Math.sin((off * Math.PI) / 180) - // Use the 'off' calculated just above
        (5025.64 + 1.11 * t) * t;

    // Apply final offset and scale from arcseconds to degrees
    off = (off - 85886.27) / 3600.0;

    //console.log(date+" " +off);
    return Math.round(off * 1000) / 1000;
}
function getKaran(karan) {
    const n = karan + 1;
    if (n === 1) {
        return karan_list[0];
    }
    if (n > 57) {
        return karan_list[n - 50];
    }
    if ((n - 1) % 7 === 0) {
        return karan_list[7];
    }
    return karan_list[(n - 1) % 7];
}

/**
 * Calculates the number of full days passed since the start of Kali Yuga
 * (defined as Feb 18, 3102 BCE 00:00:00 UTC for this calculation).
 *
 * @param {Date} currentDate The date object for which to calculate the elapsed
 *   days.
 * @returns {number} The number of full days elapsed, or NaN if input is
 *   invalid. Returns negative if currentDate is before the Kali Yuga start.
 */
function daysSinceKaliYugaStart(currentDate) {
    if (!currentDate || isNaN(currentDate.getTime())) {
        console.error("Invalid date provided to daysSinceKaliYugaStart");
        return NaN; // Return Not-a-Number for invalid input
    }

    // Define the start date: Feb 18, 3102 BCE 05:30:00 UTC
    // Note: Year 3102 BCE is represented as -3101 in JavaScript Date UTC.
    // Month 1 is February (0-indexed).

    const kaliYugaStartTimestampUTC = new Date(-3101, 1, 18, 0, 0, 0, 0);
    //Date.UTC(-3101, 1, 17, 5, 30, 0, 0);

    // Get the timestamp for the input date (getTime() always returns UTC milliseconds since epoch)
    const currentTimestampUTC = currentDate.getTime();

    // Calculate the difference in milliseconds
    const differenceInMs = currentTimestampUTC - kaliYugaStartTimestampUTC;

    // Milliseconds per day (constant)
    const msPerDay = 1000 * 60 * 60 * 24; // 86,400,000

    // Calculate the number of full days using Math.floor
    // This counts completed 24-hour periods since the start time.
    const elapsedDays = Math.floor(differenceInMs / msPerDay);
    const elapsedTime = ((differenceInMs % msPerDay) / msPerDay).toFixed(4);
    return elapsedDays + Number(elapsedTime);
}
/** Calcualte Ascendant in degrees in Sayan */
function calculateAscendant(lst, ecliptic, location) {
    const latitude = (location.lat * Math.PI) / 180;
    // const longitude = location.lon*Math.PI/180;
    var ascendant = Math.atan2(
        -Math.cos(lst),
        Math.sin(lst) * Math.cos(ecliptic) +
            Math.tan(latitude) * Math.sin(ecliptic)
    );
    //midheaven = Math.atan2(Math.tan(lst),Math.cos(ecliptic))
    if (ascendant < Math.PI) ascendant = ascendant + Math.PI;
    else ascendant = ascendant - Math.PI;
    return (ascendant * 180) / Math.PI;
}
