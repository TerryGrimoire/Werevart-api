const express = require('express');
const User = require("../models/userModel");
const { 
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getOneUser 
      } = require('../controllers/userController');

const router = express.Router();

// GET all Users

router.get('/', getUsers);

// GET one User
    router.get('/:id', getOneUser);

// POST a new User
router.post('/', createUser);   

// DELETE a User

router.delete('/:id', deleteUser);

// UPDATE a User

router.patch('/:id', updateUser);
module.exports = router;