import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { TeacherTable } from 'components/tables/TeacherTable';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

export default function ListTeachers() {
  const [teachers, setTeachers] = useState([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
		const getTeachers = async () => {
			try {
				const res = await axios.get('/users/teachers')
				setTeachers(res.data)
			}
			catch (e) {
				console.log(e)
			}
		}

		getTeachers()
	}, []);

  return (
    <TeacherTable data={teachers} />
  );
}