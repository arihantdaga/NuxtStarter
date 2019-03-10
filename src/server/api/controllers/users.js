const bcrypt = require('bcryptjs')
const blacklist = require('express-jwt-blacklist')
const jwt = require('jsonwebtoken')
const stripUser = require('../../util/stripUser')
const randId = require('../../util/randId')
const { ServerError } = require('express-server-error')
const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = exports

exports.index = {
  async get (req, res, next) {
    try {
      let users = await User.find({})
      if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
      res.json(users)
    } catch (error) {
      return next(error)
    }
  },
  async post (req, res, next) {
    try {
      let { username, email, firstName, lastName, password1, password2 } = req.body
      if (password1 === password2) {
        // let password = await bcrypt.hash(password1, 10)
        let newUser = new User({ username, email, firstName, lastName, password: password1 })
        let savedUser = await newUser.save()
        res.json({ message: `Thanks for signing up, ${savedUser.username}!` })
      } else {
        throw new ServerError('Passwords don\'t match.', { status: 400 })
      }
    } catch (error) {
      return next(error)
    }
  }
}

exports.check = {
  async get (req, res, next) {
    try {
      let authorizedQueries = ['username', 'email']
      if (authorizedQueries.includes(req.query.check)) {
        let check = req.query.check
        let data = req.query.data
        let user = await User.find({ [check]: data })
        if (user.length) res.json({ exists: true })
        else res.json({ exists: false })
      } else {
        throw new ServerError('Query not supported.', { status: 400 })
      }
    } catch (error) {
      return next(error)
    }
  }
}

exports.username = {
  async get (req, res, next) {
    try {
      // check if the logged in user has the same username as the requested user.
      if (req.user.username === req.params.username) {
        res.json(req.user)
      } else {
        let fetchedUser = await User.findOne({ username: req.params.username })
        if (!fetchedUser) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
        res.json({
          username: fetchedUser.username,
          message: `Authentication by ${req.params.fetchedUser.username} required to view more...`
        })
      }
    } catch (error) {
      return next(error)
    }
  },
  async post (req, res, next) {
    res.json({ message: 'Update the user, and return the updated user.' })
  },
  async delete (req, res, next) {
    try {
      if (req.user.username === req.params.username) {
        let deleted = await User.findOneAndRemove({ username: req.user.username })
        if (!deleted) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
        res.json({ message: 'Successfully deleted user.' })
      } else {
        throw new ServerError('Unauthorized.', { status: 401 })
      }
    } catch (error) {
      return next(error)
    }
  }
}

// separate into auth app if need be. 'sign-up' is handled as a POST request to '/users'
exports.signIn = {
  async post (req, res, next) {
    try {
      let { username, password } = req.body
      let user = await User.findOne({ email: username }).select("email password username name _id");
      if (!user) throw new ServerError('Authentication failed. Incorrect username or password', { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)
      if (!user || !matched || !username || !password) {
        throw new ServerError('Authentication failed. Incorrect username or password', { status: 401, log: false })
      } else {
        user = stripUser(user)

        let token = jwt.sign(user, process.env.SECRET, { expiresIn: '30 days', jwtid: randId() })
        res.status(200).json({ message: `Welcome, ${user.username}!`, token, user })
      }
    } catch (error) {
      return next(error)
    }
  }
}

exports.signOut = {
  async post (req, res, next) {
    try {
      blacklist.revoke(req.user)
      res.json({ message: 'Sign out successful. Good bye! :)' })
    } catch (error) {
      return next(error)
    }
  }
}
