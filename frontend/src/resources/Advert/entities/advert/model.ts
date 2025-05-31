import { create } from 'zustand';
import { sydnoServiceJson } from 'SydnoService/service';
import { IReceivedAdvert } from '@/app/advert/[advert_id]/IAdvertListItemReady';

export interface IAdvertModel {
    getAdvert: (id: number | string) => Promise<IReceivedAdvert | false>;
    getOtherAdverts: (userId: number | string, advertId: number | string) => Promise<any>;
    addToFavourite: (id: number | string) => Promise<boolean>;
    deleteFromFavourite: (id: number | string) => Promise<boolean>;
}

export const useAdvert = create<IAdvertModel>(() => ({
    getAdvert: async (id) => {
        try {
            const data = await sydnoServiceJson.get('/api/adverts/' + id);
            return data.data;
        } catch {
            return false;
        }
    },
    addToFavourite: async (id) => {
        try {
            const data = await sydnoServiceJson.get(`/api/adverts/${id}/favorite`);
            return data.statusText === 'OK';
        } catch (e) {
            throw e;
        }
    },
    deleteFromFavourite: async (id) => {
        try {
            const data = await sydnoServiceJson.get(`/api/adverts/${id}/unfavorite`);
            return data.statusText === 'OK';
        } catch (e) {
            throw e;
        }
    },
    getOtherAdverts: async (userId, advertId) => {
        try {
            const data = await sydnoServiceJson.get(
                `/api/otheruseradverts?user_id=${userId}&current_advert=${advertId}`
            );
            return data.data;
        } catch {
            return false;
        }
    }
}));
