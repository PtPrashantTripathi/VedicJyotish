/**
 * Custom error class for handling errors returned by Swiss Ephemeris functions.
 *
 * This class includes a status `flag` to indicate the outcome of the WASM
 * function call, and a descriptive `error` message.
 */
export class SWEerror extends Error {
    /**
     * Status flag returned by the function. Can be used to check if the
     * function succeeded, failed, or what kind of result it produced.
     */
    flag: number;

    /**
     * A human-readable error message returned from the WASM function. This will
     * typically contain diagnostic information if the function failed.
     */
    error: string;

    /**
     * Create a new SWEerror instance.
     *
     * @param message - A string describing the error
     * @param flag - The numeric status flag from the WASM function
     */
    constructor(message: string, flag: number) {
        super(message);
        this.error = message;
        this.name = "SweError";
        this.flag = flag;

        /**
         * Set the prototype explicitly for compatibility with older TypeScript
         * versions
         */
        Object.setPrototypeOf(this, SWEerror.prototype);
    }
}
