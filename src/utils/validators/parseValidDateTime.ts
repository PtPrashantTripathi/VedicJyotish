import { DateTime } from "luxon";

export function parseValidDateTime(input: string): DateTime<true> {
    const dob = DateTime.fromISO(input);
    if (dob.isValid) {
        return dob;
    } else {
        throw new Error(`Invalid date format ${input}`);
    }
}
