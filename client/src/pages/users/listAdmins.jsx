import ShowData from '../../components/showData';
import axios from 'axios';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function ListAdmins() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let isMounted = true;
        const source = axiosPrivate.CancelToken.source();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users/roles?role=ADMIN', {
                    cancelToken: source.token,
                });
                isMounted && setAdmins(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request:', error.message);
                } else {
                    console.error(error);
                }
            }
        };
        getUsers();
    }, []);
    if (loading) {
        return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
    }
    return (
        <ShowData userType={"ADMIN"} data={admins} />
    );
}
