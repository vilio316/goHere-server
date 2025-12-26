const {
  Signup,
  SignIn,
  verifyUser,
  logOut,
  SignUpProfile,
  getUserDetails,
  setupUserLocation,
  locationGet,
  updateLocations,
  updateLocationsSave,
  updatePassword,
} = require("../controllers/authController");
const router = require("express").Router();

router.post("/sign-up", Signup);
router.post("/add_profile_details", SignUpProfile);
router.post("/sign-in", SignIn);
router.get("/verify", verifyUser);
router.post("/logout", logOut);
router.get("/get-user/:query", getUserDetails);
router.post("/add_location", setupUserLocation);
router.get("/user_location/:query", locationGet);
router.post("/update_locations", updateLocationsSave);
router.post('/update_password', updatePassword)

module.exports = router;
