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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    setUser(user)
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