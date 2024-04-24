
import HomePage from 'pages/home';
import { ListAdmins, CreateAdmin, ListTeachers, CreateTeacher, ListStudents, CreateStudent, AdminAccount } from '../pages/admin';
import Users from 'pages/users/user';

export const AdminRoutes = [
  {
    path: '/',
    element: <HomePage />
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
    path: '/create-student',
    element: <CreateStudent />
  }
];