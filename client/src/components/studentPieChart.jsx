import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const data = [
  { type: 'Klasa 1', value: 27 },
  { type: 'Klasa 2', value: 25 },
  { type: 'Klasa 3', value: 18 },
  { type: 'Klasa 4', value: 15 },
  { type: 'Klasa 5', value: 10 },
  { type: 'Klasa 6', value: 5 },
  { type: 'Klasa 7', value: 5 },
  { type: 'Klasa 8', value: 5 },
  { type: 'Klasa 9', value: 5 },
];
const StudentChart = () => {
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.5,
    label: {
      text: (d) => `${d.type}\n ${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default StudentChart;