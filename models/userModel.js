const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userInfoSchema = new Schema({
    email:{
       type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})
userInfoSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 12)
})

const UserModel = model('users_data', userInfoSchema)

module.exports = UserModel