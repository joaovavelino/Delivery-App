const userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator'
}

const validUserLogin = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--'
}

const createValidUser = {
  name: 'Vitinho delivery app CTO',
  email: 'vitor@deliveryapp.com',
  password: 'banana123',
}

const createInvalidPassword = {
  name: 'Vitinho delivery app CTO',
  email: 'vitor@deliveryapp.com',
  password: '123',
  role: 'seller'
}

const createInvalidEmail = {
  name: 'Vitinho delivery app CTO',
  email: 'vitor@deliver',
  password: '123',
  role: 'seller'
}

const invalidPassword = {
  email: 'adm@deliveryapp.com',
  password: 'invalidpass'
}

const invalidEmail = {
  email: 'invalid@emailinvalid.com',
  password: '--adm2@21!!--'
}

const userInfosMock = {
  id: 54,
  name: 'Usuario Correa Da Silva',
  email: 'usuario123@deliveryapp.com',
  role: 'seller'
}

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQccccc'

module.exports = {
  invalidToken,
  userInfosMock,
  createInvalidEmail,
  createInvalidPassword,
  invalidPassword,
  invalidEmail,
  createValidUser,
  userMock,
  validUserLogin,
}