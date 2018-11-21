const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyPatser = require('body-parser')

const userRouter = require('./routers/user')

const HOST_NAME = 'localhost'
const PORT = 3001

const app = express()
app.use(morgan('dev'))
app.use(bodyPatser.json())

// Router
app.use('/user', userRouter)

app.use((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body>Express Server</body></html>')
})

const server = http.createServer(app)
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running ${HOST_NAME}:${PORT}`)
})