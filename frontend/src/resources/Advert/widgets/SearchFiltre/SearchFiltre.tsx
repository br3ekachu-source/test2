import React, { useEffect, useState } from 'react';
import { TFilterOptions, TChangeConfigProperty } from './types';
import { Button, Col, Row, Tabs, Typography } from 'antd';
import { initialFilterOptions } from './utils';
import { SelectorServiceFilter } from './components/SelectorServiceFilter';
import { InputNumberRangeFilter } from './components/InputNumberRangeFilter';
import { InputTextFilter } from './components/InputTextFilter';
import { CountriesSelector } from 'SydnoComponents/selectors';
import { DateRangePickerFilter } from './components/DateRangePickerFilter';
import { RegionSelectorFilter } from './components/RegionSelectorFilter';
import { DatePickerFilter } from './components/DatePickerFilter';
import { SegmentedFilter } from './components/SegmentedFilter';

export interface ISearchFiltresProps {
    filterOptions: TFilterOptions;
    onFindButtonClick: (filterOptions: TFilterOptions) => void;
}

/**
 * Фича для изменения параметров фильтров.
 * Компонент принимает объект с фильтрами и по нажатию на кнопку "Показать результаты", вызывает колбэк, передавая в него измененные фильтры
 * @param filterOptions начальнаое значение фильтров
 * @param onFindButtonClick колбэк, прнимающий новый объект с фильтрами
 * @returns
 */
export const SearchFiltres: React.FC<ISearchFiltresProps> = ({ filterOptions, onFindButtonClick }) => {
    const [filterConfig, setFilterConfig] = useState<TFilterOptions>({
        ...initialFilterOptions,
        ...filterOptions
    });
    useEffect(() => {
        setFilterConfig({
            ...initialFilterOptions,
            ...filterOptions
        });
    }, [filterOptions])
    const [showHiddenBlock, setShowHiddenBlock] = useState<boolean>(false);

    const onButtonClickHandler = () => {
        onFindButtonClick(filterConfig);
    };

    const resetFiltres = () => {
        setFilterConfig(initialFilterOptions);
    };

    const toggleShowAll = () => {
        setShowHiddenBlock(!showHiddenBlock);
    };

    const changeConfigProperty: TChangeConfigProperty = (value, name) => {
        const newValue = value === undefined ? null : value;

        setFilterConfig((prevValue) => ({
            ...prevValue,
            [name]: newValue
        }));
    };

    const items = [
        {
            label: 'Юридические',
            key: '0',
            children: <LegalFilters filterConfig={filterConfig} changeConfigProperty={changeConfigProperty} />
        },
        {
            label: 'Технические',
            key: '1',
            children: <TechnicalFilters filterConfig={filterConfig} changeConfigProperty={changeConfigProperty} />
        }
    ];

    return (
        <div
            className='p-4'
            style={{
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)',
                overflow: 'hidden',
                borderRadius: 'var(--main-app-br)'
            }}
        >
            <div className='mb-6'>
                <Typography.Title level={3}>Найти подходящее судно</Typography.Title>
            </div>
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={6}>
                    <SelectorServiceFilter
                        onChange={changeConfigProperty}
                        value={filterConfig['type']}
                        adress='vesseltypes'
                        keyProperty='type'
                        placeholder='Тип судна'
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <InputNumberRangeFilter
                        onChange={changeConfigProperty}
                        value={[filterConfig['min_price'], filterConfig['max_price']]}
                        keyProperties={['min_price', 'max_price']}
                        placeholder='Цена, руб.'
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <InputTextFilter
                        onChange={changeConfigProperty}
                        value={filterConfig['class_formula'] || ''}
                        keyProperty={'class_formula'}
                        placeholder='Класс'
                    />
                </Col>
                <Col xs={24} sm={6} style={{ display: 'flex', alignItems: 'end' }}>
                    <Button onClick={onButtonClickHandler} type='primary' className='w-full'>
                        Показать объявления
                    </Button>
                </Col>
            </Row>
            <div className={showHiddenBlock ? 'mt-4' : 'hidden'}>
                <Tabs defaultActiveKey='0' items={items} />
            </div>
            <div className={'mt-4'}>
                <Button onClick={toggleShowAll} type='link' style={{ paddingLeft: 0 }}>
                    {showHiddenBlock ? 'Свернуть' : 'Все фильтры'}
                </Button>
                <Button onClick={resetFiltres} type='link' style={{ paddingLeft: 0 }}>
                    Очистить фильтр
                </Button>
            </div>
        </div>
    );
};

