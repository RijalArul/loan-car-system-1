const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

let user
let userData
let arrUser = []
beforeAll(async () => {
  user = {
    username: 'Rijal_Test',
    is_login: true
  }

  userData = await User.create(user)
  arrUser.push(userData)
})

afterAll(async () => {
  await User.destroy({ where: {}, restartIdentity: true })
})

describe('Testing Login user success with status code 201', () => {
  test('Login /users', done => {
    const payload = {
      username: 'Rijal_Test',
      is_login: false
    }

    request(app)
      .post('/users/login')
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('data', response.body.data)
        expect(response.body).toHaveProperty('message', 'Success Login')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Testing Login user failed that no username with status code 400', () => {
  test('Login /users/login', done => {
    const payload = {
      username: '',
      is_login: false
    }

    request(app)
      .post('/users/login')
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Testing Logout user success with status code 200', () => {
  test('Logout /users/logout', done => {
    request(app)
      .patch('/users/logout')
      .set('user_id', userData.id)
      .then(response => {
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('data', response.body.data)
        expect(response.body).toHaveProperty(
          'message',
          `Thank you, ${userData.username}`
        )
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Testing Logout user failed fields is false with status code 400', () => {
  test('Logout /users/logout', done => {
    request(app)
      .patch('/users/logout')
      .then(response => {
        expect(response.statusCode).toEqual(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Testing failed create deposite user with status code 400', () => {
  test('deposite /users/deposite', done => {
    const payload = {
      balance: 1000000
    }
    request(app)
      .post('/users/deposite')
      .set('user_id', userData.id)
      .send(payload)
      .then(response => {
        expect(response.statusCode).toEqual(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
