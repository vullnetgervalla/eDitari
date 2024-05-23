import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import { ScheduleTable } from 'components/tables/ScheduleTable';

export default function ListSchedules() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();
	const [students, setStudents] = useState([]);
    console.log(students);
	useEffect(() => {
		const getStudents = async () => {
			try {
				const res = await axios.get('/schedule')
				setStudents(res.data)
			}
			catch (error) {
				console.error(error)
			}
		}

		getStudents()
	}, []);
	return (<>
		<ScheduleTable
			data={students}
		/>
	</>
	);
}
