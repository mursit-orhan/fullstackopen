const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('post', function (req, res) {
	if (req.method === 'POST') {
		return JSON.stringify(req.body);
	}
	return '';
});
app.use(morgan(':method :url :status :response-time :post'));
app.use(cors());
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
	const newPerson = request.body;
	const id = Math.floor(Math.random() * 100000000);
	newPerson.id = id;
	const { name, number } = newPerson;
	const error = {};
	if (!name || !number) {
		error.error = 'either name or number is absent!';
	}
	const person = persons.find((person) => person.name === name);
	if (person) {
		error.error = 'name must be unique';
	}
	if (error.error) {
		response.status(400).json(error);
	} else {
		persons = persons.concat(newPerson);
		response.json(person);
	}
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
