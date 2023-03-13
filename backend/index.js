const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
dotenv.config()

const app = express()

// mongodb+srv://nguyenlehoangson216:hoangson123@cluster0.ntfl83n.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log('Connected to DB'))
  .catch((err) => console.log(err))

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)
app.listen(8000, () => {
  console.log('server is running')
})
