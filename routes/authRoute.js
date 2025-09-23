const { Signup, SignIn } = require('../controllers/authController')
const router = require('express').Router()

router.post('/sign-up', Signup)
router.post('/sign-in', SignIn)

module.exports = router