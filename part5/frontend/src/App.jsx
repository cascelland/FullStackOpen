import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState('')


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

  const handleCreateNew = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    try {
      blogService.createToken(user.token)
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

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

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createNew = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title
          <input
            type="text"
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input
            type="text"
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input
            type="text"
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification error={error} />
      {!user && loginForm()}
      {user && blogList()}
      {user && createNew()}

    </div>
  )
}

export default App