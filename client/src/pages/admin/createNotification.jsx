import React from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { UploadOutlined } from '@ant-design/icons';
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

    const handleSubmit = async (values) => {
		for (const key in values) {
			if (values[key] === undefined) {
				values[key] = null;
			}
		}
		console.log('values', values);
		try {
			const res = await axios.post('/users/notifications', values);
			message.success('Notification created successfully');
		} catch (e) {
			message.error('Error creating notification');
		}
	};

    return (
      <Form {...formItemLayout} onFinish={handleSubmit} variant="filled" style={{ maxWidth: '80%', margin:'0 auto' }} >
        <Form.Item label={t('title')} name="Title" rules={[{ required: true, message: t('inputTitle')} ]} >
          <Input />
        </Form.Item>

        <Form.Item label={t('to')} name="ToWho" rules={[{ required: true, message: t('inputRecipient') }]} >
          <Input />
        </Form.Item>

        <Form.Item label={t('file')} name="File">
          <Upload>
            <Button icon={<UploadOutlined />}>{t('upload')}</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={t('message')} name="Text" rules={[{ required: true, message: t('inputText') }]} 
        > 
          <Input.TextArea style={{minHeight:'200px'}} autoSize />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    );
  }
  
  export default CreateNotification;