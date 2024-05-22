
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
import CreateNotification from 'pages/admin/createNotification';
import SeeNotifications from 'components/seeNotifications';
import CreateMaterials from 'components/createMaterials';
import ListClasses from 'components/class/ListClasses';
import CreateClass from 'components/class/CreateClass';
import SeeMaterials from 'components/seeMaterials';

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
    path: 'list-admin/:id',
    element: <UserProfile />
  },
  {
    path: 'list-teacher/:id',
    element: <UserProfile />
  },
  {
    path: 'list-student/:id',
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
  },
  {
    path: 'create-notification',
    element: <CreateNotification />
  },
  {
    path: 'notifications',
    element: <SeeNotifications />
  },
  {
    path: 'list-material',
    element: <SeeMaterials />
  },
  {
    path: 'add-material',
    element: <CreateMaterials />
  },
  {
    path: 'list-class',
    element: <ListClasses />
  },
  {
    path: 'create-class',
    element: <CreateClass />
  }
];