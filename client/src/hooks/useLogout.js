import axios from "api/axios";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem('loggedIn');
        try{
            const response = await axios.get("/auth/logout", {
                withCredentials: true,
            });
        }
        catch(error){
            console.error(error);
        }
    }

    return logout;
}
