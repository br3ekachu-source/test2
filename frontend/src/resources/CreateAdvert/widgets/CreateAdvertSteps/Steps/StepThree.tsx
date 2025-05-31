'use client';
import { Form, Input, InputNumber, Select, Space } from 'antd';
import { onFinishStep } from '../../../shared/types/basicTypes';
import { useEffect, useState } from 'react';
import { ICreateAdStepThree, useCreateAdvert } from '../../../entitites/createAdvert/model';
import { useShallow } from 'zustand/react/shallow';
import { sydnoServiceJson } from 'SydnoService/service';

export function CreateAdvertStepThree({ onFinish }: { onFinish: onFinishStep }) {
    const { advert_technical_information } = useCreateAdvert(
        useShallow((state) => ({ advert_technical_information: state.instance.advert_technical_information }))
    );
    const [isTanks, setIsTanks] = useState(false);
    const [isBulkTanks, setIsBulkTanks] = useState(false);
    const [isCapacity, setIsCapacity] = useState(false);

    const [boardHeight, setBoardHeight] = useState<number | null>(null);
    const [draftInCargo, setDraftInCargo] = useState<number | null>(null);

    const [materials, setMaterials] = useState<{ value: string; label: string }[]>();

    const _onFinish = (values: ICreateAdStepThree) => {
        onFinish({ type: 'StepThree', data: values });
    };

    useEffect(() => {
        sydnoServiceJson.get('/api/selector?materials').then((res) => {
            const data = res.data.message;
            setMaterials(
                Object.entries(data.materials as { [x in string]: string }).map(([value, label]: [string, string]) => ({
                    value,
                    label
                }))
            );
        });
    }, []);

    return (
        <Form
            id='StepThree'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            initialValues={{ remember: true }}
            onFinish={_onFinish}
            autoComplete='off'
        >
            <Form.Item label='Габариты' labelAlign='left' required>
                <Space.Compact>
                    <Form.Item
                        noStyle
                        name='overall_length'
                        initialValue={advert_technical_information?.overall_length}
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{ width: '50%' }} placeholder='Длина' addonAfter='м.' step='0.01' />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name='overall_width'
                        initialValue={advert_technical_information?.overall_width}
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{ width: '50%' }} placeholder='Ширина' addonAfter='м.' step='0.01' />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>

            <Form.Item
                label='Высота борта'
                labelAlign='left'
                name='board_height'
                initialValue={advert_technical_information?.board_height}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    value={boardHeight}
                    precision={2}
                    onChange={(value) => setBoardHeight(value)}
                    style={{ width: '100%' }}
                    placeholder='Высота борта (метры)'
                    addonAfter='метры'
                    step='0.01'
                />
            </Form.Item>

            <Form.Item
                label='Осадка в грузу'
                labelAlign='left'
                name='draft_in_cargo'
                initialValue={advert_technical_information?.draft_in_cargo}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    max={boardHeight ?? Number.MAX_SAFE_INTEGER}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder='Осадка в грузу'
                    addonAfter='метры'
                />
            </Form.Item>

            <Form.Item
                label='Материал корпуса'
                labelAlign='left'
                name='material'
                initialValue={advert_technical_information?.material}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select placeholder='Материал корпуса' options={materials} />
            </Form.Item>

            <Form.Item
                label='Дедвейт'
                labelAlign='left'
                name='deadweight'
                initialValue={advert_technical_information?.deadweight}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder='Дедвейт (тонны)' addonAfter='тонны' />
            </Form.Item>

            <Form.Item
                label='Доковый вес'
                labelAlign='left'
                name='dock_weight'
                initialValue={advert_technical_information?.dock_weight}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder='Доковый вес (тонны)' addonAfter='тонны' />
            </Form.Item>

            <Form.Item
                label='Водоизмещение полное'
                labelAlign='left'
                name='full_displacement'
                initialValue={advert_technical_information?.full_displacement}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder='Водоизмещение полное (Рег. тонны)'
                    addonAfter='рег. тонны'
                />
            </Form.Item>

            <Form.Item
                label='Валовая вместимость'
                labelAlign='left'
                name='gross_tonnage'
                initialValue={advert_technical_information?.gross_tonnage}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder='Валовая вместимость' addonAfter='рег. тонны' />
            </Form.Item>

            <Form.Item
                label='Количество главных двигателей'
                labelAlign='left'
                name='num_engines'
                initialValue={advert_technical_information?.num_engines}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder='Количество главных двигателей'
                    min={0}
                    max={8}
                    addonAfter='шт.'
                />
            </Form.Item>
            <Form.Item
                label='Количество вспомогательных двигателей'
                labelAlign='left'
                name='num_additional_engines'
                initialValue={advert_technical_information?.num_additional_engines}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder='Количество вспомогательных двигателей'
                    min={0}
                    max={8}
                    addonAfter='шт.'
                />
            </Form.Item>

            <Form.Item
                label='Мощность двигателей'
                labelAlign='left'
                name='power'
                initialValue={advert_technical_information?.power}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder='Мощность двигателей кВт'
                    step='0.1'
                    addonAfter='кВт'
                />
            </Form.Item>

            <Form.Item
                label='Максимальная скорость'
                labelAlign='left'
                name='maximum_speed'
                initialValue={advert_technical_information?.maximum_speed}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder='Максимальная скорость(км/ч)'
                    addonAfter='км/ч'
                    step='0.1'
                />
            </Form.Item>

            <Form.Item
                label='Грузовые танки'
                labelAlign='left'
                name='cargo_tanks'
                initialValue={advert_technical_information?.cargo_tanks || isTanks}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Грузовые танки'
                    value={isTanks}
                    onChange={(val) => setIsTanks(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да'
                        },
                        {
                            value: false,
                            label: 'Нет'
                        }
                    ]}
                />
            </Form.Item>

            {isTanks && (
                <Form.Item
                    label='Суммарная вместимость'
                    labelAlign='left'
                    name='total_capacity_cargo_tanks'
                    initialValue={advert_technical_information?.total_capacity_cargo_tanks}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder='Суммарная вместимость' />
                </Form.Item>
            )}

            <Form.Item
                label='Второе дно'
                labelAlign='left'
                name='second_bottom'
                initialValue={advert_technical_information?.second_bottom}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Второе дно'
                    options={[
                        {
                            value: true,
                            label: 'Да'
                        },
                        {
                            value: false,
                            label: 'Нет'
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label='Вторые борта'
                labelAlign='left'
                name='second_sides'
                initialValue={advert_technical_information?.second_sides}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Вторые борта'
                    options={[
                        {
                            value: true,
                            label: 'Да'
                        },
                        {
                            value: false,
                            label: 'Нет'
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label='Грузоподъемность'
                labelAlign='left'
                name='carrying'
                initialValue={advert_technical_information?.carrying}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder='Грузоподъемность' />
            </Form.Item>

            <Form.Item
                label='Наливные танки'
                labelAlign='left'
                name='liquid_tanks'
                initialValue={advert_technical_information?.liquid_tanks || isBulkTanks}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Наливные танки'
                    value={isBulkTanks}
                    onChange={(val) => setIsBulkTanks(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да'
                        },
                        {
                            value: false,
                            label: 'Нет'
                        }
                    ]}
                />
            </Form.Item>

            {isBulkTanks && (
                <Form.Item
                    label='Cуммарная вместимость'
                    labelAlign='left'
                    name='total_capacity_liquid_tanks'
                    initialValue={advert_technical_information?.total_capacity_liquid_tanks}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder='Cуммарная вместимость' />
                </Form.Item>
            )}

            <Form.Item
                label='Пассажировместимость'
                labelAlign='left'
                name='passangers_avialable'
                initialValue={advert_technical_information?.passangers_avialable || isCapacity}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Пассажировместимость'
                    value={isCapacity}
                    onChange={(val) => setIsCapacity(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да'
                        },
                        {
                            value: false,
                            label: 'Нет'
                        }
                    ]}
                />
            </Form.Item>

            {isCapacity && (
                <Form.Item
                    label='Количество человек'
                    labelAlign='left'
                    name='num_passangers'
                    initialValue={advert_technical_information?.num_passangers}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder='Количество человек' />
                </Form.Item>
            )}
        </Form>
    );
}
