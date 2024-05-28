import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import { SearchOutlined } from '@ant-design/icons';
import { Card, Table, Input, Space, Button, Flex } from 'antd';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { axiosPrivate } from 'api/axios';
import { TrophyOutlined } from '@ant-design/icons';
import { CloseCircleOutlined} from '@ant-design/icons';



const fetchStudentsAttendances = async (axiosPrivate, setDataSource) => {
    try {
        console.log('fetching top students')
        const response = await axiosPrivate.get('/users/studentsAtttendances', { params: { limit: 5 } });
        setDataSource(response.data);
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

export default function MissingStudents() {
    const { t } = useTranslation();
    const axios = useAxiosPrivate();
    const searchInput = useRef(null);
    const [dataSource, setDataSource] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');

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

    useEffect(() => {
        fetchStudentsAttendances(axios, setDataSource);
    }, [axiosPrivate])


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
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('lastname'),
            dataIndex: 'lastname',
            key: 'lastname',
            ...getColumnSearchProps('lastname'),
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
            
        }, {
            title: t('classname'),
            dataIndex: 'classname',
            key: 'classname',
            ...getColumnSearchProps('classname'),
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('attendance_count'),
            dataIndex: 'attendance_count',
            key: 'attendance_count',
            ...getColumnSearchProps('attendance_count'),
            render: (text, record, index) => {
                return index < 3 ?
                <Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <span>{text}</span>
                    < CloseCircleOutlined />
                </Flex>
                : <Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>;
            }
        }
    ]



    return (
        <div>
            <Card style={{ borderRadius: '20px' }}>
                <h2>{t('missingStudents')}</h2>
                <hr />
                <div style={{ minHeight: '400px', overflow: 'auto' }}>
                    <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
                    {/* <Pagination pageSize={5} total={dataSource.length} /> */}
                </div>
            </Card>
        </div>
    )
}