import { useMemo } from "react";

export const useConsistentRandom = <T>(
    items: T[],
    seed: string | number
): T => {
    return useMemo(() => {
        const numericSeed =
            typeof seed === "string"
                ? seed
                      .split("")
                      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
                : seed;

        const index = numericSeed % items.length;
        return items[index];
    }, [items, seed]);
};
