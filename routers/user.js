const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const UserModel = require('../models/user')

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.route('/')
.get((req, res, next) => {
  res.end('Get user data')
})
.post((req, res, next) => {
  UserModel.register(
    new UserModel({
      username: req.body.email,
      user_name: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.json({ err: err })
      } else {
        passport.authenticate('local')(req, res, () => {
          res.status = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({
            success: true,
            status: 'Register Successful',
            user: user,
          })
        })
      }
    }
  )
})

userRouter.route('/login')
.post(passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
})

userRouter.route('/logout')
.post((req, res, next) => {
  res.end('Logout')
})

module.exports = userRouter