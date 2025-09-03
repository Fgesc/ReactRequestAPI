import { HTTPError } from "ky";
import { useState } from "react";

type UseFetchingResult = [
    () => Promise<void>,
    boolean,
    string | null
]

export const useFetching = (callback: () => Promise<void>): UseFetchingResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            if (e instanceof HTTPError) {
                const status = e.response.status;
                const statusText = e.response.statusText;
                switch (status) {
                    case 404:
                        setError('Запрос не найден (404)');
                        break;
                    case 500:
                        setError('Ошибка сервера (500)');
                        break;
                    default: 
                        setError(`Ошибка HTTP: ${status} ${statusText}`);
                };
            }
            else if (e instanceof Error) {
                setError(`Ошибка сети или нет подключения: ${e.message}`);
            } else {
                setError('Неизвестная ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}