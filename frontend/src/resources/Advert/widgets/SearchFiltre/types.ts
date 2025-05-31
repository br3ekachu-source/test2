export type TChangeConfigProperty = <T>(value: T, name: string) => void;

export interface IFilterBaseOptions {
    min_price?: number | null;
    max_price?: number | null;
    name?: string | null;
}

/**
 * Юридические опции
 */
export interface ILegalFilterOptions {
    /**
     * Флаг корабля (локаль)
     */
    flag?: string | null;


    advert_type?: number;

    /**
     * Тип эксплуатации
     */
    exploitation_type?: 'коммерческое' | 'некоммерческое' | null;

    /**
     * формулы класса
     */
    class_formula?: string | null;

    /**
     * Ледовое усиление
     */
    ice_power?: boolean | null;

    /**
     * Тип судна
     */
    type?: string | null;

    /**
     * Назначение
     */
    purpose?: string | null;

    /**
     * Находилось ли на учете
     */
    was_registered?: boolean | null;

    /**
     * Учет действует до Date
     */
    register_valid_until?: string | null;

    /**
     * статус судна
     */
    vessel_status?: string | null;

    /**
     * номер проекта
     */
    project_number?: string | null;

    /**
     * строительный номер
     */
    building_number?: string | null;

    /**
     * год постройки Date конец
     */
    max_building_year: string | null;

    /**
     * год постройки Date начало
     */
    min_building_year: string | null;

    /**
     * страна постройки
     */
    building_place?: string | null;

    // порт приписки
    // страна
    port_adress_country?: string | null;

    // город
    port_adress_city?: string | null;

    /**
     * местонахождение судна
     */
    // порт или в рейсе
    vessel_location_country?: string | null;

    // порт или в рейсе
    vessel_location_city?: string | null;

    /**
     * Номер IMO
     */
    imo_number?: number | null;
}

/**
 * Технические опции
 */
export interface ITechnicalFilterOptions {
    /**
     * Минимальное длинна судна 60см
     */
    min_overall_length?: number | null;

    /**
     * Максималдьная длинна судна 458.5м
     */
    max_overall_length?: number | null;

    /**
     * Ширина судна 30см
     */
    min_overall_width?: number | null;

    /**
     * Ширина судна 70м
     */
    max_overall_width?: number | null;

    /**
     * Высота борта 5см
     */
    min_board_height?: number | null;

    /**
     * Высота борта 74м
     */
    max_board_height?: number | null;

    /**
     * Материал корпуса
     */
    material?: string | null;

    /**
     * Предельная масса (дедвейт) 0
     */
    min_deadweight?: number | null;

    /**
     * Предельная масса (дедвейт) 600 000 т.
     */
    max_deadweight?: number | null;

    /**
     * Доковый вес 0
     */
    min_dock_weight?: number | null;

    /**
     * Доковый вес 600 000 т.
     */
    max_dock_weight?: number | null;

    /**
     * Водоизмещение полное 0
     */
    min_full_displacement?: number | null;

    /**
     * Водоизмещение полное Infinity
     */
    max_full_displacement?: number | null;

    /**
     * Валовая вместимость 0
     */
    min_gross_tonnage?: number | null;

    /**
     * Валовая вместимость Infinity
     */
    max_gross_tonnage?: number | null;

    /**
     * Минимальное количество вспомогательных двигателей
     */
    min_num_additional_engines?: number | null;

    /**
     * Максимальное количество вспомогательных двигателей
     */
    max_num_additional_engines?: number | null;

    /**
     * Минимальное количество главных двигателей 1 - 8
     */
    min_num_engines?: number | null;

    /**
     * Максимальное количество главных двигателей 1 - 8
     */
    max_num_engines?: number | null;

    /**
     * Мощность двигателей 0
     */
    min_power?: number | null;

    /**
     * Мощность двигателей Infinty
     */
    max_power?: number | null;

    /**
     * Минимальная Максимальная скорость в балласте км/ч
     */
    min_maximum_speed?: number | null;

    /**
     * Максимальная Максимальная скорость в балласте км/ч
     */
    max_maximum_speed?: number | null;

    /**
     * Грузовой танк
     */
    cargo_tanks?: boolean | null;

    /**
     * Минимальная суммарная вместимость если Грузовой танк
     */
    min_total_capacity_cargo_tanks?: number | null;

    /**
     * Максимальная суммарная вместимость если Грузовой танк
     */
    max_total_capacity_cargo_tanks?: number | null;

    /**
     * Второе дно
     */
    second_bottom?: boolean | null;

    /**
     * Вторые борта
     */
    second_sides?: boolean | null;

    /**
     * Грузоподъемность 0
     */
    min_carrying?: number | null;

    /**
     * Грузоподъемность Infinty
     */
    max_carrying?: number | null;

    /**
     * Надстройки
     */
    superstructures?: boolean | null;

    /**
     * Пассажировмещаемость 0 шаг в 1
     */
    min_passangers_avialable?: number | null;

    /**
     * Пассажировмещаемость Infinity
     */
    max_passangers_avialable?: number | null;

    /**
     * Техническая документация
     */
    technical_documentation?: boolean | null;
}

export interface ISortOptions {
    sort?: string
}

export type TFilterOptions = IFilterBaseOptions & ILegalFilterOptions & ITechnicalFilterOptions & ISortOptions;
