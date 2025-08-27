/**
 * Constructs a tuple type (fixed-length array) of length `N`, filled with type
 * `T`.
 *
 * @example
 *     type Vec3 = FixedLengthArray<3, number>; // [number, number, number]
 *
 * @template N - The fixed length of the array.
 * @template T - The type of each element in the array.
 * @template R - Internal accumulator (do not provide manually).
 */
export type FixedLengthArray<
    N extends number,
    T,
    R extends T[] = [],
> = R["length"] extends N ? R : FixedLengthArray<N, T, [...R, T]>;

/**
 * Creates a fixed-length array of a specific type, trimming or padding with a
 * default value as needed.
 *
 * @example
 *     const vec3 = toFixedLengthArray([1], 3, 0); // [1, 0, 0]
 *
 * @param input - The input array (can be shorter or longer than the target
 *   length).
 * @param fixedLength - The target length of the output array.
 * @param defaultValue - The value to pad the array with if it's too short.
 * @returns A new array with the specified fixed length.
 */
export function toFixedLengthArray<N extends number, T>(
    input: T[],
    fixedLength: N,
    defaultValue: T
): FixedLengthArray<N, T> {
    const output: T[] = input.slice(0, fixedLength);

    while (output.length < fixedLength) {
        output.push(defaultValue);
    }

    return output as FixedLengthArray<N, T>;
}
