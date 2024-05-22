import { Flex, Statistic, Card, List, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import NotificationCard from './cardNotification';


export default function SeeNotifications() {
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
  },[]);
  return ( 
  
    <Flex gap={'40px'}>
      {notifications?.map((notification, index) => (
        <NotificationCard key={index} date={notification.createdat} title={notification.title} description={notification.description} />
      ))}
  </Flex>
  );
}