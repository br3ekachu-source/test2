import React, { FC, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getFile } from 'SydnoHelpers/commons';

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Вы можете загрузать только JPG/PNG файлы!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Картинка должна весить менее 2 МБ!');
    }
    return isJpgOrPng && isLt2M;
};

export const UploadAvatar = ({ onLoad, src }: { onLoad: (file: File | null) => void; src?: string | null }) => {
    const [file, setFile] = useState<RcFile | File | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        if (src) {
            getFile(src).then((file) => {
                dispatchFile(file);
            });
        }
    }, [src]);

    const customRequest = ({
        onSuccess,
        file
    }: {
        onSuccess: ((body: any, xhr?: XMLHttpRequest | undefined) => void) | undefined;
        file: string | Blob | RcFile;
    }) => {
        if (onSuccess) onSuccess('ok');
        dispatchFile(file as File);
    };

    const dispatchFile = (file: File | null) => {
        if (file) setPreviewImage(URL.createObjectURL(file));
        else setPreviewImage('');
        setFile(file);
        onLoad(file);
    };

    const handlePreview = async (file: File) => {
        setPreviewOpen(true);
        setPreviewTitle(file.name);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    );

    return (
        <>
            <ImgCrop modalTitle='Редактирование аватара' modalOk='Продолжить' modalCancel='Отмена' rotationSlider>
                <Upload
                    name='avatar'
                    listType='picture-card'
                    accept='image/jpeg,image/png'
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={({ onSuccess, file }) => customRequest({ onSuccess, file })}
                >
                    {file ? (
                        <Avatar
                            src={previewImage}
                            onDelete={(e) => {
                                e.stopPropagation();
                                dispatchFile(null);
                            }}
                            onPreview={(e) => {
                                e.stopPropagation();
                                handlePreview(file);
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </ImgCrop>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt='avatar' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

const Avatar: FC<{
    src: string;
    onDelete?: React.MouseEventHandler<HTMLElement>;
    onPreview?: React.MouseEventHandler<HTMLElement>;
}> = ({ src, onDelete, onPreview }) => {
    return (
        <div className='relative'>
            <img src={src} alt='avatar' style={{ width: '100%' }} />
            <div className='absolute bottom-2 right-2 z-10'>
                <Button onClick={onPreview} className='mr-1' size='small' icon={<EyeOutlined />} title='Посмотреть' />
                <Button onClick={onDelete} size='small' icon={<DeleteOutlined />} title='Удалить' />
            </div>
        </div>
    );
};
