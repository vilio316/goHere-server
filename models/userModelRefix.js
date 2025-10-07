const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 12)
})

const userModel = model('user', userSchema)

module.exports = userModel