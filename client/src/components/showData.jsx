import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, UserOutlined, CloseCircleOutlined, PrinterFilled, BookOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';

const ShowData = ({ userType, data }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const location = useLocation();
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
  const [transformedArray, setTransformedArray] = useState([]);
  useEffect(() => {
    setTransformedArray(
      Array.isArray(data)
        ? data.map((item) => ({
          key: item.id,
          name: `${item.firstname}`,
          lastName: `${item.lastname}`,
          email: `${item.email}`
        }))
        : []
    );
  }, [data]);
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
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
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
          textToHighlight={text ? text?.toString() : ''}
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
      title: t('mail'),
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      ...getColumnSearchProps('email'),
    },
    {
      title: t('name'),
      dataIndex: 'lastName',
      key: 'lastName',
      width: '15%',
      ...getColumnSearchProps('name'),
    },
    {
      title: t('account'),
      dataIndex: 'account',
      key: 'account',
      width: '5%',
      render: (_, record) => {
        return (
          <Link to={`${location.pathname}/${record.key}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'black' }}>
            <UserOutlined style={{ fontSize: '18px' }} />
          </Link>);
      },
    },
    // {
    //   title: t('absences'),
    //   dataIndex: 'absences',
    //   key: 'absences',
    //   width: '5%',
    //   render: () => (
    //     <Link to={'/'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'black' }}>
    //       <CloseCircleOutlined style={{ fontSize: '18px' }} />
    //     </Link>
    //   ),
    // },
    // {
    //   title: t('attestation'),
    //   dataIndex: 'attestation',
    //   key: 'attestation',
    //   width: '5%',
    //   render: () => (
    //     <Link to={'/'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'black' }}>
    //       <PrinterFilled style={{ fontSize: '18px' }} />
    //     </Link>
    //   ),
    // },
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
      bordered
      columns={columns(t)}
      dataSource={transformedArray}
    />
  );
};

export default ShowData;
