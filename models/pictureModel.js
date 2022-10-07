const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// schema of the database

const pictureSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Picture", pictureSchema);