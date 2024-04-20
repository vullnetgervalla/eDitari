import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages';
import ListAdmins from './pages/admin/listAdmins';
import CreateAdmin from './pages/admin/createAdmin';
import Navbar from './components/navbar';
import AdminPage from './pages/admin';
import CreateTeacher from './pages/admin/createTeacher';

function App() {

	// useEffect(() => {
	// deppendecy query lang from user
	// i18n.changeLanguage('al');
	// }, [query]);

	return (
		<>
			<Navbar
				content={
					<Routes>
						<Route
							path='/admin'
							element={<AdminPage />}
						/>
						<Route
							path='/admin/list-admin'
							element={<ListAdmins />}
						/>
						<Route
							path='/admin/create-admin'
							element={<CreateAdmin />}
						/>
						<Route
							path='/admin/create-teacher'
							element={<CreateTeacher />}/>
					</Routes>
				}
			/>
		</>
	);
}

export default App;
