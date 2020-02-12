const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const config = require('./config')
const routes = require('./src/routes')
const server = require('http').Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(cors())

routes.set(app)

server.listen(config.port, () => console.log('App listening on port ' + config.port))
