import { useState, useEffect } from 'react';
import ShowData from '../../components/showData';
import axios from 'api/axios';

export default function ListStudents() {
	const [students, setStudents] = useState([]);
	useEffect(() => {
		axios
			.get('/admin/list-student')
			.then((response) => {
				setStudents(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<ShowData
			// data={students}
		/>
	);
}
