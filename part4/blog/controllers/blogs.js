const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body
  console.log(request.body)
  if (!title || !url) {
    response.status(400).end()
  } else {
    const newBlog = { ...request.body }
    if (!likes) {
      newBlog.likes = 0
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

module.exports = blogsRouter
