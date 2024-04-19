import { useParams } from "react-router-dom"

export default function Users(){
    const { id } = useParams()
    
    return <>
        <h1>User {id}</h1>
    </>
}