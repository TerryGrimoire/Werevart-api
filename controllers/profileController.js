const Profile = require("../models/profileModel");
const mongoose = require("mongoose");

// get all Profiles

const getOneProfile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Profile with this id"})
    }

    const profile = await Profile.findById(id)

    if(!profile) {
        return res.status(404).json({error: "There is no Profile for this id"})
    }

    res.status(200).json(profile)

}

// get a single Profile 

const getProfiles = async (req, res) => {
    const profiles = await Profile.find({})
    res.status(200).json(profiles)
}

// create a new Profile

const createProfile = async (req, res) => {
    const {firstName, lastName, adress, postcode, city, country, username, src, alt, description, skills, type} = req.body;
    //add a Profile to db
    try {
        const profile = await Profile.create({firstName, lastName, adress, postcode, city, country, username, src, alt, description, skills, type})
        res.status(200).json(profile)
    } catch (error) {
            res.status(400).json({error: error.message})
        }
}
// delete a Profile

const deleteProfile = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Profile with this id"})
    }

    //delete a Profile from db
    const profile = await Profile.findOneAndDelete({_id : id})

    if(!profile) {
        return res.status(404).json({error: "There is no Profile for this id"})
    }

    res.status(200).json(profile)
  
}

// update a Profile

const updateProfile = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any Profile with this id"})
    }

    const profile = await Profile.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!profile) {
        return res.status(404).json({error: "There is no Profile for this id"})
    }

    res.status(200).json(profile)

}
module.exports = {
    createProfile,
    getProfiles,
    deleteProfile,
    updateProfile,
    getOneProfile 
}
