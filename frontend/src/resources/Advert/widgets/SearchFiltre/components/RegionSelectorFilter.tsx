import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Typography } from 'antd';
import { RegionSelector } from 'SydnoComponents/selectors';

export const RegionSelectorFilter: React.FC<{
    value?: string | null;
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
            <RegionSelector
                value={value ? { value } : undefined}
                style={{ width: '100%' }}
                placeholder={placeholder}
                allowClear={true}
                onChange={({ city }: { city: any }) => onChange<string>(city, keyProperty)}
            />
        </div>
    );
};
