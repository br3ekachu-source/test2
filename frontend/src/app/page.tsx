import { MainAdvertPage } from 'Advert/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Судно: Главная страница',
    description: 'Объявления о продажу и аренду судна',
    icons: {
        icon: ['/favicon.ico?v=4'],
        apple: ['/apple-touch-icon.png?v=4'],
        shortcut: ['/apple-touch-icon.png']
    }
};

export default function Index() {
    return (
        <>
            <MainAdvertPage />
        </>
    );
}
