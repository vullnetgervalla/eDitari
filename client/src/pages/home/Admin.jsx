import React from 'react';
import { Link } from 'react-router-dom';

export function AdminPage() {

    return <>
            <h1 className="underline">Hello Admin!</h1>
            <h2>Navigate to these pages</h2>
            <nav style={{display: 'flex', gap: '20px', fontSize: '1.5rem'}}>
                <Link to={'/'}>Home</Link>
                <Link to={'/users'}>Users</Link>
            </nav>
    </>
}
