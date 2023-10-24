const logger = require('./logger')
const lodash = require('lodash')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ?
    0 :
    blogs
      .map(blog => blog.likes)
      .reduce((sum, curr) => sum + curr)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  return blogs.find(blog => blog.likes === Math.max(...likes))
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const author = {
    name: lodash.maxBy(lodash.toPairs(authors), pair => pair[1])[0],
    blogs: lodash.maxBy(lodash.toPairs(authors), pair => pair[1])[1]
  }
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}