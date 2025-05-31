import { Grid, List, ListProps, notification, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { convertObjectToPathname, getDeclination } from 'SydnoHelpers/commons';
import { sydnoServiceJson } from 'SydnoService/service';
import { LoadingOutlined } from '@ant-design/icons';

export interface IBasicList<T> extends ListProps<T> {
    action: string;
    filters?: IFilters;
    pageSize?: number;
    showTotalCount?: boolean;
    dataLoadCallback?: <T>(data: IBasicListService<T>) => void;
    mode?: 'list' | 'kanban';
}

export type IFilters = {
    [x in string]: string | number;
} & {
    page?: number;
};

export interface IBasicListService<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export const BasicList = <T,>(props: IBasicList<T>) => {
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState<IBasicListService<T> | null>();
    const [localPage, setLocalPage] = useState<number>(props.filters?.page || 1);
    const breakpoint = Grid.useBreakpoint();

    const getData = async (page?: number) => {
        setLoading(true);
        try {
            const filtersObj = {
                ...(props.filters || {})
            };
            if (page) filtersObj.page = page;

            const result = await sydnoServiceJson.get<IBasicListService<T>>(
                props.action + '?' + convertObjectToPathname(filtersObj)
            );
            props.dataLoadCallback?.(result.data);
            setService(result.data);
            setLoading(false);
        } catch (e) {
            notification.error({
                message: 'Ошибка загрузки списка',
                placement: 'bottomRight'
            });
            setService(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLocalPage(props.filters?.page || 1);
        getData();
    }, [props.action, props.filters]);

    const getListProps = (props: IBasicList<T>) => {
        const listProps: Partial<IBasicList<T>> = { ...props };
        delete listProps.showTotalCount;
        delete listProps.action;
        return listProps;
    };

    const listProps = getListProps(props);

    if(typeof service === 'undefined') return null;
    return (
        <div>
            {props.showTotalCount ? (
                <Typography.Title level={4}>
                    Найдено {service?.total || 0}{' '}
                    {getDeclination(service?.total || 0, 'объявление', 'объявления', 'объявлений')}
                </Typography.Title>
            ) : null}
            <List
                {...listProps}
                loading={(props.loading || loading) && {
                    indicator: <LoadingOutlined />,
                    delay: 500,
                }}
                grid={
                    props.mode === 'kanban' ? {
                        gutter: 16,
                        column: breakpoint.md ? 4 : breakpoint.sm ? 1 : 1,
                    } : undefined
                }
                pagination={
                    Number(service?.total) > (props.pageSize || 12) && {
                        total: service?.total,
                        ...(props.pagination || {}),
                        current: localPage,
                        pageSize: (props.pageSize || 12),
                        showSizeChanger: false,
                        onChange: (page, ...args) => {
                            if (props.pagination instanceof Object && props.pagination.onChange)
                                props.pagination.onChange.apply(this, [page, ...args]);
                            else getData(page);

                            setLocalPage(page);
                        }
                    }
                }
                dataSource={service?.data}
            />
        </div>
    );
};
