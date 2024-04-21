import { useAxiosPrivate } from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react"

export default function UsersPage(){
    const [users, setUsers] = useState([]);
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

    return <>
        <h1>Users Page</h1>
        <h2>All Users:</h2>
        {users?.length && <ul>{users.map(user => 
            <li key={user.id}>{user.id} - {user.username} - {user.email} - {user.type}</li>
        )}</ul>}
    </>
}