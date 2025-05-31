import { useRef, useEffect } from 'react';

/**
 * Хук для определени первого рендера компонента
 * @returns firstRender - первый рендер иил нет
 */
export const useFirstRender: () => boolean = () => {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
};
