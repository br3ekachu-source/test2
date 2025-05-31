/**
 * Хелпер для преобразовывания объекта в строку с query-параметрами
 * @param object
 * @returns
 */
export function convertObjectToPathname(object: object) {
    return Object.entries(object)
        .filter(([_, value]) => {
            return value !== undefined && value !== null;
        })
        .map(([key, value]) => {
            return `${key}=${value}`;
        })
        .join('&');
}
