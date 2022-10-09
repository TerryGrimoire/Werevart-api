const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// schema of the database

const profileSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address: {
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
    softwares: {
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