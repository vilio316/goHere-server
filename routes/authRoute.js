const { Signup, SignIn, verifyUser, logOut, findUser } = require('../controllers/authController')
const router = require('express').Router()

router.post('/sign-up', Signup)
router.post('/sign-in', SignIn)
router.get('/verify', verifyUser)
router.post('/logout', logOut)
router.post('/user_data', findUser)

module.exports = router