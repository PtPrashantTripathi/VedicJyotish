/** Divides a time period into equal portions starting from a base time. */
export function createTimePeriods(
    startTime: number,
    duration: number,
    divisions: number
): number[] {
    return Array.from(
        { length: divisions },
        (_, index) => startTime + index * (duration / divisions)
    );
}
