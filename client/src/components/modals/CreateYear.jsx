import React from "react";
import { Modal, Form, Input, DatePicker, message, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";

const { Option } = Select;

export function CreateYearModal(props) {
    const { open, setOpen } = props;
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const axios = useAxiosPrivate();

    const handleSubmit = async (values) => {
        for (const key in values) {
            if (values[key] === undefined) {
                values[key] = null;
            }
        }

        try {
            const res = await axios.post('classes/year', values);
            message.success(t('createdYear'));
            setOpen(false);
        } catch (e) {
            message.error(t('notCreatedYear'));
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
            title={<h2>{t('createYear')}</h2>}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t('create')}
            cancelText={t('cancel')}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label={t('year')}
                    labelAlign='left'
                    name='year'
                    rules={[
                        {
                            required: true,
                            message: t('enterYear'),
                        },
                        {
                            pattern: /^\d{4}-\d{4}$/,
                            message: t('yearPattern'),
                        }
                    ]}
                >
                    <Input placeholder="2023-2024" />
                </Form.Item>
                <Form.Item
                    label={t('startdate')}
                    labelAlign='left'
                    name='startdate'
                    rules={[
                        {
                            required: true,
                            message: t('enterStartdate'),
                        },
                    ]}
                >
                    <DatePicker placeholder={t('selectDate')} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label={t('enddate')}
                    labelAlign='left'
                    name='enddate'
                    rules={[
                        {
                            required: true,
                            message: t('enterEnddate'),
                        },
                    ]}
                >
                    <DatePicker placeholder={t('selectDate')} style={{ width: '100%' }} />
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
            </Form>
        </Modal>
    );
}