import React from 'react';
import { TChangeConfigProperty } from '../types';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';

export const DatePickerFilter: React.FC<{
    value: string | null | undefined;
    placeholder?: string;
    keyProperty: string;
    picker: string;
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, placeholder, picker }) => {
    return (
        <div>
            <div className='truncate'>
                <Typography.Text title={placeholder} type='secondary'>
                    {placeholder}
                </Typography.Text>
            </div>
            <DatePicker
                picker='year'
                value={value ? dayjs(value) : undefined}
                onChange={(_, formatValue) => onChange(formatValue, keyProperty)}
                style={{ width: '100%' }}
            />
        </div>
    );
};
