'use client';
import { useAdvert } from 'Advert/entities';
import { SmallAdvertsList } from '../../../resources/SydnoComponents/lists/SmallAdvertsList/SmallAdvertsList';
import { AdvertSmallCard } from 'Advert/widgets/AdvertSmallCard/AdvertSmallCard';
import { useShallow } from 'zustand/react/shallow';

export interface OtherAdvertsProps {
    userId: string | number;
    advertId: string | number;
}
export const OtherAdverts: React.FC<OtherAdvertsProps> = ({ userId, advertId }) => {
    const { getOtherAdverts } = useAdvert(
        useShallow((state) => ({
            getOtherAdverts: state.getOtherAdverts
        }))
    );
    return (
        <SmallAdvertsList
            title='Другие объявления этого продавца'
            action='/api/otheruseradverts'
            userId={userId}
            advertId={advertId}
            renderItem={(advert, index, length, ref) => (
                <AdvertSmallCard key={index} advert={advert} forwardedRef={index === length - 1 ? ref : null} />
            )}
            fetchData={getOtherAdverts}
        />
    );
};
