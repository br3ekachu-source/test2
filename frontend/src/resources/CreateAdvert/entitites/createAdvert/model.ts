import { CreateAdvertTypes } from 'CreateAdvert/shared/types/basicTypes';
import { sydnoServiceFormData, sydnoServiceJson } from 'SydnoService/service';
import { UploadFile } from 'antd';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export interface ICreateAdStepOne {
    header: string;
    price: number;
    description: string;
    registration_number: string;
    phone_number: string;
    images: UploadFile<any>[];
    advert_type: CreateAdvertTypes;
    fracht_type: number;
    fracht_price_type: number;
}

export interface ICreateAdStepTwo {
    name: string;
    flag: string;
    technical_documentation: boolean;
    exploitation_type: number;
    class_formula: string;
    wave_limit: number;
    type: number;
    purpose: string;
    was_registered: boolean;
    register_valid_until: string;
    classification_society: string;
    vessel_status: number;
    project_number: string;
    building_number: string;
    building_year: number;
    building_place: string;
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
    id?: number;
}

export interface ICreateAdStepThree {
    advert_id?: number;
    id: number;
    overall_length: number;
    overall_width: number;
    board_height: number;
    draft_in_cargo: number;
    material: number;
    deadweight: number;
    dock_weight: number;
    full_displacement: number;
    gross_tonnage: number;
    num_engines: number;
    num_additional_engines: number;
    power: number;
    maximum_speed: number;
    cargo_tanks: number;
    total_capacity_cargo_tanks: number;
    second_bottom: number;
    second_sides: number;
    carrying: number;
    deckhouses: number;
    liquid_tanks: number;
    total_capacity_liquid_tanks: number;
    passangers_avialable: number;
    num_passangers: number;
    technical_documentation: number;
}

export interface IInstanceCreateAd extends Partial<ICreateAdStepOne> {
    id?: number;
    advert_legal_information?: ICreateAdStepTwo;
    advert_technical_information?: ICreateAdStepThree;
}

export interface ICreateAdData {
    error: AxiosError | null;
    instance: IInstanceCreateAd;
}

export interface ICreateAdModel extends ICreateAdData {
    createStepOne: (payload: ICreateAdStepOne) => Promise<boolean>;
    createStepTwo: (payload: ICreateAdStepTwo) => Promise<boolean>;
    createStepThree: (payload: ICreateAdStepThree) => Promise<boolean>;
    setInstance: (payload: IInstanceCreateAd) => void;
    setAdvertType: (payload: CreateAdvertTypes) => void;
}

const initState: ICreateAdData = {
    error: null,
    instance: {}
};

export const useCreateAdvert = create<ICreateAdModel>((set, get) => ({
    ...initState,
    setInstance: (payload: IInstanceCreateAd) => {
        set({
            instance: payload
        });
    },
    setAdvertType: (payload: CreateAdvertTypes) => {
        set({
            instance: {
                ...get().instance,
                advert_type: payload
            }
        });
    },
    createStepOne: async (payload) => {
        const formData = new FormData();
        const appendFormData = (property: string, value?: string) => {
            if(typeof value === 'string') {
                formData.append(property, value); 
            }
        }
        try {
            const id = get().instance.id;
            if (id) {
                formData.append('id', id.toString());
            }
            const advert_type = get().instance.advert_type;

            appendFormData('advert_type', advert_type?.toString());
            appendFormData('header', payload.header);
            appendFormData('description', payload.description);
            appendFormData('phone_number', payload.phone_number);
            appendFormData('price', payload.price?.toString());
            appendFormData('registration_number', payload.registration_number);
            appendFormData('fracht_price_type', payload.fracht_price_type?.toString());
            appendFormData('fracht_type', payload.fracht_type?.toString());

            payload.images.forEach((image) => {
                formData.append('images[]', image.originFileObj as Blob);
            });

            const result = id
                ? await sydnoServiceFormData.post(`/api/adverts/${id}/edit`, formData)
                : await sydnoServiceFormData.post('/api/adverts', formData);

            set({
                instance: {
                    ...get().instance,
                    ...result.data
                }
            });
            return true;
        } catch (e) {
            if (e instanceof AxiosError) set({ error: e });
            return false;
        }
    },
    createStepTwo: async (payload) => {
        try {
            const advert_id = get().instance.id;
            if (!advert_id) throw new Error('Не найден индификатор объявления');

            const id = get().instance.advert_legal_information?.id;

            const result = id
                ? await sydnoServiceJson.post(`/api/advertslegalinformation/${id}/edit`, {
                      advert_id,
                      ...payload
                  })
                : await sydnoServiceJson.post('/api/advertslegalinformation', {
                      advert_id,
                      ...payload
                  });

            set({
                instance: {
                    ...get().instance,
                    advert_legal_information: {
                        ...(get().instance.advert_legal_information || {}),
                        ...(!id ? result.data : payload)
                    }
                }
            });

            return true;
        } catch (e) {
            if (e instanceof AxiosError) set({ error: e });
            return false;
        }
    },
    createStepThree: async (payload) => {
        try {
            const advert_id = get().instance.id;
            if (!advert_id) throw new Error('Не найден индификатор объявления');

            const id = get().instance.advert_technical_information?.id;

            const result = id
                ? await sydnoServiceJson.post(`/api/advertstechnicalinformation/${id}/edit`, {
                      advert_id,
                      ...payload
                  })
                : await sydnoServiceJson.post('/api/advertstechnicalinformation', {
                      advert_id,
                      ...payload
                  });

            set({
                instance: {
                    ...get().instance,
                    advert_technical_information: {
                        ...(get().instance.advert_technical_information || {}),
                        ...(!id ? result.data : payload)
                    }
                }
            });

            return true;
        } catch (e) {
            if (e instanceof AxiosError) set({ error: e });
            return false;
        }
    }
}));
