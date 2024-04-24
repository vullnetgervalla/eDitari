import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from 'pages/home'
import Login from 'pages/login'
import Users from 'pages/users' 
import User from 'pages/users/user'
import RequireAuth from 'components/auth/RequireAuth'
import PersistLogin from 'components/auth/PersistLogin'
import { Unauthorized } from 'components/auth/Unauthorized'
import { NavBar } from 'components/NavBar'
import { useAuth } from 'hooks/useAuth'
import { NotFound } from 'components/NotFound'
import './App.css'

function App() {
    const { auth } = useAuth();
    const { user, userType } = auth;

    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route element={<PersistLogin />} >
                    <Route element={<NavBar />}>
                        <Route element={<RequireAuth />} >
                            <Route path='/' element={<Home user={user} userType={userType}/>} />
                            <Route path='/users/:id' element={<User />} />
                        </Route>
                        <Route element={<RequireAuth allowedUserTypes={['ADMIN']}/>} >
                            <Route path='/users' element={<Users />} />
                        </Route>
                        <Route path='/unauthorized' element={<Unauthorized />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App;
