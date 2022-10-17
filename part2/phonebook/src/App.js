import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleChange = (event) => {
		const { value } = event.target;
		setNewName(value);
	};
	const addPerson = (event) => {
		event.preventDefault();
		const people = persons.concat({ name: newName });
		setPersons(people);
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
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(({ name }) => (
				<div key={name}>{name}</div>
			))}
		</div>
	);
};

export default App;
