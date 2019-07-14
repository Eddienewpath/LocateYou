const mongoose = require('mongoose');

let physicianSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },

    mid_name: {
        type: String,
        trim: true
    },

    last_name: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String
    },

    state: {
        type: String,
    },

    zipcode: {
        type: String      
    }

})

let Physician = mongoose.model('Physicians', physicianSchema)

module.exports = { Physician };