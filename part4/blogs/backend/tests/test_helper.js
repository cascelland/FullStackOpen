const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const initialBlogs = listHelper.blogs

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}