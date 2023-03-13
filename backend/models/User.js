const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 20,
    },
    email: {
      type: String,
      require: true,
      minlength: 10,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
  }
)

module.exports = mongoose.model('User', userSchema)
