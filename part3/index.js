const express = require('express');
const app = express();
app.use(express.json());

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/info', (request, response) => {
	const content = `<div>Phonebook has info for ${
		persons.length
	} people</div><div>${new Date().toUTCString()}</div>`;
	response.send(content);
});
app.get('/api/persons', (request, response) => {
	response.json(persons);
});
app.post('/api/persons', (request, response) => {
	const person = request.body;
	const id = Math.floor(Math.random() * 100000000);
	person.id = id;
	console.log(person);
	persons = persons.concat(person);
	response.json(person);
});
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.statusMessage = 'The record not found!';
		response.status(404).end();
	}
});
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((persons) => persons.id !== id);

	response.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
