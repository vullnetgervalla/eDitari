import React, { useEffect, useState, useRef } from 'react';
import { Pie } from '@ant-design/plots';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Typography, Spin, Table, Input, Card, Space, Button } from 'antd';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import NumStatistics from 'components/numStatistics';
import moment from 'moment'

const { Title } = Typography;
const fetchFinalGrades = async (axiosPrivate, setFinalGrades, setHasData) => {
    try {
        const response = await axiosPrivate.get('/students/final-grades');
        if(response.data.length === 0) {
            setHasData(false);
            return;
        }
        setFinalGrades(response.data);
    } catch (error) {
        console.error(error);
    }
}
const fetchAllGrades = async (axiosPrivate, setAllGrades) => {
    try {
        const response = await axiosPrivate.get('/students/all-grades');
        setAllGrades(response.data.map((item, index) => ({
            index:index + 1,
            ...item,
            date: moment(item.date).format('YYYY-MM-DD')
          })));
    } catch (error) {
        console.error(error);
    }
}

const fetchGPA = async (axiosPrivate, setGpa) => {
    try {
        const gpa = await axiosPrivate.get('/students/gpa');
        if (gpa.data[0].avg_grade === null) {
            setGpa('Nuk ka te dhena');
            return;
        }
        setGpa(gpa.data[0].avg_grade);
    } catch (error) {
        console.error(error);
    }
}

export default function Transcript() {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [finalGrades, setFinalGrades] = useState([]);
    const [allGrades, setAllGrades] = useState([])
    const [gpa, setGpa] = useState({});
    const [hasData, setHasData] = useState(false);
    const searchInput = useRef(null);

    useEffect(() => {
        fetchFinalGrades(axiosPrivate, setFinalGrades, setHasData);
        fetchAllGrades(axiosPrivate, setAllGrades);
        fetchGPA(axiosPrivate, setGpa);
        setLoading(false);
    }, [axiosPrivate])

    const config = {
        data: [finalGrades.map((grade) => {
            return { type: grade.subject_name, value: grade.grade }
        })],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        label: {
            text: 'value',
            position: 'outside',
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    }
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
            title: t('nr'),
            dataIndex: 'index',
            key: 'index',
            ...getColumnSearchProps('index'),
            render: (text) => {
                return (<Flex gap='small' style={{ alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('subject'),
            dataIndex: 'subject',
            key: 'subject',
            ...getColumnSearchProps('subject'),
            render: (text) => {
                return (<Flex gap='small' style={{ alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('teacher'),
            dataIndex: 'teacher',
            key: 'teacher',
            ...getColumnSearchProps('teacher'),
            render: (text) => {
                return (<Flex gap='small' style={{ alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('grade'),
            dataIndex: 'grade',
            key: 'grade',
            ...getColumnSearchProps('grade'),
            render: (text) => {
                return (<Flex gap='small' style={{alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }, {
            title: t('date'),
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            render: (text) => {
                return (<Flex gap='small' style={{ alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        }
    ]
    if (loading) {
        return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
    }

    return (
        <div>
            <Flex vertical>
                <Title level={2}>Grafikoni notave</Title>
                {hasData ? <Pie {...config} style={{ margin: 'auto' }} /> : <h1>Nuk ka te dhena..</h1>}
                <NumStatistics style={{ width: '50%', height: '120px', margin: 'auto' }} user={t('gpa')} count={gpa} />
            </Flex>
            <hr style={{ margin: '50px 0' }} />
            <Card style={{ borderRadius: '20px' }}>
                <h2 >{t('grades')}</h2>
                <hr style={{marginBottom: '15px'}}/>
                <div style={{ minHeight: '400px', overflow: 'auto' }}>
                    <Table dataSource={allGrades} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
                </div>
            </Card>
        </div>
    )
}