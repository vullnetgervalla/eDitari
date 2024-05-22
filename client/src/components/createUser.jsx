import React from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from 'antd';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
const { RangePicker } = DatePicker;
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
const { Title } = Typography;
function CreateUser({ parent }) {
  const { t } = useTranslation();
  return (
    <div style={{ textAlign: 'center' }}>
      <Form
        {...formItemLayout}
        variant='filled'
        style={{
          maxWidth: 500,
          border: '1px solid #E5E7EB',
          boxShadow: '3px 3px 10px #eee',
          borderRadius: 20,
          padding: 30,
          backgroundColor: '#fff',
        }}
      >
        <Form.Item
          label={t('personalnumber')}
          labelAlign='left'
          name='personalID'
          rules={[
            {
              required: true,
              message: t('enterSsn'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('name')}
          labelAlign='left'
          name='name'
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
          name='surname'
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
          label={t('gender')}
          labelAlign='left'
          name='gender'
          rules={[
            {
              required: true,
              message: t('chooseGender'),
            },
          ]}
        >
          <Select>
            <Select.Option value='male'>{t('male')}</Select.Option>
            <Select.Option value='female'>{t('female')}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t('birthday')}
          labelAlign='left'
          name='birthday'
          rules={[
            {
              required: true,
              message: t('enterBirthday'),
            },
          ]}
        >
          <DatePicker style={{ float: 'left' }} />

        </Form.Item>
        {
				/*<Form.Item
					label={t('email')}
					labelAlign='left'
					name='email'
				>
					<Input />
				</Form.Item> */}

        {/* <Form.Item
					label={t('password')}
					labelAlign='left'
					name='Password'
				>
					<Password />
				</Form.Item> */}

        <Form.Item
          label={t('birthplace')}
          labelAlign='left'
          name='Birthplace'

          rules={[
            {
              required: true,
              message: t('enterBirthplace'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('city')}
          labelAlign='left'
          name='Municipality'

          rules={[
            {
              required: true,
              message: t('enterCity'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          {parent ? <Button type='primary'>{t('save')}</Button> : null}
        </Form.Item>
      </Form>
    </div>
  );
}
export default CreateUser;
