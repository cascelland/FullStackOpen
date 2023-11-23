import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const submitAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNew(content))
    dispatch(setNotification(`Created '${content}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input
          name='anecdote'
        /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm