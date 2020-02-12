const jwt = require('jsonwebtoken')
const config = require('../../config')
const response = require('../helpers/response')

const checkAuth = (req, res, next) => {
  const token = req.headers.token
  if (!token) { return response.error(res, 403, 'No token provided.') }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return response.error(res, 500, 'Failed to authenticate token.') }
    req.user = {
      username: decoded.username,
      id: decoded.id
    }
    next()
  })
}

module.exports = {
  checkAuth
}
