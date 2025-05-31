'use client';
import { useContext, useState } from 'react';
import { Button, Typography, Modal, Form, Input, Tabs, Checkbox } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { MailOutlined } from '@ant-design/icons';
import { useUser } from '../../entitites/auth/model';
import { StaticContext } from 'SydnoHelpers/contexts';

export const SingButton = ({
    type = 'link',
    caption = 'Вход/Регистрация'
}: {
    type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
    caption?: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<'singin' | 'singout' | 'forgotpass'>('singin');
    const { resetError, auth } = useUser(useShallow((state) => ({ resetError: state.resetError, auth: state.auth })));

    const handleCancel = () => {
        setIsModalOpen(false);
        setMode('singin');
        resetError();
    };

    const handleOpen = () => {
        setIsModalOpen(true);
        setMode('singin');
        resetError();
    };

    return (
        <>
            <Button type={type} onClick={handleOpen}>
                {caption}
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {!auth ? <ContentModal handleCancel={handleCancel} mode={mode} setMode={setMode} /> : <AlreadyAuth />}
            </Modal>
        </>
    );
};

const AlreadyAuth = () => {
    const { name, logout } = useUser(useShallow((state) => ({ name: state.instance?.name, logout: state.logout })));

    return (
        <>
            <div className='flex items-center mb-4'>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                    {name}, вы уже авторизованы
                </Typography.Title>
            </div>
            <div className='mb-4'>
                <Typography.Text type='secondary'>Желаете выйти?</Typography.Text>
            </div>
            <div>
                <Button type='primary' danger onClick={() => logout()}>
                    Выйти
                </Button>
            </div>
        </>
    );
};

const ContentModal = ({
    handleCancel,
    setMode,
    mode
}: {
    handleCancel: Function;
    setMode: (val: 'singin' | 'singout' | 'forgotpass') => void;
    mode: 'singin' | 'singout' | 'forgotpass';
}) => {
    const { error, resetError } = useUser(
        useShallow((state) => ({ error: state.error, resetError: state.resetError }))
    );

    const onChangeMode = (val: 'singin' | 'singout' | 'forgotpass') => {
        setMode(val);
        resetError();
    };

    if (mode === 'singin')
        return (
            <SingInForm
                errorMessage={(error?.response?.data as { message: string })?.message}
                onToggleForm={onChangeMode}
            />
        );
    if (mode === 'singout')
        return (
            <SingOutForm
                handleCancel={handleCancel}
                errorMessage={(error?.response?.data as { message: string })?.message}
                onToggleForm={onChangeMode}
            />
        );
    if (mode === 'forgotpass')
        return (
            <ForgotPasswordForm
                errorMessage={(error?.response?.data as { message: string })?.message}
                onToggleForm={onChangeMode}
            />
        );
    return null;
};

const SingInForm = ({
    onToggleForm,
    errorMessage
}: {
    onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void;
    errorMessage: string;
}) => {
    const { login } = useUser(useShallow((state) => ({ login: state.login })));
    const [remember, setRemember] = useState(true);

    const onFinish = (values: { email: string; pass: string; remember: boolean }) => {
        login({
            ...values,
            remember
        });
    };

    return (
        <>
            <Typography.Title level={2} style={{ marginBottom: errorMessage ? '1rem' : '2rem' }}>
                Вход
            </Typography.Title>
            <Form wrapperCol={{ span: 24 }} autoComplete='off' onFinish={onFinish}>
                {errorMessage && (
                    <Form.Item>
                        <Typography.Text type='danger'>{errorMessage}</Typography.Text>
                    </Form.Item>
                )}

                <Form.Item
                    name='email'
                    initialValue=''
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        {
                            type: 'email',
                            message: 'Укажите корректную почту',
                            validateTrigger: 'onBlur'
                        }
                    ]}
                >
                    <Input
                        // readOnly
                        name='email'
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        // onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name='pass'
                    initialValue=''
                    style={{ marginBottom: '1rem' }}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input.Password
                        // readOnly
                        name='pass'
                        placeholder='Пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='false'
                        // onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item>
                    <div className='flex justify-between align-center'>
                        <div className='flex items-center'>
                            <Checkbox className='' checked={remember} onClick={() => setRemember(!remember)}>
                                Запомнить меня
                            </Checkbox>
                        </div>
                        <Button type='link' onClick={() => onToggleForm('forgotpass')}>
                            Забыли пароль?
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <Button type='link' onClick={() => onToggleForm('singout')}>
                        или зарегистрируйтесь
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

const SingOutForm = ({
    onToggleForm,
    errorMessage,
    handleCancel
}: {
    onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void;
    errorMessage: string;
    handleCancel: Function;
}) => {
    const { registration } = useUser(useShallow((state) => ({ registration: state.registration })));
    const { modal } = useContext(StaticContext);

    const openSuccessRegisterModal = () => {
        modal?.success({
            title: 'На вашу почту отправлено письмо',
            content: (
                <Typography.Text type='secondary'>
                    Перейдите по ссылке в письме для подтверждения своего email
                </Typography.Text>
            ),
            okText: 'Продолжить',
            icon: <MailOutlined />
        });
    };

    const onFinish = (values: { email: string; name: string; pass: string; confirmationPass: string }) => {
        registration(values).then((res) => res && openSuccessRegisterModal());
    };

    return (
        <>
            <Typography.Title level={2} style={{ marginBottom: errorMessage ? '1rem' : '2rem' }}>
                Регистрация
            </Typography.Title>
            <Form
                name='auth'
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete='off'
            >
                {errorMessage && (
                    <Form.Item>
                        <Typography.Text type='danger'>{errorMessage}</Typography.Text>
                    </Form.Item>
                )}

                <Form.Item name='name' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input
                        readOnly
                        name='name'
                        placeholder='Имя'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        {
                            type: 'email',
                            message: 'Укажите корректную почту',
                            validateTrigger: 'onBlur'
                        }
                    ]}
                >
                    <Input
                        readOnly
                        name='email'
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item name='pass' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input.Password
                        readOnly
                        name='pass'
                        placeholder='Пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='false'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item name='confirmationPass' rules={[{ required: true, message: 'Обязательное поле' }]}>
                    <Input.Password
                        readOnly
                        name='confirmationPass'
                        placeholder='Повторите пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='false'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Зарегистрироваться
                    </Button>
                    <Button type='link' onClick={() => onToggleForm('singin')}>
                        или войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

const ForgotPasswordForm = ({
    onToggleForm,
    errorMessage
}: {
    onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void;
    errorMessage: string;
}) => {
    const { forgotPassword } = useUser(useShallow((state) => ({ forgotPassword: state.forgotPassword })));
    const { modal } = useContext(StaticContext);

    const openSuccessForgotModal = () => {
        modal?.success({
            title: 'На вашу почту отправлено письмо',
            content: <Typography.Text type='secondary'>Перейдите по ссылке в письме для смены пароля</Typography.Text>,
            okText: 'Продолжить',
            icon: <MailOutlined />
        });
    };

    const onFinish = (values: { email: string }) => {
        forgotPassword(values).then((res) => res && openSuccessForgotModal());
    };

    return (
        <>
            <Typography.Title level={2} style={{ marginBottom: errorMessage ? '1rem' : '2rem' }}>
                Восстановление пароля
            </Typography.Title>
            <Form wrapperCol={{ span: 24 }} autoComplete='off' onFinish={onFinish}>
                {errorMessage && (
                    <Form.Item>
                        <Typography.Text type='danger'>{errorMessage}</Typography.Text>
                    </Form.Item>
                )}

                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        {
                            type: 'email',
                            message: 'Укажите корректную почту',
                            validateTrigger: 'onBlur'
                        }
                    ]}
                >
                    <Input
                        readOnly
                        name='email'
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type='primary' htmlType='submit'>
                        Сбросить пароль
                    </Button>
                    <Button type='link' onClick={() => onToggleForm('singin')}>
                        или войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
