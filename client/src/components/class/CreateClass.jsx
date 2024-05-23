import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import moment from 'moment';
import { TeacherTable } from 'components/tables/TeacherTable';
import { useNavigate } from 'react-router-dom';
import { CreateYearModal } from 'components/modals/CreateYear';

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

function CreateClass() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const [teachers, setTeachers] = useState([]);
    const [years, setYears] = useState([]);
    const navigate = useNavigate();
    const [yearModalVisibility, setYearModalVisibility] = useState(false);

    const handleSubmit = async (values) => {
        for (const key in values) {
            if (values[key] === undefined) {
                values[key] = null;
            }
        }

        try {
            const res = await axios.post('/classes', values);
            message.success(t('createdClass'));
            console.log('values', res.data);
        } catch (e) {
            message.error(t('notCreatedClass'));
        }
    };

    useEffect(() => {
        const getTeachers = async () => {
            const res = await axios.get('/users/teachers');
            setTeachers(res.data);
        };

        getTeachers();
    }, []);

    useEffect(() => {

        const getYears = async () => {
            const res = await axios.get('classes/years');
            setYears(res.data);
            console.log('years', res.data); 
        };

        getYears();
    }, [yearModalVisibility]);


    return (<>
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Form
                {...formItemLayout}
                variant='filled'
                style={{
                    minWidth: 700,
                    borderRadius: 20,
                    padding: 30,
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    boxShadow: '3px 3px 10px #eee',
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label={t('classname')}
                    labelAlign='left'
                    name='classname'
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
                    label={t('classlevel')}
                    labelAlign='left'
                    name='classlevel'
                    rules={[
                        {
                            required: true,
                            message: t('enterClasslevel'),
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
                    label={t('classroom')}
                    labelAlign='left'
                    name='classroom'
                    rules={[
                        {
                            pattern: /^[0-9]+$/,
                            message: t('numbersOnly'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('headTeacher')}
                    labelAlign='left'
                    name='teacherid'
                    rules={[
                        {
                            required: false,
                            message: t('selectHeadTeacher'),
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp='children'
                        allowClear
                        notFoundContent={
                            <div onClick={() => {navigate('/create-teacher')}}
                                style={{ cursor: 'pointer', color: '#1677FF', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                            >
                                {t('noTeacherFoundCreateNew')}
                            </div>
                        }
                    >
                        {teachers.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.firstname + ' ' + item.lastname}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={t('year')}
                    labelAlign='left'
                    name='yearid'
                    rules={[
                        {
                            required: true,
                            message: t('selectYear'),
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp='children'
                        allowClear
                        notFoundContent={
                            <div onClick={() => {setYearModalVisibility(true)}}
                                style={{ cursor: 'pointer', color: '#1677FF', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                            >
                                {t('noYearFoundCreateNew')}
                            </div>
                        }
                    >
                        {years.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.year}
                            </Select.Option>
                        ))}
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
        {yearModalVisibility && <CreateYearModal open={yearModalVisibility} setOpen={setYearModalVisibility} />}
    </>);
}

export default CreateClass;
