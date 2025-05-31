import { PlusOutlined } from '@ant-design/icons';
import { getFile } from 'SydnoHelpers/commons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UploadAvatars: React.FC<{
    onChange: (images: UploadFile<any>[]) => void;
    defaultImages?: any[];
}> = ({ onChange, defaultImages }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    useEffect(() => {
        if (defaultImages) {
            Promise.all(defaultImages.map((url) => getFile(url))).then((res) => {
                const defaultImagesFiles = defaultImages.map((url, index) => {
                    return {
                        uid: -index,
                        name: 'image.png',
                        status: 'done',
                        originFileObj: res[index],
                        url
                    };
                });
                if (!fileList.length) {
                    setFileList(defaultImagesFiles as unknown as UploadFile<any>[]);
                    onChange(defaultImagesFiles as unknown as UploadFile<any>[]);
                }
            });
        }
    }, [defaultImages?.toString()]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        onChange(newFileList);
    };

    const customRequest = ({
        onSuccess
    }: {
        onSuccess: ((body: any, xhr?: XMLHttpRequest | undefined) => void) | undefined;
    }) => {
        if (onSuccess) onSuccess('ok');
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    );
    return (
        <>
            <Upload
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={({ onSuccess }) => customRequest({ onSuccess })}
                multiple
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt='avatar' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
