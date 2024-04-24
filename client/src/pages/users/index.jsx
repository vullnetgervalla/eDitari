import ListAdmins from './listAdmins';
import ListTeachers from './listTeachers';
import ListStudents from './listStudents';

export default function UsersPage(request) {
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
				return null;
		}
	};

	return <UsersPage />;
}
