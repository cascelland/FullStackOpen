const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  try {
    response.json(blogs)
  } catch(error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const user = await User.findById('653bfda21e2d7c551b141e7f')
  let body = request.body

  let blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter