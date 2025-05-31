import countriesJson from './countries.json';

export type TCountryCode = keyof typeof countriesJson.data;

/**
 * Возвращает название страны по коду
 * @author Burtsev Ilysha
 * @param countryCode код страны
 */
export const getCountryName = (countryCode: TCountryCode) => {
    return countriesJson.data[countryCode];
};
