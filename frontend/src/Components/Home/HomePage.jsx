import './home.css'

import { getAllUsers } from '../../redux/apiRequests'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteUser } from '../../redux/apiRequests'
import { loginSuccess } from '../../redux/authSlice'
import { createAxios } from '../../createInstances'
const HomePage = () => {
  const msg = useSelector((state) => state.users.msg)
  const user = useSelector((state) => state.auth.login?.currentUser)
  const userList = useSelector((state) => state.users.users?.currentUsers)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //use diff axios, before call api must do some logic like refresh token then call
  let axiosJWT = createAxios(user, dispatch, loginSuccess)

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }
  }, [])

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? 'Admin' : 'User'}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                {' '}
                Delete{' '}
              </div>
            </div>
          )
        })}
      </div>
      <div className="errorlog">{msg}</div>
    </main>
  )
}

export default HomePage
