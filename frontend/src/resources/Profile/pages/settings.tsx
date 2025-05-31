'use client';
import { Typography } from 'antd';
import { ResetPassword } from '../widgets/Settings/ResetPassword';
import { VerifyMail } from '../widgets/Settings/VerifyMail';
import { ProfileInfo } from '../widgets/Settings/ProfileInfo';

export const ProfileSettings = () => {
    return (
        <div>
            <Typography.Title level={2}>Настройки</Typography.Title>
            <ProfileInfo />
            <ResetPassword />
            <VerifyMail />
        </div>
    );
};
