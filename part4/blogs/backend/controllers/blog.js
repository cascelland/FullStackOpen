const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  try {
    response.json(blogs)
  } catch(error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  let blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(error) {
    next(error)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

module.exports = blogRouter