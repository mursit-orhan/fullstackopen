import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleFilterChange = (event) => {
		const { value } = event.target;
		setFilter(value);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		if (name === 'name') {
			setNewName(value);
		}
		if (name === 'number') {
			setNewNumber(value);
		}
	};
	const addPerson = (event) => {
		event.preventDefault();
		const person = persons.find(({ name }) => name === newName);
		if (!person) {
			const people = persons.concat({ name: newName, number: newNumber });
			setPersons(people);
		} else {
			const msg = `${newName} is already added to phonebook`;
			alert(msg);
		}
		setNewName('');
	};

	const people =
		filter.length > 0
			? persons.filter(({ name }) => name.includes(filter))
			: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} onChange={(event) => handleFilterChange(event)} />
			<PersonForm
				name={newName}
				number={newNumber}
				handleSubmit={(event) => addPerson(event)}
				handleChange={(event) => handleChange(event)}
			/>
			<h2>Numbers</h2>
			<Persons people={people} />
		</div>
	);
};

export default App;
