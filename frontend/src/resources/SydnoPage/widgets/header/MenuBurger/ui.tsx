import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { useFirstRender } from 'SydnoHelpers/hooks';

export interface IMenuBurger {
    /**
     * Цвет полосок бургера
     */
    color?: string;

    /**
     * Ширина бургера
     */
    width?: string;

    /**
     * Высота бургера
     */
    height?: string;

    /**
     * Регулирование внутренних отступов
     * Полезно с точки зрения UX
     * Позволяет сделать область клика больше чем сам значок бургера
     */
    padding?: string;

    /**
     * Начальное значаение статуса бургера
     * @value true бургер в виде крестика
     * @value false бургер в виде полосок
     */
    status?: boolean;

    /**
     * Колбэк, срабатывающий при нажатии на бургер
     * @param status Новое значение статуса бургера
     */
    onClick?: () => void;
}

/**
 * Кнопка бургер-меню
 * @author Бурцев И.А.
 */

export const MenuBurger: React.FC<IMenuBurger> = ({ color, width, height, padding, status, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isFirstRender = useFirstRender();
    const [isActive, setIsActive] = useState<boolean>(status || false);

    useEffect(() => {
        ref.current?.style.setProperty('--burger-color', color || 'white');
    }, [color]);

    useEffect(() => {
        if (!isFirstRender) {
            setIsActive(status || false);
        }
    }, [status, isFirstRender]);

    return (
        <div style={{ cursor: 'pointer', padding: padding || '0' }} onClick={onClick}>
            <div
                ref={ref}
                className={`sudno-MenuBurger${isActive ? ' sudno-MenuBurger-active' : ' sudno-MenuBurger-disable'}`}
                style={{
                    width: width || '30px',
                    height: height || '24px'
                }}
            >
                <div></div>
            </div>
        </div>
    );
};
