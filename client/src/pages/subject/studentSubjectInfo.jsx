import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { Card, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { Unauthorized } from "components/auth/Unauthorized";

const getData = async (axios, setData, setLoading, param) => {
    console.log(param.id)
    try {
        const res = await axios.get(`/students/${param.id}`)
        console.log(res.data)
        setData(res.data)
    }
    catch (e) {
        console.log(e)
    }
    finally {
        setLoading(false);
    }
}

export default function StudentSubjectInfo() {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const param = useParams();
    const { t } = useTranslation();
    console.log(data)

    useEffect(() => {
        getData(axios, setData, setLoading, param)
    }, [])

    if (loading) {
        return <Card style={{ height: '50%' }} loading={loading} />;
    }

    if (Object.keys(data).length === 0) {
        return <Unauthorized />;
    }

    const { class: classInfo, subject, teacher } = data;

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
                            <div>
                                <Row>
                                    <Col>{t('firstSemester')}</Col>
                                    <Col></Col></Row>
                                <Row></Row></div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}