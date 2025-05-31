import { Button } from 'antd';
import Link from 'next/link';

export const CreateAdButton = ({ className }: { className?: string }) => {
    return (
        <Link href={'/create'}>
            <Button type='primary' className={className}>
                Разместить объявление
            </Button>
        </Link>
    );
};
