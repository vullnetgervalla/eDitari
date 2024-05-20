
import NumStatistics from 'components/numStatistics';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Column, Area } from '@ant-design/plots';
import { axiosPrivate } from 'api/axios';
import { useState, useEffect } from 'react';
import { Card, Button, Input, Flex } from 'antd';
import BestStudents from 'components/users/bestStudents';
import MyCalendar from 'components/calendar';
import CreateMaterial from 'components/createMaterials';
import CreateNotification from 'pages/admin/createNotification';
import MissingStudents from 'components/users/missingStudents';


export function AdminPage() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  // const axiosPrivate = axiosPrivate();
  const config1 = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    },
    xField: (d) => new Date(d.year),
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'category',
  };
  const config2 = {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json',
    },
    xField: 'letter',
    yField: 'frequency',
    label: {
      text: (d) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: 'bottom',
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
    style: {

      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  const config3 = {
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    },
    xField: (d) => new Date(d.date),
    yField: 'close',
  };


  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const users = await axiosPrivate.get('/users/totalUsers?role=[0,1,1,0]');
        const classes = await axiosPrivate.get('/users/totalClasses');
        setStudentCount(users.data?.[0]?.students);
        setTeacherCount(users.data?.[0]?.teachers);
        setClassCount(classes.data?.[0]?.classes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentCount();
  }, [axiosPrivate]);

  return (
    <div>
      <Flex gap={80}>

        <Card style={{ width: '30%', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          <NumStatistics user={t('number.students')} count={studentCount} chartType={<Line {...config1} height={400} />} />
        </Card>
        <Card style={{ width: '30%', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          <NumStatistics user={t('number.teachers')} count={teacherCount} chartType={<Column {...config2} height={400} />} />
        </Card>
        <Card style={{ width: '30%', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
          <NumStatistics user={t('number.class')} count={classCount} chartType={<Area {...config3} height={400} />} />
        </Card>

      </Flex>

      <Flex gap={150} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <div style={{ marginTop: '50px', marginLeft:'60px' ,width: '40%', border: '1px solid #e5e7eb', borderRadius: '20px', cursor: 'pointer' }}>
          <BestStudents />
        </div>
        <div style={{ marginTop: '50px', width: '40%', border: '1px solid #e5e7eb', borderRadius: '20px', cursor: 'pointer' }}>
          <MissingStudents />
        </div>
      </Flex>

      <div style={{ marginTop: '50px', cursor: 'pointer' }}>
        <MyCalendar />
      </div>

      <Flex gap={40}>
        <div style={{ width: '50%', marginTop: '50px', cursor: 'pointer' }}>
          <CreateMaterial />
        </div>

        <div style={{ width: '50%', marginTop: '50px', cursor: 'pointer' }}>
          <Card style={{ width: '100%' }}>
            <CreateNotification />
          </Card>
        </div>
      </Flex>

    </div>
  );
}
