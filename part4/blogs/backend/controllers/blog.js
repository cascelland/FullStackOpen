const blogRouter = require('express').Router()

const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  try {
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (blog.user.toString() !== user.id.toString()) {
    response.status(401).json({
      error: 'user invalid'
    })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  const originalBlog = await Blog.findById(request.params.id)

  const user = request.user

  if (originalBlog.user.toString() !== user.id.toString()) {
    response.status(401).json({
      error: 'user invalid'
    })
  }

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user.id
  }

  try {
    const updatedBlog = await Blog.updateOne(originalBlog, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter