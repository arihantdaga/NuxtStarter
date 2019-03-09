const { Router } = require('express')
const authenticate = require('../../middleware/authenticate');
const { index, username, signIn, signOut, check } = require('./controllers')

const router = Router()

router.get('/', authenticate(), index.get)
router.post('/', index.post)

router.get('/check', check.get)

router.post('/sign-in', signIn.post)
router.post('/sign-out', authenticate(), signOut.post)

router.route('/:username')
  .all(authenticate())
  .get(username.get)
  .post(username.post)
  .delete(username.delete)

module.exports = router
