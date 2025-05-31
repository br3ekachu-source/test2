import { BaseAdvertCard, IAdvertCard } from 'Advert/widgets';
import { BasicList } from 'SydnoComponents/lists';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';

export const MyDrafts = () => {
    const router = useRouter();

    const continueEditing = (id: number, type: number) => {
        switch(type) {
            case 0:
                router.push(`/create/sale?id=${id}`);
                break;
            case 1:
                router.push(`/create/fracht?id=${id}`);
                break;
            default:
                notification.warning({message: 'Не определен тип объявления', duration: 2, placement: 'bottomRight'});
                break;
        }
    };

    return (
        <BasicList
            action='/api/myadverts/draft'
            renderItem={(item: IAdvertCard) => {
                return (
                    <BaseAdvertCard
                        key={item.id}
                        {...item}
                        isDraft={true}
                        showUserInfo={false}
                        onClick={() => continueEditing(item.id, item.advert_type)}
                    />
                );
            }}
        />
    );
};
