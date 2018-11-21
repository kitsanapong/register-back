const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyPatser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

var authenticate = require('./authenticate')
const userRouter = require('./routers/user')

const HOST_NAME = 'localhost'
const PORT = 3001
const DATABASE_URL = 'mongodb://localhost:27017/gamico'
const database_connect = mongoose.connect(DATABASE_URL)

database_connect.then((db) => {
  console.log(`Connected to MongoDB: ${DATABASE_URL}`)
}, (err) => {
  console.log(err)
})

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyPatser.json())
app.use(passport.initialize())
app.use(passport.session())

// Router
app.use('/user', userRouter)

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}
app.use(auth)

app.use((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body>Express Server</body></html>')
})

const server = http.createServer(app)
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running ${HOST_NAME}:${PORT}`)
})