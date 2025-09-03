import { DateTime } from "luxon";
import { Kundli } from "src/services/Kundli";
import SwissEPH from "sweph-wasm/index";
import { StringPointer } from "wasp-lib/index";

const swe = await SwissEPH.init();

// Path to Swiss Ephemeris data files.
await swe.swe_set_ephe_path("./ephe", [
    "seas_18.se1",
    "sepl_18.se1",
    "semo_18.se1",
    "sefstars.txt",
]);

const session = {
    data: {
        page: "KundliResult",
        date: "2025-09-03",
        time: "12:14:57",
        tz: 5.5,
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayanamsa: "Lahiri",
    },
    nav: false,
    error: [],
};

const result = await Kundli(
    DateTime.fromISO(`${session.data.date}T${session.data.time}`, {
        zone: session.data.tz_name,
    }) as DateTime<true>,
    session.data.lon,
    session.data.lat
);

const myElement = document.getElementById("output") as HTMLElement | null;

if (myElement) {
    // Now myElement is known to be an HTMLElement
    myElement.textContent = JSON.stringify(result, null, 2);
}

const test = StringPointer.from(swe.wasm, 10); //, "prashant");

function get_string(memory: WebAssembly.Memory, addr: number, _length: number) {
    const buffer = new Uint8Array(
        memory.buffer,
        addr,
        memory.buffer.byteLength - addr
    );
    const term = buffer.indexOf(0);

    return new TextDecoder().decode(buffer.subarray(0, term));
}

console.log(get_string(swe.wasm.wasmMemory, test.ptr, test.length));
console.log(test.read());
