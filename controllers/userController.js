const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// get all Users

const getOneUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any User with this id"})
    }

    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({error: "There is no User for this id"})
    }

    res.status(200).json(user)

}

// get a single User 

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

// create a new User - signup User

const createUser = async (req, res) => {
    const {email, password, type} = req.body;
    //add a User to db
    try {
        const exists = await User.findOne({ email })

    if(exists) {
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create( { email, password : hash, type })
        res.status(200).json({email, user})
    } catch (error) {
            res.status(400).json({error: error.message})
        }
}
// delete a User

const deleteUser = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any User with this id"})
    }

    //delete a User from db
    const user = await User.findOneAndDelete({_id : id})

    if(!user) {
        return res.status(404).json({error: "There is no User for this id"})
    }

    res.status(200).json(user)
  
}

// update a User

const updateUser = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any User with this id"})
    }

    const user = await User.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!user) {
        return res.status(404).json({error: "There is no User for this id"})
    }

    res.status(200).json(user)

}

// signup route 



module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getOneUser 
}
