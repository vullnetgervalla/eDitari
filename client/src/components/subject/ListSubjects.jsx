import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import { SubjectsTable } from 'components/tables/SubjectsTable';

export default function ListSubjects() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();

	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		const getSubjects = async () => {
			try {
				const res = await axios.get('/subjects/teacherSubjects')
				setSubjects(res.data)
			}
			catch (e) {
				console.log(e)
			}
		}

		getSubjects()
	}, []);
	return (<>
		<SubjectsTable
			data={subjects}
		/>
	</>
	);
}