
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Flex, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import moment from 'moment';

const { Text, Title } = Typography;

export default function NotificationCard(props) {
    const { t } = useTranslation();
    const { date, title, description, username, role } = props;
    return (
        <Card style={{ width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '20px' }}>
            <div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Title level={3} >{title}</Title>
                    <Title level={5} style={{ marginLeft: 'auto'}}>{t(role)}</Title>
                </div>
            </div>
            <Title level={4} style={{ color: '#4b5563', marginTop: 0}}>{description}</Title>
            <hr style={{ margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 'fit-content', height: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', border: '1px solid black', padding: '15px' }}>
                        <UserOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <Title level={4} style={{ textAlign: 'center', margin: 0 }}>@{username}</Title>
                </div>
                <div style={{ width: 'fit-content', height: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                    <CalendarOutlined style={{ fontSize: '30px', color: 'gray' }} />
                    <Title level={5} style={{ color: 'gray', textAlign: 'right', margin: 0 }}>{moment(date).format('DD MMM YYYY')}</Title>
                </div>
            </div>
        </Card>
    )
}