const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ServerError } = require('express-server-error')

const chefSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  name: String,
  password: {
    type: String,
    require: true,
    minlength: 5,
    select: false
  }
}, {
  timestamps: true
})



chefSchema.pre('save', async function (callback) {
  if (!this.isModified('password')) return callback()
  this.password = await bcrypt.hash(this.password, 10)
  callback()
})

chefSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new ServerError('User taken.', { status: 404, log: false }))
  }
})

// don't ever return password on creation.
chefSchema.set('toJSON', {
  transform (doc, ret, options) {
    delete ret.password
    return ret;
  }
})

module.exports = {chefSchema};