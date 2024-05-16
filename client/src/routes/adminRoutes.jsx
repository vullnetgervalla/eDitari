
import HomePage from 'pages/home';
import CreateAdmin from 'pages/admin/createAdmin';
import CreateStudent from 'pages/admin/createStudent';
import CreateTeacher from 'pages/admin/createTeacher';
import CreateRole from 'components/createRole';
import ListStudents from 'pages/users/listStudents';
import ListTeachers from 'pages/users/listTeachers';
import ListAdmins from 'pages/users/listAdmins';
import ListRoles from 'pages/users/listRoles';
import UserProfile from 'components/userProfile';

export const AdminRoutes = [
  {
    path: '/',
    element: <HomePage />
  }, {
    path: 'list-admin',
    element: <ListAdmins />
  },
  {
    path: 'create-admin',
    element: <CreateAdmin />
  },
  {
    path: 'list-admin/:username',
    element: <UserProfile />
  },
  {
    path: 'list-teacher/:username',
    element: <UserProfile />
  },
  {
    path: 'list-student/:username',
    element: <UserProfile />
  },
  {
    path: 'list-teacher',
    element: <ListTeachers />
  },
  {
    path: 'create-teacher',
    element: <CreateTeacher />
  },
  {
    path: 'list-student',
    element: <ListStudents />
  },
  {
    path: 'create-student',
    element: <CreateStudent />
  },
  {
    path: 'list-role',
    element: <ListRoles />
  },
  {
    path: 'create-role',
    element: <CreateRole />
  }
];