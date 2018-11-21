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
.get((req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/login');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = authUserRouter