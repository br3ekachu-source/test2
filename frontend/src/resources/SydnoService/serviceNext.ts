import { cookies } from 'next/headers';

export const fetchDataNext = async (api: string, options: RequestInit = { cache: 'no-store' }) => {
    if (!api) return;
    try {
        const res = await fetch(`${process.env.API_BACKEND_SERVER}${api}`, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Cookie: cookies().toString()
            }
        });

        return res;
    } catch (e) {
        console.log("error", e)
        return;
    }
};