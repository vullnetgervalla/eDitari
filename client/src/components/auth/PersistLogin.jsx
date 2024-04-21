import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "hooks/useRefreshToken";
import { useAuth } from "hooks/useAuth";
import { Spin } from 'antd'

function PersistLogin() {
    const { auth, persist } = useAuth();
    const refresh  = useRefreshToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try { 
                await refresh();
            }
            catch(error){
                console.error(error);
            }
            finally{
                isMounted && setLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setLoading(false);
    
        return () => {isMounted = false};
    }, [])
    
    return (
        <>
            {!persist
                ? <Outlet />
                : loading 
                    ? <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large'/>
                    : <Outlet />}
        </>
    )
}

export default PersistLogin;