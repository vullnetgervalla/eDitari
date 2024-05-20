import React, { useCallback } from 'react';
import { Upload, message, Input, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function CreateMaterial() {
    const t = useTranslation().t;
    return (
        <Card style={{border:'1px solid #e5e7eb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div>
                <h1>{t('add-material')}</h1>
                <div>
                    <Input placeholder={t('to')} style={{marginBottom:'20px'}} />
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">{t('uploadFile')}</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
            </div>
        </Card>

    );
}