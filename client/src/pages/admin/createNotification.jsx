import React from 'react';
import { Button, Form, Input, message, Modal, Checkbox, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useState } from 'react';

const { Text } = Typography;

function CreateNotification(props) {
    const { open, setOpen, setNewNotification } = props
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const [form] = Form.useForm();
    const [holiday, setHoliday] = useState(false);
    const handleSubmit = async (values) => {
        for (const key in values) {
            if (values[key] === undefined) {
                values[key] = null;
            }
        }
        if(holiday){
            values["title"] = `${'holiday:' + values["title"]}`
        }
        const data = { id: 1, title: values.title, reach: null, description: values.description, parentid: null, date: null, createdat: new Date() };   
        try {
            const res = await axiosPrivate.post('/notifications/create', data);
            setNewNotification(true)
            message.success(t('createdNotification'));
            setOpen(false);
        } catch (e) {
            message.error(t('notCreatedNotification'));x
        }
    };
    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };
    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                form.resetFields();
                await handleSubmit(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };
    return (
        <Modal
            title={<h2>{t('create-notification')}</h2>}
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={t('create')}
            cancelText={t('cancel')}
            centered
            width={1000}
        >
            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                <div style={{ width: '100%' }}>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={handleSubmit}
                        style={{
                            flexDirection: 'column', display: 'flex'
                        }}
                    >
                        <Form.Item
                            label={t('notificationTitle')}
                            name='title'
                            rules={[
                                {
                                    required: true,
                                    message: t('inputTitle'),
                                },
                            ]}
                        >
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item
                            label={t('message')}
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: t('inputText'),
                                },
                            ]}
                        >
                            <Input.TextArea size='large' autoSize={{ minRows: 5 }} />
                        </Form.Item>
                        <Form.Item name='holiday' style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                            <Checkbox
                                style={{ height: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                checked={holiday}
                                onChange={(e) => {
                                    setHoliday(e.target.checked)
                                }}
                            >
                                <Text style={{ fontSize: '15px', margin: 0 }}>{t('holiday')}</Text>
                            </Checkbox>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default CreateNotification;