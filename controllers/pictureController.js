const Picture = require("../models/pictureModel");
const mongoose = require("mongoose");

// get all Pictures

const getOnePicture = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Picture with this id"})
    }

    const picture = await Picture.findById(id)

    if(!picture) {
        return res.status(404).json({error: "There is no Picture for this id"})
    }

    res.status(200).json(picture)

}

// get a single Picture 

const getPictures = async (req, res) => {
    const pictures = await Picture.find({})
    res.status(200).json(pictures)
}

// create a new Picture

const createPicture = async (req, res) => {
    const {src, alt} = req.body;
    //add a Picture to db
    try {
        const picture = await Picture.create({src, alt})
        res.status(200).json(picture)
    } catch (error) {
            res.status(400).json({error: error.message})
        }
}
// delete a Picture

const deletePicture = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Picture with this id"})
    }

    //delete a Picture from db
    const picture = await Picture.findOneAndDelete({_id : id})

    if(!picture) {
        return res.status(404).json({error: "There is no Picture for this id"})
    }

    res.status(200).json(picture)
  
}

// update a Picture

const updatePicture = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Picture with this id"})
    }

    const picture = await Picture.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!picture) {
        return res.status(404).json({error: "There is no Picture for this id"})
    }

    res.status(200).json(picture)

}
module.exports = {
    createPicture,
    getPictures,
    deletePicture,
    updatePicture,
    getOnePicture 
}
