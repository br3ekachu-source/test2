import { StyledComponentsRegistry } from 'SydnoPage/shared';
import 'antd/dist/reset.css';
import '@/app/globals.css';
import { SydnoLayout } from 'SydnoPage/layouts';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default async function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>
                <AntdRegistry>
                    <StyledComponentsRegistry>
                        <SydnoLayout>{props.children}</SydnoLayout>
                    </StyledComponentsRegistry>
                </AntdRegistry>
            </body>
        </html>
    );
}
