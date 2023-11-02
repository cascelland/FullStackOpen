import { useState } from "react"

const Blog = ({ blog }) => {

  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
    {show && 
      <div>
        {blog.url}
        <br />
        likes: {blog.likes} <button>like</button>
        <br />
        {blog.user && 
          blog.user.name
        }
        </div>
    }
  </div>  
  )

}

export default Blog