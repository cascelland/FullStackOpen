const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const initialBlogs = listHelper.blogs

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}