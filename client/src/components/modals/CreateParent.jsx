import React from "react";
import { Modal, Form, Input, Button, Select, DatePicker, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";

export function CreateParentModal(props) {
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
    console.log(values);
    try {
      const res = await axios.post('/users/parent', values);
      message.success(t('createdParent'));
      setOpen(false);
    } catch (e) {
      message.error(t('notCreatedParent'));
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
      title={<h2>{t('create-parent')}</h2>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t('create')}
      cancelText={t('cancel')}
    >
      <Form form={form} layout="vertical">
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
          label={t('phoneNumber')}
          labelAlign='left'
          name='phonenumber'
          rules={[
            {
              required: true,
              message: t('enterPhoneNumber'),
            },
            {
              pattern: /^\+\d{11,14}$/,
              message: t('notCorrectNumberFormat'),
            },
          ]}
        >
          <Input placeholder="+38344123456" />
        </Form.Item>
        <Form.Item
          label={t('address')}
          labelAlign='left'
          name='address'
          rules={[
            {
              required: false,
              message: t('enterAddress'),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}