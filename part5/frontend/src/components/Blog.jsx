import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  console.log(JSON.parse(window.localStorage.getItem('loggedUser')).username)
  console.log('blog.user', blog.user.username)

  const [show, setShow] = useState(false)
  const [newBlog, setNewBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = async (event) => {
    event.preventDefault()
    const updatedBlog = ({ ...blog, likes: blog.likes + 1 })
    await handleLike(updatedBlog)
    setNewBlog(updatedBlog)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await handleDelete(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show &&
        <div className='url-likes'>
          {blog.url}
          <br />
          likes: {newBlog.likes} <button onClick={updateLike} id='like-button' placeholder='like button'>like</button>
          <br />
          {blog.user &&
            blog.user.name
          }
          <br />
          {JSON.parse(window.localStorage.getItem('loggedUser')).username === blog.user.username &&
            <button onClick={deleteBlog}>delete</button>
          }
        </div>
      }
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog