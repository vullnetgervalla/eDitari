import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import NotificationCard from '../cardNotification';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'antd';
import CreateNotification from 'pages/admin/createNotification';
import { useAuth } from 'hooks/useAuth';

const { Title } = Typography;

export default function Notifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [newNotificationVisibility, setNewNotificationVisibility] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const {auth} = useAuth();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axiosPrivate.get('/users/'+auth.userid);
      setUser(response.data);
      console.log(response.data);
    }catch (error) {
      console.error(error);
    }
  }
  const fetchNotificationsData = async () => {
    try {
      const response = await axiosPrivate.get('/notifications/');
      console.log(response.data);
      setNotifications(response.data);
      setNewNotification(false)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchNotificationsData(axiosPrivate, setNotifications);
    fetchUser();
    setNewNotification(false)
  }, [axiosPrivate, newNotification]);
  const createNotification = () => {
    setNewNotificationVisibility(true)
  }
  return (
    <>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Button style={{ position: 'absolute', right: 50, height: 'fit-content', width: 'fit-contetn', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px 30px', gap: '10px', borderRadius: '20px', zIndex: 1 }} onClick={createNotification}>
          <PlusCircleOutlined style={{ fontSize: '25px' }} />
          <Title level={4} style={{ margin: 0 }}>{t('create-notification')}</Title>
        </Button>
        <div gap={'40px'} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', width: '100%', marginTop: '100px' }}>
          {notifications?.map((notification, index) => (
            <NotificationCard key={index} date={notification.createdat} title={notification.title} description={notification.description} username={user?.firstname +' '+ user?.lastname} role={auth?.userType} />
          ))}
        </div>
      </div>
      {newNotificationVisibility && <CreateNotification open={newNotificationVisibility} setOpen={setNewNotificationVisibility} setNewNotification={setNewNotification}/>}
    </>
  );
}