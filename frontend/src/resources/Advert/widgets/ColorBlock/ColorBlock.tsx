import { Typography } from "antd"
import { HistoryOutlined, KeyOutlined } from '@ant-design/icons';
import s from './_ColorBlock.module.css';
import React from "react";

export const ColorBlock = ({
    title,
    icon,
    className,
    caption,
    active,
    onClick
}: {
    title: string
    caption: string
    icon?: React.ReactElement
    className?: string
    active: boolean
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {

    return(
        <div
            className={
                "pl-4 pt-2 pb-2 " +
                className + ' ' +
                s['color-block__container'] + ' ' +
                (active ? s['color-block__container_active'] : s['color-block__container_unactive'])
            }
            onClick={onClick}
        >
            <div  style={{position: 'relative'}}><Typography.Title style={{color: 'white', marginBottom: 0}} level={5}>{title}</Typography.Title></div>
            <div  style={{position: 'relative'}}><Typography.Text style={{color: 'white'}} >{caption}</Typography.Text></div>
            <div className={s['color-block__icon']}>
                {icon}
            </div>
        </div>
    )
}