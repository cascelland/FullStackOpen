import { useState } from "react"

const BlogForm = ({handleNewBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleNewBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default BlogForm

