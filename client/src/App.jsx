import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages';
import AdminPage from './pages/admin';
import CreateAdmin from './pages/admin/createAdmin';
import './App.css';
import Navbar from './components/navbar';

function App() {
	// useEffect(() => {
	// deppendecy query lang from user
	// i18n.changeLanguage('al');
	// }, [query]);

	return (
		<>
			{/* <nav style={{ display: 'flex', gap: '20px', fontSize: '1.5rem' }}>
				<Link to={'/'}>Home</Link>
				<Link to={'/login'}>Login</Link>
				<Link to={'/users'}>Users</Link>
			</nav> */}

			<Navbar
				content={
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/admin'
							element={<AdminPage />}
						/>
						<Route
							path='/admin/create'
							element={<CreateAdmin />}
						/>
					</Routes>
				}
			/>
		</>
	);
}

export default App;
