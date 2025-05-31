import React from 'react';
import { TChangeConfigProperty } from '../types';
import { InputNumber, Space, Typography } from 'antd';

export const InputNumberRangeFilter: React.FC<{
    value: [number | undefined | null, number | undefined | null];
    placeholder?: string;
    keyProperties: [string, string];
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperties, onChange, placeholder }) => {
    return (
        <div>
            <div className='truncate'>
                <Typography.Text title={placeholder} type='secondary'>
                    {placeholder}
                </Typography.Text>
            </div>
            <Space.Compact className='w-full'>
                <InputNumber
                    style={{ width: '50%' }}
                    placeholder={'от'}
                    value={value[0]}
                    max={value[1] || undefined}
                    onChange={(val) => onChange(val, keyProperties[0])}
                />
                <InputNumber
                    style={{ width: '50%' }}
                    placeholder={'до'}
                    value={value[1]}
                    onChange={(val) => {
                        onChange(val, keyProperties[1]);
                    }}
                />
            </Space.Compact>
        </div>
    );
};
