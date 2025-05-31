'use client';
import React, { ForwardedRef } from 'react';
import { IReceivedAdvert } from '@/app/advert/[advert_id]/IAdvertListItemReady';
import countriesJson from '../../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json';

import './AdvertSmallCard.css';
import { Price } from 'SydnoComponents/commons';
import Link from 'next/link';
import { IAdvertCard } from '../AdvertBaseCard/AdvertBaseCard';
import { useRouter } from 'next/navigation';
interface OtherAdvertsProps {
    advert: IAdvertCard;
    forwardedRef?: ForwardedRef<HTMLDivElement>;
}
export const AdvertSmallCard: React.FC<OtherAdvertsProps> = ({ advert, forwardedRef }) => {
    const router = useRouter();

    const flagCode = advert.advert_legal_information.flag;
    const flagData = countriesJson.data[flagCode as keyof typeof countriesJson.data];
    const PRICE_LOCALE = 'ru';

    const NUMBER_FORMAT_OPTIONS = {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: '0'
    };
    return (
        <div onClick={() => router.push('/advert/' + String(advert.id))} className='other-advert-container'>
            <div className='image-block'>
                <img alt={advert.header} src={advert.images[0] || '/sheep-icon.png'} />
                <img className='other-flag' alt={`Флаг ${flagData}`} src={`/flags/${flagCode}.svg`} />
                <span className='other-sell-rent'>продажа</span>
            </div>
            <div className='other-info-block' ref={forwardedRef}>
                <div className='other-info-block-title'>
                    <Link href={'/advert/' + String(advert.id)}>
                        <p>
                            {advert.advert_legal_information.name.substring(
                                0,
                                advert.advert_legal_information.name.length - 1
                            )}{' '}
                            {' | '}
                            {advert.advert_legal_information.building_year}
                        </p>
                    </Link>
                </div>

                <div className='other-info-block-about'>
                    <p
                        style={{
                            color: 'black',
                            fontWeight: '500',
                            fontSize: '15px'
                        }}
                    >
                        {advert.advert_legal_information.type}
                    </p>
                    <p
                        style={{
                            color: '#40A9FF',
                            fontSize: '15px',
                            fontWeight: '500'
                        }}
                    >
                        <Price locale={PRICE_LOCALE} options={NUMBER_FORMAT_OPTIONS} price={advert.price || 0} />
                    </p>
                    <p
                        style={{
                            color: '#7F7F7F',
                            fontSize: '15px'
                        }}
                    >
                        г. {advert.advert_legal_information.port_address.city}
                    </p>
                </div>
            </div>
        </div>
    );
};
