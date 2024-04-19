import { useParams } from "react-router-dom"

export default function Users(){
    const { id } = useParams()
    
    return <>
        <h1 className="text-3xl font-bold">User {id}</h1>
    </>
}