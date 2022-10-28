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

app.get('/info', (request, response) => {
	const content = `<div>Phonebook has info for ${
		persons.length
	} people</div><div>${new Date().toUTCString()}</div>`;
	response.send(content);
});
app.get('/api/persons', (request, response) => {
	const persons = [];
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});
app.post('/api/persons', (request, response) => {
	const body = request.body;

	const { name, number } = body;
	const error = {};
	if (!name || !number) {
		error.error = 'either name or number is missing!';
	}

	const person = new Person({
		name,
		number,
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	Person.findById(id).then((person) => {
		response.json(person);
	});
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
