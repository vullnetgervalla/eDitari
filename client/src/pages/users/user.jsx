import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { useEffect } from "react"
import ListAdmins from "./listAdmins";
import ListTeachers from "./listTeachers";
import ListStudents from "./listStudents";
import { Spin } from 'antd';

export default function UsersPage(request){
    const [users, setUsers] = useState([]);
    const { user, userType } = useOutletContext();
    const axios = useAxiosPrivate()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try{
                const response = await axios.get("/users",{
                    signal: controller.signal,
                })
                isMounted && setUsers(response.data)
            }
            catch(error){
                console.error(error)
            }
        }

        getUsers()

        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [])

    const UsersPage = () => {
        switch (userType) {
            case "ADMIN":
                switch (request) {
                    case "ADMIN":
                        return <ListAdmins users={users} />;
                    case "TEACHER":
                        return <ListTeachers users={users} />;
                    case "STUDENT":
                        return <ListStudents users={users} />;
                    default:
                        return null;
                }
            case "TEACHER":
                return <ListStudents users={users} />;
            default:
                return null;
        }
    }

    return <UsersPage/>
}