import "src/style/global.css";

<<<<<<< HEAD
// import { lazy } from "react";
=======
>>>>>>> 391cf0f (last commit)
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

<<<<<<< HEAD
// const KundliResult = lazy(() => import("src/pages/KundliResult"));

=======
>>>>>>> 391cf0f (last commit)
export default function App() {
    const session = useSessionState();
    return (
        <SessionContext value={session}>
            <Header />
            <div
                onClick={() => session.setNav(false)}
                className={
                    "fixed inset-0 z-40 bg-black/40 opacity-0 transition-opacity duration-300" +
                    (session.nav ? " opacity-100" : " pointer-events-none")
                }></div>
            <Navigation />
<<<<<<< HEAD
            <main className="mx-auto">
                <Errors />
                {session.data.page === "Home" ? (
                    <Home />
                ) : session.data.page === "Panchang" ? (
                    <Panchang />
                ) : session.data.page === "KundliForm" ? (
                    <KundliForm />
                ) : session.data.page === "KundliResult" ? (
                    <KundliResult />
                ) : session.data.page === "MonthlyCalendar" ? (
                    <MonthlyCalendar />
                ) : session.data.page === "KundliMatching" ? (
                    <KundliMatching />
                ) : session.data.page === "HinduTime" ? (
                    <HinduTime />
                ) : session.data.page === "Settings" ? (
                    <Settings />
                ) : session.data.page === "About" ? (
=======
            <main className="container mx-auto px-4 py-8">
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
>>>>>>> 391cf0f (last commit)
                    <About />
                ) : (
                    <section>
                        <h3>ERROR 404</h3>
                    </section>
                )}
            </main>

            {/* <DATEDETAILSPAGE /> */}

            <Footer />
        </SessionContext>
    );
}
