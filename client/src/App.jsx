import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import RequireAuth from 'components/auth/RequireAuth';
import PersistLogin from 'components/auth/PersistLogin';
import { Unauthorized } from 'components/auth/Unauthorized';
import NavBar from 'components/navbar';
import { useAuth } from 'hooks/useAuth';
import { NotFound } from 'components/auth/NotFound';
import './App.css';
import UsersPage from 'pages/users/index';
import { AdminRoutes } from './routes/adminRoutes';
import LanguageSwitcher from 'components/language/LanguageSwitcher';
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function App() {
	const { auth } = useAuth();
	const { userid , userType } = auth;
	const navigate = useNavigate();
	const profilePath = 
		userType === 'ADMIN' 
			? 'list-admin'
			: userType === 'TEACHER'
				? 'list-teacher'
				: userType === 'STUDENT' || userType === 'PARENT'
					? 'list-student'
					: null; 
	return (
		<>
			<div className="fixed top-4 right-4 z-50 flex gap-5">
				<LanguageSwitcher />
				{userid && <span
					onClick={() => navigate(profilePath ? `/${profilePath}/${userid}` : '/')} 
					style={{border: 'black solid 1px', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'white'}}>
					<UserOutlined />
				</span>}
			</div>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route path='/*' element={
							<NavBar userType={userType} content={
								<Routes>
									<Route index element={<Home />} />
									{AdminRoutes.map((route, i) => (
										<Route key={i} path={route.path} element={route.element} />
									))}
									<Route element={<RequireAuth allowedUserTypes={['ADMIN']} />}/>
									<Route path='unauthorized' element={<Unauthorized />} />
									<Route path='*' element={<NotFound />} />
								</Routes>
							} />
						} ></Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
