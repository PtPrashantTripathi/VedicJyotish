import { DateTime } from "luxon";
import type { AyanamsaModsValue } from "src/services/constants/AyanamsaMods";
import type { HouseSystemValue } from "src/services/constants/HouseSystems";
<<<<<<< HEAD
import { parseValidTimezoneName } from "src/utils/parseTimezone";
import { parseValidAyanamsaName } from "src/utils/parseValidAyanamsaName";
import { parseValidBool } from "src/utils/parseValidBool";
import { parseValidDegree } from "src/utils/parseValidDegree";
import { parseValidHouseSystemName } from "src/utils/parseValidHouseSystem";
=======
import { parseValidAyanamsaName } from "src/utils/validators/parseValidAyanamsaName";
import { parseValidBool } from "src/utils/validators/parseValidBool";
import { parseValidDateTime } from "src/utils/validators/parseValidDateTime";
import { parseValidDegree } from "src/utils/validators/parseValidDegree";
import { parseValidGender } from "src/utils/validators/parseValidGender";
import { parseValidHouseSystemName } from "src/utils/validators/parseValidHouseSystem";
import { parseValidLanguage } from "src/utils/validators/parseValidLanguage";
import { parseValidTimezoneName } from "src/utils/validators/parseValidTimezone";
>>>>>>> 391cf0f (last commit)

/** Defines the structure of valid storage parameters and component state. */
export interface IStorageValues {
    /** User name */
<<<<<<< HEAD
    name: string;
=======
    username: string;
    /** User Gender */
    gender: "M" | "F";
>>>>>>> 391cf0f (last commit)
    /** Date - ISO string in this 2025-09-12T06:16:06.637+05:30 format */
    dob: DateTime<true>;
    /** Tz_name - Timezone name (e.g., "Asia/Kolkata") */
    tz_name: string;
    /** City - City name with location details */
    city: string;
    /** Lat - Latitude coordinate */
    lat: number;
    /** Lon - Longitude coordinate */
    lon: number;
    /** Ayanamsa - Ayanamsa calculation method */
<<<<<<< HEAD
    ayanamsa: AyanamsaModsValue;
    language: "Hindi" | "English";
    true_node: boolean;
    house_sys: HouseSystemValue;
=======
    ayanamsa_mod: AyanamsaModsValue;
    language: "Hindi" | "English";
    true_node: boolean;
    /** House System - calculation method */
    house_sys: HouseSystemValue;
    /** Flag */
>>>>>>> 391cf0f (last commit)
    default: boolean;
}

/**
 * Reads and validates storage parameters from localStorage, providing sensible
 * defaults for any missing or invalid values.
 *
 * @returns {IStorageValues} Parsed storage parameters with fallback defaults
 */
export function parseStorageValues(): IStorageValues {
    /**
     * Default storage parameters with sensible fallback values. Used when
     * localStorage parameters are missing or invalid.
     */
    const storageValues: IStorageValues = {
<<<<<<< HEAD
        name: "User",
=======
        username: "User",
>>>>>>> 391cf0f (last commit)
        dob: DateTime.now(),
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
<<<<<<< HEAD
        ayanamsa: "Lahiri",
        language: "Hindi",
        true_node: true,
        house_sys: "Placidus",
=======
        ayanamsa_mod: "Lahiri",
        language: "Hindi",
        true_node: true,
        house_sys: "Placidus",
        gender: "M",
>>>>>>> 391cf0f (last commit)
        default: true,
    };

    Object.keys(storageValues).forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                switch (key) {
<<<<<<< HEAD
                    case "dob": {
                        const dob = DateTime.fromISO(value);
                        if (dob.isValid) {
                            storageValues.dob = dob;
                        } else {
                            throw new Error("Invalid date format");
                        }
                        break;
                    }
=======
                    case "username":
                        storageValues.username = value.trim();
                        break;
                    case "dob":
                        storageValues.dob = parseValidDateTime(value);
                        break;
>>>>>>> 391cf0f (last commit)
                    case "tz_name":
                        storageValues.tz_name = parseValidTimezoneName(value);
                        break;
                    case "city":
<<<<<<< HEAD
                    case "name":
                        storageValues[key] = value;
                        break;
                    case "lat":
                    case "lon":
                        // Use the external validation function
                        storageValues[key] = parseValidDegree(value, key);
                        break;
                    case "ayanamsa":
                        // Use the external validation function
                        storageValues.ayanamsa =
                            parseValidAyanamsaName(value).value;
                        break;
                    case "language":
                        // Check if the language is one of the valid options
                        if (value === "Hindi" || value === "English") {
                            storageValues.language = value;
                        } else {
                            throw new Error("Invalid language value");
                        }
=======
                        storageValues.city = value.trim();
                        break;
                    case "lat":
                        storageValues.lat = parseValidDegree(value, "lat");
                        break;
                    case "lon":
                        storageValues.lon = parseValidDegree(value, "lon");
                        break;
                    case "ayanamsa_mod":
                        storageValues.ayanamsa_mod =
                            parseValidAyanamsaName(value).value;
                        break;
                    case "language":
                        storageValues.language = parseValidLanguage(value);
>>>>>>> 391cf0f (last commit)
                        break;
                    case "true_node":
                        storageValues.true_node = parseValidBool(value);
                        break;
<<<<<<< HEAD
                    case "default":
                        storageValues.default = parseValidBool(value);
                        break;
                    case "house_sys":
                        // Validate that the house system is one of the defined values
                        storageValues.house_sys =
                            parseValidHouseSystemName(value).value;
                        break;
=======
                    case "house_sys":
                        storageValues.house_sys =
                            parseValidHouseSystemName(value).value;
                        break;
                    case "gender":
                        storageValues.gender = parseValidGender(value);
                        break;
                    case "default":
                        storageValues.default = parseValidBool(value);
                        break;
>>>>>>> 391cf0f (last commit)
                }
            } catch (error) {
                console.warn(
                    `Invalid ${key} parameter: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }
    });
<<<<<<< HEAD
    setStorageValues(storageValues);
    return storageValues;
}

export function setStorageValues(storageValues: Partial<IStorageValues>) {
=======
    saveStorageValues(storageValues);
    return storageValues;
}

export function saveStorageValues(storageValues: Partial<IStorageValues>) {
>>>>>>> 391cf0f (last commit)
    Object.entries(storageValues).forEach(([key, value]) =>
        localStorage.setItem(key, String(value))
    );
}
