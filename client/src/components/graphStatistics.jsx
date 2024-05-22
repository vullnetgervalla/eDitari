import { Flex, Statistic, Card } from 'antd';
import React from 'react';

export default function GraphStatistics({ style, user, chartType, count }) {

    return (
        <div style={style}>
            {chartType}
        </div>
    );
}
