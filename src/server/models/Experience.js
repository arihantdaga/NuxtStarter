const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ServerError } = require('express-server-error')

const expSchema = new mongoose.Schema({
  chef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chef"
  },
  title: {
          type: String,
          required: true
  },
  short_desc: {
          type: String
  },
  description: {
        type: String
  }
}, {
  timestamps: true
})



module.exports = {expSchema};