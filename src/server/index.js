const { urlencoded, json } = require('body-parser')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')

const config = require('../../nuxt.config')
// Load Models Here
const models = require("./models/index");
const apiRoutes = require('./api')

const app = express()

// Global middleware
// only allow http://127.0.0.1:3000 and http://localhost:3000
// only allow process.env.API_URL, process.env.SERVER_API_URL, and process.env.PAGE_URL
// app.use(cors({
//   origin: process.env.NOW_URL // fix this.
// }))
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser())

// Import API Routes
app.use('/api', apiRoutes)

config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// setup the database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

app.listen(process.env.PORT, process.env.HOST, err => {
  if (err) { console.log(err) }
  console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)
})

module.exports = app
