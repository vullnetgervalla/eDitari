import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { Button, Card, Col, Layout, Row } from "antd";
import { StudentTable } from "components/tables/StudentTable";
import { Content, Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { Unauthorized } from "components/auth/Unauthorized";

export function Subject() {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const param = useParams();
    const { t } = useTranslation();
    console.log(data)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`/subjects/${param.id}`)
                setData(res.data)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoading(false);
            }
        }

        getData()
    }, [])

    if (loading) {
        return <Card style={{ height: '50%' }} loading={loading} />;
    }

    if (Object.keys(data).length === 0) {
        return <Unauthorized />;
    }

    const { class: classInfo, students } = data;

    return (
        <Layout style={{ background: 'white', borderRadius: '20px' }}>
            <Header style={{ background: 'white', borderBottom: '1px solid #f0f0f0', margin: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
                {t('class')} {classInfo?.classname}
            </Header>
            <Content style={{ padding: '20px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title={t('classInfo')}>
                            <p><strong>{t('classlevel')}:</strong> {classInfo.classlevel}</p>
                            <p><strong>{t('classroom')}:</strong> {classInfo.classroom}</p>
                            <p><strong>{t('day')}:</strong> {t(data.day.toLowerCase())}</p>
                            <p><strong>{t('period')}:</strong> {data.period}</p>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title={
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>{t('student')}</span>
                                <Button type="primary" children={t('grades')} />
                            </div>
                        } >
                            <StudentTable tableProps={{pagination: { pageSize: 6 }}} data={students.map(s => ({...s, class: classInfo}))} teacher={true}/>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}