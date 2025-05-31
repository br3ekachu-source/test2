import { ProfileSettings } from 'Profile/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Настройки'
};

export default function SettingsServer() {
    return <ProfileSettings />;
}
