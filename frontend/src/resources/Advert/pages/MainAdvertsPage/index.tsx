'use client';
import React, { Suspense, useState } from 'react';
import { BaseAdvertCard, IAdvertCard } from 'Advert/widgets';
import { SearchFiltres } from '../../widgets/SearchFiltre/SearchFiltre';
import { BasicList } from 'SydnoComponents/lists';
import { Col, Row } from 'antd';
import { convertObjectToPathname, getUrlQueryParams } from 'SydnoHelpers/commons';
import { useRouter, useSearchParams } from 'next/navigation';
import { TFilterOptions } from 'Advert/widgets/SearchFiltre/types';
import { SortedFilters } from 'Advert/widgets/SortedFilters/SortedFiters';
import { AdvertSmallCard } from 'Advert/widgets/AdvertSmallCard/AdvertSmallCard';
import { ColorBlock } from 'Advert/widgets/ColorBlock/ColorBlock';
import { HistoryOutlined, KeyOutlined } from '@ant-design/icons';
import { RecentlyWatched } from 'Advert/widgets/RecentlyWatched/RecentlyWatched';

export const MainAdvertPage = () => {
    return (
        <Suspense>
            <MainAdvertPageUI />
        </Suspense>
    );
};
/**
 * Компонент страницы с поиском обьявлений по фильтрам
 * @author Burtseff Ilysha
 */
export const MainAdvertPageUI = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mode, setMode] = useState<'list' | 'kanban'>('list');

    const changeUrlByOptions = (filterParams: object) => {
        const currentSearchParams = getUrlQueryParams(searchParams);

        const newSearchParams = {
            ...currentSearchParams,
            ...filterParams
        };

        //@ts-ignore
        delete newSearchParams['page'];

        //@ts-ignore
        delete newSearchParams['page'];

        router.push(location.pathname + '?' + convertObjectToPathname(newSearchParams), { scroll: false });
    };

    const paginationChange = (page: number) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', page.toString());

        router.push(location.pathname + '?' + params.toString(), { scroll: false });
    };

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    };

    const filters = getUrlQueryParams<TFilterOptions>(searchParams);

    return (
        <Row className='pt-4 pb-16'>
            <Col className='pb-6' span={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8}>
                        <ColorBlock onClick={() => changeUrlByOptions({advert_type: undefined})} active={!filters.advert_type} title={'Все'} caption='cудна' className='w-full'/>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <ColorBlock onClick={() => changeUrlByOptions({advert_type: 1})} active={filters.advert_type == 1} icon={<HistoryOutlined />} title={'Аренда'} caption='cудна' className='w-full'/>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <ColorBlock onClick={() => changeUrlByOptions({advert_type: 0})} active={filters.advert_type == 0} icon={<KeyOutlined />} title={'Продажа'} caption='cудна' className='w-full'/>
                    </Col>
                </Row>
            </Col>
            <Col className='pb-6' span={24}>
                <SearchFiltres
                    filterOptions={filters}
                    onFindButtonClick={changeUrlByOptions}
                />
            </Col>
            <Col span={24} className='pb-6'>
                <SortedFilters
                    defaultSortValue={filters.sort}
                    onSortSelect={changeUrlByOptions}
                    mode={mode}
                    setMode={(value) => setMode(value)}
                />
            </Col>
            <Col span={24}>
                <div id='advert-list-anchor'></div>
            </Col>
            <Col span={24}>
                <BasicList
                    mode={mode}
                    action='/api/alladverts'
                    showTotalCount
                    filters={getUrlQueryParams(searchParams) as any}
                    pagination={{
                        onChange: paginationChange
                    }}
                    renderItem={(item: IAdvertCard) => {
                        switch(mode) {
                            case 'list':
                                return (
                                    <BaseAdvertCard key={item.id} {...item} onClick={() => onAdvertCardClick(item.id)} />
                                )
                            case 'kanban':
                                return (
                                    <AdvertSmallCard advert={item}/>
                                )
                        }
                    }}
                />
            </Col>
            {/* <Col span={24}>
                <RecentlyWatched className='mt-8'/>
            </Col> */}
        </Row>
    );
};
