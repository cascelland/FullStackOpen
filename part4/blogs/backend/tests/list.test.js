const initialBlogs = require('./test_helper').initialBlogs
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {

  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {


  const listWithOneBlog = [initialBlogs[0]]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('is the one with most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    expect(result).toEqual(listHelper.initialBlogs[2])
  })
})

describe('most popular author', () => {

  const mostBlogs = { author: 'Robert C. Martin', blogs: 3 }
  const mostLiked = { author: 'Edsger W. Dijkstra', likes: 17 }

  test('is the one with most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual(mostBlogs)
  })

  test('is the one with most likes', () => {
    const result = listHelper.mostLiked(initialBlogs)
    expect(result).toEqual(mostLiked)
  })
})