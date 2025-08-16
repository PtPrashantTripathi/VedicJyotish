import { pageDetails } from "src/pages/pageDetails";
import type { ValidPageType } from "src/types";

/**
 * Validates if the given page is one of the allowed page types.
 *
 * @param input_page - The page value to validate.
 * @returns The valid page type if found.
 * @throws Error if the page name is invalid.
 */
export function parseValidPageName(input_page: string): ValidPageType {
    const page = input_page as ValidPageType;

    if (pageDetails.some(p => p.page === page)) {
        return page;
    }

    throw new Error(`Invalid Page name: "${input_page}"`);
}
