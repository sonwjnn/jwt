const jwt = require('jsonwebtoken')

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token
    if (token) {
      // Bearer rewqrewq...(token), split to get token from header
      const accessToken = token.split(' ')[1]
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          return res.status(403).json('Token is invalid')
        }
        req.user = user
        next()
      })
    } else {
      return res.status(401).json('You are not authenticated')
    }
  },
  // verify user can delete self or admin can delete self and user other
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next()
      } else {
        return res.status(403).json('You are not allowed to delete other')
      }
    })
  },
}

module.exports = middlewareController
