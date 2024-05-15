import { Flex, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

export default function NumStatistics({style, user, chartType}) {
    const { t } = useTranslation();
  
    return ( 
    <div style={style}>
        <Statistic
            title={user}
            value={112893}
        />
       {chartType}
    </div> 
    );
}
