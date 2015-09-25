// Dependencies
var express = require('express')
var bodyParser = require('body-parser')
var DoorRemoteControl = require('./lib/doorRemoteControl')
var auth = require('./lib/auth')
var config = require('../config')

var app = express()
var door = new DoorRemoteControl()

app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// parse application/json
app.use(bodyParser.json())

app.get('/keymaster-status', function (req, res) {
  door.status(function (err) {
    if (err) {
      return res.status(503).send('KEYMASTER DOWN')
    }

    return res.sendStatus(200)
  })
})

app.post('/', function (req, res) {
  if (!req.body || !auth(req.body.passphrase)) {
    return res.status(401).send('YOU SHALL NOT PASS!!1')
  }

  door.open(function (err) {
    if (err) {
      return res.status(503).send('KEYMASTER DOWN')
    }

    return res.sendStatus(200)
  })
})

app.listen(config.http.port)
