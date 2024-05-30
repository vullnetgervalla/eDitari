
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

const fetchNumOfStudentsPerClass = async (axiosPrivate, setStudentsPerClassLevel) => {
  try {
    const response = await axiosPrivate.get('/classes/numOfStudentsPerClass')
    console.log(response.data)
    setStudentsPerClassLevel(response.data)
  } catch (error) {
    console.error(error)
  }
}
const fetchGenderTeachers = async (axiosPrivate, setGenderTeachers) => {
  try {
    const response = await axiosPrivate.get('/classes/getTeacherCountByGender');
    setGenderTeachers(response.data);
  } catch (error) {
    console.error(error);
  }
}
const fetchUsersCount = async (axiosPrivate, setStudentCount, setTeacherCount, setClassCount, setParentCount, setLoading) => {
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

export function AdminPage() {
  const axiosPrivate = useAxiosPrivate()
  const { t } = useTranslation();
  const [studentCount, setStudentCount] = useState({});
  const [teacherCount, setTeacherCount] = useState({});
  const [parentCount, setParentCount] = useState({});
  const [classCount, setClassCount] = useState({})
  const [studentsPerClassLevel, setStudentsPerClassLevel] = useState({});
  const [genderTeachers, setGenderTeachers] = useState({});
  const [loading, setLoading]= useState(true);

  const firstPlotData = {
    data: studentsPerClassLevel,
    xField: 'classLevel',
    yField: 'studentPerClassLevel',
    axis: {
      x: {
        title: t('classesYear'),
        tickInterval: 1,
      },
      y: {
        title: t('number.students')
      }
    }
  };
  const secondPlotData = {
    data: genderTeachers,
    xField: 'gender',
    yField: 'count',
    axis: {
      x: {
        title: t('genderTeachers')
      },
      y: {
        title: t('number.teachers')
      }
    },
    style: {
      fill: ({ gender }) => {
        if (gender === 'F') {
          return 'pink';
        }
        return 'lightblue';
      }
    }
  };

  useEffect(() => {
    fetchNumOfStudentsPerClass(axiosPrivate, setStudentsPerClassLevel);
    fetchGenderTeachers(axiosPrivate, setGenderTeachers);
    fetchUsersCount(axiosPrivate, setStudentCount, setTeacherCount, setClassCount, setParentCount, setLoading);
  }, [axiosPrivate]);
  if(loading){
    return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
  }
  return (
    <div style={{ flexdirection: 'column', margin: '40px 0' }}>

      <Flex style={{ width: '100%', height: '120px' }} gap={30}>
        <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.teachers')} count={teacherCount} />
        <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.students')} count={studentCount} />
        <NumStatistics style={{ width: '100%', height: '120px' }} user={t('number.parents')} count={parentCount} />
      </Flex>

      <Flex style={{ justifyContent: 'space-between', marginTop: '60px' }}>
        <Card style={{ width: '46%', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          <GraphStatistics chartType={<Line {...firstPlotData} height={450} />} />
        </Card>
        <Card style={{ width: '46%', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          <GraphStatistics chartType={<Column {...secondPlotData} height={450} />} />
        </Card>
      </Flex>

      <Flex style={{ justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ width: '46%', border: '1px solid #e5e7eb', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <BestStudents />
        </div>
        <div style={{ width: '46%', border: '1px solid #e5e7eb', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <MissingStudents />
        </div>
      </Flex>

      <div style={{ marginTop: '100px', cursor: 'pointer', backgroundColor:'white',padding:'50px', borderRadius:"30px",border: '1px solid #e5e7eb',boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <MyCalendar />
      </div>
    </div>
  );
}
