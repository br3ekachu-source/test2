'use client';

import { sydnoServiceJson } from 'SydnoService/service';
import { Alert, Avatar, Col, Divider, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { BasicList } from 'SydnoComponents/lists';
import { BaseAdvertCard, IAdvertCard } from 'Advert/widgets';
import dayjs from 'dayjs';
import { IUserService } from 'Users/shared/types';

dayjs.locale('ru');

export const User = ({ id }: { id: number }) => {
    const [user, setUser] = useState<IUserService | null>();
    useEffect(() => {
        if (typeof id === 'number') {
            sydnoServiceJson
                .get<IUserService>('api/user/' + id)
                .then((res) => setUser(res.data))
                .catch((err) => setUser(null));
        } else {
            setUser(null);
        }
    }, []);

    if (user === undefined) return null;
    if (!user)
        return (
            <div>
                <Typography.Title className='mt-4'>Пользователь не найден</Typography.Title>
            </div>
        );
    return (
        <div className='my-8'>
            <Row>
                <Col span={6}>
                    <div className='flex '>
                        <div className='mr-2'>
                            <Avatar size={64} src={user.avatar} icon={<UserOutlined />} />
                        </div>
                        <div className=''>
                            <Typography.Title className='' level={4}>
                                {user.name}
                            </Typography.Title>
                        </div>
                    </div>
                    <Divider />
                    <div className='mt-4'>
                        <EmailAccess status={!!user.email_verified_at} />
                        <div className='mt-2'>
                            <Typography.Text className='mt-2' type='secondary'>
                                На сайте с {dayjs(user.created_at).format('DD.MM.YYYY')}
                            </Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col offset={1} span={17}>
                    <div>
                        <Typography.Title level={2}>Объявления пользователя</Typography.Title>
                        <Divider />
                        <UserAdverts id={id} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const EmailAccess = ({ status }: { status: boolean }) => {
    if (!status) {
        return <Alert message='Почта не подтверждена' type='warning' showIcon />;
    }
    return <Alert message='Почта подтверждена' type='success' showIcon />;
};

const UserAdverts = ({ id }: { id: number }) => {
    const router = useRouter();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    };

    return (
        <BasicList
            action={`/api/useradverts/${id}`}
            renderItem={(item: IAdvertCard) => {
                return (
                    <BaseAdvertCard
                        key={item.id}
                        {...item}
                        onClick={() => onAdvertCardClick(item.id)}
                        isMiniCard={true}
                    />
                );
            }}
        />
    );
};
