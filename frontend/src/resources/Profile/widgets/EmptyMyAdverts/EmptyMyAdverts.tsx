import { CreateAdButton } from 'SydnoComponents/buttons';
import { Typography } from 'antd';

export const EmptyMyAdverts = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Typography.Title level={1}>Ой, мы не нашли ваши объявления</Typography.Title>
            <Typography.Title level={4} type='secondary'>
                Давайте разместим первое объявление
            </Typography.Title>
            <CreateAdButton className='mt-8' />
        </div>
    );
};
