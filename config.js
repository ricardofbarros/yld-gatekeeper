var config = {}

config.passphrase = process.env.GK_PASSPHRASE
config.secureKey = process.env.GK_SECURE_KEY

config.http = {
  port: process.env.GK_HTTP_PORT
}

config.tcp = {
  prot: process.env.GK_TCP_PORT
}

module.exports = config
