import { Statistic, Card } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

export default function NumStatistics({ style, user, count }) {
    return (
        <div style={style}>
            <Card style={{...style, border: '2px solid #e5e7eb', cursor:'pointer'}} >
                <Statistic
                    title={<span style={{color: 'black'}}>{user}</span>}
                    value={count}
                    prefix={<UserOutlined />}
                />
            </Card>
        </div>
    );
}