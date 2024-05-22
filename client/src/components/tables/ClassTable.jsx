import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined, CloseCircleOutlined, PrinterFilled, BookOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const ClassTable = ({ data }) => {
	const { t } = useTranslation();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
console.log('data', data)
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex, nestedPath) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => {
            if (nestedPath) {
                const nestedValue = nestedPath.split('.').reduce((acc, part) => acc && acc[part], record);
                return nestedValue?.toString().toLowerCase().includes(value.toLowerCase());
            }
            return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text?.toString() : ''}
                />
            ) : (
                text
            ),
    });

	const columns = [
		{
			title: t('classname'),
			dataIndex: 'classname',
			key: 'classname',
			...getColumnSearchProps('classname'),
		},
		{
			title: t('classlevel'),
			dataIndex: 'classlevel',
			key: 'classlevel',
			...getColumnSearchProps('classlevel'),
		},
		{
			title: t('classroom'),
			dataIndex: 'classroom',
			key: 'classroom',
			...getColumnSearchProps('classroom'),
		},
        {
            title: t('headTeacher'),
            dataIndex: 'teacher',
            key: 'teacherid',
            ...getColumnSearchProps('fullname', 'teacher.fullname'),
            render: (teacher) => (
                <span>{teacher?.fullname ? teacher?.fullname : '-'}</span>
            )
        },
		{
			title: t('year'),
			dataIndex: 'year',
			key: 'yearid',
			...getColumnSearchProps('name', 'year.name'),
            render: (year) => (
                <span>{year?.name ? year?.name : '-'}</span>
            )
		},
		{
			title: t('active'),
			dataIndex: 'active',
			key: 'active',
            filters: [
                { text: t('yes'), value: true },
                { text: t('no'), value: false },
            ],
            onFilter: (value, record) => record.active === value,
            render: (active) => (
                <span>{active ? t('yes') : t('no')}</span>
            )
		}
	];

	return <Table bordered columns={columns} dataSource={data} scroll={{ x: 500 }} rowKey={'id'} />;
};
