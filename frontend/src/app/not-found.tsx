import { NotFound } from 'SydnoPage/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404: Страница не найдена'
};

export default function Page() {
    return <NotFound />;
}
