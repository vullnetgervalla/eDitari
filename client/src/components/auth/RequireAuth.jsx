import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const RequireAuth = (props) => {
    const { auth } = useAuth();
    const {userid, userType} = auth;
    const {allowedUserTypes} = props;
    const location = useLocation();

    return (
        userid
            ? allowedUserTypes
                ? userType && allowedUserTypes?.includes(userType)
                    ? <Outlet context={{user: userid, userType: userType}}/>
                    : <Navigate to={'/unauthorized'} state={{ from: location.pathname }} replace />  
                : <Outlet context={{user: userid, userType: userType}}/>
            : <Navigate to={'/login'} state={{ from: location.pathname }} replace />
    );
}

export default RequireAuth;