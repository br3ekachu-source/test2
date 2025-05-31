'use client';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Col, Divider, Row, Spin, Typography, notification } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import './styles.css';
import { ConvertData } from './DataConverter';
import { useAdvert } from 'Advert/entities';
import { Price } from 'SydnoComponents/commons';
import Specs from './Specs';
import { useScreenSize } from './useMobileView';
import { useUser } from 'Auth/entities';
import { IReceivedAdvert } from './IAdvertListItemReady';
import { CheckOutlined, CopyOutlined, EyeOutlined, MailOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';
import { SpecsPair } from './SpecsPair';
import { UserButton } from 'Users/features';
import { CustomCarousel } from './CustomCarousel';
import { OtherAdverts } from './OtherAdverts';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface IAdvertPageProps {
    advert?: IReceivedAdvert;
    error?: unknown;
}
const FALLBACK_IMAGE_SRC = ['/sheep-icon.png'];
const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: '0'
};

/**
 * Компонент страницы объявления.
 * Отображает страницу объявления с контактной информацией, изображениями и описанием.
 * @param params Объект параметров с идентификатором объявления `advert_id`.
 *
 * Author: [Gleb]
 */
const AdvertPage: React.FC<IAdvertPageProps> = ({ advert: advertData }) => {
    const { addToFavourite, deleteFromFavourite } = useAdvert(
        useShallow((state) => ({
            addToFavourite: state.addToFavourite,
            deleteFromFavourite: state.deleteFromFavourite
        }))
    );
    const { auth } = useUser(useShallow((state) => ({ auth: state.auth })));
    const [isLoading, setIsLoading] = useState(false);
    const [showNumber, setShowNumber] = useState<boolean>(false);
    const [isNumberCopied, setIsNumberCopied] = useState<boolean>(false);
    const router = useRouter();

    const [isLocalFavorite, setIsLocalFavorite] = useState<boolean | undefined>(advertData && advertData.in_favorites);
    const screenSize = useScreenSize();

    const showNumberBtnHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (screenSize !== 'small') {
            setShowNumber(true);
        }
    };
    const numberHandler = (e: SyntheticEvent) => {
        if (advertData?.phone_number && screenSize !== 'small') {
            navigator.clipboard
                .writeText(advertData.phone_number)
                .then(() => {
                    setIsNumberCopied(true);
                    setTimeout(() => setIsNumberCopied(false), 1000);
                })
                .catch((err) => {
                    console.error('Ошибка копирования URL:', err);
                });
        } else {
            window.location.href = `tel:${advertData?.phone_number}`;
        }
    };
    const emailHandler = (e: SyntheticEvent) => {
        window.location.href = `mailto:${advertData?.user.email}`;
    };
    //TODO: убрать когда разберёмся с likeBtn
    // const likeButtonClickhandler = (e: SyntheticEvent) => {
    //     e.stopPropagation();
    //     if (!auth) {
    //         notification.warning({
    //             message: 'Необходимо авторизоваться на сайте',
    //             placement: 'bottomRight'
    //         });
    //         return;
    //     }
    //     if (advertData?.id !== undefined) {
    //         if (!isLocalFavorite) {
    //             setIsLoading(true);
    //             addToFavourite(advertData?.id).then((res) => {
    //                 if (res) {
    //                     setIsLoading(false);
    //                     setIsLocalFavorite(res);
    //                 } else {
    //                     notification.error({
    //                         message: 'Ошибка',
    //                         placement: 'bottomRight'
    //                     });
    //                 }
    //             });
    //         } else {
    //             setIsLoading(true);
    //             deleteFromFavourite(advertData?.id).then((res) => {
    //                 if (res) {
    //                     setIsLoading(false);
    //                     setIsLocalFavorite(!res);
    //                 } else {
    //                     notification.error({
    //                         message: 'Ошибка',
    //                         placement: 'bottomRight'
    //                     });
    //                 }
    //             });
    //         }
    //     }
    // };

    const ConvertedAdvertData = advertData && ConvertData(advertData);

    const handleEditClick = () => {
        if(!advertData) return;

        switch(advertData.advert_type) {
            case 0:
                router.push(`/create/sale?id=${advertData.id}`);
                break;
            case 1:
                router.push(`/create/fracht?id=${advertData.id}`);
                break;
            default:
                notification.warning({message: 'Не определен тип объявления', duration: 2, placement: 'bottomRight'});
                break;
        }
    }

    if (!advertData) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <Spin size='large' />
            </div>
        );
    }
    return screenSize !== 'small' ? (
        <div className='pt-6'>
            <Row>
                <Col span={19}>
                    <Typography.Title level={2} className='header'>
                        {advertData.header}
                    </Typography.Title>

                    <div className='created-at'>
                        <Typography.Paragraph
                            style={{
                                fontWeight: '400',
                                color: '#545454',
                                margin: '-10px 0 15px 0',
                                fontSize: '16px',
                                display: 'flex'
                            }}
                        >
                            Дата размещения: {dayjs(advertData.created_at).format('DD.MM.YYYY')}
                            <EyeOutlined
                                style={{
                                    fontSize: '20px',
                                    marginLeft: '15px',
                                    marginRight: '5px'
                                }}
                            />
                            {advertData.views}
                        </Typography.Paragraph>
                    </div>

                    <div className='carousel-specs'>
                        <Col span={17}>
                            <CustomCarousel
                                title={advertData.header}
                                isDefaultFavorite={isLocalFavorite}
                                slides={advertData?.images.length > 0 ? advertData?.images : FALLBACK_IMAGE_SRC}
                                id={advertData.id}
                                screenSize={screenSize as any}
                            />
                        </Col>

                        <Col span={4}>
                            <div className='specs-with-buttons'>
                                {ConvertedAdvertData &&
                                    ConvertedAdvertData.mainInfo.map((item) => (
                                        <SpecsPair key={item.key} label={item.label} value={item.children} column={1} />
                                    ))}
                            </div>
                        </Col>
                    </div>

                    <div className='location'>
                        <Typography.Title level={4}>Местонахождение судна</Typography.Title>

                        <Typography.Paragraph style={{ fontSize: '16px', marginTop: '-6px' }}>
                            {advertData.advert_legal_information.vessel_location.country}
                            {', '}
                            {advertData.advert_legal_information.vessel_location.value}
                        </Typography.Paragraph>
                    </div>
                    <div className='description'>
                        <Typography.Title level={4}>Описание</Typography.Title>
                        <Typography.Paragraph style={{ fontSize: '16px', marginTop: '-6px' }}>
                            {advertData.description}
                        </Typography.Paragraph>
                    </div>
                    <Divider />

                    <Specs ConvertedAdvertData={ConvertedAdvertData} />
                    <Divider />

                    <OtherAdverts userId={advertData.user_id} advertId={advertData.id} />
                </Col>

                <Col span={5}>
                    <div className='side-info'>
                        <Typography.Title
                            level={screenSize === 'middle' ? 4 : 2}
                            className='price'
                            style={{
                                wordBreak: 'keep-all'
                            }}
                        >
                            <Price
                                locale={PRICE_LOCALE}
                                options={NUMBER_FORMAT_OPTIONS}
                                price={advertData.price || 0}
                            />
                        </Typography.Title>

                        <div className='contacts'>
                            <UserButton
                                id={advertData.user.id}
                                src={advertData.user.avatar}
                                name={advertData.user.name}
                                advertCount={advertData.user.adverts_count}
                            />

                            <div className='contacts-buttons'>
                                {showNumber ? (
                                    <Button className='callButton tel' type='primary'>
                                        {advertData.phone_number}

                                        {isNumberCopied ? (
                                            <CheckOutlined className='check-icon' />
                                        ) : (
                                            <CopyOutlined style={{ fontSize: '17px' }} onClick={numberHandler} />
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        className='callButton show-tel'
                                        type='default'
                                        onClick={showNumberBtnHandler}
                                    >
                                        Показать номер
                                        <PhoneOutlined
                                            style={{
                                                fontSize: '20px',
                                                marginRight: '-5px'
                                            }}
                                        />
                                    </Button>
                                )}

                                <Button className='callButton' type='primary' onClick={emailHandler}>
                                    Написать на почту
                                    <MailOutlined style={{ fontSize: '20px', marginRight: '-5px' }} />
                                </Button>
                                {advertData.can_edit &&
                                    <Button className='callButton' type='default' onClick={handleEditClick}>
                                        Редактировать
                                        <EditOutlined style={{ fontSize: '22px', marginRight: '-10px' }} />
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    ) : (
        <div className='pt-6'>
            <Row>
                <Col span={24}>
                    <CustomCarousel
                        title={advertData.header}
                        isDefaultFavorite={isLocalFavorite}
                        slides={advertData?.images && advertData?.images}
                        screenSize={screenSize}
                        id={advertData.id}
                    />

                    <Typography.Title level={2} className='header' style={{ marginTop: '10px' }}>
                        {advertData.header}
                    </Typography.Title>

                    <Typography.Title level={3} style={{ marginTop: '-10px' }}>
                        <Price locale={PRICE_LOCALE} options={NUMBER_FORMAT_OPTIONS} price={advertData.price || 0} />
                    </Typography.Title>

                    <div className='contacts'>
                        <UserButton
                            id={advertData.user.id}
                            src={advertData.user.avatar}
                            name={advertData.user.name}
                            advertCount={advertData.user.adverts_count}
                        />

                        <div className='contacts-buttons'>
                            <Button className='callButton show-tel' type='default' onClick={numberHandler}>
                                Позвонить
                                <PhoneOutlined style={{ fontSize: '22px', marginRight: '-10px' }} />
                            </Button>
                            <Button className='callButton' type='primary' onClick={emailHandler}>
                                Написать на почту
                                <MailOutlined style={{ fontSize: '22px', marginRight: '-10px' }} />
                            </Button>
                            {advertData.can_edit &&
                                <Button className='callButton' type='default' onClick={handleEditClick}>
                                    Редактировать
                                    <EditOutlined style={{ fontSize: '22px', marginRight: '-10px' }} />
                                </Button>
                            }
                        </div>
                    </div>

                    <div className='location'>
                        <Typography.Title level={4}>Местонахождение судна</Typography.Title>

                        <Typography.Paragraph style={{ fontSize: '16px' }}>
                            {advertData.advert_legal_information.vessel_location.country}
                            {', '}
                            {advertData.advert_legal_information.vessel_location.value}
                        </Typography.Paragraph>
                    </div>

                    <div className='specs-with-buttons'>
                        {ConvertedAdvertData &&
                            ConvertedAdvertData.mainInfo.map((item) => (
                                <SpecsPair key={item.key} label={item.label} value={item.children} column={2} />
                            ))}
                    </div>

                    <div className='description'>
                        <Typography.Title level={4}>Описание</Typography.Title>
                        <Typography.Paragraph style={{ fontSize: '16px', marginTop: '-6px' }}>
                            {advertData.description}
                        </Typography.Paragraph>
                    </div>
                    <Divider />

                    <Specs ConvertedAdvertData={ConvertedAdvertData} />
                    <OtherAdverts userId={advertData.user_id} advertId={advertData.id} />
                    <div className='created-at'>
                        <Typography.Paragraph
                            style={{
                                fontWeight: '400',
                                color: '#545454',
                                margin: '-10px 0 10px 0',
                                fontSize: '16px'
                            }}
                        >
                            Дата размещения: {advertData.created_at.split('T')[0].split('-').join('.')}
                            <EyeOutlined
                                style={{
                                    fontSize: '18px',
                                    marginLeft: '10px',
                                    marginRight: '3px'
                                }}
                            />
                            {advertData.views}
                        </Typography.Paragraph>
                    </div>
                    <Divider />
                </Col>
            </Row>
        </div>
    );
};

export default AdvertPage;
