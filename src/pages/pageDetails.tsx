import {
    FaCalendarAlt,
    FaClock,
    FaCog,
    FaHeartbeat,
    FaHome,
    FaInfoCircle,
    FaSun,
} from "react-icons/fa";
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
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    subtitle: string;
    nav: boolean;
}

export const pageDetails: Record<ValidPageType, PageDetail> = {
    Home: {
        icon: FaHome,
        title: "मुख्य पृष्ठ",
        subtitle: "वैदिक ज्योतिष और पंचांग",
        nav: true,
    },
    Panchang: {
        icon: FaSun,
        title: "दैनिक पंचांग",
        subtitle: "आज का शुभ-अशुभ मुहूर्त, योग, करण",
        nav: true,
    },
    MonthlyCalendar: {
        icon: FaCalendarAlt,
        title: "मासिक कैलेंडर",
        subtitle: "मास, पक्ष, तिथि और त्यौहार",
        nav: true,
    },
    KundliForm: {
        icon: KundliSVG,
        title: "कुंडली बनाएं",
        subtitle: "जन्म विवरण से कुंडली विश्लेषण",
        nav: true,
    },
    KundliResult: {
        icon: KundliSVG,
        title: "कुंडली विश्लेषण",
        subtitle: "ग्रह स्थिति, दशा, महादशा, और लग्न",
        nav: false,
    },
    KundliMatching: {
        icon: FaHeartbeat,
        title: "कुंडली मिलान",
        subtitle: "विवाह और संबंधों के लिए गुण मिलान",
        nav: true,
    },
    HinduTime: {
        icon: FaClock,
        title: "हिन्दू समय",
        subtitle: "इष्टकाल और घटी विधि की गणना",
        nav: true,
    },
    Settings: {
        icon: FaCog,
        title: "सेटिंग्स",
        subtitle: "स्थान और पसंदीदा भाषा बदलें",
        nav: true,
    },
    About: {
        icon: FaInfoCircle,
        title: "हमारे बारे में",
        subtitle: "वैदिक ज्योतिष ऐप का परिचय",
        nav: true,
    },
};
