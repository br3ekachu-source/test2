import { Avatar, Dropdown, MenuProps, Typography } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useUser } from 'Auth/entities';

export const ProfileButton = () => {
    const { name, logout, avatar } = useUser(
        useShallow((state) => ({ name: state.instance?.name, logout: state.logout, avatar: state.instance?.avatar }))
    );
    const router = useRouter();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Мои объявления',
            onClick: () => {
                router.push('/profile');
            }
        },
        {
            key: '2',
            label: 'Избранное',
            onClick: () => {
                router.push('/profile/favorites');
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'settings',
            label: 'Настройки',
            onClick: () => {
                router.push('/profile/settings');
            }
        },
        {
            type: 'divider'
        },
        {
            key: '3',
            label: 'Выйти',
            danger: true,
            onClick: () => {
                logout();
            }
        }
    ];

    return (
        <Dropdown menu={{ items }} className='cursor-pointer'>
            <div className='flex items-center' onClick={() => router.push('/profile')}>
                <Avatar src={avatar} size='small' icon={<UserOutlined />} />
                <Typography.Text strong style={{ color: 'white' }} className='ml-2'>
                    {name}
                </Typography.Text>
            </div>
        </Dropdown>
    );
};
