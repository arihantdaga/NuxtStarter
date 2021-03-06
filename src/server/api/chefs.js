const { Router } = require('express')
const authenticate = require('../middleware/authenticate');
const { index } = require('./controllers/chefs')

const router = Router()

router.get('/', index.get)
router.post('/', index.post)

  
module.exports = router
