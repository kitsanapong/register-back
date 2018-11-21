const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.route('/')
.get((req, res, next) => {
  res.end('Get user data')
})
.post((req, res, next) => {
  res.end('Create user')
})

userRouter.route('/login')
.post((req, res, next) => {
  res.end('Login')
})

userRouter.route('/logout')
.post((req, res, next) => {
  res.end('Logout')
})

module.exports = userRouter