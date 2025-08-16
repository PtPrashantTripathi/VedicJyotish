import type { IconType } from "react-icons/lib";

export type ValidPageType =
    | "Home"
    | "Panchang"
    | "KundliForm"
    | "KundliResult"
    | "Information"
    | "MonthlyCalendar"
    | "Festivals"
    | "MyTithi"
    | "KundliMatching"
    | "Muhurta"
    | "HinduTime"
    | "Settings"
    | "About";

export interface ErrorType {
    type: "error" | "warning" | "info" | "success";
    message: string;
}

export interface SearchParams {
    page: ValidPageType;
    date: string;
    time: string;
    tz: number;
    tz_name: string;
    city: string;
    lat: number;
    lon: number;
    ayanamsa: string;
}
export interface SessionData extends SearchParams {
    error: ErrorType[];
    nav: boolean;
}
export interface SessionState {
    data: SessionData;
    /**
     * Updates session data.
     *
     * @param input - Partial update to the session state.
     */
    updateData: (data: Partial<SessionData>) => void;
    setData: React.Dispatch<React.SetStateAction<SessionData>>;
    sortURL: () => string;
}
export interface PageDetail {
    icon: IconType;
    page: ValidPageType;
    title: string;
    subtitle: string;
}
