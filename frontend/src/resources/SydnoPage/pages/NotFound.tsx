'use client';
import { Button, Typography } from 'antd';
import Link from 'next/link';

export const NotFound = () => {
    return (
        <div className='absolute top-0 h-full flex items-center'>
            <div>
                <Typography.Title level={3} type='secondary'>
                    404
                </Typography.Title>
                <Typography.Title level={1} style={{ marginTop: 0 }}>
                    Страница не найдена
                </Typography.Title>
                <Typography.Paragraph type='secondary'>Давайте вернемся на главную страницу</Typography.Paragraph>
                <Link href={'/'}>
                    <Button type='primary'>На главную</Button>
                </Link>
            </div>
        </div>
    );
};
