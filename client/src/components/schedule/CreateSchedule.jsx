import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

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

function CreateSchedule() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        for (const key in values) {
            if (values[key] === undefined) {
                values[key] = null;
            }
        }

        try {
            const res = await axios.post('/schedule', values);
            message.success(t('createdSubject'));
        } catch (e) {
            if(e.response.status === 409) {
                message.error(t('scheduleExists'))
            }
            else{
                message.error(t('notCreatedSubject'));
            }
        }
    };

    useEffect(() => {
        const getSubjects = async () => {
            const res = await axios.get('/subjects/tacherSubjectFormatted');
            setSubjects(res.data);
        };

        const getClasses = async () => {
            const res = await axios.get('/classes');
            setClasses(res.data);
        };

        getClasses();
        getSubjects();
    }, []);


    return (<>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10%', width: '100%' }}>
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
                    label={t('subject')}
                    labelAlign='left'
                    name='teachersubjectid'
                    rules={[
                        {
                            required: true,
                            message: t('selectSubject'),
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp='children'
                        allowClear
                        notFoundContent={
                            <div onClick={() => { navigate('/create-subject') }}
                                style={{ cursor: 'pointer', color: '#1677FF', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                            >
                                {t('noSubjectFoundCreateNew')}
                            </div>
                        }

                    >
                        {subjects.map((item) => {
                            return (
                                <Select.Option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.fullname_subject}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('class')}
                    labelAlign='left'
                    name='classid'
                    rules={[
                        {
                            required: true,
                            message: t('selectClass'),
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp='children'
                        allowClear
                    >
                        {classes.map((item) => {
                            return (
                                <Select.Option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.classname}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('period')}
                    labelAlign='left'
                    name='period'
                    rules={[
                        {
                            required: true,
                            message: t('choosePeriod'),
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                        <Select.Option value={5}>5</Select.Option>
                        <Select.Option value={6}>6</Select.Option>
                        <Select.Option value={7}>7</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('day')}
                    labelAlign='left'
                    name='day'
                    rules={[
                        {
                            required: true,
                            message: t('chooseDay'),
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value={'Monday'}>{t('monday')}</Select.Option>
                        <Select.Option value={'Tuesday'}>{t('tuesday')}</Select.Option>
                        <Select.Option value={'Wednesday'}>{t('wednesday')}</Select.Option>
                        <Select.Option value={'Thursday'}>{t('thursday')}</Select.Option>
                        <Select.Option value={'Friday'}>{t('friday')}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ marginTop: '1.5em', height: '3em' }}
                    >
                        {t('create-period')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>);
}
export default CreateSchedule;
