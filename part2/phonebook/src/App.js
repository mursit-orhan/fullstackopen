import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [infoMessage, setInfoMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((personNotes) => {
			setPersons(personNotes);
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
			const newPerson = { name: newName, number: newNumber };
			personService.create(newPerson).then((response) => {
				console.log(response);
				const people = persons.concat(newPerson);
				setPersons(people);
				setInfoMessage(`Added ${newPerson.name}`);
			});
		} else {
			if (
				window.confirm(
					`${person.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const newPerson = { ...person, number: newNumber };
				personService.update(newPerson.id, newPerson);
				person.number = newNumber;
				setPersons(people);
				setInfoMessage(`Number updated for ${newPerson.name}`);
			}
		}
		setNewName('');
		setNewNumber('');
		setTimeout(() => {
			setInfoMessage(null);
		}, 5000);
	};
	const handleDelete = (id) => {
		const person = persons.find((person) => person.id === id);
		if (person) {
			if (window.confirm(`Delete ${person.name} ?`)) {
				personService.del(id);
				const people = persons.filter((person) => person.id !== id);
				setPersons(people);
			}
		}
	};
	const people =
		filter.length > 0
			? persons.filter(({ name }) => name.includes(filter))
			: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={infoMessage} />
			<Filter value={filter} onChange={(event) => handleFilterChange(event)} />
			<PersonForm
				name={newName}
				number={newNumber}
				handleSubmit={(event) => addPerson(event)}
				handleChange={(event) => handleChange(event)}
			/>
			<h2>Numbers</h2>
			<Persons people={people} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
