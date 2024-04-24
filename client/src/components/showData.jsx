import React, { useRef, useState } from 'react';
import { SearchOutlined, UserOutlined, CloseCircleOutlined, PrinterFilled, BookOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Joe Black',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Jim Green',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];
const ShowData = ({ userType }) => {
	const { t } = useTranslation();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1677ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});
	const columns = (t) => [
		{
			title: t('name'),
			dataIndex: 'name',
			key: 'name',
			width: '15%',
			...getColumnSearchProps('name'),
		},
		{
			title: t('lastName'),
			dataIndex: 'name',
			key: 'lastName',
			width: '15%',
			...getColumnSearchProps('name'),
		},
		{
			title: t('account'),
			dataIndex: 'account',
			key: 'account',
			width: '5%',
			render: () => (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<UserOutlined style={{ fontSize: '18px' }} />
				</div>
			),
		},
		{
			title: t('absences'),
			dataIndex: 'absences',
			key: 'absences',
			width: '5%',
			render: () => (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<CloseCircleOutlined style={{ fontSize: '18px' }} />
				</div>
			),
		},
		{
			title: t('attestation'),
			dataIndex: 'attestation',
			key: 'attestation',
			width: '5%',
			render: () => (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<PrinterFilled style={{ fontSize: '18px' }} />
				</div>
			),
		},
		...(userType === 'STUDENT'
			? [
					{
						title: t('grades'),
						dataIndex: 'grades',
						key: 'grades',
						width: '5%',
						render: () => (
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
								<BookOutlined style={{ fontSize: '18px' }} />
							</div>
						),
					},
			  ]
			: []),
	];
	return (
		<Table
			columns={columns(t)}
			dataSource={data}
		/>
	);
};
export default ShowData;
