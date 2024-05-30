import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row, Table, Input, Space, Button, Flex } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { Unauthorized } from "components/auth/Unauthorized";
import moment from 'moment'

const getData = async (axios, setData, setLoading, param, setSubjectGrades) => {
    getSubjectGrades(axios, setSubjectGrades, param.id)
    try {
        const res = await axios.get(`/students/${param.id}`)
        setData(res.data)
    }
    catch (e) {
        console.log(e)
    }
    finally {
        setLoading(false);
    }
}

const getSubjectGrades = async (axios, setSubjectGrades, param) => {
    console.log(param)
    try {
        const res = await axios.get(`/students/subject-grades?id=${param}`)
        console.log(res.data)
        setSubjectGrades(res.data.map((item, index) => ({
            index: index + 1,
            ...item,
            date: moment(item.date).format('YYYY-MM-DD'),
            typeofgrade: item.typeofgrade === null ? 'Jo perfundimtare' : "Perfundimtare"
        })))
    }
    catch (e) {
        console.log(e)
    }
}

export default function StudentSubjectInfo() {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [subjectGrades, setSubjectGrades] = useState([])
    const param = useParams();
    const { t } = useTranslation();
    const searchInput = useRef(null);

    useEffect(() => {
        getData(axios, setData, setLoading, param, setSubjectGrades);
    }, [])

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

    if (loading) {
        return <Card style={{ height: '50%' }} loading={loading} />;
    }

    if (Object.keys(data).length === 0) {
        return <Unauthorized />;
    }

    const { class: classInfo, subject, teacher } = data;
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
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        },
        {
            title: t('grade'),
            dataIndex: 'grade',
            key: 'grade',
            ...getColumnSearchProps('grade'),
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        },
        {
            title: t('date'),
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        },{
            title: t('typeOfGrade'),
            dataIndex: 'typeofgrade',
            key: 'typeofgrade',
            ...getColumnSearchProps('typeofgrade'),
            render: (text) => {
                return (<Flex gap='small' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {text}
                </Flex>)
            }
        },
    ]

    return (
        <Layout style={{ background: 'white', borderRadius: '20px' }}>
            <Header style={{ background: 'white', borderBottom: '1px solid #f0f0f0', margin: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
                {t('subject')} {subject?.name}
            </Header>
            <Content style={{ padding: '20px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title={t('classInfo')}>
                            <p><strong>{t('teacher')}:</strong> {teacher}</p>
                            <p><strong>{t('classlevel')}:</strong> {classInfo.classlevel}</p>
                            <p><strong>{t('classroom')}:</strong> {classInfo.classroom}</p>
                            <p><strong>{t('day')}:</strong> {t(data.day.toLowerCase())}</p>
                            <p><strong>{t('period')}:</strong> {data.period}</p>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{t('grades')}</span>
                            </div>
                        } >
                            <Table dataSource={subjectGrades} columns={columns}/>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}