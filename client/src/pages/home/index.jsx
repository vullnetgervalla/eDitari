import { useOutletContext } from 'react-router-dom';
import { AdminPage } from 'pages/home/Admin'
import { TeacherPage } from 'pages/home/Teacher'
import { ParentPage } from 'pages/home/Parent'
import { StudentPage } from 'pages/home/Student'
import { Spin } from 'antd'

export default function HomePage(props) {

    const { user, userType } = useOutletContext();

    const HomePage = () => {
        switch (userType) {
            case 'ADMIN':
                return <AdminPage />
            case 'TEACHER':
                return <TeacherPage />
            case 'PARENT':
                return <ParentPage />
            case 'STUDENT':
                // return <StudentPage />
                return <StudentPage />
            default:
                return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large'/>
        }
    }

    return (
        <HomePage />
    )
}