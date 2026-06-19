/**
 * A type utility that constructs a fixed-length tuple type of size `N`, where
 * each element is of type `T`.
 *
 * @example
 *     // A tuple of exactly 3 numbers
 *     type Vec3 = FixedLengthArray<3, number>; // [number, number, number]
 *
 * @template N The fixed length of the array.
 * @template T The type of each element.
 * @template R Internal accumulator (do not provide manually).
 */
export type FixedLengthArray<
    N extends number,
    T,
    R extends T[] = [],
> = R["length"] extends N ? R : FixedLengthArray<N, T, [...R, T]>;

/**
 * Returns a new array with a fixed length `N`.
 *
 * - If `input` is longer, it is trimmed.
 * - If `input` is shorter, it is padded with `defaultValue` (or `null`).
 *
 * @example
 *     // Creates a 3-element number tuple
 *     const vec3 = toFixedLengthArray([1], 3, 0); // [1, 0, 0]
 *
 * @param input The input array (may be shorter or longer than `fixedLength`).
 * @param fixedLength The exact length of the output array.
 * @param defaultValue Value to pad with if `input` is too short (default:
 *   `null`).
 * @returns A new tuple of type `FixedLengthArray<N, T>`.
 */
export function toFixedLengthArray<N extends number, T>(
    input: T[],
    fixedLength: N,
    defaultValue?: T
): FixedLengthArray<N, T> {
    const output: T[] = input.slice(0, fixedLength);

    while (output.length < fixedLength) {
        output.push(defaultValue ?? (null as T));
    }

    return output as FixedLengthArray<N, T>;
}
