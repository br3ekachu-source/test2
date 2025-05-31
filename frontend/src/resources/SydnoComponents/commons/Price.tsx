import React from 'react';

export interface IPriceProps {
    locale: string;
    options: object;
    price: number;
}

/**
 * Компонент для отображения отформатированной цены, в зависимости от валюты
 * @param param0
 * @returns
 */
export const Price: React.FC<IPriceProps> = ({ locale, options, price }) => {
    return <>{new Intl.NumberFormat(locale, options).format(price)}</>;
};
