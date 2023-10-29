import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    setUser(user)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
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

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App