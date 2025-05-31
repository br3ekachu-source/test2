import { IAdvertCard, BaseAdvertCard } from 'Advert/widgets';
import { BasicList } from 'SydnoComponents/lists';
import { useRouter } from 'next/navigation';

export const MyActive = () => {
    const router = useRouter();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    };

    return (
        <BasicList
            action='/api/myadverts/active'
            renderItem={(item: IAdvertCard) => {
                return <BaseAdvertCard key={item.id} {...item} onClick={() => onAdvertCardClick(item.id)} />;
            }}
        />
    );
};
