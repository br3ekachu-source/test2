import { Button } from 'antd';
import { SyntheticEvent, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import s from './styles.module.css';

export const PhoneButton = ({ phone }: { phone: string }) => {
    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [isCopy, setIsCopy] = useState<boolean>(false);

    const showPhoneHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (showPhone) {
            copyPhoneInBuffer();
        }
        setShowPhone(true);
    };

    const copyPhoneInBuffer = () => {
        if (phone) {
            navigator.clipboard
                .writeText(phone)
                .then(() => {
                    setIsCopy(true);
                    setTimeout(() => setIsCopy(false), 1500);
                })
                .catch((err) => {
                    console.error('Ошибка копирования URL:', err);
                });
        }
    };

    return (
        <Button
            style={{
                width: '100%',
                height: 'auto',
                textAlign: 'center'
            }}
            className={s['small-device'] + ' mt-2 ' + (isCopy ? s['phone-button__container_copy'] : '')}
            onClick={showPhoneHandler}
        >
            {showPhone ? (
                isCopy ? (
                    <span>
                        <CheckOutlined /> Скопировано
                    </span>
                ) : (
                    phone
                )
            ) : (
                'Показать телефон'
            )}
        </Button>
    );
};
