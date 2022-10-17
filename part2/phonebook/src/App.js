import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
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
			{persons.map(({ name, number }) => (
				<div key={name}>
					{name} {number}
				</div>
			))}
		</div>
	);
};

export default App;
