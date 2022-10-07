const express = require('express');
const User = require("../models/userModel");
const { 
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getOneUser,
    login
      } = require('../controllers/userController');

const router = express.Router();

// GET all Users

router.get('/', getUsers);

// GET one User
    router.get('/:id', getOneUser);

// POST/CREATE a new User (register)
router.post('/', createUser);   

// DELETE a User

router.delete('/:id', deleteUser);

// UPDATE a User

router.patch('/:id', updateUser);

// login

router.post('/login', login);

module.exports = router;