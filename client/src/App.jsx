import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import Users from 'pages/users';
import User from 'pages/users/user';
import RequireAuth from 'components/auth/RequireAuth';
import PersistLogin from 'components/auth/PersistLogin';
import { Unauthorized } from 'components/auth/Unauthorized';
import NavBar from 'components/navbar';
import { useAuth } from 'hooks/useAuth';
import { NotFound } from 'components/NotFound';
import './App.css';

function App() {
	const { auth } = useAuth();
	const { user, userType } = auth;

	return (
		<>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route element={<PersistLogin />}>
					<Route
						path='/*'
						element={
							<NavBar
								userType={userType}
								content={
									<Routes>
										<Route element={<RequireAuth />}>
											<Route
												index
												element={
													<Home
														user={user}
														userType={userType}
													/>
												}
											/>
											{AdminRoutes.map((route, i) => (
												<Route
													key={i}
													path={route.path}
													element={route.element}
												/>
											))}
										</Route>
									</Routes>
								}
							/>
						}
					>
						<Route element={<RequireAuth allowedUserTypes={['ADMIN']} />}>
							<Route
								path='users'
								element={<UsersPage />}
							/>
						</Route>
						<Route
							path='unauthorized'
							element={<Unauthorized />}
						/>
					</Route>
				</Route>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</>
	);
}

export default App;
