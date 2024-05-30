import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Input, Button, Typography, Space, Popconfirm, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { DownOutlined, RightOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import moment from "moment";

const { Text } = Typography;

export function GradeModal({ isModalVisible, setIsModalVisible, data, updateData }) {
    const students = data?.students || [];
    const { t } = useTranslation();
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [form] = Form.useForm();
    const [isAddingGrade, setIsAddingGrade] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const axios = useAxiosPrivate();
    const [searchText, setSearchText] = useState('');

    const [filteredStudents, setFilteredStudents] = useState(students);

    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                `${student.firstname} ${student.lastname}`.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, students]);

    const onExpand = (record, expanded) => {
        const keys = expanded
            ? expandedRowKeys.filter(key => key !== record.id)
            : [...expandedRowKeys, record.id];
        setExpandedRowKeys(keys);
    };

    const insertGrade = async (values) => {
        try {
            const res = await axios.post('/subjects/grade', values);
            updateData(prev => prev + 1);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteGrade = async (gradeId) => {
        try {
            const res = await axios.delete(`/subjects/grade/${gradeId}`);
            updateData(prev => prev + 1);
        } catch (e) {
            console.log(e);
        }
    }

    const updateGrade = async (values) => {
        try {
            const res = await axios.put('/subjects/grade', values);
            updateData(prev => prev + 1);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddGrade = () => {
        setIsAddingGrade(true);
    };

    const handleCancelAddGrade = () => {
        setIsAddingGrade(false);
        form.resetFields();
    };

    const handleEditGrade = (grade) => {
        setEditingGrade(grade);
        form.setFieldsValue(grade);
        setIsAddingGrade(true);
    };

    const handleDeleteGrade = (gradeId) => {
        deleteGrade(gradeId);
    };

    const handleAddOrUpdateGrade = (values, record) => {
        if (editingGrade) {
            values = { ...values, id: editingGrade.id };
            updateGrade(values);
        } else {
            values = { ...values, teachersubjectid: data?.teachersubjectid, studentid: record?.id };
            insertGrade(values);
        }
        setIsAddingGrade(false);
        setEditingGrade(null);
        form.resetFields();
    };

    const expandedRowRender = (record) => {
        return (
            <>
                <Table
                    dataSource={record.grades || []}
                    columns={[
                        {
                            title: t('date'),
                            dataIndex: 'date',
                            key: 'date',
                            align: "center",
                            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
                            defaultSortOrder: 'descend',
                            render: (date) => (
                                <Text>{moment(date).format('DD/MM/YYYY')}</Text>
                            ),
                        },
                        {
                            title: t('grade'),
                            dataIndex: 'grade',
                            key: 'grade',
                            align: "center",
                            render: (text, grade) => (
                                <Text strong={grade.final}>{grade.final ? `${grade.grade} (${t('final')})` : grade.grade}</Text>
                            ),
                        },
                        {
                            title: t('actions'),
                            key: 'actions',
                            align: "center",
                            render: (text, grade) => (
                                <Space size="middle">
                                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditGrade(grade)} />
                                    <Popconfirm title={t('confirmDelete')} cancelText={t('cancel')} onConfirm={() => handleDeleteGrade(grade.id)}>
                                        <Button type="link" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </Space>
                            ),
                        },
                    ]}
                    pagination={false}
                    rowKey="id"
                />
                {!isAddingGrade && (
                    <Button type="primary" onClick={handleAddGrade} style={{ marginTop: 16 }}>
                        {t('addGrade')}
                    </Button>
                )}
                {isAddingGrade && (
                    <Form form={form} layout="vertical" onFinish={(values) => handleAddOrUpdateGrade(values, record)} style={{ marginTop: 16 }}>
                        <Form.Item name="grade" label={t('grade')} rules={[{ required: true, message: t('required') }, { pattern: /^[1-5]+$/, message: t('numbersOnly1-5range'), }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="final" valuePropName="checked">
                            <Checkbox>{t('finalGrade')}</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">{t('submit')}</Button>
                                <Button onClick={handleCancelAddGrade}>{t('cancel')}</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </>
        );
    };

    const gradesRenderer = (grades) => {
        if (!grades || grades.length === 0) return null;
        return grades.map(grade => (
            <Text key={grade.id} strong={grade.final}>
                {grade.grade}{grade.final && ` (${t('final')})`}
            </Text>
        )).reduce((prev, curr) => [prev, ', ', curr]);
    };

    const columns = [
        {
            title: t('firstname'),
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: t('lastname'),
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: t('personalnumber'),
            dataIndex: 'personalnumber',
            key: 'personalnumber',
        },
        {
            title: t('grades'),
            dataIndex: 'grades',
            key: 'grades',
            render: gradesRenderer,
        },
    ];

    return (
        <Modal
            title={<h2>{t('grades')}</h2>}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            style={{ minWidth: '60vw', maxHeight: '300px' }}
        >
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Input.Search
                    placeholder={t('search')}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ marginBottom: 16, width: '50%' }}
                />
            </div>
            <Table
                scroll={{ y: 500 }}
                columns={columns}
                dataSource={filteredStudents}
                expandable={{
                    expandedRowRender,
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <DownOutlined onClick={e => onExpand(record, e)} />
                        ) : (
                            <RightOutlined onClick={e => onExpand(record, e)} />
                        ),
                    expandedRowKeys,
                    onExpand: (expanded, record) => onExpand(record, expanded),
                }}
                rowKey="id"
                onRow={(record) => {
                    return {
                        style: {
                            cursor: 'pointer',
                        },
                        onClick: () => {
                            const isExpanded = expandedRowKeys.includes(record.id);
                            onExpand(record, isExpanded);
                        },
                    };
                }}
            />
        </Modal>
    );
}
