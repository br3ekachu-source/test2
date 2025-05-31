import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Input, Typography } from 'antd';

export const InputTextFilter: React.FC<{
    value: string;
    placeholder?: string;
    keyProperty: string;
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, placeholder }) => {
    return (
        <div>
            <div className='truncate'>
                <Typography.Text title={placeholder} type='secondary'>
                    {placeholder}
                </Typography.Text>
            </div>
            <Input
                placeholder={placeholder}
                value={value || undefined}
                maxLength={50}
                onChange={(event) => onChange(event.target.value || null, keyProperty)}
            />
        </div>
    );
};
