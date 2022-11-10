const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}
const tokenExtractor = (request, response, next) => {
  const authorization =
    request.get('authorization') || request.get('Authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}
const userExtractor = async (request, response, next) => {
  const token = request.token
  console.log('toke', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('token', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  requestLogger,
  userExtractor,
}
