import React, { useEffect, useState } from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from 'antd';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

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

function CreateTeacher() {
	const { t } = useTranslation();
	const axios = useAxiosPrivate();
	// const [parents, setParents] = useState([]);
	const [classes, setClasses] = useState([]);
	const handleSubmit = async (values) => {
		for (const key in values) {
			if (values[key] === undefined) {
				values[key] = null;
			}
		}
		console.log('values', values);
		try {
			const res = await axios.post('/users/teachers', values);
			message.success(t('createdTeacher'));
		} catch (e) {
			message.error(t('notCreatedTeacher'));
		}
	};

	useEffect(() => {
		// const getTeachers = async () => {
		// 	const res = await axios.get('/users/teachers');
		// 	setTeachers(res.data);
		// };

		const getClasses = async () => {
			const res = await axios.get('/classes');
			setClasses(res.data);
		};

		// getTeachers();
		getClasses();
	}, []);

	return (
		<div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
			<Form
				{...formItemLayout}
				variant='filled'
				style={{
					minWidth: 700,
					borderRadius: 20,
					padding: 30,
					backgroundColor: '#fff',
					border:'1px solid #e5e7eb', 
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				}}
				onFinish={handleSubmit}
			>
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
					label={t('lastName')}
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
					label={t('personalNumber')}
					labelAlign='left'
					name='personalnumber'
					rules={[
						{
							required: true,
							message: t('enterPersonalNumber'),
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={t('birthday')}
					labelAlign='left'
					name='birthday'
					rules={[
						{
							required: false,
							message: t('enterBirthday'),
						},
					]}
				>
					<DatePicker style={{ float: 'left', width: '100%' }} />
				</Form.Item>

				<Form.Item
					label={t('gender')}
					labelAlign='left'
					name='gender'
					rules={[
						{
							required: false,
							message: t('chooseGender'),
						},
					]}
				>
					<Select>
						<Select.Option value='M'>{t('male')}</Select.Option>
						<Select.Option value='F'>{t('female')}</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					label={t('class')}
					labelAlign='left'
					name='classid'
					rules={[
						{
							required: true,
							message: t('selectClass'),
						},
					]}
				>
					<Select>
						{classes.map((item) => {
							return (
								<Select.Option
									key={item.id}
									value={item.id}
								>
									{item.classname}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
{/* 
				<Form.Item
					// label={t('parent')}
					// labelAlign='left'
					// name='parentid'
					// rules={[
					// 	{
					// 		required: false,
					// 		message: t('selectParent'),
					// 	},
					// ]}
				>
					<Select
						showSearch
						optionFilterProp='children'
					>
						{parents.map((item) => {
							return (
								<Select.Option
									key={item.id}
									value={item.id}
								>
									{item.firstname + ' ' + item.lastname}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item> */}

				<Button
					type='primary'
					htmlType='submit'
					style={{ marginTop: '1.5em', height: '3em' }}
				>
					{t('create-teacher')}
				</Button>
			</Form>
		</div>
	);
}
export default CreateTeacher;
