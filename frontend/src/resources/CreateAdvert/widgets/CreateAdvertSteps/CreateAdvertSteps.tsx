'use client';
import { Button, Col, Result, Row, Steps, Typography } from 'antd';
import { useContext, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { StaticContext } from 'SydnoHelpers/contexts';
import { sydnoServiceJson } from 'SydnoService/service';
import { LoadingOutlined } from '@ant-design/icons';
import { ICreateAdStepOne, ICreateAdStepThree, ICreateAdStepTwo, IInstanceCreateAd, useCreateAdvert } from 'CreateAdvert/entitites/createAdvert/model';
import { CreateAdvertTypes, onFinishStep } from 'CreateAdvert/shared/types/basicTypes';
import { CreateAdvertStepOne } from './Steps/StepOne';
import { CreateAdvertStepTwo } from './Steps/StepTwo';
import { CreateAdvertStepThree } from './Steps/StepThree';

export function CreateAdvertSteps({ id, type }: { id?: number, type: CreateAdvertTypes }) {
    const { setInstance, setAdvertType } = useCreateAdvert(useShallow((state) => ({
        setInstance: state.setInstance,
        setAdvertType: state.setAdvertType
    })));
    const [loading, setLoading] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (id) {
            setLoading(true);
            sydnoServiceJson
                .get<IInstanceCreateAd>(`/api/adverts/${id}/edit`)
                .then((res) => {
                    setInstance(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
        else {
            setAdvertType(type);
        }
        return () => {
            setInstance({});
        };
    }, [id]);

    if (id && loading) return <Result icon={<LoadingOutlined />} status='info' title='Загрузка...' />;
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Typography.Title
                        level={2}
                        style={{
                            marginTop: '18px',
                            marginBottom: '48px'
                        }}
                    >
                        {id ? 'Редактирование' : 'Создание'} объявления {type === CreateAdvertTypes.Sale ? 'продажи' : 'аредны'}
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <CreateSaleAdUI isEdit={!!id}/>
                </Col>
            </Row>
        </div>
    );
}

export function CreateSaleAdUI({isEdit}: {isEdit: boolean}) {
    const { createStepOne, createStepTwo, createStepThree } = useCreateAdvert(
        useShallow((state) => ({
            createStepOne: state.createStepOne,
            createStepTwo: state.createStepTwo,
            createStepThree: state.createStepThree
        }))
    );
    const steps: ['StepOne', 'StepTwo', 'StepThree'] = ['StepOne', 'StepTwo', 'StepThree'];
    const [current, setCurrent] = useState<'StepOne' | 'StepTwo' | 'StepThree'>('StepOne');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const index = steps.indexOf(current);
    const { modal } = useContext(StaticContext);

    const openErrorModal = () => {
        modal?.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить'
        });
    };

    const onFinishStep: onFinishStep = async ({ type, data }) => {
        let done = false;

        setLoading(true);

        if (type === 'StepOne') {
            done = await createStepOne(data as ICreateAdStepOne);
        }

        if (type === 'StepTwo') {
            done = await createStepTwo(data as ICreateAdStepTwo);
        }

        if (type === 'StepThree') {
            done = await createStepThree(data as ICreateAdStepThree);
        }

        setLoading(false);

        if (!done) {
            openErrorModal();
            return;
        }

        const index = steps.indexOf(type);
        if (index < 2) setCurrent(steps[index + 1]);
        else router.push('/profile');
    };

    const onBack = () => {
        const index = steps.indexOf(current);
        if (index >= 1) setCurrent(steps[index - 1]);
    };

    return (
        <div>
            <Steps
                style={{
                    marginBottom: '48px'
                }}
                current={index}
                items={[
                    {
                        title: 'Основная информация'
                    },
                    {
                        title: 'Юридическая информация'
                    },
                    {
                        title: 'Техническая информация'
                    }
                ]}
            />
            {index === 0 ? (
                <CreateAdvertStepOne onFinish={onFinishStep} />
            ) : index === 1 ? (
                <CreateAdvertStepTwo onFinish={onFinishStep} />
            ) : index === 2 ? (
                <CreateAdvertStepThree onFinish={onFinishStep} />
            ) : null}
            <Row>
                <Col span={6}>
                    <Button
                        loading={loading}
                        disabled={index === 0}
                        onClick={onBack}
                        className='mr-4 w-full'
                        type='default'
                    >
                        Назад
                    </Button>
                </Col>
                <Col offset={1} span={15}>
                    <Button loading={loading} form={current} type='primary' className='mr-4 w-full' htmlType='submit'>
                        {index === 2
                            ? (isEdit ? 'Редактировать' : 'Создать') + ' объявление'
                            : 'Перейти к следующему шагу'
                        }
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
