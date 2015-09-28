// Dependencies
var net = require('net')
var config = require('../config')

function DoorRemoteControl () {
  var self = this

  this.keymaster = null
  this.server = net.createServer(function (c) {
    c.on('data', function (data) {
      // Check if this client is
      // really the keymaster
      if ('auth:' + config.secureKey === data.toString().replace(/\r?\n/, '')) {
        self.keymaster = c
      }
    })
  })

  this.server.listen(config.tcp.port)
}

DoorRemoteControl.prototype.open = function (cb) {
  if (!this.keymaster) {
    return cb(new Error('Keymaster wasn\'t found'))
  }

  this.keymaster.write('open\r\n')
  return cb()
}

DoorRemoteControl.prototype.status = function (cb) {
  this.keymaster.write('status\r\n')

  var ttl = setTimeout(function () {
    cb(new Error('off'))

    // Just to be sure
    cb = function () {}
  })

  this.keymaster.once('data', function (data) {
    if (data.toString().replace(/\r?\n/, '') === 'ok') {
      // Clear timeout
      clearTimeout(ttl)

      return cb()
    }
  })
}

module.exports = DoorRemoteControl
