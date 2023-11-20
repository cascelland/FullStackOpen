/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: {
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

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
