import { cookies } from 'next/headers';

export const fetchDataNext = async (api: string, options: RequestInit = { cache: 'no-store' }) => {
    if (!api) return;
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}${api}`, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Cookie: cookies().toString()
            }
        });
    } catch (e) {
        return;
    }
};
