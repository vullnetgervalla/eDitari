import { Flex, Statistic, Card, List } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from './cardNotification';

export default function SeeNotifications() {

  const date = "2022-01-01";
  const title = "Notification Title";
  const description = "Notification Description dasdasdas afdsdasdasd asdasdasdasda sdasdasdasd asdasdasd ad asdasdasd asdas";
  return ( 
  
    <Flex gap={'40px'}>
      <NotificationCard date={date} title={title} description={description} />
  </Flex>
  );
}