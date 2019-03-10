const { Router } = require('express')
const authenticate = require('../middleware/authenticate');
const router = Router()

router.get('/', index.get)
  
module.exports = router
