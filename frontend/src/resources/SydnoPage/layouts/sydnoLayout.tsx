'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider, ThemeConfig, Modal } from 'antd';
import { Header } from 'SydnoPage/widgets/header/Header';
import { useUser } from 'Auth/entities';
import { useShallow } from 'zustand/react/shallow';
import s from '../styles.module.css';
import ruRU from 'antd/lib/locale/ru_RU';
import { StaticContext } from 'SydnoHelpers/contexts';
import { Footer } from 'SydnoPage/widgets/footer/Footer';

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#34A8FF'
    }
};

export const SydnoLayout = ({ children }: { children: React.ReactNode }) => {
    const { fetch, hasUser } = useUser(useShallow((state) => ({ fetch: state.fetch, hasUser: state.hasUser })));
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        if (!hasUser()) fetch();
    }, []);

    return (
        <ConfigProvider locale={ruRU} theme={theme}>
            <StaticContext.Provider value={{ modal }}>
                <Layout style={{ background: 'white', minHeight: '100vh' }}>
                    <Header />
                    <Layout.Content style={{ position: 'relative' }} className={s['sydno-container']}>
                        {children}
                    </Layout.Content>
                    <Footer />
                </Layout>
                {contextHolder}
            </StaticContext.Provider>
        </ConfigProvider>
    );
};
