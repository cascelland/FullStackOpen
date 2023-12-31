const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)



beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await api
    .post('/api/users')
    .send({
      username: 'testUser',
      password: 'testPassword'
    })
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const result = await User.findOne({ username: 'testUser' })

  for (let blog of await helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject['user'] = result.id
    await blogObject.save()
  }
})

const getToken = async () => {
  const response = await api
    .post('/api/login')
    .send({
      username: 'testUser',
      password: 'testPassword'
    })

  return response.body.token

}

test('blogs are in the json format', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are in the correct amount', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog ids are defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('blog is created', async () => {
  const result = User.findOne({ username: 'testUser' })

  const newBlog = {
    title: 'My name is',
    author: 'Giovanni Giorgio',
    url: 'lol',
    likes: 7,
    user: result.id
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${await getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).toContain(
    'Giovanni Giorgio'
  )
})

test('undefined likes are set to 0', async () => {
  const result = User.findOne({ username: 'testUser' })

  const newBlog = {
    title: 'My name is',
    author: 'Giovanni Giorgio',
    url: 'lol',
    user: result.id
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${await getToken()}`)
    .send(newBlog)

  expect(response.body.likes).toBe(0)
})

test('undefined title or url return 400', async () => {
  const newBlog = {
    author: 'Giovanni Giorgio',
    likes: 300
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${await getToken()}`)
    .send(newBlog)
    .expect(400)
})

test('no token returns 401', async () => {
  const newBlog = {
    title: 'My name is',
    author: 'Giovanni Giorgio',
    url: 'lol'
  }

  await api.post('/api/blogs')
    //.set('Authorization', `Bearer ${await getToken()}`)
    .send(newBlog)
    .expect(401)
})

describe('deletion of a blog entry', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${await getToken()}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const ids = blogsAtEnd.map(r => r.id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('update of a blog entry', () => {
  test('succeeds if only updating a parameter', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = { likes: 38 }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${await getToken()}`)
      .send(updatedLikes)
      .expect(200)

    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs[0].likes).toBe(38)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})