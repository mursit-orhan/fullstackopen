const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('post', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})
app.use(morgan(':method :url :status :response-time :post'))
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const content = `<div>Phonebook has info for ${
      persons.length
    } people</div><div>${new Date().toUTCString()}</div>`
    response.send(content)
  })
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const { name, number } = body
  const error = {}
  if (!name || !number) {
    error.error = 'either name or number is missing!'
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})
app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const { id, number } = body
  const person = { number }

  Person.findByIdAndUpdate(id, person, {
    runValidators: true,
    context: 'query',
  })
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
