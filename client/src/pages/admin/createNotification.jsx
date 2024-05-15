import React from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

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
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="Title" name="Title" rules={[{ required: true, message: 'Please input a title!' }]}>
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Text"
          name="Text"
          rules={[{ required: true, message: 'Please input text!' }]}
        >
          <Input.TextArea />
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