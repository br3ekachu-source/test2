'use client';
import { useUser } from 'Auth/entities';
import { StaticContext } from 'SydnoHelpers/contexts';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const ResetPassword = () => {
    const { resetPassword } = useUser(useShallow((state) => ({ resetPassword: state.resetPassword })));
    const { modal } = useContext(StaticContext);

    const openSuccessResetModal = () => {
        modal?.success({
            title: 'Пароль успешно изменен',
            okText: 'Продолжить'
        });
    };

    const openErrorResetModal = () => {
        modal?.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить'
        });
    };

    const onFinish = ({
        password,
        password_confirmation,
        current_password
    }: {
        password: string;
        password_confirmation: string;
        current_password: string;
    }) => {
        resetPassword({
            password,
            password_confirmation,
            current_password
        }).then((res) => (res ? openSuccessResetModal() : openErrorResetModal()));
    };

    return (
        <div>
            <Typography.Title level={4}>Сменить пароль</Typography.Title>

            <Divider />

            <Form wrapperCol={{ span: 24 }} autoComplete='off' onFinish={onFinish}>
                <Form.Item name='current_password' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input.Password
                        readOnly
                        placeholder='Старый пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        ({ getFieldValue }) => ({
                            validator: (rule, value) => {
                                if (
                                    value === getFieldValue('password_confirmation') ||
                                    !value ||
                                    !getFieldValue('password_confirmation')
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject();
                            },
                            validateTrigger: 'onBlur',
                            message: 'Пароли должны совпадать'
                        })
                    ]}
                >
                    <Input.Password
                        readOnly
                        placeholder='Новый пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name='password_confirmation'
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        ({ getFieldValue }) => ({
                            validator: (rule, value) => {
                                if (value === getFieldValue('password') || !value || !getFieldValue('password')) {
                                    return Promise.resolve();
                                }
                                return Promise.reject();
                            },
                            validateTrigger: 'onBlur',
                            message: 'Пароли должны совпадать'
                        })
                    ]}
                >
                    <Input.Password
                        readOnly
                        placeholder='Повторите новый пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type='primary' htmlType='submit'>
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
