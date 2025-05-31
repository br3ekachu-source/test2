'use client';
import { UploadAvatars } from 'SydnoComponents/uploads';
import { Form, Input, InputNumber, Select } from 'antd';
import { CreateAdvertTypes, onFinishStep } from '../../../shared/types/basicTypes';
import { useState } from 'react';
import { UploadFile } from 'antd/es/upload';
import { ICreateAdStepOne, useCreateAdvert } from '../../../entitites/createAdvert/model';
import { MaskedInput } from 'antd-mask-input';
import { useShallow } from 'zustand/react/shallow';
import { useUser } from 'Auth/entities';

export function CreateAdvertStepOne({ onFinish }: { onFinish: onFinishStep }) {
    const { instance } = useCreateAdvert(useShallow((state) => ({ instance: state.instance })));
    const { phone_number } = useUser(useShallow((state) => ({ phone_number: state.instance?.phone_number })));
    const [images, setImages] = useState<UploadFile<any>[]>([]);
    const _onFinish = (values: ICreateAdStepOne) => {
        onFinish({ type: 'StepOne', data: { ...values, images } });
    };
    return (
        <Form
            id='StepOne'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            onFinish={_onFinish}
            autoComplete='off'
        >
            <Form.Item
                label='Заголовок объявления'
                labelAlign='left'
                name='header'
                initialValue={instance.header}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input placeholder='Заголовок объявления' maxLength={100}/>
            </Form.Item>

            <Form.Item
                label='Регистрационный номер'
                labelAlign='left'
                name='registration_number'
                initialValue={instance.registration_number}
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Input placeholder='Регистрационный номер' maxLength={50}/>
            </Form.Item>

            <Form.Item
                label='Цена'
                labelAlign='left'
                name='price'
                initialValue={instance.price}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber min={0} placeholder='Цена' style={{ width: '40%' }} />
            </Form.Item>

            {
                instance.advert_type === CreateAdvertTypes.Fracht
                    ?
                    (
                        <>
                        <Form.Item
                            label='Цена за промежуток времени'
                            labelAlign='left'
                            name='fracht_price_type'
                            initialValue={instance?.fracht_price_type?.toString()}
                            rules={[{ required: true, message: 'Обязательное поле' }]}
                            wrapperCol={{ span: 8, offset: 1 }}
                        >
                            <Select placeholder='Цена за промежуток времени' options={[
                                {
                                    label: 'Год',
                                    value: 0
                                },
                                {
                                    label: 'Месяц',
                                    value: 1
                                },
                                {
                                    label: 'День',
                                    value: 2
                                }
                            ]} />
                        </Form.Item>
                        <Form.Item
                            label='Тип фрахта'
                            labelAlign='left'
                            name='fracht_type'
                            initialValue={instance?.fracht_type?.toString()}
                            rules={[{ required: true, message: 'Обязательное поле' }]}
                            wrapperCol={{ span: 10, offset: 1 }}
                        >
                            <Select placeholder='Тип фрахта' options={[
                                {
                                    label: 'Тайм чартер (с командой)',
                                    value: 0
                                },
                                {
                                    label: 'Бербоут чартер (без команды)',
                                    value: 1
                                }
                            ]} />
                        </Form.Item>
                        </>
                    )
                    : null
            }

            <Form.Item label='Фото' labelAlign='left'>
                <UploadAvatars defaultImages={instance.images} onChange={(images) => setImages(images)} />
            </Form.Item>

            <Form.Item
                label='Номер телефона'
                labelAlign='left'
                name='phone_number'
                required
                initialValue={instance.phone_number || phone_number}
                rules={[
                    () => ({
                        validator(_, value: string | null) {
                            const val = value
                            if(value?.includes('_') || !value) {
                                return Promise.reject(new Error('Обязательное поле'))
                            }
                            else {
                                return Promise.resolve();
                            }
                        }
                    })
                ]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <MaskedInput mask={'+7(000)000-00-00'} placeholder='Номер телефона' />
            </Form.Item>

            <Form.Item
                label='Описание'
                labelAlign='left'
                name='description'
                initialValue={instance.description}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input.TextArea placeholder='Описание' rows={8} maxLength={300}/>
            </Form.Item>
        </Form>
    );
}
