const { Router } = require('express')
const usersRoutes = require('./users')
// const adminRoutes = require('./admin/routes')
const listEndpoints = require('express-list-endpoints')
const authenticate = require('../middleware/authenticate')
const { handleServerErrors } = require('express-server-error')

const router = Router()

router.use('/', handleServerErrors());
router.use('/users', usersRoutes)
// router.use('/admin', authenticate(), adminRoutes)

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

module.exports = router
