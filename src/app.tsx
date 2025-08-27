import "src/style/global.css";

// import { lazy } from "react";
import Errors from "src/components/Errors";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Navigation from "src/components/Navigation";
import { SessionContext } from "src/contexts/SessionContext";
import { useSessionState } from "src/hooks/useSessionState";
import About from "src/pages/About";
import HinduTime from "src/pages/HinduTime";
import Home from "src/pages/Home";
import KundliForm from "src/pages/KundliForm";
import KundliMatching from "src/pages/KundliMatching";
import KundliResult from "src/pages/KundliResult";
import MonthlyCalendar from "src/pages/MonthlyCalendar";
import Panchang from "src/pages/Panchang";
import Settings from "src/pages/Settings";

// const KundliResult = lazy(() => import("src/pages/KundliResult"));

export default function App() {
    const session = useSessionState();

    return (
        <SessionContext value={session}>
            <Header />
            <div
                onClick={() => session.updateData({ nav: false })}
                className={
                    "fixed inset-0 bg-black/40 opacity-0 transition-opacity duration-300 z-40" +
                    (session.data.nav ? " opacity-100" : " pointer-events-none")
                }></div>
            <Navigation />

            <main>
                <Errors />
                {session.data.page === "KundliForm" ? (
                    <KundliForm />
                ) : session.data.page === "KundliResult" ? (
                    <KundliResult />
                ) : session.data.page === "KundliMatching" ? (
                    <KundliMatching />
                ) : session.data.page === "About" ? (
                    <About />
                ) : session.data.page === "Panchang" ? (
                    <Panchang />
                ) : session.data.page === "MonthlyCalendar" ? (
                    <MonthlyCalendar />
                ) : session.data.page === "Settings" ? (
                    <Settings />
                ) : session.data.page === "HinduTime" ? (
                    <HinduTime />
                ) : session.data.page === "Home" ? (
                    <Home />
                ) : (
                    <section>
                        <h3>ERROR 404</h3>
                    </section>
                )}
            </main>

            {/* <DASHAPAGE showPage={showPage} /> */}
            {/* <PHALADESHPAGE showPage={showPage} /> */}

            {/* <DATEDETAILSPAGE /> */}

            <Footer />
        </SessionContext>
    );
}
