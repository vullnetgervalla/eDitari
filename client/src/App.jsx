import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import RequireAuth from 'components/auth/RequireAuth';
import PersistLogin from 'components/auth/PersistLogin';
import { Unauthorized } from 'components/auth/Unauthorized';
import NavBar from 'components/navbar';
import { useAuth } from 'hooks/useAuth';
import { NotFound } from 'components/NotFound';
import './App.css';
import UsersPage from 'pages/users/index';
import { AdminRoutes } from './routes/adminRoutes';

function App() {
	const { auth } = useAuth();
	const { user, userType } = auth;
	return (
		<>
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
