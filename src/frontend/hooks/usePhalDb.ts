import { useEffect, useState } from "react";
import { getPhalDb, loadPhalDb } from "src/backend/services/phalLoader";

export function usePhalDb(): boolean {
    const [loaded, setLoaded] = useState(() => getPhalDb() !== null);

    useEffect(() => {
        if (getPhalDb() !== null) return;
        loadPhalDb()
            .then(() => setLoaded(true))
            .catch(console.error);
    }, []);

    return loaded;
}
