export function parseValidGender(value: string): "M" | "F" {
    if (["m", "male"].includes(value.toLowerCase().trim())) {
        return "M";
    } else if (["f", "female"].includes(value.toLowerCase().trim())) {
        return "F";
    } else {
        throw new Error("Invalid Gender value.");
    }
}
