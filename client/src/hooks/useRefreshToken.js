import axios from 'api/axios';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

export const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

	const refresh = async () => {
		if (auth.accessToken && !isTokenExpired(auth.accessToken)) {
			return auth.accessToken;
		}
		try {
			const response = await axios.get('/auth/refresh-token', {
				withCredentials: true,
			});
			setAuth((prev) => ({
				...prev,
				accessToken: response.data.accessToken,
				user: response.data.user,
				userType: response.data.userType,
				schoolid: response.data.schoolid,
			}));
			return response.data.accessToken;
		} catch (error) {
            console.error('Failed to refresh token:', error);
            navigate("/login");
		}
	};

	return refresh;
};
