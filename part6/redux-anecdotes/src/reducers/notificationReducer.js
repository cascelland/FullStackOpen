/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return state
    }
  }
})

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer
