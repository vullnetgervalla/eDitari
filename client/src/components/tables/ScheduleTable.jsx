import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined, CloseCircleOutlined, PrinterFilled, BookOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const ScheduleTable = ({ data }) => {
	const { t } = useTranslation();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

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
			title: t('teacher'),
			dataIndex: 'teacher',
			key: 'teacherid',
			...getColumnSearchProps('fullname', 'teacher.fullname'),
            render: (teacher) => (
                <span>{teacher?.fullname ?? '-'}</span>
            )
		},
		{
			title: t('subject'),
			dataIndex: 'subject',
			key: 'subjectid',
			...getColumnSearchProps('subject', 'subject.name'),
            render: (subject) => (
                <span>{subject?.name ?? '-'}</span>
            )
		},
		{
			title: t('class'),
			dataIndex: 'class',
			key: 'classid',
			...getColumnSearchProps('class', 'class.classname'),
            render: (_class) => (
                <span>{_class?.classname ?? '-'}</span>
            )
		},
		{
            title: t('day'),
            dataIndex: 'day',
            key: 'day',
            filters: [
                { text: t('monday'), value: 'monday' },
                { text: t('tuesday'), value: 'tuesday' },
                { text: t('wednesday'), value: 'wednesday' },
                { text: t('thursday'), value: 'thursday' },
                { text: t('friday'), value: 'friday' },
                { text: t('saturday'), value: 'saturday' },
                { text: t('sunday'), value: 'sunday' },
            ],
            onFilter: (value, record) => record.day.toLowerCase() === value,
            render: (day) => (
                <span>{day ? t(day.toLowerCase()) : '-'}</span>
            )
        },
        {
			title: t('period'),
			dataIndex: 'period',
			key: 'period',
			...getColumnSearchProps('period'),
		},
	];

	return <Table bordered columns={columns} dataSource={data} scroll={{ x: 500 }} rowKey={'id'} />;
};
