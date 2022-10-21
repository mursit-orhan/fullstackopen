import Part from './Part';

const Content = ({ parts }) => {
	const result = parts.map((part) => <Part part={part} key={part.id} />);
	return <>{result}</>;
};

export default Content;
