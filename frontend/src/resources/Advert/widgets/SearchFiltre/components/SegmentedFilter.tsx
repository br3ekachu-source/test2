import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Segmented, Typography } from 'antd';

export const SegmentedFilter: React.FC<{
    value: boolean | null | undefined;
    placeholder?: string;
    keyProperty: string;
    options?: string[];
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, placeholder, options = ['Все', 'Есть', 'Нет'] }) => {
    const _value = typeof value === 'string' ? JSON.parse(value) : value;
    const convertValue = (val: string | null | boolean | undefined) => {
        if (typeof val === 'string') {
            switch (val) {
                case options[0]:
                    return null;
                case options[1]:
                    return true;
                case options[2]:
                    return false;
            }
        } else {
            switch (val) {
                case undefined:
                case null:
                    return options[0];
                case true:
                    return options[1];
                case false:
                    return options[2];
            }
        }
    };

    return (
        <div>
            <div className='truncate'>
                <Typography.Text title={placeholder} type='secondary'>
                    {placeholder}
                </Typography.Text>
            </div>
            <Segmented
                value={convertValue(_value) as string}
                options={options}
                block
                onChange={(val) => onChange(convertValue(val as string), keyProperty)}
            />
        </div>
    );
};
