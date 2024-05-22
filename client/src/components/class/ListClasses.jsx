import { useState, useEffect } from 'react';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import { ClassTable } from 'components/tables/ClassTable';

export default function ListClasses() {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();

	const [classes, setclasses] = useState([]);
	console.log('classes', classes)

	useEffect(() => {
		const getclasses = async () => {
			try {
				const res = await axios.get('/classes')
				setclasses(res.data)
			}
			catch (e) {
				console.log(e)
			}

			
		}

		getclasses()
	}, []);
	return (<>
		<div style={{marginBottom: '3rem', marginLeft: '2rem'}}><h1>{t('list-class')}</h1></div>
		<ClassTable
			data={classes}
		/>
	</>
	);
}