const authController = require('../controllers/authController')
const middlewareController = require('../controllers/middlewareController')

const route = require('express').Router()

//REGISTER
route.post('/register', authController.registerUser)

//SIGN IN
route.post('/login', authController.loginUser)

//REFRESH
route.post('/refresh', authController.requestRefreshToken)

//LOG OUT
route.post(
  '/logout',
  middlewareController.verifyToken, // Use verify because when user logout, user must login before
  authController.logoutUser
)

module.exports = route
