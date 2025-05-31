'use client';
import Image from 'next/image';
import s from '../../styles.module.css';
import { Button, Typography } from 'antd';

export const Footer = () => {
    return (
        <div className={s['sydno-footer']}>
            <div className={s['sydno-footer__container']}>
                <div className='flex items-center justify-center'>
                    <Image className='mr-2' src={'/min-logo.svg'} width={28} height={28} alt='Судно логотип' />
                    <Typography.Title level={4} style={{ marginBottom: 0 }}>
                        Sydno
                    </Typography.Title>
                </div>
                <div className='flex items-center justify-center mt-2'>
                    <span>
                        <Typography.Text type='secondary'>помощь:</Typography.Text>
                        <Button style={{ padding: '0 4px', height: 'auto' }} type='link' href='mailto:sydno@mail.ru'>
                            sydno@mail.ru
                        </Button>
                    </span>
                    <Typography.Text type='secondary'>©copyright Sydno, 2024. Все права защищены</Typography.Text>
                </div>
            </div>
        </div>
    );
};
