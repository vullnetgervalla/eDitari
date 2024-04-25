import ListAdmins from './listAdmins';
import ListTeachers from './listTeachers';
import ListStudents from './listStudents';
import { useNavigate } from 'react-router-dom';

export default function UsersPage(request) {
    const navigate = useNavigate();

	const UsersPage = () => {
		switch (userType) {
			case 'ADMIN':
				switch (request) {
					case 'ADMIN':
						return <ListAdmins />;
					case 'TEACHER':
						return <ListTeachers />;
					case 'STUDENT':
						return <ListStudents />;
					default:
						return null;
				}
			case 'TEACHER':
				return <ListStudents />;
			default:
				navigate('/unauthorized', { replace: true });
		}
	};

	return <UsersPage />;
}
