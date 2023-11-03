import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const Notification = (props) => {
  return (
    <p>
      {props.error}
    </p>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)



  const [error, setError] = useState('')

  const newBlogRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.createToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const handleCreateNew = async (title, author, url) => {
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      blogService.createToken(user.token)
      const newBlog = await blogService.create(blog)
      newBlog['user'] = user
      setBlogs(blogs.concat(newBlog))
      newBlogRef.current.toggleVisibility()

      setError(`created new blog: ${newBlog.title}`)
      setTimeout(() => {
        setError('')
      }, 5000)

    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }

  }

  const updateLike = async newBlog => {
    try {
      const updatedBlog = JSON.parse(await blogService.update(newBlog))
      updatedBlog['user'] = user
      setBlogs(blogs.map(blog => blog.id != updatedBlog.id ? blog : updatedBlog))
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="  text"
            name='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="text"
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={() => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
      }}>logout</button>
      </p>
      {
        blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={updateLike} />
        )
      }
    </div>
  )

  const createNew = () => (
    <Togglable label="add blog" ref={newBlogRef}>
      <BlogForm handleNewBlog={handleCreateNew} />
    </Togglable>

  )

  return (
    <div>
      <Notification error={error} />
      {!user &&
        <Togglable label="login">
          {loginForm()}
        </Togglable>
      }
      {user && blogList()}
      {user && createNew()}

    </div>
  )
}

export default App