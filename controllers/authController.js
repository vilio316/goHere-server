const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { createSecretToken } = require('../utils/SecretToken')

module.exports.Signup = async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) {return res.json({ message: "User already exists" });}
    const user = await User.create({ email, password});
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

module.exports.SignIn = async (req, res, next) => {
  try{
    const {email, pwd} = req.body;
    if (!email || !pwd){
      return res.json({message: "Please fill ALL fields"})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({message: 'Invalid username or password'})
    }
    const authCheck = await bcrypt.compare(pwd, user.password)
    if(!authCheck){
      return res.status(401).json({message: 'Incorrect password'})
    }
    const user_token = createSecretToken(user._id)
    res.cookie("token", user_token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({message: "Signed in Successfully", success: true, user});
     next()
  } catch(error){
    console.log(error)
  }
}

