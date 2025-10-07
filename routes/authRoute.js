const { Signup, SignIn, verifyUser, logOut, findUser, SignUpProfile, getUserDetails } = require('../controllers/authController')
const router = require('express').Router()

router.post('/sign-up', Signup)
router.post('/add_profile_details', SignUpProfile)
router.post('/sign-in', SignIn)
router.get('/verify', verifyUser)
router.post('/logout', logOut)
router.post('/user_data', findUser)
router.get('/get-user/:query', getUserDetails )

module.exports = router