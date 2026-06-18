import "src/style/global.css";

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

export default function App() {
    const session = useSessionState();
    return (
        <SessionContext value={session}>
            <div className="min-h-screen" style={{ background: "var(--c-bg)", color: "var(--c-text)" }}>
                <Header />
                <div
                    onClick={() => session.setNav(false)}
                    className={
                        "fixed inset-0 z-40 bg-black/50 opacity-0 transition-opacity duration-300" +
                        (session.nav ? " opacity-100" : " pointer-events-none")
                    }></div>
                <Navigation />
                <main className="mx-auto w-full max-w-7xl px-3 py-4 pb-24 md:px-5 md:py-6 md:pb-24">
                    <Errors />

                    {session.searchParams.page === "Home" ? (
                        <Home />
                    ) : session.searchParams.page === "Panchang" ? (
                        <Panchang />
                    ) : session.searchParams.page === "KundliForm" ? (
                        <KundliForm />
                    ) : session.searchParams.page === "KundliResult" ? (
                        <KundliResult />
                    ) : session.searchParams.page === "MonthlyCalendar" ? (
                        <MonthlyCalendar />
                    ) : session.searchParams.page === "KundliMatching" ? (
                        <KundliMatching />
                    ) : session.searchParams.page === "HinduTime" ? (
                        <HinduTime />
                    ) : session.searchParams.page === "Settings" ? (
                        <Settings />
                    ) : session.searchParams.page === "About" ? (
                        <About />
                    ) : (
                        <section>
                            <h3>ERROR 404</h3>
                        </section>
                    )}
                </main>

                {/* <DATEDETAILSPAGE /> */}

                <Footer />
            </div>
        </SessionContext>
    );
}
