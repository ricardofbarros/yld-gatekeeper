// Dependencies
var sha512 = require('crypto-js/sha512')
var config = require('../config')

function auth (passphrase) {
  if (typeof passphrase === 'undefined') {
    return false
  }

  // Compare the passphrases hashes
  if (passphrase !== sha512(config.passphrase)) {
    return false
  }

  return true
}

module.exports = auth
