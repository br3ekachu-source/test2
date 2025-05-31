'use client';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useShallow } from 'zustand/react/shallow';
import { useUser } from 'Auth/entities';

export const VerifyResult = (props: { id: string; hash: string; expires: string; signature: string }) => {
    const [status, setStatus] = useState<boolean | null>(null);
    const { verify } = useUser(useShallow((state) => ({ verify: state.verify })));

    useEffect(() => {
        verify(props).then((res) => {
            setStatus(res);
        });
    }, []);

    if (status === null)
        return (
            <Result
                icon={<LoadingOutlined />}
                status='info'
                title='Проверка верификации'
                subTitle='Пожалуйста, подождите'
            />
        );
    else if (status) return <Result status='success' title='Верификация успешно пройдена!' />;
    else if (!status)
        return (
            <Result
                status='error'
                title='Ой, что-то пошло не так!'
                subTitle='Проверьте что-нибудь'
                extra={[
                    <div key='unique'>
                        <Link href='/'>
                            <Button type='primary'>На главную</Button>
                        </Link>
                    </div>
                ]}
            />
        );
};
