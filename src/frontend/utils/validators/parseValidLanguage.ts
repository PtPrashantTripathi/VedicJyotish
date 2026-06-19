export function parseValidLanguage(value: string): "Hindi" | "English" {
    if (["hi", "hindi"].includes(value.toLowerCase().trim())) {
        return "Hindi";
    } else if (["en", "english"].includes(value.toLowerCase().trim())) {
        return "English";
    } else {
        throw new Error("Invalid Language value.");
    }
}
