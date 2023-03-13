const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

//fake db to save refresh tokens
let refreshTokens = []

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(req.body.password, salt)

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      })

      const user = await newUser.save()

      res.status(200).json(user)
    } catch (error) {
      res.status('500').json(error)
    }
  },

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '20s' }
    )
  },

  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '365d' }
    )
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) {
        return res.status(404).json('wrong username')
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!validPassword) {
        return res.status(404).json('wrong password')
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user)
        const refreshToken = authController.generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        //way to save REFRESH TOKEN to cookies
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          path: '/', //optional
          sameSite: 'strict',
          secure: false,
        })

        const { password, ...other } = user._doc
        res.status(200).json({ ...other, accessToken })
      }
    } catch (error) {
      res.status(200).json(error)
    }
  },

  //REQUEST NEW REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json('You are not authenticated')
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json('Refresh token is invalid')
    }

    //Remove OLD REFRESH TOKEN
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
      if (error) console.log(error)
      //Create new ACCESS TOKEN, REFRESH TOKEN
      const newAccessToken = authController.generateAccessToken(user)
      const newRefreshToken = authController.generateRefreshToken(user)

      //Push NEW REFRESH KEY to array token after remove OLD REFRESH TOKEN
      refreshTokens.push(newRefreshToken)

      //Save again new REFRESH TOKEN to cookie and new ACCESS TOKEN
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        path: '/', //optional
        sameSite: 'strict',
        secure: false,
      })

      res.status(200).json({ accessToken: newAccessToken })
    })
  },

  //LOGOUT
  logoutUser: async (req, res) => {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    )
    res.status(200).json('Logout successfully')
  },
}

/*
  WAY TO STORE TOKEN  
1) LOCAL STORAGE -> XSS attack
2) HTTP ONLY COOKIES -> CSRF attack, cant use SAMESITE
3) 
  + REDUX STORE store ACCESS TOKEN
  + HTTPO ONLY COOKIES store REFRESH TOKEN
*/

module.exports = authController
