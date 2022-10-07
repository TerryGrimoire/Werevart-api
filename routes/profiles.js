const express = require('express');
const Profile = require("../models/profileModel");
const { 
    createProfile,
    getProfiles,
    deleteProfile,
    updateProfile,
    getOneProfile 
      } = require('../controllers/profileController');

const router = express.Router();

// GET all Profiles

router.get('/', getProfiles);

// GET one Profile
    router.get('/:id', getOneProfile);

// POST a new Profile
router.post('/', createProfile);   

// DELETE a Profile

router.delete('/:id', deleteProfile);

// UPDATE a Profile

router.patch('/:id', updateProfile);
module.exports = router;