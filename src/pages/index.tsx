import {
    FaCalendarAlt,
    FaClock,
    FaCog,
    FaHeartbeat,
    FaHome,
    FaInfoCircle,
    FaSun,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import KundliSVG from "src/icons/kundli.svg?react";

export type ValidPageType =
    | "Home"
    | "Panchang"
    | "KundliForm"
    | "KundliResult"
    | "MonthlyCalendar"
    | "KundliMatching"
    | "HinduTime"
    | "Settings"
    | "About";

export interface PageDetail {
    icon: IconType | React.FC<React.ComponentProps<"svg">>;
    title: string;
    subtitle: string;
    description: string;
    nav: boolean;
    actionMessage: string; // New optional field for action buttons
}

export const pageDetails: Record<ValidPageType, PageDetail> = {
    Home: {
        icon: FaHome,
        title: "मुख्य पृष्ठ",
        subtitle: "वैदिक ज्योतिष और पंचांग",
        description:
            "वैदिक ज्योतिष और भारतीय पंचांग के बारे में जानकारी प्राप्त करें",
        nav: true,
        actionMessage: "एक्सप्लोर करें",
    },
    Panchang: {
        icon: FaSun,
        title: "दैनिक पंचांग",
        subtitle: "आज का शुभ-अशुभ मुहूर्त, योग, करण",
        description:
            "किसी भी तिथि का विस्तृत पंचांग देखें, जिसमें शुभ और अशुभ समय शामिल है",
        nav: true,
        actionMessage: "पंचांग देखें",
    },
    MonthlyCalendar: {
        icon: FaCalendarAlt,
        title: "मासिक कैलेंडर",
        subtitle: "मास, पक्ष, तिथि और त्यौहार",
        description:
            "किसी भी महीने के लिए हिन्दू त्योहारों, तिथियों और पंचांग विवरणों को देखें",
        nav: true,
        actionMessage: "कैलेंडर देखें",
    },
    KundliForm: {
        icon: KundliSVG,
        title: "कुंडली बनाएं",
        subtitle: "जन्म विवरण से कुंडली विश्लेषण",
        description:
            "अपने जन्म विवरण के आधार पर अपनी संपूर्ण जन्म कुंडली और ग्रह स्थिति उत्पन्न करें",
        nav: true,
        actionMessage: "कुंडली बनाएं",
    },
    KundliResult: {
        icon: KundliSVG,
        title: "कुंडली विश्लेषण",
        subtitle: "ग्रह स्थिति, दशा, महादशा, और लग्न",
        description: "",
        nav: false,
        actionMessage: "परिणाम सहेजें",
    },
    KundliMatching: {
        icon: FaHeartbeat,
        title: "कुंडली मिलान",
        subtitle: "विवाह और संबंधों के लिए गुण मिलान",
        description:
            "विवाह के लिए दो भागीदारों के बीच संगतता और गुण मिलान की जाँच करें",
        nav: true,
        actionMessage: "मिलान करें",
    },
    HinduTime: {
        icon: FaClock,
        title: "हिन्दू समय",
        subtitle: "इष्टकाल और घटी विधि की गणना",
        description:
            "इष्टकाल और घटी विधि का उपयोग करके पारंपरिक हिन्दू समय अवधि की गणना करें",
        nav: true,
        actionMessage: "समय की गणना करें",
    },
    Settings: {
        icon: FaCog,
        title: "सेटिंग्स",
        subtitle: "स्थान और पसंदीदा भाषा बदलें",
        description: "अपने स्थान, भाषा और अन्य पसंदों को कॉन्फ़िगर करें",
        nav: true,
        actionMessage: "सेटिंग्स सहेजें",
    },
    About: {
        icon: FaInfoCircle,
        title: "हमारे बारे में",
        subtitle: "वैदिक ज्योतिष ऐप का परिचय",
        description:
            "इस एप्लिकेशन के बारे में अधिक जानें और यह आपकी कैसे मदद कर सकता है",
        nav: true,
        actionMessage: "और जानें",
    },
};

