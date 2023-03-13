import axios from 'axios'
import {
  loginError,
  loginStart,
  loginSuccess,
  registerSuccess,
  registerError,
  registerStart,
  logoutError,
  logoutStart,
  logoutSuccess,
} from './authSlice'

import {
  getUsersError,
  getUsersSuccess,
  getUsersStart,
  deleteUsersError,
  deleteUsersStart,
  deleteUsersSuccess,
} from './userSlice'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('/v1/auth/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (error) {
    dispatch(loginError())
    console.log(error)
  }
}

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart())
  try {
    await axios.post('/v1/auth/register', user)
    dispatch(registerSuccess())
    navigate('/')
  } catch (error) {
    dispatch(registerError())
    console.log(error)
  }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart())
  try {
    const res = await axiosJWT.get('/v1/user', {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(getUsersSuccess(res.data))
  } catch (error) {
    dispatch(getUsersError())
  }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUsersStart())
  try {
    const res = await axiosJWT.delete('/v1/user/' + id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(deleteUsersSuccess(res.data))
  } catch (error) {
    dispatch(deleteUsersError(error.response.data))
  }
}

export const logoutUser = async (token, id, dispatch, navigate, axiosJWT) => {
  dispatch(logoutStart())
  try {
    const res = await axiosJWT.post('/v1/auth/logout', id, {
      headers: { token: `Bearer ${token}` },
    })
    dispatch(logoutSuccess(res.data))
    navigate('/login')
  } catch (error) {
    dispatch(logoutError())
  }
}
