import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "src/app";
import SwissEPH from "sweph-wasm";

globalThis.swe = await SwissEPH.init("./assets/swisseph.wasm");
// Path to Swiss Ephemeris data files.
await swe.swe_set_ephe_path("./assets/ephe", [
    "seas_18.se1",
    "sepl_18.se1",
    "semo_18.se1",
    "sefstars.txt",
]);

// Use createRoot to render the React application to the DOM.
createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
