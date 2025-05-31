import { ProfileLayoutClient } from 'Profile/layouts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
}