const TechnicalFilters: React.FC<{ filterConfig: TFilterOptions; changeConfigProperty: TChangeConfigProperty }> = ({
    changeConfigProperty,
    filterConfig
}) => {
    return (
        <Row gutter={[16, 24]}>
            <Col xs={24} sm={6}>
                <SelectorServiceFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['material']}
                    adress='materials'
                    keyProperty='material'
                    placeholder='Материал корпуса'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_overall_length'], filterConfig['max_overall_length']]}
                    keyProperties={['min_overall_length', 'max_overall_length']}
                    placeholder='Длина, м.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_overall_width'], filterConfig['max_overall_width']]}
                    keyProperties={['min_overall_width', 'max_overall_width']}
                    placeholder='Ширина, м.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_gross_tonnage'], filterConfig['max_gross_tonnage']]}
                    keyProperties={['min_gross_tonnage', 'max_gross_tonnage']}
                    placeholder='Валовая вместимость, рег. т.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_num_engines'], filterConfig['max_num_engines']]}
                    keyProperties={['min_num_engines', 'max_num_engines']}
                    placeholder='Главные двигатели, шт.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_num_additional_engines'], filterConfig['max_num_additional_engines']]}
                    keyProperties={['min_num_additional_engines', 'max_num_additional_engines']}
                    placeholder='Вспомогательные двигатели, шт.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_power'], filterConfig['max_power']]}
                    keyProperties={['min_power', 'max_power']}
                    placeholder='Мощность двигателей, кВт.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_maximum_speed'], filterConfig['max_maximum_speed']]}
                    keyProperties={['min_maximum_speed', 'max_maximum_speed']}
                    placeholder='Максимальная скорость, кн.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_board_height'], filterConfig['max_board_height']]}
                    keyProperties={['min_board_height', 'max_board_height']}
                    placeholder='Высота борта, м.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_deadweight'], filterConfig['max_deadweight']]}
                    keyProperties={['min_deadweight', 'max_deadweight']}
                    placeholder='Дедвейт, т.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_full_displacement'], filterConfig['max_full_displacement']]}
                    keyProperties={['min_full_displacement', 'max_full_displacement']}
                    placeholder='Полное водоизмещение, т.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_carrying'], filterConfig['max_carrying']]}
                    keyProperties={['min_carrying', 'max_carrying']}
                    placeholder='Грузоподъемность, т.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputNumberRangeFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig['min_passangers_avialable'], filterConfig['max_passangers_avialable']]}
                    keyProperties={['min_passangers_avialable', 'max_passangers_avialable']}
                    placeholder='Пассажировмещаемость, чел.'
                />
            </Col>
            <Col xs={24} sm={6}>
                <SegmentedFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['cargo_tanks']}
                    keyProperty={'cargo_tanks'}
                    placeholder='Наличие грузовых танков'
                />
            </Col>
            <Col xs={24} sm={6}>
                <SegmentedFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['second_bottom']}
                    keyProperty={'second_bottom'}
                    placeholder='Наличие второго дна'
                />
            </Col>
            <Col xs={24} sm={6}>
                <SegmentedFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['second_sides']}
                    keyProperty={'second_sides'}
                    placeholder='Наличие вторых бортов'
                />
            </Col>
            <Col xs={24} sm={6}>
                <SegmentedFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['technical_documentation']}
                    keyProperty={'technical_documentation'}
                    placeholder='Наличие технической документации'
                />
            </Col>
        </Row>
    );
};

const LegalFilters: React.FC<{ filterConfig: TFilterOptions; changeConfigProperty: TChangeConfigProperty }> = ({
    changeConfigProperty,
    filterConfig
}) => {
    return (
        <Row gutter={[16, 24]}>
            <Col xs={24} sm={6}>
                <InputTextFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['name'] || ''}
                    keyProperty={'name'}
                    placeholder='Название судна'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputTextFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['purpose'] || ''}
                    keyProperty={'purpose'}
                    placeholder='Назначение'
                />
            </Col>
            <Col xs={24} sm={6}>
                <div>
                    <Typography.Text type='secondary'>Флаг</Typography.Text>
                    <CountriesSelector
                        value={filterConfig['flag'] || undefined}
                        style={{ width: '100%' }}
                        placeholder='Выберите флаг'
                        onChange={(value: string) => changeConfigProperty<string>(value, 'flag')}
                        allowClear={true}
                    />
                </div>
            </Col>
            <Col xs={24} sm={6}>
                <SelectorServiceFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['exploitation_type']}
                    adress='exploitationtypes'
                    keyProperty='exploitation_type'
                    placeholder='Тип эксплуатации'
                />
            </Col>
            <Col xs={24} sm={6}>
                <SelectorServiceFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['vessel_status']}
                    adress='vesselstatuses'
                    keyProperty='vessel_status'
                    placeholder='Статус судна'
                />
            </Col>
            <Col xs={24} sm={6}>
                <RegionSelectorFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['port_adress_city']}
                    keyProperty='port_adress_city'
                    placeholder='Порт приписки'
                />
            </Col>
            <Col xs={24} sm={6}>
                <RegionSelectorFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['vessel_location_city']}
                    keyProperty='vessel_location_city'
                    placeholder='Местонахождение судна'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputTextFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['building_place'] || ''}
                    keyProperty={'building_place'}
                    placeholder='Место постройки'
                />
            </Col>
            <Col xs={24} sm={6}>
                <DateRangePickerFilter
                    onChange={changeConfigProperty}
                    value={[filterConfig.min_building_year, filterConfig.max_building_year]}
                    keyProperties={['min_building_year', 'max_building_year']}
                    placeholder='Год постройки'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputTextFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['project_number'] || ''}
                    keyProperty={'project_number'}
                    placeholder='Номер проекта'
                />
            </Col>
            <Col xs={24} sm={6}>
                <InputTextFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['building_number'] || ''}
                    keyProperty={'building_number'}
                    placeholder='Строительный номер'
                />
            </Col>
            <Col xs={24} sm={6}>
                <DatePickerFilter
                    onChange={changeConfigProperty}
                    value={filterConfig['register_valid_until']}
                    keyProperty={'register_valid_until'}
                    placeholder='Действие документов до'
                    picker='year'
                />
            </Col>
        </Row>
    );
};
