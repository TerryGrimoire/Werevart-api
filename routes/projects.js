const express = require('express');
const Project = require("../models/projectModel");
const { 
    createProject,
    getProjects,
    deleteProject,
    updateProject,
    getOneProject 
      } = require('../controllers/projectController');
const router = express.Router();

// GET all projects

router.get('/', getProjects);

// GET one project
    router.get('/:id', getOneProject);

// POST a new project
router.post('/', createProject);   

// DELETE a project

router.delete('/:id', deleteProject);

// UPDATE a project

router.patch('/:id', updateProject);
module.exports = router;