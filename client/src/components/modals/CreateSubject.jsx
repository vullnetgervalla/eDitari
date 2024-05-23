import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";

export function CreateSubjectModal(props) {
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
            const res = await axios.post('/subjects', values);
            message.success(t('createdSubject'));
            setOpen(false);
        } catch (e) {
            message.error(t('notCreatedSubject'));
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
            title={<h2>{t('create-subject')}</h2>}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t('create')}
            cancelText={t('cancel')}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label={t('subject')}
                    labelAlign='left'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: t('enterSubject'),
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}