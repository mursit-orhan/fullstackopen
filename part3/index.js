require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
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
app.use(express.static('build'));

let persons1 = [
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
	const persons = [];
	Person.find({}).then((result) => {
		result.forEach((person) => {
			persons.push(person);
		});

		response.json(persons);
	});
});
app.post('/api/persons', (request, response) => {
	const body = request.body;

	const { name, number } = body;
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
		newPerson.save().then((savedPerson) => {
			response.json(savedPerson);
		});
	}
});
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	Person.findById(id).then((person) => {
		response.json(person);
	});

	// if (person) {
	// 	response.json(person);
	// } else {
	// 	response.statusMessage = 'The record not found!';
	// 	response.status(404).end();
	// }
});
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((persons) => persons.id !== id);

	response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
