'use client';
import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Typography } from 'antd';
import { useScreenSize } from './useMobileView';
import s from './Specs.module.css';
import { SpecsPair } from './SpecsPair';

type DescriptionItem = {
    key: string | number;
    label: string;
    children: React.ReactNode | number | string | JSX.Element | undefined;
};

type DescriptionsPropsObject = {
    mainInfo: DescriptionItem[];
    legalInfo: DescriptionItem[];
    technicalInfo: DescriptionItem[];
};

interface SpecsProps {
    ConvertedAdvertData: DescriptionsPropsObject | undefined;
}

/**
 * Компонент Характеристик.
 * Отображает характеристики объявления в виде Descriptions из Ant Design.
 * @param ConvertedAdvertData Данные объявления, которые должны быть сконвертированы для отображения.
 *
 * Author: [Gleb]
 */

const Specs: React.FC<SpecsProps> = ({ ConvertedAdvertData }) => {
    const [showAllCharacteristics, setShowAllCharacteristics] = useState(false);
    // const mobileView = useMobileView();
    const screenSize = useScreenSize();

    useEffect(() => {
        if (showAllCharacteristics) {
            const descriptionsElement = document.getElementById('descriptions');
            if (descriptionsElement) {
                const offsetTop = descriptionsElement.offsetTop;

                window.scrollTo({
                    top: window.scrollY + offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [showAllCharacteristics]);

    return (
        <div className={s.specs}>
            <div className={s.pecsColumn}>
                <Typography.Title level={4} style={{ marginLeft: `${screenSize === 'small' ? '-5px' : ''}` }}>
                    Юридическая информация
                </Typography.Title>
                {ConvertedAdvertData &&
                    ConvertedAdvertData.legalInfo.map((item) => (
                        <SpecsPair key={item.key} label={item.label} value={item.children} column={2} />
                    ))}
            </div>
            <div className={s.pecsColumn}>
                <Typography.Title level={4} style={{ marginLeft: `${screenSize === 'small' ? '-5px' : ''}` }}>
                    Техническая информация
                </Typography.Title>

                {ConvertedAdvertData &&
                    ConvertedAdvertData.technicalInfo.map((item) => (
                        <SpecsPair key={item.key} label={item.label} value={item.children} column={2} />
                    ))}
            </div>
        </div>
    );
};

export default Specs;
