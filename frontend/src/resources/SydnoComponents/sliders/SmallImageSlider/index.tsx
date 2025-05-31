import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { baseURL } from 'SydnoService/service';

export interface ISmallImageSlider {
    maxItems?: number;
    items: string[];
    showLabels?: boolean;
    defaultIndex?: number;
    setIndex?: (index: number) => void;
    imageClass?: string;
    fallbackImageSrc?: string;
    imageStyle?: React.CSSProperties;
    flag?: string;
    isMiniCard: boolean;
    type: number;
}

export const SmallImageSlider: React.FC<ISmallImageSlider> = ({
    items,
    maxItems = 5,
    defaultIndex = 0,
    showLabels = true,
    fallbackImageSrc = '',
    imageClass,
    imageStyle,
    flag,
    type,
    isMiniCard
}) => {
    const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setActiveIndex(defaultIndex);
    }, [showLabels]);

    const onImageErrorLoad = () => {
        if (imageRef.current) {
            imageRef.current.onerror = () => {
                if (imageRef.current) {
                    imageRef.current.src = fallbackImageSrc;
                }
            };
        }
    };

    const onMouseMoveHandler = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className={`sudno-SmallImageSlider flex items-center ${isMiniCard ? 'user-advert' : ''}`}>
            {flag && (
                <img
                    className={`sudno-SmallImageSlider-flag ${isMiniCard ? 'user-advert' : ''}`}
                    alt={`Флаг ${flag}`}
                    src={`/flags/${flag}.svg`}
                />
            )}
            <span className={`sudno-SmallImageSlider-sell-rent ${isMiniCard ? 'user-advert' : ''}`}>{type === 0 ? 'Продажа' : 'Аренда'}</span>
            <img
                ref={imageRef}
                src={items.length === 0 ? fallbackImageSrc : items[activeIndex]}
                className={'sudno-SmallImageSlider-image ' + imageClass}
                onError={onImageErrorLoad}
                style={imageStyle}
                alt=''
            />
            <div
                className='sudno-SmallImageSlider-backgroundItems'
                style={{
                    opacity: showLabels ? 1 : 0
                }}
            >
                {items &&
                    items.map((_, index) => (
                        <div
                            key={_.toString()}
                            onMouseMove={() => onMouseMoveHandler(index)}
                            style={{ width: `calc(100%/${items.length})` }}
                            className='sudno-SmallImageSlider-backgroundItems-label-wrapper flex items-end'
                        >
                            <div
                                className={
                                    'sudno-SmallImageSlider-backgroundItems-label ' +
                                    (index === activeIndex ? 'active' : '')
                                }
                            ></div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
