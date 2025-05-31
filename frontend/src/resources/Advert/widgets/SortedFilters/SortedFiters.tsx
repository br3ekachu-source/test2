import { Segmented, Select, Typography } from "antd";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

export type TSort = 'price_asc' | 'price_desc' | 'date' | 'views' | undefined;

export const SortedFilters = ({
    mode,
    setMode,
    onSortSelect,
    defaultSortValue
}: {
    mode: 'list' | 'kanban',
    setMode: (value: 'list' | 'kanban') => void,
    onSortSelect: ({sort}: {sort: TSort}) => void,
    defaultSortValue?: string
}) => {
    return (
        <div
            className='pt-2 pb-2 pr-4 pl-4 flex justify-between items-center'
            style={{
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)',
                overflow: 'hidden',
                borderRadius: 'var(--main-app-br)'
            }}
        >
            <div>
                <Typography.Text>Сортировка: </Typography.Text>
                <Select
                    placeholder="Сортировка"
                    variant="borderless"
                    style={{width: '160px'}}
                    onSelect={(e, item) => onSortSelect({sort: item.value as TSort})}
                    onClear={() => onSortSelect({sort: undefined})}
                    defaultValue={defaultSortValue}
                    allowClear={true}
                    options={[
                        { value: 'price_asc', label: 'Дешевле' },
                        { value: 'price_desc', label: 'Дороже' },
                        { value: 'date', label: 'По дате' },
                        { value: 'views', label: 'По просмотрам' }
                    ]}
                />
            </div>
            <div>
                <Segmented
                    value={mode}
                    options={[
                        { value: 'list', icon: <BarsOutlined /> },
                        { value: 'kanban', icon: <AppstoreOutlined /> },
                    ]}
                    onChange={setMode}
                />
            </div>
        </div>
    );
}