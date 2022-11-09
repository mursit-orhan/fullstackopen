const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)
  expect(titles).toContain('Go To Statement Considered Harmful')
})

test('verify existence of id property of a blog', async () => {
  const response = await api.get('/api/blogs')
  const aBlog = response.body[0]
  expect(aBlog.id).toBeDefined()
})
test.only('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log(response)
  const titles = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Canonical string reduction')
})

test('blog with missing likes has a value 0 for its likes property', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')

  const blog = response.body.find((r) => r.title === 'Type wars')

  expect(blog.likes).toBe(0)
})
test('blog with missing url get 400 bad request', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
}, 100000)

test('blog with missing title get 400 bad request', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('update a blog with title', async () => {
  let blogs = await (await api.get('/api/blogs')).body
  const id = blogs[0].id
  console.log('id', blogs[0])
  const blog = {
    title: 'A new title',
  }
  await api.put(`/api/blogs/${id}`).send(blog).expect(204)

  const response = await api.get('/api/blogs')

  const titles = response.body.map((r) => r.title)

  expect(titles).toContain('A new title')
})

test.only('delete a blog', async () => {
  let blogs = await (await api.get('/api/blogs')).body
  const id = blogs[0].id

  await api.delete(`/api/blogs/${id}`).expect(204)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length - 1)
})
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
