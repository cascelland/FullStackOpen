import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete }) => {

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
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)){
      await handleDelete(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show &&
        <div>
          {blog.url}
          <br />
          likes: {newBlog.likes} <button onClick={updateLike}>like</button>
          <br />
          {blog.user &&
            blog.user.name
          }
          <br />
          <button onClick={deleteBlog}>delete</button>
        </div>
      }
    </div>
  )

}

export default Blog