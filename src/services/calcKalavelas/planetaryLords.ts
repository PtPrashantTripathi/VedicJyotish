import { VarasDetails } from "src/services/constants/Varas";

/** Maps weekday numbers (0 = Sunday) to their ruling planets (grahas). */
export const WEEKDAY_PLANETARY_LORDS = Object.fromEntries(
    Object.values(VarasDetails).map(vara => [vara.num % 7, vara.lord])
);
