
import ActiveUsers from 'components/activeUsers';
import StudentChart from 'components/studentPieChart';
// import StudentChart1 from 'components/studentPieChart1';
import UserStats from 'components/userStats';
import React from 'react';
import { Link } from 'react-router-dom';

export function AdminPage() {

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <ActiveUsers />
        <UserStats />
        <StudentChart />
    </div>
}
