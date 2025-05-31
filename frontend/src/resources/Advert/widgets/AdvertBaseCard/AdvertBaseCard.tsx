import React, { useState } from 'react';
import { IAdvertListItem, IAdvertLegalInformation } from 'Advert/entities';
import { Price } from 'SydnoComponents/commons';
import { SmallImageSlider } from 'SydnoComponents/sliders';
import { isTouchDevice } from 'SydnoHelpers/commons';
import { Col, Row, Typography } from 'antd';
import Link from 'next/link';
import styles from './styles.module.css';
import { FavoriteButton } from '../../features/FavoriteButton/FavoriteButton';
import { UserButton } from 'Users/features';
import { PhoneButton } from 'Advert/features/PhoneButton/PhoneButton';
import dayjs from 'dayjs';
import { getCountryName } from 'SydnoComponents/selectors';

dayjs.locale('ru');

export interface IAdvertCard extends IAdvertListItem {
    onClick?: () => void;
    size?: 'small' | 'big';
    showUserInfo?: boolean;
    isDraft: boolean;
    isMiniCard: boolean;
}

const FALLBACK_IMAGE_SRC = '/sheep-icon.png';

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: '0'
};

export const BaseAdvertCard: React.FC<IAdvertCard> = ({
    onClick,
    header,
    price,
    advert_legal_information,
    description,
    phone_number,
    images,
    created_at,
    id,
    size,
    isDraft,
    advert_technical_information,
    registration_number,
    in_favorites,
    user,
    isMiniCard,
    fracht_price_type,
    advert_type,
    fracht_type,
    showUserInfo = true
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const isTouch = isTouchDevice();

    const onMouseLeave = () => {
        setShowDetails(false);
    };

    const onMouseEnter = () => {
        setShowDetails(true);
    };

    const showRightPanel = showUserInfo && user;

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={
                styles['sudno-AdvertCard'] +
                ' ' +
                (isTouch && styles['sudno-AdvertCard-shadow']) +
                ' ' +
                (isDraft && styles['sudno-AdvertCard-draft'])
            }
            onClick={onClick}
        >
            <Row>
                <Col xs={24} sm={24} md={showRightPanel ? 7 : 9}>
                    <SmallImageSlider
                        items={images}
                        type={advert_type}
                        maxItems={5}
                        showLabels={showDetails}
                        fallbackImageSrc={FALLBACK_IMAGE_SRC}
                        imageStyle={{ borderRadius: 'var(--main-app-br)' }}
                        flag={advert_legal_information ? advert_legal_information.flag : ''}
                        isMiniCard={isDraft ? true : isMiniCard}
                    />
                </Col>
                <Col xs={24} sm={24} md={showRightPanel ? 12 : 14}>
                    <div
                        // className={`flex flex-col justify-between h-full` + styles.paddingLeft}
                        className={`flex flex-col justify-between h-full ${styles.paddingLeft}`}
                        // style={{ paddingLeft: '1rem', '@media (max-width: 767px)': { paddingLeft: '0px' } }}
                    >
                        <div>
                            <Typography.Title level={3} style={{ marginBottom: 0 }}>
                                <Link href={'advert/' + id}>{header}</Link>
                            </Typography.Title>
                            <Typography.Title level={4} style={{ marginTop: 0 }}>
                                <Price locale={PRICE_LOCALE} options={NUMBER_FORMAT_OPTIONS} price={price} />
                                {typeof fracht_price_type === 'string' && ` / ${fracht_price_type}`}
                            </Typography.Title>
                            <Typography.Paragraph>
                                <DetailsInfo
                                    size={size || 'big'}
                                    {...advert_legal_information}
                                    fracht_type={fracht_type}
                                    registration_number={registration_number}
                                    length={advert_technical_information && advert_technical_information.overall_length}
                                />
                            </Typography.Paragraph>
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: true,
                                    onExpand: (e) => e.stopPropagation()
                                }}
                                type='secondary'
                            >
                                {description}
                            </Typography.Paragraph>
                        </div>
                        <div className='flex flex-col'>
                            <Typography.Text type='secondary'>
                                {advert_legal_information && advert_legal_information.port_address.value}
                            </Typography.Text>
                            <Typography.Text type='secondary'>
                                {created_at && 'Опубликовано ' + dayjs(created_at).format('DD.MM.YYYY')}
                            </Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={1}>
                    <div className={`${styles.favButton} ${styles.mTop}`}>
                        <FavoriteButton id={id} isDefaultFavorite={in_favorites} />
                    </div>
                </Col>
                {showRightPanel && (
                    <Col xs={24} sm={24} md={4}>
                        <div>
                            {showUserInfo && user && (
                                <>
                                    <UserButton
                                        className={`ml-1 ${styles.mTop}`}
                                        id={user.id}
                                        src={user.avatar}
                                        name={user.name}
                                        advertCount={user.adverts_count}
                                    />
                                    <PhoneButton phone={phone_number} />
                                </>
                            )}
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
};

const DetailsItem: React.FC<{
    label: string;
    children: React.ReactNode;
}> = ({ label, children }) => {
    return (
        <div className='flex pr-4'>
            <div className={styles['sudno-AdvertCard-details-label'] + ' pr-2'}>{label}:</div>
            <div className={styles['sudno-AdvertCard-details-value'] + ' flex justify-center items-center'}>
                {children}
            </div>
        </div>
    );
};

const DetailsInfo: React.FC<
    IAdvertLegalInformation & {
        size: 'small' | 'big';
        registration_number: string;
        length: number;
        fracht_type: string
    }
> = (props) => {
    return (
        <div className={'flex flex-wrap justify-start items-center ' + (props.size === 'small' ? 'flex-col' : '')}>
            <DetailsItem label='Название'>{props.name}</DetailsItem>
            <DetailsItem label='Тип'>{props.type}</DetailsItem>
            {typeof props.fracht_type === 'string' && <DetailsItem label='Тип фрахта'>{props.fracht_type}</DetailsItem>}
            <DetailsItem label='Страна'>{getCountryName(props.flag as any)}</DetailsItem>
            <DetailsItem label='Год постройки'>{props.building_year}</DetailsItem>
            <DetailsItem label='Класс'>{props.class_formula}</DetailsItem>
            <DetailsItem label='Длина'>{props.length}</DetailsItem>
            <DetailsItem label='Регистровый номер'>{props.imo_number}</DetailsItem>
        </div>
    );
};
