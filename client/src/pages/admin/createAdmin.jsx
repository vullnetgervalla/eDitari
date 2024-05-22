import React from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from 'antd';
import Password from 'antd/es/input/Password';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};

function CreateAdmin() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const handleSubmit = async (values) => {
        try {
            const res = await axios.post('/users/admin', values);
            message.success(t('createdAdmin'));
        } catch (e) {
            message.error(t('notCreatedAdmin'));
        }
    };
    return (
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Form
                {...formItemLayout}
                variant='filled'
                style={{
                    minWidth: 700,
                    border: '1px solid #E5E7EB',
                    boxShadow: '3px 3px 10px #eee',
                    borderRadius: 20,
                    padding: 30,
                    backgroundColor: '#fff',
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label={t('name')}
                    labelAlign='left'
                    name='firstname'
                    rules={[
                        {
                            required: true,
                            message: t('enterName'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('lastname')}
                    labelAlign='left'
                    name='lastname'
                    rules={[
                        {
                            required: true,
                            message: t('enterLastName'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('email')}
                    labelAlign='left'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: t('enterMail'),
                        },
                        {
                            type: 'email',
                            message: t('invalidEmail'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('password')}
                    labelAlign='left'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: t('enterPass'),
                        },
                    ]}
                >
                    <Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ marginTop: '1.5em', height: '3em' }}
                    >
                        {t('create-admin')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CreateAdmin;
