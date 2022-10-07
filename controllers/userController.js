const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { response } = require("express");

// create a new token 

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "3d" } )
}

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

    try {
         // validation  of email and password 

    if(!email || !password || !type) {
        throw Error("All fields must be valid")
    }

    if(!validator.isEmail(email)) {
        throw Error("Please enter a valid email address")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Please enter a stronger password")
    }
    // check if email already exists in database
    const exists = await User.findOne({ email })

    if(exists) {
        throw Error("Email already exists")
    }

    // creating hash password

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //add a User to db

    const user = await User.create( { email, password : hash, type })
    const profile = await Profile.create( { email, type })

    //create a token

    const token = createToken(user._id);


        res.status(200).json({email, token})
    } catch (Error) {
            res.status(400).json({error: Error.message})
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

// login a user

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        if(!email || !password ) {
            throw Error("All fields must be valid")
        }
    
        const user = await User.findOne({email})
    
        if(!user) {
            throw Error("User not found")
        }
    
        const match = await bcrypt.compare(password, user.password)
    
        if(!match) {
            throw Error("Invalid login credentials")
        }

        // create token 

        const token = createToken(user._id);

        res.status(200).json({email, token, type: user.type })

    }
    catch (error) {
        res.status(400).json({ error:error.message })
    }
};



module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getOneUser, 
    login
}
