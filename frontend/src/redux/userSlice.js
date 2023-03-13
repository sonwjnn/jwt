import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: {
    currentUsers: null,
    error: false,
    fetchLoading: false,
  },
  msg: '',
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.users.fetchLoading = true
    },
    getUsersSuccess: (state, action) => {
      state.users.fetchLoading = false
      state.users.currentUsers = action.payload
      state.users.error = false
    },
    getUsersError: (state) => {
      state.users.fetchLoading = false
      state.users.error = true
    },
    deleteUsersStart: (state) => {
      state.users.fetchLoading = true
    },
    deleteUsersSuccess: (state, action) => {
      state.users.fetchLoading = false
      state.msg = action.payload
      state.users.error = false
    },
    deleteUsersError: (state, action) => {
      state.users.fetchLoading = false
      state.users.error = true
      state.msg = action.payload
    },
  },
})

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersError,
  deleteUsersError,
  deleteUsersStart,
  deleteUsersSuccess,
} = userSlice.actions
export default userSlice.reducer
