import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react";


export const NotFound = () => {
    const navigate = useNavigate()
    // This is to prevent useEffect from running twice on initial render,
    // this is done only on development mode because of strict mode
    const oneRef = useRef(true);
    useEffect(() => {
        if (oneRef.current) {
            setTimeout(() => {
                navigate(-1)
            }, 1000)
        }

        return () => {
            oneRef.current = false;
        }
    });

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto text-center">
                <h1 className="text-6xl font-bold">404</h1>
                <h2 className="text-2xl">Not Found</h2>
                <h3>Redirecting... </h3>
            </div>
        </div>
    )
}