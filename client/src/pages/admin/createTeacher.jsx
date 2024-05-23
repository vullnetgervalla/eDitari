import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import moment from 'moment';
import { TeacherTable } from 'components/tables/TeacherTable';

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

function CreateTeacher() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const [createdTeachers, setCreatedTeachers] = useState([]);
    const handleSubmit = async (values) => {
        for (const key in values) {
            if (values[key] === undefined) {
                values[key] = null;
            }
        }
        values.birthday = values?.birthday?.format('YYYY-MM-DD') ?? null;

        try {
            const res = await axios.post('/users/teacher', values);
            setCreatedTeachers(prev => [res?.data?.[0], ...prev]);
            message.success(t('createdTeacher'));
        } catch (e) {
            message.error(t('notCreatedTeacher'));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10%', width: '100%' }}>
            <div style={{ width: '47%', flexDirection: 'column', alignItems: createdTeachers.length ? 'baseline' : 'center' }}>
                <Form
                    {...formItemLayout}
                    variant='filled'
                    style={{
                        width: '100%',
                        borderRadius: 20,
                        padding: 30,
                        backgroundColor: '#fff',
                        border: '1px solid #E5E7EB',
                        boxShadow: '3px 3px 10px #eee',
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
                        label={t('personalNumber')}
                        labelAlign='left'
                        name='personalnumber'
                        rules={[
                            {
                                required: true,
                                message: t('enterPersonalNumber'),
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: t('numbersOnly'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t('phonenumber')}
                        labelAlign='left'
                        name='phonenumber'
                        rules={[
                            {
                                pattern: /^\+\d{11,14}$/,
                                message: t('notCorrectNumberFormat'),
                            },
                        ]}
                    >
                        <Input placeholder='+38344123456' />
                    </Form.Item>

                    <Form.Item
                        label={t('educationLevel')}
                        labelAlign='left'
                        name='educationlevel'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t('experienceYears')}
                        labelAlign='left'
                        name='experienceyears'
                        rules={[
                            {
                                pattern: /^[0-9]+$/,
                                message: t('numbersOnly'),
                            },
                        ]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label={t('teachingSpecialization')}
                        labelAlign='left'
                        name='teachingspecialization'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t('birthday')}
                        labelAlign='left'
                        name='birthday'
                        rules={[
                            {
                                required: false,
                                message: t('enterBirthday'),
                            },
                        ]}
                    >
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            placeholder={t('enterDate')}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                            style={{ float: 'left', width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label={t('gender')}
                        labelAlign='left'
                        name='gender'
                        rules={[
                            {
                                required: false,
                                message: t('chooseGender'),
                            },
                        ]}
                    >
                        <Select allowClear>
                            <Select.Option value='M'>{t('male')}</Select.Option>
                            <Select.Option value='F'>{t('female')}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{ marginTop: '1.5em', height: '3em' }}
                        >
                            {t('create-teacher')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {!!createdTeachers.length && (
                <div style={{ maxWidth: '50%' }}>
                    <h1 style={{ textAlign: 'center' }}>{t('createdTeachers')}</h1>
                    <TeacherTable data={createdTeachers} side={true} />
                </div>
            )}
        </div>
    );
}

export default CreateTeacher;
