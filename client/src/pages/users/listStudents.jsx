import { useState, useEffect } from 'react';
import ShowData from '../../components/showData';
import axios from 'axios';

export default function ListStudents() {
	const [students, setStudents] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/admin/list-student')
			.then((response) => {
				console.log('Response:', response.data);
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
