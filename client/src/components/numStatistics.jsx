import { Flex, Statistic, Card } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

export default function NumStatistics({style, user, chartType, count}) {

    return ( 
    <div style={style}>
        <Card>
        <Statistic
            title={user}
            value={count} />
        </Card>
       {chartType}
    </div> 
    );
}
