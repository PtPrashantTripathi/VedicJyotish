import { DateTime } from "luxon";
import type { AyanamsaModsValue } from "src/services/constants/AyanamsaMods";
import type { HouseSystemValue } from "src/services/constants/HouseSystems";
import { parseValidAyanamsaName } from "src/utils/validators/parseValidAyanamsaName";
import { parseValidBool } from "src/utils/validators/parseValidBool";
import { parseValidDateTime } from "src/utils/validators/parseValidDateTime";
import { parseValidDegree } from "src/utils/validators/parseValidDegree";
import { parseValidGender } from "src/utils/validators/parseValidGender";
import { parseValidHouseSystemName } from "src/utils/validators/parseValidHouseSystem";
import { parseValidLanguage } from "src/utils/validators/parseValidLanguage";
import { parseValidTimezoneName } from "src/utils/validators/parseValidTimezone";

/** Defines the structure of valid storage parameters and component state. */
export interface IStorageValues {
    /** User name */
    username: string;
    /** User Gender */
    gender: "M" | "F";
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
    ayanamsa_mod: AyanamsaModsValue;
    language: "Hindi" | "English";
    true_node: boolean;
    /** House System - calculation method */
    house_sys: HouseSystemValue;
    /** Flag */
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
        username: "User",
        dob: DateTime.now(),
        tz_name: "Asia/Kolkata",
        city: "Ujjain, Madhya Pradesh, India",
        lat: 23.1793,
        lon: 75.784912,
        ayanamsa_mod: "Lahiri",
        language: "Hindi",
        true_node: true,
        house_sys: "Placidus",
        gender: "M",
        default: true,
    };

    Object.keys(storageValues).forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                switch (key) {
                    case "username":
                        storageValues.username = value.trim();
                        break;
                    case "dob":
                        storageValues.dob = parseValidDateTime(value);
                        break;
                    case "tz_name":
                        storageValues.tz_name = parseValidTimezoneName(value);
                        break;
                    case "city":
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
                        break;
                    case "true_node":
                        storageValues.true_node = parseValidBool(value);
                        break;
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
                }
            } catch (error) {
                console.warn(
                    `Invalid ${key} parameter: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }
    });
    saveStorageValues(storageValues);
    return storageValues;
}

export function saveStorageValues(storageValues: Partial<IStorageValues>) {
    Object.entries(storageValues).forEach(([key, value]) =>
        localStorage.setItem(key, String(value))
    );
}
