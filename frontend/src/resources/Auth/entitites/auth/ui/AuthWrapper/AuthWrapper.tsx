'use client';
import { Button, Result } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useUser } from '../../model';
import { SingButton } from '../../../../features/SingButton/SingButton';

export const AuthWrapper = ({ children, invert }: { children: React.ReactNode; invert?: boolean }) => {
    const { auth } = useUser(useShallow((state) => ({ auth: state.auth })));

    if (auth === null) {
        return <Result icon={<LoadingOutlined />} status='info' title='Загрузка...' />;
    }
    if (auth === false) {
        if (invert) return <>{children}</>;
        else
            return (
                <Result
                    status='warning'
                    title='Необходимо авторизоваться на сайте'
                    extra={[
                        <div key='unique'>
                            <SingButton caption='Вход' type='primary' key='sing' />
                        </div>
                    ]}
                />
            );
    } else if (auth === true) {
        if (invert)
            return (
                <Result
                    status='warning'
                    title='Вы уже авторизованы на сайте'
                    extra={[
                        <div key='unique'>
                            <Link href='/'>
                                <Button type='primary'>На главную</Button>
                            </Link>
                        </div>
                    ]}
                />
            );
        else return <>{children}</>;
    }
};
