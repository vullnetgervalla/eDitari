import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { CreateYearModal } from 'components/modals/CreateYear';
import { CreateSubjectModal } from 'components/modals/CreateSubject';

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

function CreateSubjectForm() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const [years, setYears] = useState([]);
    const [subjectModalVisibility, setSubjectModalVisibility] = useState(false);
    const [yearModalVisibility, setYearModalVisibility] = useState(false);
    const [teachers, setTeachers] = useState([]);
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
            const res = await axios.post('/subjects/teacherSubject', values);
            message.success(t('createdSubject'));
        } catch (e) {
            message.error(t('notCreatedSubject'));
        }
    };

    useEffect(() => {
        const getTeachers = async () => {
            const res = await axios.get('/users/teachers');
            setTeachers(res.data);
        };

        const getClasses = async () => {
            const res = await axios.get('/classes');
            setClasses(res.data);
        };
        
        getClasses();
        getTeachers();
    }, []);

    useEffect(() => {
        const getSubjects = async () => {
            const res = await axios.get('/subjects');
            setSubjects(res.data);
        };

        getSubjects();
    }, [subjectModalVisibility]);

    useEffect(() => {
        const getYears = async () => {
            const res = await axios.get('classes/years');
            setYears(res.data);
            console.log('years', res.data);
        };

        getYears();
    }, [yearModalVisibility]);

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
                    name='subjectid'
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
                            <div onClick={() => {setSubjectModalVisibility(true)}}
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
                                    {item.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={t('teacher')}
                    labelAlign='left'
                    name='teacherid'
                    rules={[
                        {
                            required: true,
                            message: t('selectTeacher'),
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp='children'
                        allowClear
                        notFoundContent={
                            <div onClick={() => { navigate('/create-teacher') }}
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
                        notFoundContent={
                            <div onClick={() => { navigate('/create-class') }}
                                style={{ cursor: 'pointer', color: '#1677FF', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                            >
                                {t('noClassFoundCreateNew')}
                            </div>
                        }

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
                            <div onClick={() => { setYearModalVisibility(true) }}
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
                <Form.Item
                    label={t('active')}
                    labelAlign='left'
                    name='isactive'
                    initialValue={true}
                    rules={[
                        {
                            required: true,
                            message: t('required'),
                        },
                    ]}
                >
                    <Select>
                        <Option value={true}>{t('yes')}</Option>
                        <Option value={false}>{t('no')}</Option>
                    </Select>
                </Form.Item>
                <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ marginTop: '1.5em', height: '3em' }}
                    >
                        {t('create-subject')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        {yearModalVisibility && <CreateYearModal open={yearModalVisibility} setOpen={setYearModalVisibility} />}
        {subjectModalVisibility && <CreateSubjectModal open={subjectModalVisibility} setOpen={setSubjectModalVisibility} />}
    </>);
}
export default CreateSubjectForm;
