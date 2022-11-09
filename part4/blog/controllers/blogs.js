const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes, userId } = request.body
  if (!title || !url) {
    response.status(400).end()
  } else {
    let user = null
    if (userId) {
      user = await User.findById(userId)
    } else {
      const users = await User.find({})
      for (const usr of users) {
        user = usr
        break
      }
    }
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
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
