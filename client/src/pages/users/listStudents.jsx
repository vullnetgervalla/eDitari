import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { StudentTable } from 'components/tables/listStudents';
import { useTranslation } from 'react-i18next';

export default function ListStudents() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();

	const [students, setStudents] = useState([]);
	const [parents, setParents] = useState([]);
	const [classes, setClasses] = useState([]);
	console.log('parents', parents)
	console.log('classes', classes)
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
		const getParents = async () => {
			const res = await axios.get('/users/parents');
			setParents(res.data);
		};

		const getClasses = async () => {
			const res = await axios.get('/classes');
			setClasses(res.data);
		};

		getParents();
		getClasses();
		getStudents()
	}, []);
	return (<>
		<div style={{marginBottom: '3rem', marginLeft: '2rem'}}><h1>{t('list-student')}</h1></div>
		<StudentTable
			data={students}
			side={false}
			parents={parents}
			classes={classes}
		/>
	</>
	);
}
