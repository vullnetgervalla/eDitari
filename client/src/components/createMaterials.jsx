import React, { useCallback } from 'react';
import { Upload, message, Input, Card, Button, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const { Dragger } = Upload;


export default function CreateMaterial() {
    const t = useTranslation().t;
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const uploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            setFileList(info.fileList);
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
    };


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onCancel = () => {
        form.resetFields();
        setFileList([]);
    };

    const isFormEmpty = () => {
        const values = form.getFieldsValue();
        return !values.to && fileList.length === 0;
    };
    return (
        <Form form={form} onFinish={onFinish}>
            <Card style={{ border: '1px solid #e5e7eb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                <div>
                    <div style={{ marginBottom: '40px' }}>
                        <h1>{t('add-material')}</h1>
                        <hr/>
                    </div>

                    <div>
                        <Form.Item name="to" rules={[{ required: true, message: t('inputRecipient') }]}>
                            <Input placeholder={t('to')} style={{ marginBottom: '20px' }} />
                        </Form.Item>
                        <Form.Item name="file" rules={[{ required: true, message: t('inputFile') }]}>
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
                        </Form.Item>
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                type='primary'
                                style={{ marginRight: '10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none' }}
                                onClick={onCancel}
                            >
                                {t('cancel')}
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                                {t('submit')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Form>

    );
}