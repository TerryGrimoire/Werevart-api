const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// schema of the database

const profileSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    adress: {
        type: String,
    },
    postcode: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    username: {
        type: String,
    },
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    description: {
        type: String,
    },
    skills: {
        type: Array,
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Profile", profileSchema);