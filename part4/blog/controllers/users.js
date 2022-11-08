const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username && username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username must be at least 3 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  await User.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
    context: 'query',
  })
  response.status(204).end()
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
