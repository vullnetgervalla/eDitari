import { useParams } from "react-router-dom"

export default function Users(){
    const { id } = useParams()
    
    return <>
        <h1>Profile for user {id}</h1>
    </>
}