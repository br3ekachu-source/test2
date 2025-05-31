'use client';
import { useUser } from 'Auth/entities';
import { UploadAvatar } from 'SydnoComponents/uploads';
import { StaticContext } from 'SydnoHelpers/contexts';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { RcFile } from 'antd/lib/upload';
import { useContext, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const ProfileInfo = () => {
    const { updateProfileInfo, name, email, updateAvatar, avatarSrc, phone_number, deleteAvatar } = useUser(
        useShallow((state) => ({
            name: state.instance?.name,
            email: state.instance?.email,
            phone_number: state.instance?.phone_number,
            updateProfileInfo: state.updateProfileInfo,
            updateAvatar: state.updateAvatar,
            deleteAvatar: state.deleteAvatar,
            avatarSrc: state.instance?.avatar
        }))
    );

    const [avatar, setAvatar] = useState<string | RcFile | Blob | null>(null);
    const { modal } = useContext(StaticContext);

    const openSuccessModal = () => {
        modal?.success({
            title: 'Персональные данные изменены',
            okText: 'Продолжить'
        });
    };

    const openErrorModal = () => {
        modal?.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить'
        });
    };

    const onFinish = ({ name, phone_number }: { phone_number: string; name: string }) => {
        updateProfileInfo({
            phone_number,
            name
        }).then((res) => {
            if (res) {
                if (avatar) updateAvatar(avatar).then((res) => (res ? openSuccessModal() : openErrorModal()));
                else deleteAvatar().then((res) => (res ? openSuccessModal() : openErrorModal()));
            } else openErrorModal();
        });
    };

    return (
        <div>
            <Typography.Title level={4}>Персональная информация</Typography.Title>

            <Divider />

            <Form wrapperCol={{ span: 24 }} autoComplete='off' onFinish={onFinish} layout='vertical'>
                <Form.Item
                    label='Почта'
                    initialValue={email}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        }
                    ]}
                >
                    <Typography.Text>{email}</Typography.Text>
                </Form.Item>

                <Form.Item
                    name='phone_number'
                    label='Номер телефона'
                    initialValue={phone_number}
                    rules={[
                        {
                            required: false,
                            message: 'Обязательное поле'
                        }
                    ]}
                >
                    <MaskedInput mask={'+7(000)000-00-00'} placeholder='Номер телефона' />
                </Form.Item>

                <Form.Item
                    name='name'
                    label='Имя'
                    initialValue={name}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        }
                    ]}
                >
                    <Input placeholder='Имя' spellCheck='false' autoCorrect='off' autoComplete='off' />
                </Form.Item>

                <Form.Item name='avatar' label='Фотография'>
                    <UploadAvatar src={avatarSrc} onLoad={(file) => setAvatar(file)} />
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
