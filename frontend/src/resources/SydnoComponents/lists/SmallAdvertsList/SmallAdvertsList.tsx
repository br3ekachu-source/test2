import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import { Spin, Typography, Button, Col } from 'antd';
import { IAdvertCard } from 'Advert/widgets';
import './SmallAdvertsList.css';
import { sydnoServiceJson } from 'SydnoService/service';

interface SmallAdvertsListProps {
    title?: string;
    userId?: string | number;
    advertId?: string | number;
    renderItem: (
        advert: IAdvertCard,
        index: number,
        length: number,
        ref?: ForwardedRef<HTMLDivElement> | undefined
    ) => JSX.Element;
    action: string;
    fetchData: (userId: string | number, advertId: string | number) => Promise<any>;
}

export const SmallAdvertsList: React.FC<SmallAdvertsListProps> = ({
    userId,
    advertId,
    title,
    renderItem,
    action,
    fetchData
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allAdvertsLoaded, setAllAdvertsLoaded] = useState<boolean>(false);
    const [curruntPage, setCurruntPage] = useState<number>(1);
    const [shouldScroll, setShouldScroll] = useState<boolean>(false);
    const lastAdvertRef = useRef<HTMLDivElement>(null);
    const [otherAdverts, setOtherAdverts] = useState<IAdvertCard[] | undefined>();
    const handleLoadMoreAdverts = () => {
        if (!isLoading && !allAdvertsLoaded) {
            setIsLoading(true);
            setCurruntPage((page) => page + 1);
        }
    };

    useEffect(() => {
        fetchData(Number(userId), Number(advertId)).then((data) => {
            if (data === false) {
                setAllAdvertsLoaded(true);
            } else {
                setOtherAdverts(data.data);
            }
        });
    }, [userId, advertId]);
    useEffect(() => {
        const fetchNextPageData = async () => {
            try {
                if (curruntPage > 1) {
                    const nextPageUrl = `${action}?page=${curruntPage}&user_id=${Number(
                        userId
                    )}&advertId=${Number(advertId)}`;
                    const response = await sydnoServiceJson.get(nextPageUrl);
                    const nextPageData = response.data.data;
                    const advertsTo = response.data.to;
                    const advertsTotal = response.data.total;

                    setOtherAdverts((prevOtherAdverts) => {
                        if (nextPageData.length && prevOtherAdverts) {
                            setIsLoading(false);
                            if (curruntPage > 1) {
                                setShouldScroll(true);
                            }
                            if (advertsTo === advertsTotal) {
                                setAllAdvertsLoaded(true);
                            }

                            return [...prevOtherAdverts, ...nextPageData];
                        } else {
                            return prevOtherAdverts;
                        }
                    });
                    if (nextPageData && nextPageData.length === 0) {
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching next page data:', error);
            }
        };

        fetchNextPageData();
    }, [curruntPage]);

    useEffect(() => {
        if (shouldScroll && lastAdvertRef.current) {
            const additionalPixels = 150;
            const { top } = lastAdvertRef.current.getBoundingClientRect();
            const targetScrollTop = window.scrollY + top + additionalPixels;

            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });

            setShouldScroll(false);
        }
    }, [shouldScroll]);

    if (!otherAdverts) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh'
                }}
            >
                <Spin size='large' />
            </div>
        );
    }

    return (
        otherAdverts.length > 0 && (
            <Col span={24}>
                <Typography.Title level={4}>{title}</Typography.Title>
                <div className='other-adverts-container'>
                    {otherAdverts.map((advert, index) => renderItem(advert, index, otherAdverts.length, lastAdvertRef))}
                </div>
                {isLoading && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Spin size='large' />
                    </div>
                )}
                <div className='other-adverts-button'>
                    {!isLoading && !allAdvertsLoaded && (
                        <Button
                            type='default'
                            onClick={() => {
                                handleLoadMoreAdverts();
                            }}
                        >
                            Загрузить ещё
                        </Button>
                    )}
                </div>
            </Col>
        )
    );
};
