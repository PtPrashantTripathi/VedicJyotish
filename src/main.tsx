import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "src/app";
import SwissEPH from "sweph-wasm/index";

const swe = await SwissEPH.init();

// Path to Swiss Ephemeris data files.
await swe.swe_set_ephe_path("./ephe", [
    "seas_18.se1",
    "sepl_18.se1",
    "semo_18.se1",
    "sefstars.txt",
]);

createRoot(document.body).render(
    <StrictMode>
        <App swe={swe} />
    </StrictMode>
);
