import { useAuth } from 'hooks/useAuth';
import SeeNotifications from './seeNotifications'
import Notifications from './notifications'

export default function NoificationsPage() {
    const { auth } = useAuth();
	const { userType } = auth;
    const NoificationsPage = () => {
        if (userType === 'STUDENT') {
            return <SeeNotifications />
        } else {
            return <Notifications />
        }
    }

    return (
        <NoificationsPage />
    )
}