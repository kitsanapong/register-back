const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyPatser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var authenticate = require('./authenticate')
const userRouter = require('./routers/user')
const authUserRouter = require('./routers/authUser')

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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyPatser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// Router
app.use('/public', userRouter)

function auth (req, res, next) {
  if (!req.session.passport) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}
app.use(auth)
app.use('/user', authUserRouter)

app.use((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body>Express Server</body></html>')
})

const server = http.createServer(app)
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running ${HOST_NAME}:${PORT}`)
})