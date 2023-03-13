const route = require('express').Router()
const middlewareController = require('../controllers/middlewareController')
const userController = require('../controllers/userController')
//GET ALL USERS
route.get('/', middlewareController.verifyToken, userController.getAllUsers)
//DELETE USER
route.delete(
  '/:id',
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
)

module.exports = route
