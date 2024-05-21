import { Flex, Statistic, Card } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

export default function NumStatistics({ style, user, chartType, count }) {

    return (
        <div style={style}>
            <Card style={{border: '1.5px solid #e5e7eb', marginBottom:'40px'}}>
                <Statistic
                    title={user}
                    value={count}
                    prefix={<UserOutlined />}
                />
            </Card>
            {chartType}
        </div>
    );
}
