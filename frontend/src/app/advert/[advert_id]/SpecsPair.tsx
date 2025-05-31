'use client';
import { Col, Typography } from 'antd';
import s from './SpecsPair.module.css';

type Detail = string | number;

interface DetailsPairProps {
    key: number | string;
    label: string;
    value: React.ReactNode | number | string | undefined;
    column: number;
}

export const SpecsPair: React.FC<DetailsPairProps | null> = (props) => {
    if (props === null) {
        return;
    }
    return (
        <Typography.Paragraph
            style={{ minHeight: props.column === 1 ? '25px' : '30px' }}
            className={props.column === 1 ? s.field : s.fields}
        >
            <Col span={props.column === 1 ? 24 : 15}>
                {props.label && (
                    <Typography.Text
                        style={{
                            fontSize: props.column === 1 ? '14px' : '16px',
                            wordWrap: 'break-word'
                        }}
                        strong
                    >
                        {props.label}
                    </Typography.Text>
                )}
            </Col>
            <Col span={props.column === 1 ? 24 : 9}>
                {props.value && (
                    <Typography.Text
                        style={{
                            fontSize: props.column === 1 ? '14.5px' : '16px',
                            // fontSize: '16px',
                            wordWrap: 'break-word'
                        }}
                    >
                        {props.label !== 'Флаг' && props.value}
                        {props.label === 'Флаг' && <div className={s.flag}>{props.value}</div>}
                    </Typography.Text>
                )}
            </Col>
        </Typography.Paragraph>
    );
};
