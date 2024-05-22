import React from 'react';
import { Button, Form, Input, Upload, message, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function CreateNotification() {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const [createdNotifications, setCreatedNotifications] = useState([]);
  const handleSubmit = async (values) => {
    for (const key in values) {
      if (values[key] === undefined) {
        values[key] = null;
      }
    }

    try {
      const res = await axios.post('/notifications', values);
      setCreatedNotifications(prev => [res?.data?.[0], ...prev]);
      message.success(t('createdNotification'));
    } catch (e) {
      message.error(t('notCreatedNotification'));
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10%', width: '100%' }}>
      <div style={{ width: '47%', flexDirection: 'column', alignItems: createdNotifications.length ? 'baseline' : 'center' }}>
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
            label={t('notificationTitle')}
            labelAlign='left'
            name='title'
            rules={[
              {
                required: true,
                message: t('inputTitle'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('file')}
            labelAlign='left'
            name='file'
          >
            <Upload name="file" action="/upload.do" listType="text">
              <Button icon={<UploadOutlined />}>{t('upload')}</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label={t('message')}
            labelAlign='left'
            name='content'
            rules={[
              {
                required: true,
                message: t('inputText'),
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>

          <Form.Item
            label={t('to')}
            labelAlign='left'
            name='reach'
            rules={[
              {
                required: true,
                message: t('inputRecipient'),
              },
            ]}
          >
            <Input style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', border: '1px solid #E5E7EB', }}  />
          </Form.Item>

          <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              type='primary'
              htmlType='submit'
              style={{ marginTop: '1.5em', height: '3em' }}
            >
              {t('create-notification')}
            </Button>
          </Form.Item>
        </Form>
      </div>
      {!!createdNotifications.length && (
        <div style={{ maxWidth: '50%' }}>
          <h1 style={{ textAlign: 'center' }}>{t('createdNotifications')}</h1>
          <NotificationTable data={createdNotifications} side={true} />
        </div>
      )}
    </div>
  );
}

export default CreateNotification;