const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createSecretToken } = require('../utils/SecretToken')

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

module.exports.findUser = async(req, res) => {
  const {email} = req.body
  try{
    const userDetails = await User.findOne({email})
    console.log(userDetails.username)
    if(userDetails == null){
      res.json({message: "User details unavailable"})
    }
    else{
    res.json({message: "Matching User found", userDetails})
  }
}
  catch(error){
    console.log(error, email)
    res.status(404).json({message: 'User not found!'})
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

