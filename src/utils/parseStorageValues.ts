import { DateTime } from "luxon";
import type { AyanamsaModsValue } from "src/services/constants/AyanamsaMods";
import type { HouseSystemValue } from "src/services/constants/HouseSystems";
import { parseValidTimezoneName } from "src/utils/parseTimezone";
import { parseValidAyanamsaName } from "src/utils/parseValidAyanamsaName";
import { parseValidBool } from "src/utils/parseValidBool";
import { parseValidDegree } from "src/utils/parseValidDegree";
import { parseValidHouseSystemName } from "src/utils/parseValidHouseSystem";

/** Defines the structure of valid storage parameters and component state. */
export interface IStorageValues {
    /** User name */
    name: string;
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
    ayanamsa: AyanamsaModsValue;
    language: "Hindi" | "English";
    true_node: boolean;
    house_sys: HouseSystemValue;
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
        name: "User",
        dob: DateTime.now(),
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayanamsa: "Lahiri",
        language: "Hindi",
        true_node: true,
        house_sys: "Placidus",
        default: true,
    };

    Object.keys(storageValues).forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                switch (key) {
                    case "dob": {
                        const dob = DateTime.fromISO(value);
                        if (dob.isValid) {
                            storageValues.dob = dob;
                        } else {
                            throw new Error("Invalid date format");
                        }
                        break;
                    }
                    case "tz_name":
                        storageValues.tz_name = parseValidTimezoneName(value);
                        break;
                    case "city":
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
                        break;
                    case "true_node":
                        storageValues.true_node = parseValidBool(value);
                        break;
                    case "default":
                        storageValues.default = parseValidBool(value);
                        break;
                    case "house_sys":
                        // Validate that the house system is one of the defined values
                        storageValues.house_sys =
                            parseValidHouseSystemName(value).value;
                        break;
                }
            } catch (error) {
                console.warn(
                    `Invalid ${key} parameter: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }
    });
    setStorageValues(storageValues);
    return storageValues;
}

export function setStorageValues(storageValues: Partial<IStorageValues>) {
    Object.entries(storageValues).forEach(([key, value]) =>
        localStorage.setItem(key, String(value))
    );
}
