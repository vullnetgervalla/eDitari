
import HomePage from 'pages/home';
import CreateAdmin from 'pages/admin/createAdmin';
import CreateStudent from 'pages/admin/createStudent';
import CreateTeacher from 'pages/admin/createTeacher';
import ListStudents from 'pages/users/listStudents';
import ListTeachers from 'pages/users/listTeachers';
import ListAdmins from 'pages/users/listAdmins';
import Users from 'pages/users';
import CreateRole from 'components/createRole';
import CreateNotification from 'pages/admin/createNotification';
import SeeNotifications from 'components/seeNotifications';

export const AdminRoutes = [
  {
    path: '/',
    element: <HomePage />
  }, {
    path: 'list-admin',
    element: <ListAdmins />
  },
  {
    path: 'users/:id',
    element: <Users />
  },
  {
    path: 'create-admin',
    element: <CreateAdmin />
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
    path: 'create-role',
    element: <CreateRole />
  },
  {
    path: 'create-notification',
    element: <CreateNotification />
  },
  {
    path: 'notifications',
    element: <SeeNotifications />
  }
];