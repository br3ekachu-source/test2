import { User } from 'Users/pages';
import { Metadata } from 'next';

interface IUsersPage {
    params?: {
        id: string;
    };
}

export const metadata: Metadata = {
    title: 'Страница пользователя'
};

export default function Users({ params }: IUsersPage) {
    if (!params?.id) {
        return null;
    }
    return <User id={parseInt(params.id, 10)} />;
}
