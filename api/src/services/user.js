const Users = require('../models').User
const config = require('../../config')
const CustomError = require('../helpers/CustomError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lodash = require('lodash')

const authenticate = params => {
  return Users.findOne({
    where: {
      username: params.username
    },
    raw: true
  }).then(user => {
    if (!user) { throw new CustomError('Authentication failed. User not found.') }

    if (!bcrypt.compareSync(params.password || '', user.password)) { throw new CustomError('Authentication failed. Wrong password.') }

    const payload = {
      username: user.username,
      id: user.id,
      time: new Date()
    }

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime
    })

    return { user: { ...lodash.omit(user, 'password') }, token }
  })
}

const addUser = user => Users.create(user)
const getUserByUsername = username => Users.findOne({ where: { username } })

module.exports = {
  authenticate,
  addUser,
  getUserByUsername
}
