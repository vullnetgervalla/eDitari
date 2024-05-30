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

const fetchNumOfSubjects = async (axiosPrivate, setSubjectsNumber) => {
    try {
        const response = await axiosPrivate.get('/subjects/number')
        setSubjectsNumber(response.data[0].subject_count)
    } catch (error) {
        console.error(error)
    }
}
const fetchGPA = async (axiosPrivate, setGPA) => {
    try {
        const gpa = await axiosPrivate.get('/students/gpa');
        if (gpa.data[0].avg_grade === null) {
            setGPA('Nuk ka te dhena');
            return; 
        }
        setGPA(gpa.data[0].avg_grade);
    } catch (error) {
        console.error(error);
    }
}
const fetchAttendanceCount = async (axiosPrivate, setAttendance) => {
    try {
        const attendance = await axiosPrivate.get('/students/attendance');
        setAttendance(attendance.data[0].attendance)
    } catch (error) {
        console.error(error);
    }
}

export function StudentPage() {
    const axiosPrivate = useAxiosPrivate()
    const { t } = useTranslation();
    const [subjectsNumber, setSubjectsNumber] = useState({})
    const [gpa, setGpa] = useState({})
    const [attendance, setAttendance] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNumOfSubjects(axiosPrivate, setSubjectsNumber);
        fetchGPA(axiosPrivate, setGpa);
        fetchAttendanceCount(axiosPrivate, setAttendance);
        setLoading(false);
    }, [axiosPrivate]);
    if (loading) {
        return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
    }
    return (
        <div style={{ flexdirection: 'column', margin: '40px 0' }}>
            <Flex style={{ width: '100%', height: '120px' }} gap={30}>
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.subjects')} count={subjectsNumber} />
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('gpa')} count={gpa} />
                <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.missing')} count={attendance} />
            </Flex>
            <div style={{ marginTop: '100px', cursor: 'pointer', backgroundColor: 'white' }}>
                <MyCalendar />
            </div>
        </div>
    )
}