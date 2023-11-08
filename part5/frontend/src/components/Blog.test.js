import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('URL and likes are shown when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')

    await user.click(button)
    const div = container.querySelector('.url-likes')
    expect(div).toBeInTheDocument()
  })
})