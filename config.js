var config = {}

config.secureKey = process.env.GK_SECURE_KEY

config.http = {
  port: process.env.GK_HTTP_PORT || 8080
}

config.tcp = {
  port: process.env.GK_TCP_PORT || 8090
}

module.exports = config
