import pako from "pako";
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

// Fetches a city data.gz zipped JSON file and decompresses it to an JSON object.
fetch("assets/database/city_database.cjson")
    .then(response => response.arrayBuffer())
    .then(data => {
        globalThis.city_database = JSON.parse(
            pako.ungzip(new Uint8Array(data), {
                to: "string",
            })
        );
    })
    .catch(error => {
        throw Error(`Error fetching or decompressing JSON: ${error}`);
    });

// Load timezone data from JSON
fetch("assets/database/tz_offset.json")
    .then(res => res.json())
    .then(data => {
        globalThis.timezone_database = data;
    })
    .catch(err => {
        throw Error(`Failed to fetch tz_offset data: ${err}`);
    });

// Use createRoot to render the React application to the DOM.
createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
