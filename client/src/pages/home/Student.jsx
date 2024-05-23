import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Column } from '@ant-design/plots';
import { useState, useEffect } from 'react';
import { Card, Flex, Spin } from 'antd';
import BestStudents from 'components/users/bestStudents';
import MyCalendar from 'components/calendar';
import MissingStudents from 'components/users/missingStudents';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import GraphStatistics from 'components/graphStatistics';
import NumStatistics from 'components/numStatistics';

const fetchNumOfSubjects = async (axiosPrivate, setStudentsPerClassLevel) => {
    try {
        const response = await axiosPrivate.get('/classes/numOfStudentsPerClass')
        setStudentsPerClassLevel(response.data)
    } catch (error) {
        console.error(error)
    }
}
const fetchGPA = async (axiosPrivate, setGenderTeachers) => {
    try {
        const response = await axiosPrivate.get('/classes/getTeacherCountByGender');
        setGenderTeachers(response.data);
    } catch (error) {
        console.error(error);
    }
}
const fetchAttendanceCount = async (axiosPrivate, setStudentCount, setTeacherCount, setClassCount, setParentCount, setLoading) => {
    try {
        const users = await axiosPrivate.get('/users/totalUsers?role=[0,1,1,1]');
        const classes = await axiosPrivate.get('/users/totalClasses');
        setStudentCount(users.data?.[0]?.students);
        setTeacherCount(users.data?.[0]?.teachers);
        setClassCount(classes.data?.[0]?.classes);
        setLoading(false);
        setParentCount(users.data?.[0]?.parents);
    } catch (error) {
        console.error(error);
    }
}

export function StudentPage() {
    const axiosPrivate = useAxiosPrivate()
    const { t } = useTranslation();
    const [studentCount, setStudentCount] = useState({});
    const [teacherCount, setTeacherCount] = useState({});
    const [parentCount, setParentCount] = useState({});
    const [classCount, setClassCount] = useState({})
    const [studentsPerClassLevel, setStudentsPerClassLevel] = useState({});
    const [genderTeachers, setGenderTeachers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNumOfSubjects(axiosPrivate, setStudentsPerClassLevel);
        fetchGPA(axiosPrivate, setGenderTeachers);
        fetchAttendanceCount(axiosPrivate, setStudentCount, setTeacherCount, setClassCount, setParentCount, setLoading);
    }, [axiosPrivate]);
    if (loading) {
        return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
    }
    return (
        <div style={{ flexdirection: 'column', margin: '40px 0' }}>

            <Flex style={{ width: '100%', height: '120px' }} gap={30}>
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.subjects')} count={teacherCount} />
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('gpa')} count={studentCount} />
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.missing')} count={parentCount} />
            </Flex>
            <div style={{ marginTop: '100px', cursor: 'pointer', backgroundColor: 'white' }}>
                <MyCalendar />
            </div>
        </div>
    )
}