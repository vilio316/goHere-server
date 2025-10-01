const { Signup, SignIn, verifyUser } = require('../controllers/authController')
const router = require('express').Router()

router.post('/sign-up', Signup)
router.post('/sign-in', SignIn)
router.get('/verify', verifyUser)

module.exports = router