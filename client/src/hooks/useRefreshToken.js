import axios from "api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/auth/refresh-token", {
            withCredentials: true,
        });

        setAuth(prev => ({
            ...prev,
            accessToken: response.data.accessToken,
        }));

        return response.data.accessToken;
    }

    return refresh;
}