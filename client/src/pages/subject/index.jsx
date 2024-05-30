import React from "react";
import { useAuth } from "hooks/useAuth";
import { StudentSubjectPage } from "./StudentSubjectPage";
import { TeacherSubjectPage } from "./TeacherSubjectPage";

function SubjectsPage() {
    const {auth} = useAuth()
    const { userType } = auth;

    const SubjectPage = () => {
        switch (userType) {
            case 'TEACHER':
                return <TeacherSubjectPage />
            case 'PARENT':
                return <StudentSubjectPage parent={true} />
            case 'STUDENT':
                return <StudentSubjectPage />
            default:
                return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large'/>
        }
    }

    return (
        <SubjectPage />
    )
} 

export default SubjectsPage;