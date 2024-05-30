import React, { useState } from "react";
import { Modal, Table, Form, Input, Button, Typography, Space, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { DownOutlined, RightOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

export function GradeModal({ isModalVisible, setIsModalVisible, students }) {
    const { t } = useTranslation();
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [form] = Form.useForm();
    const [isAddingGrade, setIsAddingGrade] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);

    const onExpand = (record, expanded) => {
        const keys = expanded
            ? expandedRowKeys.filter(key => key !== record.id)
            : [...expandedRowKeys, record.id];
        setExpandedRowKeys(keys);
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

    const handleDeleteGrade = (record, gradeId) => {
        // Handle grade deletion logic here
        console.log('Delete Grade ID:', gradeId);
    };

    const handleAddOrUpdateGrade = (values) => {
        if (editingGrade) {
            // Handle update logic here
            console.log('Updating Grade:', { ...editingGrade, ...values });
        } else {
            // Handle add logic here
            console.log('Adding Grade:', values);
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
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            align: "center"
                        },
                        {
                            title: 'Grade',
                            dataIndex: 'grade',
                            key: 'grade',
                            align: "center",
                            render: (text, grade) => (
                                <Text strong={grade.final}>{grade.grade}</Text>
                            ),
                        },
                        {
                            title: 'Actions',
                            key: 'actions',
                            align:"center",
                            render: (text, grade) => (
                                <Space size="middle">
                                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditGrade(grade)} />
                                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteGrade(record, grade.id)}>
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
                        Add Grade
                    </Button>
                )}
                {isAddingGrade && (
                    <Form form={form} layout="vertical" onFinish={handleAddOrUpdateGrade} style={{ marginTop: 16 }}>
                        <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">Submit</Button>
                                <Button onClick={handleCancelAddGrade}>Cancel</Button>
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
                {grade.grade}{grade.final && ' (Final)'}
            </Text>
        )).reduce((prev, curr) => [prev, ', ', curr]);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Personal Number',
            dataIndex: 'personalnumber',
            key: 'personalnumber',
        },
        {
            title: 'Grades',
            dataIndex: 'grades',
            key: 'grades',
            render: gradesRenderer,
        },
    ];

    return (
        <Modal
            title={t('student')}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            style={{ minWidth: '60vw', maxHeight: '300px'}}
        >
            <Table
                scroll={{ y: 500 }}
                columns={columns}
                dataSource={students}
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
