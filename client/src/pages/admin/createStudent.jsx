import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { StudentTable } from 'components/tables/StudentTable';
import { CreateParentModal } from 'components/modals/CreateParent';
import moment from 'moment';

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

function CreateStudent() {
	const { t } = useTranslation();
	const axios = useAxiosPrivate();
	const [parents, setParents] = useState([]);
	const [classes, setClasses] = useState([]);
	const [createdUsers, setCreatedUsers] = useState([]);
	const [parentModalVisibility, setParentModalVisibility] = useState(false);

	const handleSubmit = async (values) => {
		for (const key in values) {
			if (values[key] === undefined) {
				values[key] = null;
			}
		}
		values.birthday = values?.birthday?.format('YYYY-MM-DD') ?? null;

		try {
			const res = await axios.post('/users/student', values);
			message.success(t('createdStudent'));
			const student = {
				...res.data?.[0],
				class: {
					id: res.data?.[0].classid,
					classname: classes.find(item => item.id === res.data?.[0].classid)?.classname,
				},
				...(!!res.data?.[0].parentid ?
					{
						parent: {
							id: res.data?.[0].parentid,
							firstname: parents.find(item => item.id === res.data?.[0].parentid)?.firstname,
							lastname: parents.find(item => item.id === res.data?.[0].parentid)?.lastname,
							fullname: parents.find(item => item.id === res.data?.[0].parentid)?.firstname + ' ' + parents.find(item => item.id === res.data?.[0].parentid)?.lastname
						}
					} : {}
				)
			};
			setCreatedUsers(prev => [student, ...prev]);
		} catch (e) {
			message.error(t('notCreatedStudent'));
		}
	};

	useEffect(() => {
		const getClasses = async () => {
			const res = await axios.get('/classes');
			setClasses(res.data);
		};

		
		getClasses();
	}, []);

	useEffect(() => {	
		const getParents = async () => {
			const res = await axios.get('/users/parents');
			setParents(res.data);
		};

		getParents();
	}, [parentModalVisibility]);

	const handleCreateParent = () => {
		setParentModalVisibility(true);
	};
	return (<>
		<div style={{ display: 'flex', justifyContent: 'center', gap: '10%', width: '100%' }}>
			<div style={{ width: '47%', flexDirection: 'column', alignItems: createdUsers.length ? 'baseline' : 'center' }}>
				<Form
					{...formItemLayout}
					variant='filled'
					style={{
						width: '100%',
						border: '1px solid #E5E7EB',
						boxShadow: '3px 3px 10px #eee',
						borderRadius: 20,
						padding: 30,
						backgroundColor: '#fff',
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
							{
								pattern: /^[0-9]+$/,
								message: t('numbersOnly'),
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
						<DatePicker
							format={'DD/MM/YYYY'}
							placeholder={t('enterDate')}
							disabledDate={(current) => current && current > moment().endOf('day')}
							style={{ float: 'left', width: '100%' }} />
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
						<Select allowClear>
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
						<Select
							showSearch
							optionFilterProp='children'
							allowClear
						>
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

					<Form.Item
						label={t('parent')}
						labelAlign='left'
						name='parentid'
						rules={[
							{
								required: false,
								message: t('selectParent'),
							},
						]}
					>
						<Select
							showSearch
							optionFilterProp='children'
							allowClear
							notFoundContent={
								<div onClick={handleCreateParent} 
									style={{ cursor: 'pointer', color: '#1677FF', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'}}
								>
									{t('noParentFoundCreateNew')}
								</div>
							}
						>
							{parents.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.firstname + ' ' + item.lastname}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Button
							type='primary'
							htmlType='submit'
							style={{ marginTop: '1.5em', height: '3em' }}
						>
							{t('create-student')}
						</Button>
					</Form.Item>
				</Form>
			</div>
			{!!createdUsers.length && (
				<div style={{ maxWidth: '50%' }}>
					<h1 style={{ textAlign: 'center' }}>{t('createdStudents')}</h1>
					<StudentTable data={createdUsers} side={true} classes={classes} parents={parents} />
				</div>
			)}
		</div>
		{parentModalVisibility && <CreateParentModal open={parentModalVisibility} setOpen={setParentModalVisibility} />}
	</>);
}
export default CreateStudent;
