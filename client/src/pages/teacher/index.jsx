import Navbar from '../../components/navbar';
import ShowData from '../../components/showData';

export default function TeacherPage(){

	return (
		<>
			<Navbar content={<ShowData userType={'TEACHER'} />} />
		</>
	);
}
