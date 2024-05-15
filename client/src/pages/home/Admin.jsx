
import NumStatistics from 'components/numStatistics';
// import StudentChart1 from 'components/studentPieChart1';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Area  } from '@ant-design/plots';
import { axiosPrivate } from 'api/axios';
import { useState, useEffect } from 'react';

export function AdminPage() {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [studentCount, setStudentCount] = useState(0);
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
            const res = await axiosPrivate.get('/users/totalUsers?role=STUDENT');
            setStudentCount(res.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchStudentCount();
      }, []);
    
      // ...
    
      return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', width:'100%'}}>
          <NumStatistics style={{ width: '30%' }} user={t('number.students')} count={studentCount} chartType={<Line {...config1} height={400} />} />
          <NumStatistics style={{ width: '30%' }} user={t('number.teachers')} chartType={<Column {...config2} height={400} />} />
          <NumStatistics style={{ width: '30%' }} user={t('number.class')} chartType={<Area {...config3} height={400}/>}/>
        </div>
      );
    }
      // const test = async () => {
      //   try {
      //     const res = await axiosPrivate.get('/users/totalUsers?role=STUDENT');
      //     console.log(res.data);
      //   } catch (error) {
      //     console.error(error);
      //   }
    // return <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', width:'100%'}}>
    //     <NumStatistics style={{ width: '30%' }} user={t('number.students')}  chartType={<Line {...config1} height={400} />} />
    //     <NumStatistics style={{ width: '30%' }} user={t('number.teachers')}  chartType={<Column {...config2} height={400} />} />
    //     <NumStatistics style={{ width: '30%' }} user={t('number.class')}  chartType={<Area {...config3} height={400}/>}/>
    //     {test()}
    // </div>

