import React from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from 'antd';
import Password from 'antd/es/input/Password';
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
	const onclickBothParents = () => {};
	const { t } = useTranslation();
	return (
		<div style={{ textAlign: 'center' }}>
			<Form
				{...formItemLayout}
				variant='filled'
				style={{
					maxWidth: 500,
					border: '1px solid #0F1431',
					borderRadius: 20,
					padding: 30,
					backgroundColor: '#fff',
				}}
			>
				<Form.Item
          label={t('ssn')}
					labelAlign='left'
					name='personalID'
					rules={[
						{
							required: true,
							message: 'Please input!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Emri'
					labelAlign='left'
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Mbiemri'
					labelAlign='left'
					name='surname'
					rules={[
						{
							required: true,
							message: 'Please input!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Gjinia'
					labelAlign='left'
					name='gender'
					rules={[
						{
							required: true,
							message: 'Please input!',
						},
					]}
				>
					<Select>
						<Select.Option value='male'>Male</Select.Option>
						<Select.Option value='female'>Female</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					label='Datelindja'
					labelAlign='left'
					name='birthday'
				>
					<DatePicker style={{ float: 'left' }} />
				</Form.Item>

				<Form.Item
					label='Email'
					labelAlign='left'
					name='mail'
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Fjalekalimi  '
					labelAlign='left'
					name='Password'
				>
					<Password />
				</Form.Item>

				<Form.Item
					label='Vendi i lindjes'
					labelAlign='left'
					name='Birthplace'
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Komuna'
					labelAlign='left'
					name='Municipality'
				>
					<Input />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 0,
						span: 24,
					}}
				>
					{parent ? <Button type='primary'>Ruaj</Button> : null}
				</Form.Item>
			</Form>
		</div>
	);
}
export default CreateUser;
