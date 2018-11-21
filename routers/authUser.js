const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const UserModel = require('../models/user')

const authUserRouter = express.Router()

authUserRouter.use(bodyParser.json())

authUserRouter.route('/')
.get((req, res, next) => {
  UserModel.findOne({
    username: req.session.passport.user
  }, (err, user) => {
    res.status = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({
      status: 200,
      user: {
        email: user.username,
        username: user.user_name,
      },
    })
  })
})

authUserRouter.route('/logout')
.post(passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    user_name: req.user.user_name,
    status: 'You are successfully logged in!'
  });
})

module.exports = authUserRouter