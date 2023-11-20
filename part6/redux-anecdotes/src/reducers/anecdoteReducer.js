import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id === id ? changedAnecdote : a)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const {addAnecdote, addVote, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer