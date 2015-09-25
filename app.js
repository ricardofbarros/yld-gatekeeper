// Dependencies
var express = require('express')
var bodyParser = require('body-parser')
var DoorRemoteControl = require('./lib/doorRemoteControl')
var config = require('./config')

var app = express()
var door = new DoorRemoteControl()

app.use(express.static('public'))

// parse application/json
app.use(bodyParser.json())

app.post('/', function (req, res) {
  door.open(function (err) {
    if (err) {
      return res.status(503).send('KEYMASTER DOWN')
    }

    return res.sendStatus(200)
  })
})

app.use(function (req, res) {
  res.redirect('/')
})

app.listen(config.http.port)
