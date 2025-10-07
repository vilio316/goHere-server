const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String
    }, 
    username: {
        type: String,
        unique: true,
        required: true
    }
})

const UserProfileModel = model('user_profile', profileSchema)

module.exports = UserProfileModel