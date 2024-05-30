import React, { useEffect, useState } from "react";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export function TeacherSubjectPage() {
    const axios = useAxiosPrivate();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const res = await axios.get('/users/teacherSubjects')
                setSubjects(res.data)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoading(false);
            }
        }
        getSubjects()
    }, [])

    if (loading) {
        return <Card loading={loading}/>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {subjects.length ? subjects.map((subject) => (
                <Card
                    title={<h2>{subject.name}</h2>}
                    key={subject.id}
                    hoverable
                    onClick={() => {navigate(`/subject/${subject.id}`)}}
                >
                    <h2>{t('classname')}: {subject.classname}</h2>
                    <h4>{t('classlevel')}: {subject.classlevel}</h4>
                    <h4>{t('year')}: {subject.year}</h4>
                    <div style={{backgroundColor: '#1677ff', height: '10px'}}></div>
                </Card>
            )): <h1>{t('noSubjects')}</h1>}
        </div>
    )
}