import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Flex, Input, Spin, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useCapabilities } from 'hooks/useCapabilities';

const CheckboxGroup = Checkbox.Group;
let plainOptions = [];

export default function CreateRole() {
	const { t } = useTranslation();
	const axiosPrivate = useAxiosPrivate();
	const { capabilities, loading } = useCapabilities(axiosPrivate);
	const [checkedList, setCheckedList] = useState([]);
	const [requestList, setRequestList] = useState([]);
	const [roleName, setRoleName] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	if (loading) {
		return (
			<Spin
				className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				size='large'
			/>
		);
	}
	plainOptions = capabilities.map((item) => t(item.capability_name));
	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const onChange = (list) => {
		const values = capabilities.reduce((acc, item) => {
			if (list.includes(t(item.capability_name))) {
				acc.push(item.capability_name);
			}
			return acc;
		}, []);
		setRequestList(values);
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};
	const resetData = () => {
		setCheckedList([]);
		setRoleName('');
	};
	const addRole = async (roleName, capabilities) => {
		try {
			await axiosPrivate.post('/users/create-role', {
				roleName,
				capabilities,
			});
			resetData();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Flex
			vertical
			gap='large'
		>
			<Flex>
				<Input
					size='large'
					placeholder={t('role-name')}
					prefix={<UserOutlined />}
					value={roleName}
					onChange={(e) => setRoleName(e.target.value)}
					style={{
						width: '25%',
						marginBottom: '30px',
					}}
				/>
				{showAlert && (
					<Alert
						message={t('user-created-successfully')}
						type='success'
						showIcon
						style={{ marginLeft: 'auto', fontSize: '16px', width: '35%' }}
						closable
            onClose={() => setShowAlert(false)}
					/>
				)}
			</Flex>
			<div style={{ margin: '0 0 0 20px' }}>
				<Checkbox
					indeterminate={indeterminate}
					onChange={onCheckAllChange}
					checked={checkAll}
				>
					{t('check-all-functionalities')}
				</Checkbox>
				<Divider />
				<CheckboxGroup
					options={plainOptions}
					value={checkedList}
					style={{
						width: '100%',
						gap: '40px',
					}}
					onChange={onChange}
				></CheckboxGroup>
			</div>
			<Flex
				gap='middle'
				style={{ position: 'absolute', bottom: 60, right: 60 }}
			>
				<Button
					size='large'
					danger
					onClick={resetData}
				>
					{t('reset')}
				</Button>
				<Button
					size='large'
					type='primary'
					onClick={() => addRole(roleName.toUpperCase(), requestList)}
					style={{ padding: '0 30px 0 30px' }}
				>
					{t('create')}
				</Button>
			</Flex>
		</Flex>
	);
}
