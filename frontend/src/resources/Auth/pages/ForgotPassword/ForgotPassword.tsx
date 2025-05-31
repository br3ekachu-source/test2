'use client';
import { useUser } from 'Auth/entities';
import { StaticContext } from 'SydnoHelpers/contexts';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const ForgotPassword = ({ email, token }: { email: string; token: string }) => {
    const { resetPassword } = useUser(useShallow((state) => ({ resetPassword: state.resetPassword })));
    const router = useRouter();
    const { modal } = useContext(StaticContext);

    const openSuccessResetModal = () => {
        modal?.success({
            title: 'Пароль успешно сброшен',
            okText: 'Продолжить',
            onOk: () => {
                router.push('/');
            }
        });
    };

    const onFinish = ({ password, password_confirmation }: { password: string; password_confirmation: string }) => {
        resetPassword({
            password,
            password_confirmation,
            token,
            email
        }).then((res) => res && openSuccessResetModal());
    };

    return (
        <div>
            <Typography.Title level={2}>Восстановить пароль</Typography.Title>
            <Form wrapperCol={{ span: 24 }} autoComplete='off' onFinish={onFinish}>
                <Form.Item name='password' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input.Password
                        readOnly
                        placeholder='Пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item name='password_confirmation' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input.Password
                        readOnly
                        placeholder='Повторите пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type='primary' htmlType='submit'>
                        Сменить пароль
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
