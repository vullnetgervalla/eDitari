export default function Schedule() {
    const HomePage = () => {
        switch (userType) {
            case 'TEACHER':
                return <TeacherSchedule />
            case 'PARENT':
                return < />
            case 'STUDENT':
                return <StudentPage />
            default:
                return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large'/>
        }
    }
    return(
        <div>
            <h1>Schedule</h1>
        </div>
    )
}