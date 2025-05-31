import React from 'react';
import { TChangeConfigProperty } from '../types';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';

export const DateRangePickerFilter: React.FC<{
    value: [string | null, string | null];
    placeholder?: string;
    keyProperties: [string, string];
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperties, onChange, placeholder }) => {
    return (
        <div className='w-full'>
            <div className='truncate'>
                <Typography.Text title={placeholder} type='secondary'>
                    {placeholder}
                </Typography.Text>
            </div>
            <DatePicker.RangePicker
                picker='year'
                allowEmpty={[true, true]}
                style={{ width: '100%' }}
                value={[value[0] ? dayjs(value[0]) : null, value[1] ? dayjs(value[1]) : null]}
                onChange={(value, formatValue) => {
                    onChange(value?.[0] ? formatValue[0] : null, keyProperties[0]);
                    onChange(value?.[1] ? formatValue[1] : null, keyProperties[1]);
                }}
            />
        </div>
    );
};
