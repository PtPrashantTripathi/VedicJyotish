import {
    FaCalendarAlt,
    FaClock,
    FaCog,
    FaInfoCircle,
    FaOm,
    FaRegCalendarAlt,
    FaStar,
    FaStudiovinari,
    FaUsers,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";

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
    icon: IconType;
    page: ValidPageType;
    title: string;
    subtitle: string;
}

export const pageDetails: Record<ValidPageType, PageDetail> = {
    MonthlyCalendar: {
        icon: FaCalendarAlt,
        title: "मासिक",
        subtitle: "माह के पक्ष एवं तिथि",
        page: "MonthlyCalendar",
    },
    Panchang: {
        icon: FaRegCalendarAlt,
        title: "दैनिक पञ्चाङ्ग",
        subtitle: "Today's Panchang Details",
        page: "Panchang",
    },

    KundliForm: {
        icon: FaStar,
        title: "कुंडली",
        subtitle: "ग्रह स्थिति, लग्न",
        page: "KundliForm",
    },
    KundliMatching: {
        icon: FaUsers,
        title: "कुंडली मिलान",
        subtitle: "गुण मिलान, अष्टकूट",
        page: "KundliMatching",
    },
    HinduTime: {
        icon: FaClock,
        title: "हिन्दू समय",
        subtitle: "इष्टकाल, घटी विधि",
        page: "HinduTime",
    },
    Settings: {
        icon: FaCog,
        title: "सेटिंग्स",
        subtitle: "स्थान और पसंद बदलें",
        page: "Settings",
    },
    About: {
        icon: FaInfoCircle,
        title: "जानकारी",
        subtitle: "हिन्दू कैलेंडर के बारे में",
        page: "About",
    },
    Home: {
        icon: FaOm,
        title: "वैदिक ज्योतिष",
        subtitle: "Vedic Astrology",
        page: "About",
    },
    KundliResult: {
        icon: FaStudiovinari,
        title: "KundliResult",
        subtitle: "KundliResult",
        page: "KundliResult",
    },
};
