import { AuthWrapper } from 'Auth/entities';
import { ForgotPassword } from 'Auth/pages';
import { NotFoundQueryParams } from 'SydnoComponents/commons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Восстановление пароля'
};

export default function Verify(props: {
    searchParams: {
        token: string;
        email: string;
    };
}) {
    const { token = null, email = null } = props.searchParams;

    if (!token || !email) return <NotFoundQueryParams />;
    return (
        <AuthWrapper invert>
            <div className='' style={{ width: '35%', margin: '50px auto' }}>
                <ForgotPassword token={token} email={email} />
            </div>
        </AuthWrapper>
    );
}
