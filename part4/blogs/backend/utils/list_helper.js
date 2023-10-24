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
  const mostBlogs = lodash.maxBy(lodash.toPairs(authors), pair => pair[1])

  return { author: mostBlogs[0], blogs: mostBlogs[1] }
}

const mostLiked = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const authorsByLike = lodash.mapValues(authors, numbers => lodash.sumBy(numbers, 'likes'))
  const mostLiked = lodash.maxBy(lodash.toPairs(authorsByLike), pair => pair[1])

  return { author: mostLiked[0], likes: mostLiked[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked
}