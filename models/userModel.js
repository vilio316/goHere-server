const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userTestSchema = new Schema({
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
userTestSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 12)
})

const UserModel = model('users', userTestSchema)

module.exports = UserModel