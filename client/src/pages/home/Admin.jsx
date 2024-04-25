
import ActiveUsers from 'components/activeUsers';
import StudentChart from 'components/studentPieChart';
// import StudentChart1 from 'components/studentPieChart1';
import UserStats from 'components/userStats';
import React from 'react';
import { Link } from 'react-router-dom';

export function AdminPage() {

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* <h1 className="underline">Hello Admin!</h1>
            <h2>Navigate to these pages</h2>
            <nav style={{display: 'flex', gap: '20px', fontSize: '1.5rem'}}>
                <Link to={'/'}>Home</Link>
                <Link to={'/users'}>Users</Link>
            </nav> */}
        <ActiveUsers />
        <UserStats />
        <StudentChart />
        {/* <StudentChart1 /> */}
    </div>
}
