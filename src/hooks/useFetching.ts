import { useState } from "react";

type UseFetchingResult = [
    () => Promise<void>,
    string
]

export const useFetching = (callback: () => Promise<void>): UseFetchingResult => {

    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            await callback();
        } catch (e) {
            setError((e as Error).message);
        }
    }
    return [fetching, error]
}