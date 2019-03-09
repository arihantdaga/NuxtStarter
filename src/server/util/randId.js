const crypto = require('crypto')
module.exports = (method = 'base64') => crypto.randomBytes(64).toString(method)
