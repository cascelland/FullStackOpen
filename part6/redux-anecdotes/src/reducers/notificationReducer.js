/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action) => {
        return action.payload
      },
      prepare: (text) => {
        return { payload: text }
      }
    },
    removeNotification: {
      reducer: (state, action) => {
        return action.payload
      },
      prepare: () => {
        return { payload: '' }
      }
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return dispatch => {
    const timeoutMillis = timeout*1000
    dispatch(addNotification(content))
    setTimeout(() => {
      console.log('gogogo')
      dispatch(removeNotification())
    }, timeoutMillis)
  }
}

export default notificationSlice.reducer
