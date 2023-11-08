import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

let blog = {}

beforeAll(async () => {
  blog = {
    title: 'Test blog',
    author: 'Test Author',
    likes: 33,
    url: 'test.url'
  }
})

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    container = render(
      <Blog blog={blog} handleDelete={handleDelete} handleLike={handleLike} />
    ).container
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.url-likes')
    expect(div).not.toBeInTheDocument()
  })
})