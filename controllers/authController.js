const User = require('../models/userModelRefix') 
const UserProfile = require('../models/userProfileModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createSecretToken } = require('../utils/SecretToken')
const LocationsModel = require('../models/userLocationSchema')

module.exports.Signup = async(req, res, next) =>{
  try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) {return res.json({ message: "User already exists" });}
    const user = await User.create({ email, password });
    
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed up successfully", success: true, user });
    next()
    }

    catch(error){
        console.error(error)
    }
}

module.exports.SignUpProfile= async (req, res) => {
  try{
    const {email, username, locations} = req.body
    const user_profile = await UserProfile.create({email, locations, username})
    res.status(201).json({message: "Done!", success: true})
  }
  catch(error){
    console.log(error)
    res.status(401).json({message: "Not Done!", success: false})
  }
}

module.exports.getUserDetails = async (req, res) => {
  const {query} = req.params
  if(query.length > 0){
  try{    
    const result = await UserProfile.findOne({email: query})
    res.json({message: "Found", success: true, result})
  }
  catch(error){
    console.log(error)
    res.status(404).json({message: "404 Not Found", success: 'false'})
  }
}
else(
  res.status(404).json({message: "404 Not Found", success: false})
)
}

module.exports.updateLocations = async(req, res) => {
  const {email, newBody} = req.body
  const requiredUser = await LocationsModel.findOne({email: email})
  if(requiredUser){
    requiredUser.locations = {locations: newBody};
    requiredUser.save()
    console.log(requiredUser)
  }
  res.json({message: "Update Successful"})
}

module.exports.locationGet = async (req, res) => {
  const {query} = req.params
  const foundUser = await LocationsModel.findOne({email: query})
  res.json({message: 'Complete', foundUser})
}

module.exports.setupUserLocation = async (req, res) => {
  const {email, locations} = req.body
  try{
  const userAndLocations = await LocationsModel.create({email, locations})
  res.status(201).json({message: "Gone!", success: true})
}
  catch(error){
    console.log(error)
    res.status(500).json({message: 'Failed', success: false})
  }
}


module.exports.SignIn = async (req, res, next) => {
  try{
    const {email, pwd} = req.body;
    if (!email || !pwd ){
      return res.json({message: "Please fill ALL fields"})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({message: 'Invalid username or password'})
    }
    const authCheck = await bcrypt.compare(pwd, user.password)
    if(!authCheck){
      return res.status(401).json({message: 'Incorrect password', success: false})
    }
    const user_token = createSecretToken(user._id)
    res.cookie("token", user_token, {
       withCredentials: true,
       httpOnly: true,
       maxAge: 1000 * 24 *60 * 60
     });
     res.status(201).json({message: "Signed in Successfully", success: true, user});
     next()
  } catch(error){
    console.log(error)
    res.status(404).json({message: "404 User Not Found"})
  }
}

module.exports.verifyUser = async(req, res) => {
  const token = req.cookies.token
  if (!token) return res.json({user: null})
  
    try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY );
    res.json(decoded );
  } catch {
    res.json({ user: null });
  }
}

module.exports.logOut = async(req, res) => {
  res.clearCookie('token')
  res.json({message: 'Logged out successfully'})
}

