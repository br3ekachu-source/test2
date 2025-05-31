'use client';
import { Col, Row, Avatar, Button, Typography, Divider, Rate, Result, Modal } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useContext } from 'react';
import { AuthWrapper, useUser } from 'Auth/entities';
import { StaticContext } from 'SydnoHelpers/contexts';

export const ProfileLayoutClient = ({ children }: { children: React.ReactNode }) => {
    const { name, logout, avatar } = useUser(
        useShallow((state) => ({
            name: state.instance?.name,
            logout: state.logout,
            avatar: state.instance?.avatar
        }))
    );
    const pathname = usePathname();
    const { modal } = useContext(StaticContext);

    const openExitModal = () => {
        modal?.confirm({
            title: 'Вы дейстительно хотите выйти?',
            cancelText: 'Нет',
            okText: 'Да',
            okType: 'danger',
            icon: <LogoutOutlined />,
            onOk: () => {
                logout();
            }
        });
    };
    return (
        <AuthWrapper>
            <div className='my-8'>
                <Row>
                    <Col xs={24} sm={4}>
                        <div className='mb-2 flex align-center'>
                            <div className='mr-2'>
                                <Avatar src={avatar} icon={<UserOutlined />} />
                            </div>
                            <div>
                                <Typography.Title level={4}>{name}</Typography.Title>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <Link href={'/profile'}>
                                <Button
                                    danger={pathname === '/profile'}
                                    type='link'
                                    style={{ textAlign: 'start', paddingLeft: 0 }}
                                >
                                    Мои объявления
                                </Button>
                            </Link>
                            <Link href={'/profile/favorites'}>
                                <Button
                                    danger={pathname === '/profile/favorites'}
                                    type='link'
                                    style={{ textAlign: 'start', paddingLeft: 0 }}
                                >
                                    Избранное
                                </Button>
                            </Link>
                        </div>

                        <Divider style={{ margin: '8px 0' }} />

                        <div className='flex flex-col'>
                            <Link href={'/profile/settings'}>
                                <Button
                                    danger={pathname === '/profile/settings'}
                                    type='link'
                                    style={{ textAlign: 'start', paddingLeft: 0 }}
                                >
                                    Настройки
                                </Button>
                            </Link>
                        </div>

                        <Divider style={{ margin: '8px 0' }} />

                        <div className='flex flex-col mb-8'>
                            <Button onClick={openExitModal} type='link' style={{ textAlign: 'start', paddingLeft: 0 }}>
                                Выйти
                            </Button>
                        </div>
                    </Col>
                    <Col xs={24} sm={{ offset: 1, span: 19 }}>
                        {children}
                    </Col>
                </Row>
            </div>
        </AuthWrapper>
    );
};
