const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const { title, url, likes } = request.body
  if (!title || !url) {
    response.status(400).end()
  } else {
    const newBlog = { title, url, likes: likes || 0, user: user._id }

    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  await Blog.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
    context: 'query',
  })
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user.id).populate('blogs')

  const filteredBlog = user.blogs.filter(
    (blog) => blog._id.toString() !== request.params.id.toString()
  )

  //the user do not have ownership of this blog
  if (user.blogs.length === filteredBlog.length) {
    return response.status(401).json({ error: 'unauthorised operation' })
  }
  user.blogs = filteredBlog
  await Blog.findByIdAndRemove(request.params.id)
  user.save()
  response.status(204).end()
})

module.exports = blogsRouter
