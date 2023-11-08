import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm />', async () => {
  const handleNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlog={handleNewBlog} />)

  const inputTitle = screen.getByPlaceholderText('blog title')
  const inputAuthor = screen.getByPlaceholderText('blog author')
  const inputUrl = screen.getByPlaceholderText('blog url')

  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing title...')
  await user.type(inputAuthor, 'testing author...')
  await user.type(inputUrl, 'testing url...')

  await user.click(createButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0]).toBe('testing title...')
  expect(handleNewBlog.mock.calls[0][1]).toBe('testing author...')
  expect(handleNewBlog.mock.calls[0][2]).toBe('testing url...')
})