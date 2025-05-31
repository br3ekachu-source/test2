import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { sydnoServiceJson } from 'SydnoService/service';

export const BackendSelector: React.FC<{
    selector: string;
    value: unknown;
    onChange: (value: unknown) => void;
    style?: React.CSSProperties;
    allowClear?: boolean;
    className?: string;
}> = ({ selector, value, onChange, style, allowClear, className }) => {
    const [selectorList, setSelectorList] = useState<{ value: string; label: string }[]>();

    useEffect(() => {
        sydnoServiceJson.get('/api/selector?' + selector).then((res) => {
            const data = res.data.message;
            setSelectorList(
                Object.entries(data[selector] as { [x in string]: string }).map(([value, label]: [string, string]) => ({
                    value,
                    label
                }))
            );
        });
    }, []);

    return (
        <>
            <Select
                value={value}
                style={style}
                className={className}
                onChange={onChange}
                allowClear={allowClear}
                options={selectorList}
            />
        </>
    );
};
