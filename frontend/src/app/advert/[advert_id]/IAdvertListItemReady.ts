export interface IReceivedAdvert {
    id: number;
    user_id: number;
    advert_type: number;
    can_edit: number;
    registration_number: string;
    price: number;
    state?: number;
    images: string[];
    header: string;
    description: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    in_favorites: boolean;
    user: {
        id: number;
        name: string;
        avatar: string;
        email: string;
        adverts_count: number;
    };
    advert_legal_information: AdvertLegalInformation;
    advert_technical_information: AdvertTechnicalInformation;
    views: number;
}

interface PortAddress {
    value: string;
    city: string | null;
    country: string;
    region: string | null;
}

interface VesselLocation extends PortAddress {}

interface AdvertLegalInformation {
    id: number;
    advert_id: number;
    flag: string;
    exploitation_type: string;
    class_formula: string;
    wave_limit: string;
    ice_strengthening: boolean;
    type: string;
    purpose: string;
    was_registered: boolean;
    register_valid_until: string;
    vessel_status: string;
    project_number: string;
    building_number: string;
    building_year: number;
    port_address: PortAddress;
    vessel_location: VesselLocation;
    building_place: string;
    imo_number: string;
    created_at: string;
    updated_at: string;
    name: string;
}

interface AdvertTechnicalInformation {
    id: number;
    advert_id: number;
    overall_length: string;
    overall_width: string;
    board_height: string;
    maximum_freeboard: string;
    material: string;
    deadweight: string;
    dock_weight: string;
    full_displacement: string;
    gross_tonnage: string;
    num_engines: number;
    num_additional_engines: number;
    power: string;
    maximum_speed: string;
    cargo_tanks: boolean;
    total_capacity_cargo_tanks: number | null;
    second_bottom: boolean;
    second_sides: boolean;
    carrying: string;
    superstructures: boolean;
    liquid_tanks: boolean;
    total_capacity_liquid_tanks: number | null;
    passangers_avialable: boolean;
    num_passangers: number | null;
    technical_documentation: boolean;
    created_at: string;
    updated_at: string;
}
