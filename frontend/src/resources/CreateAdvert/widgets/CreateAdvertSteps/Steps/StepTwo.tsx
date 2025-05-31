'use client';
import { Form, Input, Select, AutoComplete, Checkbox, DatePicker, InputNumber, Space } from 'antd';
import { onFinishStep } from '../../../shared/types/basicTypes';
import { useState, useEffect } from 'react';
import { CountriesSelector, RegionSelector } from 'SydnoComponents/selectors';
import { useCreateAdvert } from '../../../entitites/createAdvert/model';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';
import { sydnoServiceJson } from 'SydnoService/service';

export function CreateAdvertStepTwo({ onFinish }: { onFinish: onFinishStep }) {
    const { advert_legal_information } = useCreateAdvert(
        useShallow((state) => ({ advert_legal_information: state.instance.advert_legal_information }))
    );
    const [checkboxAccounting, setCheckboxAccounting] = useState<boolean | undefined>(
        advert_legal_information?.was_registered
    );
    const [statusVessel, setStatusVessel] = useState<string | undefined>(
        advert_legal_information?.vessel_status.toString()
    );

    const [vesseltypes, setVesseltypes] = useState<{ value: string; label: string }[]>();
    const [exploitationTypes, setExploitationTypes] = useState<{ value: string; label: string }[]>();

    const _onFinish = (values: any) => {
        const result = { ...values };
        if (values.register_valid_until)
            result.register_valid_until = values.register_valid_until.format().split('T')[0];
        if (values.building_year) result.building_year = values.building_year.year();
        if (values.port_address) {
            result.port_address = {
                value: values.port_address.value,
                city: values.port_address.city,
                country: values.port_address.country,
                region: values.port_address.region
            };
        }
        if (values.vessel_location) {
            result.vessel_location = {
                value: values.vessel_location.value,
                city: values.vessel_location.city,
                country: values.vessel_location.country,
                region: values.vessel_location.region
            };
        }
        onFinish({ type: 'StepTwo', data: result });
    };

    const onStatusVesselChange = (value: string) => {
        setStatusVessel(value);
    };

    useEffect(() => {
        sydnoServiceJson.get('/api/selector?vesseltypes&exploitationtypes').then((res) => {
            const data = res.data.message;
            setVesseltypes(
                Object.entries(data.vesseltypes as { [x in string]: string }).map(
                    ([value, label]: [string, string]) => ({
                        value,
                        label
                    })
                )
            );
            setExploitationTypes(
                Object.entries(data.exploitationtypes as { [x in string]: string }).map(
                    ([value, label]: [string, string]) => ({
                        value,
                        label
                    })
                )
            );
        });
    }, []);

    return (
        <Form
            id='StepTwo'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            initialValues={{ remember: true }}
            onFinish={_onFinish}
            autoComplete='off'
        >
            <Form.Item
                label='Название судна'
                labelAlign='left'
                name={'name'}
                rules={[{ required: true, message: 'Обязательное поле' }]}
                initialValue={advert_legal_information?.name}
            >
                <Input placeholder='Название судна' maxLength={70}/>
            </Form.Item>

            <Form.Item
                label='Флаг'
                labelAlign='left'
                name='flag'
                initialValue={advert_legal_information?.flag}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <CountriesSelector />
            </Form.Item>

            <Form.Item
                label='Тип эксплуатации'
                labelAlign='left'
                name='exploitation_type'
                initialValue={advert_legal_information?.exploitation_type.toString()}
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Select placeholder='Тип эксплуатации' options={exploitationTypes} />
            </Form.Item>

            <Form.Item
                label='Класс'
                labelAlign='left'
                name='class_formula'
                initialValue={advert_legal_information?.class_formula}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input placeholder='Класс' maxLength={50}/>
            </Form.Item>

            <Form.Item
                label='Классификационное общество'
                labelAlign='left'
                name='classification_society'
                initialValue={advert_legal_information?.classification_society}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input placeholder='Классификационное общество' maxLength={50}/>
            </Form.Item>

            <Form.Item
                label='Ограничения по высоте волны'
                labelAlign='left'
                name='wave_limit'
                initialValue={advert_legal_information?.wave_limit}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber step={0.1} max={3.5} min={0} />
            </Form.Item>

            <Form.Item
                label='Наличие технической документации'
                labelAlign='left'
                name='technical_documentation'
                initialValue={advert_legal_information?.technical_documentation || false}
                valuePropName='checked'
            >
                <Checkbox />
            </Form.Item>

            <Form.Item label='Тип и назначение' labelAlign='left' required>
                <Space.Compact>
                    <Form.Item
                        name='type'
                        initialValue={advert_legal_information?.type.toString()}
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Select style={{ width: '60%' }} placeholder='Выбрать тип' options={vesseltypes} />
                    </Form.Item>
                    <Form.Item
                        name={'purpose'}
                        initialValue={advert_legal_information?.purpose}
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Input style={{ width: '40%' }} placeholder='Назначение' maxLength={70}/>
                    </Form.Item>
                </Space.Compact>
            </Form.Item>

            <Form.Item
                label='Статус судна'
                labelAlign='left'
                initialValue={advert_legal_information?.vessel_status.toString()}
                name='vessel_status'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Статус судна'
                    onChange={onStatusVesselChange}
                    options={[
                        {
                            value: '0',
                            label: 'Действующие документы'
                        },
                        {
                            value: '1',
                            label: 'Без документов'
                        },
                        {
                            value: '2',
                            label: 'Холодный отстой'
                        }
                    ]}
                />
            </Form.Item>

            {statusVessel === '1' && (
                <Form.Item
                    label='Находилась ли на учете?'
                    labelAlign='left'
                    name='was_registered'
                    initialValue={advert_legal_information?.was_registered}
                    valuePropName='checked'
                >
                    <Checkbox
                        onChange={() => setCheckboxAccounting(!checkboxAccounting)}
                        checked={checkboxAccounting}
                    />
                </Form.Item>
            )}

            {((statusVessel === '1' && checkboxAccounting) || (statusVessel !== '1' && statusVessel !== null)) && (
                <Form.Item
                    label='Действие документов до'
                    labelAlign='left'
                    name='register_valid_until'
                    initialValue={
                        advert_legal_information?.register_valid_until &&
                        dayjs(advert_legal_information.register_valid_until)
                    }
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <DatePicker picker='month' />
                </Form.Item>
            )}

            <Form.Item
                name={'port_address'}
                initialValue={advert_legal_information?.port_address}
                label='Порт приписки'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <RegionSelector />
            </Form.Item>

            <Form.Item
                name={'vessel_location'}
                initialValue={advert_legal_information?.vessel_location}
                label='Местонахождение судна'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <RegionSelector placeholder='Местонахождение судна' />
            </Form.Item>

            <Form.Item
                label='Место постройки'
                labelAlign='left'
                name={'building_place'}
                initialValue={advert_legal_information?.building_place}
            >
                <Input placeholder='Место постройки' maxLength={70}/>
            </Form.Item>

            <Form.Item
                label='Год постройки'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Form.Item
                    name={'building_year'}
                    initialValue={
                        advert_legal_information?.building_year &&
                        dayjs(advert_legal_information?.building_year.toString())
                    }
                    noStyle
                >
                    <DatePicker style={{ width: '50%' }} placeholder='Год постройки' picker='year' />
                </Form.Item>
            </Form.Item>

            <Form.Item
                label='Номер IMO'
                labelAlign='left'
                name='imo_number'
                initialValue={advert_legal_information?.imo_number}
            >
                <Input placeholder='Номер IMO' maxLength={40}/>
            </Form.Item>

            <Form.Item
                label='Номер проекта'
                labelAlign='left'
                name='project_number'
                initialValue={advert_legal_information?.project_number}
            >
                <Input placeholder='Номер проекта' maxLength={40}/>
            </Form.Item>

            <Form.Item
                label='Строительный номер'
                labelAlign='left'
                name='building_number'
                initialValue={advert_legal_information?.building_number}
            >
                <Input placeholder='Строительный номер' maxLength={40}/>
            </Form.Item>
        </Form>
    );
}
