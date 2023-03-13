import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    currentUser: null,
    error: false,
    fetchLoading: false,
  },
  register: {
    error: false,
    fetchLoading: false,
    success: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.fetchLoading = true
    },
    loginSuccess: (state, action) => {
      state.login.fetchLoading = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    loginError: (state) => {
      state.login.fetchLoading = false
      state.login.error = true
    },

    registerStart: (state) => {
      state.register.fetchLoading = true
    },
    registerSuccess: (state) => {
      state.register.success = true
      state.register.fetchLoading = false
      state.register.error = false
    },
    registerError: (state) => {
      state.register.fetchLoading = false
      state.register.error = true
    },

    logoutStart: (state) => {
      state.login.fetchLoading = true
    },
    logoutSuccess: (state, action) => {
      state.login.fetchLoading = false
      state.login.currentUser = null
      state.login.error = false
    },
    logoutError: (state) => {
      state.login.fetchLoading = false
      state.login.error = true
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginError,
  registerError,
  registerStart,
  registerSuccess,
  logoutError,
  logoutStart,
  logoutSuccess,
} = authSlice.actions
export default authSlice.reducer
