import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { StudentTable } from 'components/tables/StudentTable';
import { useTranslation } from 'react-i18next';

export default function ListStudents() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();

	const [students, setStudents] = useState([]);
	console.log('students', students)

	useEffect(() => {
		const getStudents = async () => {
			try {
				const res = await axios.get('/users/students')
				setStudents(res.data)
			}
			catch (e) {
				console.log(e)
			}
		}

		getStudents()
	}, []);
	return (<>
		<div style={{marginBottom: '3rem', marginLeft: '2rem'}}><h1>{t('list-student')}</h1></div>
		<StudentTable
			data={students}
			side={false}
		/>
	</>
	);
}
