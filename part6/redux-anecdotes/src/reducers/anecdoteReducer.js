import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    updateAnecdote(state, action) {
      const content = action.payload
      const id = content.id
      return state.map(a => a.id === id ? content : a)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addAnecdote,updateAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.forEach(anecdote => {
      dispatch(appendAnecdote(anecdote))
    });
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const newAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer