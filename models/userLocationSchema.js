const { Schema, model } = require("mongoose");

const userLocationSch = new Schema({
    email: {
        type: String, 
        unique: true,
        required: true
    }, 
    locations: {
        type: Object,
        required: true
    }
})

const LocationsModel = model('user_location', userLocationSch)

module.exports = LocationsModel