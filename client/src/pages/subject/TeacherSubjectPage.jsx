import React, { useEffect, useState } from "react";
import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { Card } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

export function TeacherSubjectPage() {
    const axios = useAxiosPrivate();
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const res = await axios.get('/users/teacherSubjects')
                setSubjects(res.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getSubjects()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {subjects.map((subject) => (
                <Card
                    key={subject.id}
                    style={{
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        ':hover': {
                            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                        }
                    }}
                >
                    <Title level={2}>{subject.name}</Title>
                    <h3>Class: {subject.classname}</h3>
                    <h4>Year: {subject.year}</h4>
                    <div style={{backgroundColor: '#1890ff', height: '10px'}}></div>
                </Card>
            ))}
        </div>
    )
}