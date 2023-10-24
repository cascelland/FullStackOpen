const logger = require('./logger')

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

module.exports = {
  dummy,
  totalLikes
}