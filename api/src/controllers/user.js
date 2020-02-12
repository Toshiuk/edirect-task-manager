const config = require('../../config')
const bcrypt = require('bcrypt')
const response = require('../helpers/response')
const userService = require('../services/user')

function login (req, res) {
  return userService.authenticate(req.body)
    .then(data => response.success(res, data))
    .catch(err => {
      if (err.type === 'custom') {
        return response.error(res, 400, err.message)
      }
      return response.error(res, 400, 'Authentication failed. Unexpected Error.')
    })
};

function create (req, res) {
  return userService.getUserByUsername(req.body.username || '')
    .then(exists => {
      if (exists) {
        return response.error(res, 409, 'Registration failed. User with this username already registered.')
      }
      const user = {
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, config.saltRounds)
      }
      userService.addUser(user)
      return response.success(res)
    })
};

module.exports = {
  login,
  create
}
