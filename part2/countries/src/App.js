import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Countries from './components/Countries';

const App = () => {
	const [countries, setCountries] = useState([]);

	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleFilterChange = (event) => {
		const { value } = event.target;
		setFilter(value);
	};

	const result = countries.filter(({ name }) =>
		name.common.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div>
			<Filter value={filter} onChange={(event) => handleFilterChange(event)} />
			{result.length > 10 ? (
				'Too many matches, specify another filter'
			) : (
				<Countries countries={result} />
			)}
		</div>
	);
};

export default App;
