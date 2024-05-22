import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined, CloseCircleOutlined, PrinterFilled, BookOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const TeacherTable = ({ data, side }) => {
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
      title: t('firstname'),
      dataIndex: 'firstname',
      key: 'firstname',
      ...getColumnSearchProps('firstname'),
    },
    {
      title: t('lastname'),
      dataIndex: 'lastname',
      key: 'lastname',
      ...getColumnSearchProps('lastname'),
    },
    {
      title: t('personalNumber'),
      dataIndex: 'personalnumber',
      key: 'personalnumber',
      ...getColumnSearchProps('personalnumber'),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: t('phoneNumber'),
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      ...getColumnSearchProps('phonenumber'),
    },
    {
      title: t('educationLevel'),
      dataIndex: 'educationlevel',
      key: 'educationlevel',
      ...getColumnSearchProps('educationlevel'),
    },
    {
      title: t('experienceYears'),
      dataIndex: 'experienceyears',
      key: 'experienceyears',
      ...getColumnSearchProps('experienceyears'),
    },
    {
      title: t('teachingSpecialization'),
      dataIndex: 'teachingspecialization',
      key: 'teachingspecialization',
      ...getColumnSearchProps('teachingspecialization'),
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      ...getColumnSearchProps('gender'),
      render: (gender) =>
        gender === 'M'
          ? t('male')
          : gender === 'F'
            ? t('female')
            : '-'
    },
    {
      title: t('birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      ...getColumnSearchProps('birthday'),
      render: (birthday) => <span>{birthday ? moment(birthday).format('DD/MM/YYYY') : '-'}</span>
    },
    ...(!side ? [
      {
        title: t('account'),
        dataIndex: 'account',
        key: 'account',
        render: (_, record) => (
          <Link to={`/list-teacher/${record.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'black' }}>
            <UserOutlined style={{ fontSize: '18px' }} />
          </Link>
        ),
      }
    ] : []),
  ];

  return <Table bordered columns={columns} dataSource={data} scroll={{ x: 500 }} rowKey={'id'} />;
};
