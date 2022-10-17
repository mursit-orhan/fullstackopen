import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

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
			<form onSubmit={addPerson}>
				<div>
					filter shown with:{' '}
					<input filter="name" value={filter} onChange={handleFilterChange} />
				</div>
				<h2>add a new</h2>
				<div>
					name: <input name="name" value={newName} onChange={handleChange} />
				</div>
				<div>
					number:
					<input name="number" value={newNumber} onChange={handleChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{people.map(({ id, name, number }) => (
				<div key={id}>
					{name} {number}
				</div>
			))}
		</div>
	);
};

export default App;
