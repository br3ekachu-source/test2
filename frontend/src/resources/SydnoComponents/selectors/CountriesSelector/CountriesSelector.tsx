import { Select } from 'antd';
import countriesJson from './countries.json';
import { CSSProperties } from 'react';

const countriesSelectOptions = Object.entries(countriesJson.data).map((item) => {
    return {
        name: item[1],
        value: item[0],
        label: (
            <span className='flex items-center'>
                <img alt={`флаг ${item[1]}`} width={30} height={20} src={'/flags/' + item[0] + '.svg'} />
                <span className='ml-2'>{item[1]}</span>
            </span>
        )
    };
});

export const CountriesSelector = ({
    placeholder,
    value,
    onChange,
    style,
    allowClear
}: {
    placeholder?: string;
    value?: string;
    onChange?: any;
    style?: CSSProperties;
    allowClear?: boolean;
}) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            showSearch
            style={style}
            className='w-full'
            placeholder={placeholder || 'Флаг'}
            options={countriesSelectOptions}
            filterOption={(inputValue, option) => option!.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
    );
};
