const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// schema of the database

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);
