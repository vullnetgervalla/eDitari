
import HomePage from 'pages/home';
import CreateAdmin from 'pages/admin/createAdmin';
import CreateStudent from 'pages/admin/createStudent';
import CreateTeacher from 'pages/admin/createTeacher';
import CreateRole from 'components/createRole';
import ListStudents from 'pages/users/listStudents';
import ListTeachers from 'pages/users/listTeachers';
import ListAdmins from 'pages/users/listAdmins';
import UserProfile from 'components/userProfile';
import CreateMaterials from 'components/createMaterials';
import ListClasses from 'components/class/ListClasses';
import CreateClass from 'components/class/CreateClass';
import CreateSubject from 'components/subject/CreateSubjectForm';
import ListSubjects from 'components/subject/ListSubjects';
import CreateSchedule from 'components/schedule/CreateSchedule';
import ListSchedules from 'pages/users/listSchedule';
import SubjectsPage from 'pages/subject';
import { Subject } from 'pages/subject/Subject';
import { NotFound } from 'components/auth/NotFound';
import { Unauthorized } from 'components/auth/Unauthorized';
import { Lecture } from 'pages/teacher/Lecture';
import Transcript from 'components/student/transcript';
import NoificationsPage from 'components/notifications/index'
import StudentSubjectInfo from 'pages/subject/studentSubjectInfo'

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
    path: 'role',
    element: <CreateRole />
  },
  {
    path: 'notification',
    element: <NoificationsPage/>
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
  },
  {
    path: 'create-subject',
    element: <CreateSubject />
  },
  {
    path: 'list-subject',
    element: <ListSubjects />
  },
  {
    path: 'list-schedule',
    element: <ListSchedules />
  },
  {
    path: 'create-schedule',
    element: <CreateSchedule />
  },
  {
    path: 'subject',
    element: <SubjectsPage />
  },
  {
    path: 'subject/:id',
    element: <Subject />
  },
  {
    path: 'subject-info/:id',
    element: <StudentSubjectInfo/>
  },
  {
    path: '404',
    element: <NotFound />
  },
  {
    path: 'unauthorized',
    element: <Unauthorized />
  },
  {
    path: 'class',
    element: <Lecture />
  },
  {
    path: 'transcript',
    element: <Transcript/>
  }
];