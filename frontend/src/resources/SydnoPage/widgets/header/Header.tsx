'use client';
import { Button, Typography } from 'antd';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import { LoadingOutlined } from '@ant-design/icons';
import s from '../../styles.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from 'Auth/entities';
import { ProfileButton, SingButton } from 'Auth/features';
import Image from 'next/image';
import { CreateAdButton } from 'SydnoComponents/buttons';
import { MenuBurger } from './MenuBurger/ui';

const dontShowCreateAdUrls = ['/create'];

export const Header = () => {
    const { auth } = useUser(useShallow((state) => ({ auth: state.auth })));
    const [showCreateAdButton, setShowCreateAdButton] = useState<boolean>(true);
    const [burgerStatus, setBurgerStatus] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        if (dontShowCreateAdUrls.some((item) => pathname.includes(item))) setShowCreateAdButton(false);
        else setShowCreateAdButton(true);
        closeDropDown();
    }, [pathname]);

    const openDropDown = () => {
        document.body.classList.add('lock');
        setBurgerStatus(true);
    };

    const closeDropDown = () => {
        document.body.classList.remove('lock');
        setBurgerStatus(false);
    };

    const onMenuBurgerChangeHandler = () => {
        if (burgerStatus) {
            closeDropDown();
        } else {
            openDropDown();
        }
    };

    return (
        <div className={s['sydno-header']}>
            <div className={s['sydno-header-body']}>
                <div className={s['sydno-header-body-content']}>
                    <div
                        className={s['sydno-container'] + ' flex justify-between items-center h-full'}
                        style={{ margin: '0 auto' }}
                    >
                        <div>
                            <Link href={'/'}>
                                <div className='flex items-center'>
                                    <Image
                                        className='mr-2'
                                        src={'/min-logo.svg'}
                                        width={28}
                                        height={28}
                                        alt='Судно логотип'
                                    />
                                    <Typography.Title level={4} style={{ marginBottom: 0, color: 'white' }}>
                                        Sydno
                                    </Typography.Title>
                                </div>
                            </Link>
                        </div>
                        <div className={'flex justify-between items-center'}>
                            <div
                                className={
                                    s['sydno-header-body-content-desctopmenu-main'] +
                                    ' flex justify-between items-center'
                                }
                            >
                                {auth !== null ? (
                                    <div className={auth ? 'mr-4' : ''}>
                                        {auth ? <ProfileButton /> : <SingButton />}
                                    </div>
                                ) : (
                                    <LoadingOutlined className='mr-4' style={{ color: '#fff', fontSize: '18px' }} />
                                )}
                                {showCreateAdButton && (
                                    <Link href={'/create'}>
                                        <Button type='primary'>Разместить объявление</Button>
                                    </Link>
                                )}
                            </div>
                            <div className={s['sydno-header-body-content-desctopmenu-burger']}>
                                <MenuBurger padding='6px' status={burgerStatus} onClick={onMenuBurgerChangeHandler} />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        s['sydno-header-body-dropdown'] + ' ' + (burgerStatus && s['sydno-header-body-dropdown-active'])
                    }
                >
                    <div className='flex flex-col justify-between items-center'>
                        {auth !== null ? (
                            <div className={auth ? 'mr-4' : ''}>{auth ? <ProfileButton /> : <SingButton />}</div>
                        ) : (
                            <LoadingOutlined className='mr-4' style={{ color: '#fff', fontSize: '18px' }} />
                        )}
                        {showCreateAdButton && <CreateAdButton />}
                    </div>
                </div>
                <div
                    onClick={closeDropDown}
                    className={burgerStatus ? s['sydno-header-body-dropdown-outside'] : ''}
                ></div>
            </div>
        </div>
    );
};
