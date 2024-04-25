import ShowData from '../../components/showData';
import axios from 'axios';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function ListAdmins() {
	const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		let isMounted = true;
		const source = axiosPrivate.CancelToken.source();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/users/admin', {
					cancelToken: source.token,
				});
        isMounted && setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error(error);
        }
			}
		};
    
		getUsers();
    
		return () => {
			isMounted = false;
			source.cancel();
		};
  }, []);

  if (loading) {
    return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;git 
  }

	return (
      <ShowData userType={"ADMIN"} data={users} />
	);
}
