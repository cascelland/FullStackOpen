import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import NotificationContext from "../NotificationContext"
import { useContext } from "react"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: queryClient.invalidateQueries('anecdotes'),
    onError: (error) => {
      dispatch({ type: "ERROR", payload: error.response.data.error || error.message })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate({
      content,
      id: generateId(),
      votes: 0
    })
    dispatch({ type: "CREATED", payload: content })
    setTimeout(() => {
      dispatch('')
    }, 5000)

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm
