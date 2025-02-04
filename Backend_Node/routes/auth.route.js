const auth = require('../controllers/auth.controller')
const router = require('express').Router()

router.get('/login', auth.login)
router.post('/signup', auth.signup)

module.exports = router