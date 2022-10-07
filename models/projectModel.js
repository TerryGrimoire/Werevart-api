const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// schema of the database

const projectSchema = new Schema({
    contract: {
        type: String,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    artistePseudo: {
        type: String,
        required: true
    },
    techniques: {
        type: Array,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Project", projectSchema);
