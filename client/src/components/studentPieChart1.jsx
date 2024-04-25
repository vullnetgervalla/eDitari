import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const data = [
  { type: 'Klasa 10', value: 27 },
  { type: 'Klasa 11', value: 25 },
  { type: 'Klasa 12', value: 38 },
];
const StudentChart1 = () => {
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

export default StudentChart1;