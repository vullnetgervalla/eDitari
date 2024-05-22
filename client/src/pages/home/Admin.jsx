
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Column, Area } from '@ant-design/plots';
import { useState, useEffect } from 'react';
import { Card, Button, Input, Flex, Upload, notification } from 'antd';
import BestStudents from 'components/users/bestStudents';
import MyCalendar from 'components/calendar';
import MissingStudents from 'components/users/missingStudents';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import GraphStatistics from 'components/graphStatistics';
import NumStatistics from 'components/numStatistics';

const fetchStudentAverage = async (axiosPrivate, setData) => {
  try {
    const response = await axiosPrivate.get('/classes/numOfStudentsPerClass');
    setData(response.data);
  } catch (error) {
    console.error(error)
  }
};

const fetchNumOfStudentsPerClass = async (axiosPrivate, setStudentsPerClassLevel) => {
  try {
    const response = await axiosPrivate.get('/classes/numOfStudentsPerClass')
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

export function AdminPage() {
  const axiosPrivate = useAxiosPrivate()
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [studentCount, setStudentCount] = useState({});
  const [teacherCount, setTeacherCount] = useState({});
  const [classCount, setClassCount] = useState({});
  const [parentCount, setParentCount] = useState({});
  const [studentsPerClassLevel, setStudentsPerClassLevel] = useState({});
  const [genderTeachers, setGenderTeachers] = useState({});

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
    fetchStudentAverage(axiosPrivate, setData);
    fetchNumOfStudentsPerClass(axiosPrivate, setStudentsPerClassLevel);
    fetchGenderTeachers(axiosPrivate, setGenderTeachers);
  }, []);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const users = await axiosPrivate.get('/users/totalUsers?role=[0,1,1,1]');
        const classes = await axiosPrivate.get('/users/totalClasses');
        setStudentCount(users.data?.[0]?.students);
        setTeacherCount(users.data?.[0]?.teachers);
        setClassCount(classes.data?.[0]?.classes);
        setParentCount(users.data?.[0]?.parents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentCount();
  }, [axiosPrivate]);
  return (
    <div style={{ flexdirection: 'column', marginTop: '30px' }}>

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

      <div style={{ marginTop: '100px', cursor: 'pointer' }}>
        <MyCalendar />
      </div>
    </div>
  );
}
