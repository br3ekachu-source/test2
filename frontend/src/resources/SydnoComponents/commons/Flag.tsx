import React from 'react';

/**
 * Компонент-хелпер для отображения флага
 * Передаются всё те же параметры что и для обычной картинки, но вместо src - country_code - двухбуквенный код страны
 * @param country_code - код страны
 * @author Burtsev Ilysha
 * @returns
 */
export const Flag: React.FC<{
    alt?: string;
    country_code: string;
    width?: number;
    height?: number;
    styles?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}> = ({ alt, country_code, width, height, styles, className, onClick }) => {
    return (
        <img
            alt={alt}
            width={width || 30}
            height={height || 20}
            src={'/flags/' + country_code + '.svg'}
            style={styles}
            className={className}
            onClick={onClick}
        />
    );
};
