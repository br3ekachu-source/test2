import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * Хелпер для преобразования ReadonlyURLSearchParams в обьект
 * @param ReadonlyURLSearchParams
 */
export function getUrlQueryParams<T extends Object>(searchParams: ReadonlyURLSearchParams): T {
    let resultObject: Object = {};

    searchParams.forEach((value, key) => {
        //@ts-ignore
        resultObject[key] = value;
    });

    return resultObject as T;
}
