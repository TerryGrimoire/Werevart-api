const express = require('express');
const Picture = require("../models/pictureModel");
const { 
    createPicture,
    getPictures,
    deletePicture,
    updatePicture,
    getOnePicture 
      } = require('../controllers/pictureController');

const router = express.Router();

// GET all Pictures

router.get('/', getPictures);

// GET one Picture
    router.get('/:id', getOnePicture);

// POST a new Picture
router.post('/', createPicture);   

// DELETE a Picture

router.delete('/:id', deletePicture);

// UPDATE a Picture

router.patch('/:id', updatePicture);
module.exports = router;