import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages';
// import Login from './pages/login';
import Users from './pages/users';
import User from './pages/users/user';
import AdminPage from './pages/admin';
import './App.css';

function App() {

	return (
		<>
			{/* <nav style={{ display: 'flex', gap: '20px', fontSize: '1.5rem' }}>
				<Link to={'/'}>Home</Link>
				<Link to={'/login'}>Login</Link>
				<Link to={'/users'}>Users</Link>
			</nav> */}

			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/admin'
					element={<AdminPage />} />
				{/* <Route
					path='/login'
					element={<Login />}
				/> */}
				<Route
					path='/users'
					element={<Users />}
				/>
				<Route
					path='/users/:id'
					element={<User />}
				/>
			</Routes>
		</>
	);
}

export default App;
