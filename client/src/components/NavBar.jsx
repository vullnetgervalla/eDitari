import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLogout } from 'hooks/useLogout';

export function NavBar() {
    const navigate = useNavigate();
    const logout = useLogout();
    
    const handleLogout = async () => {
        await logout();
        navigate('/login')
    }

    return (
        <nav>
            <div className='flex gap-5 m-5 text-lg'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <NavLink className='ml-auto' to='/login' onClick={handleLogout}>Logout</NavLink>
            </div>
            <Outlet />
        </nav>
    )
}
