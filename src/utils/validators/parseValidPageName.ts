import { pageDetails, type ValidPageType } from "src/pages";

/**
 * Validates if the given page is one of the allowed page types.
 *
 * @param input_page - The page value to validate.
 * @returns The valid page type if found.
 * @throws Error if the page name is invalid.
 */
export function parseValidPageName(input_page: string): ValidPageType {
    if (input_page in pageDetails) {
        return input_page as ValidPageType;
    }

    throw new Error(`Invalid Page name: "${input_page}"`);
}
