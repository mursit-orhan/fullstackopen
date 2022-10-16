import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
	const sum = course.parts.reduce(
		(a, b) => ({ exercises: a.exercises + b.exercises }),
		{
			exercises: 0,
		}
	);
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />

			<Total sum={sum.exercises} />
		</>
	);
};
export default Course;
