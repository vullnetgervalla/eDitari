import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { TeacherTable } from 'components/tables/TeacherTable';
import { Spin } from 'antd';

export default function ListTeachers() {
  const [teachers, setTeachers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
		const getTeachers = async () => {
			try {
				const res = await axiosPrivate.get('/users/teachers')
				setTeachers(res.data)
        setLoading(false)
			}
			catch (error) {
				console.error(error)
			}
		}
		getTeachers()
	}, [axiosPrivate]);
  if (loading) {
    return <Spin className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size='large' />;
  }
  return (
    <TeacherTable data={teachers} />
  );
}