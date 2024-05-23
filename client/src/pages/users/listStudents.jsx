import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { StudentTable } from 'components/tables/StudentTable';
import { useTranslation } from 'react-i18next';

export default function ListStudents() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();
	const [students, setStudents] = useState([]);

	useEffect(() => {
		const getStudents = async () => {
			try {
				const res = await axios.get('/users/students')
				setStudents(res.data)
			}
			catch (error) {
				console.error(error)
			}
		}

		getStudents()
	}, []);
	return (<>
		<StudentTable
			data={students}
			side={false}
		/>
	</>
	);
}
