const proxyquire = require('proxyquire')
const supertest = require('supertest')
const express = require('express')

describe('/user', () => {
  let app, stub, request
  beforeEach(() => {
    stub = jest.fn()
    app = express()
    route = proxyquire('./user.js', {})
    app.use(route)
    request = supertest(app)
  })
  describe('Get /', () => {
    it('should response with 200', (done) => {
      request.get('/user/')
      .expect(200, () => {
        done()
      })
    })
  })
  describe('Post /', () => {
    it('should response with 200', (done) => {
      request.post('/user/')
      .expect(200, () => {
        done()
      })
    })
  })
  describe('Post /login', () => {
    it('should response with 200', (done) => {
      request.post('/user/login')
      .expect(200, () => {
        done()
      })
    })
  })
  describe('Post /logout', () => {
    it('should response with 200', (done) => {
      request.post('/user/login')
      .expect(200, () => {
        done()
      })
    })
  })
})