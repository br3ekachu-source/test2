import { AuthWrapper } from 'Auth/entities';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Разместить объявление'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <AuthWrapper>{children}</AuthWrapper>;
}
