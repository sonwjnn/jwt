import axios from 'axios'
import jwt_decode from 'jwt-decode'

const refreshToken = async () => {
  try {
    const res = await axios.post('/v1/auth/refresh', {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstances = axios.create()
  newInstances.interceptors.request.use(
    async (config) => {
      let date = new Date()
      const decodedtoken = jwt_decode(user?.accessToken)
      if (decodedtoken.exp < date.getTime() / 1000) {
        //compare must /1000 with time exp
        const data = await refreshToken()

        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        }
        dispatch(stateSuccess(refreshUser)) //dispatch with new access Token
        config.headers['token'] = 'Bearer ' + data.accessToken
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return newInstances
}
