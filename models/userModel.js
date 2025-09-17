const {Schema, model } = require('mongoose')

const userTestSchema = new Schema({
    email: String,
    password: String, 
})

const UserModel = model('users', userTestSchema)

module.exports = UserModel