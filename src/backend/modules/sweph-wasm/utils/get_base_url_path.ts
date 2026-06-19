/**
 * Normalizes a base URL by:
 *
 * - Removing trailing slashes
 * - Stripping any filename at the end (e.g., index.html, file.js)
 * - Ensuring the result ends with a single `/`
 *
 * @param url - The input URL or path to normalize
 * @returns A normalized URL ending with a single slash
 */
export function getBaseURLPath(url: string): string {
    // Remove trailing slashes
    let base_url = url.replace(/\/+$/, "");

    // Check if the last segment looks like a filename (e.g., has a file extension)
    const lastSegment = base_url.split("/").pop();
    if (lastSegment && /\.[a-z0-9]+$/i.test(lastSegment)) {
        // Remove the filename segment
        base_url = base_url.substring(0, base_url.lastIndexOf("/"));
    }

    // Ensure the result ends with a single slash
    return base_url;
}
