import { IAdvertListItem } from 'Advert/entities';
import countriesJson from '../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json';
import { IReceivedAdvert } from './IAdvertListItemReady';

type DescriptionItem = {
    key: string | number;
    label: string;
    children: React.ReactNode | number | string | undefined;
};

type DescriptionsPropsObject = {
    mainInfo: DescriptionItem[];
    legalInfo: DescriptionItem[];
    technicalInfo: DescriptionItem[];
};

/**
 * Функция, которая конвертирует данные объявления в объект с характеристиками для отображения с помощью компонента Descriptions от AntDesign.
 *
 * @param advertData Данные объявления для конвертации.
 * @returns {DescriptionsPropsObject} Объект с характеристиками для отображения.
 *
 * Author: [Gleb]
 */

export function ConvertData(advertData: IReceivedAdvert): DescriptionsPropsObject {
    const legalInformation = advertData.advert_legal_information;
    const technicalInformation = advertData.advert_technical_information;

    const flagCode = legalInformation?.flag;
    const flagData = countriesJson.data[flagCode as keyof typeof countriesJson.data];

    const formatField = (value: string | number | null | undefined | boolean, unit: string | null = ''): string => {
        return value ? `${value} ${unit && unit}` : 'Не указано';
    };

    return {
        mainInfo: [
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 0,
                label: 'Название судна',
                children: formatField(legalInformation.name)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 1,
                label: 'Тип судна',
                children: formatField(legalInformation.type)
            },

            {
                key: crypto.randomUUID ? crypto.randomUUID() : 2,
                label: 'Год постройки',
                children: formatField(legalInformation.building_year)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 3,
                label: 'Класс',
                children: formatField(legalInformation.class_formula)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 4,
                label: 'Флаг',
                children: flagData ? (
                    <span className='flex items-center gap-2'>
                        <span>{flagData}</span>
                        <img alt={`Флаг ${flagData}`} width={30} height={20} src={`/flags/${flagCode}.svg`} />
                    </span>
                ) : undefined
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 5,
                label: 'Длина',
                children: formatField(technicalInformation.overall_length, 'м')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 6,
                label: 'Регистровый номер',
                children: formatField(advertData.registration_number)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 7,
                label: 'Номер IMO',
                children: formatField(legalInformation.imo_number)
            }
        ],
        legalInfo: [
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 8,
                label: 'Тип эксплуатации',
                children: formatField(legalInformation?.exploitation_type)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 9,
                label: 'Назначение',
                children: formatField(legalInformation?.purpose)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 10,
                label: 'Статус судна',
                children: formatField(legalInformation.vessel_status)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 11,
                label: 'Находилась ли на учете?',
                children: legalInformation.was_registered === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 12,
                label: 'Формула класса',
                children: formatField(legalInformation.class_formula)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 13,
                label: 'Ограничения по высоте волны',
                children: formatField(legalInformation.wave_limit, 'м')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 14,
                label: 'Регистровый номер',
                children: formatField(advertData.registration_number)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 15,
                label: 'Действие документов до',
                children: legalInformation.register_valid_until
                    ? legalInformation.register_valid_until.split('-').slice(0, 2).reverse().join('.')
                    : 'Не указано'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 16,
                label: 'Номер проекта',
                children: formatField(legalInformation.project_number)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 17,
                label: 'Год постройки',
                children: formatField(legalInformation.building_year)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 18,
                label: 'Место постройки',
                children: formatField(legalInformation.building_place)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 19,
                label: 'Строительный номер',
                children: formatField(legalInformation.building_number)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 20,
                label: 'Флаг',
                children: flagData ? (
                    <span className='flex items-center gap-2'>
                        <span>{flagData}</span>
                        <img alt={`Флаг ${flagData}`} width={30} height={20} src={`/flags/${flagCode}.svg`} />
                    </span>
                ) : undefined
            },

            {
                key: crypto.randomUUID ? crypto.randomUUID() : 21,
                label: 'Наличие технической документации',
                children: technicalInformation.technical_documentation === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 22,
                label: 'Порт приписки',
                children: formatField(legalInformation.port_address.city)
            }
        ],
        technicalInfo: [
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 23,
                label: 'Длина',
                children: formatField(technicalInformation.overall_length, 'м')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 24,
                label: 'Ширина',
                children: formatField(technicalInformation.overall_width, 'м')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 25,
                label: 'Высота борта',
                children: formatField(technicalInformation.board_height, 'м')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 26,
                label: 'Материал корпуса',
                children: formatField(technicalInformation.material)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 27,
                label: 'Количество главных двигателей',
                children: formatField(technicalInformation.num_engines)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 28,
                label: 'Мощность двигателей',
                children: formatField(technicalInformation.power, 'кВт')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 29,
                label: 'Максимальная скорость',
                children: formatField(technicalInformation.maximum_speed, 'уз')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 30,
                label: 'Количество вспомогательных двигателей',
                children: formatField(technicalInformation.num_additional_engines)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 31,
                label: 'Доковый вес',
                children: formatField(technicalInformation.dock_weight, 'т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 32,
                label: 'Грузоподъемность',
                children: formatField(technicalInformation.carrying, 'т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 33,
                label: 'Дедвейт',
                children: formatField(technicalInformation.deadweight, 'т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 34,
                label: 'Полное водоизмещение',
                children: formatField(technicalInformation.full_displacement, 'т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 35,
                label: 'Валовая вместимость',
                children: formatField(technicalInformation.gross_tonnage, 'рег.т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 36,
                label: 'Наличие грузовых танков',
                children: technicalInformation.cargo_tanks === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 37,
                label: 'Общая вместимость грузовых танков',
                children: technicalInformation.cargo_tanks
                    ? technicalInformation.total_capacity_cargo_tanks + ' куб/м'
                    : 'Не указано'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 38,
                label: 'Пассажировместимость',
                children: technicalInformation.passangers_avialable === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 39,
                label: 'Количество человек',
                children: formatField(technicalInformation.num_passangers)
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 40,
                label: 'Максимальный надводный борт',
                children: formatField(technicalInformation.maximum_freeboard, 'м')
            },

            {
                key: crypto.randomUUID ? crypto.randomUUID() : 41,
                label: 'Наличие второго дна',
                children: technicalInformation.second_bottom === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 42,
                label: 'Наличие вторых бортов',
                children: technicalInformation.second_sides === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 43,
                label: 'Наличие наливных танков',
                children: technicalInformation.liquid_tanks === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 44,
                label: 'Cуммарная вместимость наливных танков',
                children: formatField(technicalInformation.total_capacity_liquid_tanks, 'т')
            },
            {
                key: crypto.randomUUID ? crypto.randomUUID() : 45,
                label: 'Наличие надстроек',
                children: technicalInformation.superstructures === false ? 'Нет' : 'Да'
            }
        ]
    };
}
