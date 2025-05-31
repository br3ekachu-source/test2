import { RcFile } from 'antd/lib/upload';
import axios from 'axios';

export const getFile = async (url: string): Promise<RcFile | File | null> => {
    const response = await axios.get(url, {
        responseType: 'blob'
    });

    const metadata = {
        type: 'image/jpeg,image/png'
    };
    const file = new File([response.data], 'Фото', metadata);
    return file;
};
