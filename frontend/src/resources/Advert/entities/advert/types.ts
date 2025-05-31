export interface IAdvertTechnicalInformation {
    advert_id?: number;
    id: number;
    overall_length: number;
    overall_width: number;
    board_height: number;
    maximum_freeboard: number;
    material: number;
    deadweight: number;
    dock_weight: number;
    full_displacement: number;
    gross_tonnage: number;
    num_engines: number;
    num_additional_engines: number;
    power: number;
    maximum_speed_in_ballast: number;
    maximum_speed_when_loaded: number;
    cargo_tanks: number;
    total_capacity_cargo_tanks: number;
    second_bottom: number;
    second_sides: number;
    carrying: number;
    superstructures: number;
    deckhouses: number;
    liquid_tanks: number;
    total_capacity_liquid_tanks: number;
    passangers_avialable: number;
    num_passangers: number;
    technical_documentation: number;
}

export interface IAdvertLegalInformation {
    flag: string;
    exploitation_type: number;
    class_formula: string;
    wave_limit: number;
    type: number;
    purpose: string;
    was_registered: boolean;
    register_valid_until: string;
    vessel_status: number;
    project_number: string;
    building_number: string;
    building_year: number;
    building_country: string;
    port_address: {
        region: string;
        city: string;
        country: string;
        value: string;
    };
    vessel_location: {
        region: string;
        city: string;
        country: string;
        value: string;
    };
    imo_number: string;
    ice_strengthening: number;
    id?: number;
    name: string;
}

export interface IAdvertListItem {
    id: number;
    advert_type: number;
    fracht_price_type: string;
    fracht_type: string;
    user_id: number;
    updated_at: string;
    in_favorites: boolean;
    created_at: string;
    header: string;
    price: number;
    description: string;
    registration_number: string;
    phone_number: string;
    images: string[];
    advert_legal_information: IAdvertLegalInformation;
    advert_technical_information: IAdvertTechnicalInformation;
    user: {
        id: number;
        name: string;
        avatar: string;
        email: string;
        adverts_count: number;
    };
}
