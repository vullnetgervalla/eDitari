import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import NotificationCard from '../cardNotification';
import { useTranslation } from 'react-i18next';


export default function Notifications() {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const fetchNotificationsData = async () => {
        try {
            const response = await axiosPrivate.get('/notifications/');
            setNotifications(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchNotificationsData(axiosPrivate, setNotifications);
    }, [axiosPrivate]);
    return (
        <div gap={'40px'} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', width: '100%', marginTop: '100px' }}>
            {notifications?.map((notification, index) => (
                <NotificationCard key={index} date={notification.createdat} title={notification.title} description={notification.description} username={notification.username} role={notification.role} />
            ))}
        </div>
    );
}