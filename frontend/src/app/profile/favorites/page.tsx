import { FavoriteProfile } from 'Profile/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Избранное'
};

export default function FavoriteServer() {
    return <FavoriteProfile />;
}
