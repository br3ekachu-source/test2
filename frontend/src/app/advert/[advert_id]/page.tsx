import type { Metadata, ResolvingMetadata } from 'next';
import AdvertPage from './PageClient';
import { IReceivedAdvert } from './IAdvertListItemReady';
import { fetchDataNext } from 'SydnoService/serviceNext';

type Props = {
    params: { advert_id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const getAdvert = async (id?: string | number) => {
    if (!id) return;
    const res = await fetchDataNext(`/api/adverts/${id}`);
    console.log(res);
    return res;
};

const getAdvertMetadata = async (id?: string | number) => {
    if (!id) return;
    const res = await fetchDataNext(`/api/adverts/${id}/metadata`);
    return res;
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const advert = await getAdvertMetadata(params.advert_id);
    const advertData: IReceivedAdvert = await advert?.json();
    if (advert?.ok) {
        return {
            title: advertData.header,
            description: advertData.description
        };
    } else {
        return {
            title: 'Объявление не найдено'
        };
    }
}

export default async function Page({ params }: Props) {
    const advert = await getAdvert(params.advert_id);
    const advertData: IReceivedAdvert = await advert?.json();
    if (advert?.ok) {
        return <AdvertPage advert={advertData} />;
    } else {
        return <AdvertPage error={advertData || null} />;
    }
}
