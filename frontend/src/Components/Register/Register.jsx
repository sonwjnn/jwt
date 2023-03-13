import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/apiRequests'
import { useDispatch } from 'react-redux'

import './register.css'
const Register = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault()
    const newUser = {
      username,
      password,
      email,
    }
    registerUser(newUser, dispatch, navigate)
  }

  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassowrd(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </section>
  )
}

export default Register
