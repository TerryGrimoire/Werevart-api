const Project = require("../models/projectModel");
const mongoose = require("mongoose");

// get all projects

const getOneProject = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any project with this id"})
    }

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({error: "There is no project for this id"})
    }

    res.status(200).json(project)

}

// get a single project 

const getProjects = async (req, res) => {
    const projects = await Project.find({})
    res.status(200).json(projects)
}

// create a new project

const createProject = async (req, res) => {
    const {contract, timeframe, published, src, alt, title, description, artistePseudo, techniques} = req.body;
    //add a project to db
    try {
        const project = await Project.create({contract, timeframe, published, src, alt, title, description, artistePseudo, techniques})
        res.status(200).json(project)
    } catch (error) {
            res.status(400).json({error: error.message})
        }
}
// delete a project

const deleteProject = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any project with this id"})
    }

    //delete a project from db
    const project = await Project.findOneAndDelete({_id : id})

    if(!project) {
        return res.status(404).json({error: "There is no project for this id"})
    }

    res.status(200).json(project)
  
}

// update a project

const updateProject = async (req, res) => {
    const {id} = req.params;

    //check if valid object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"We could not find any project with this id"})
    }

    const project = await Project.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!project) {
        return res.status(404).json({error: "There is no project for this id"})
    }

    res.status(200).json(project)

}
module.exports = {
    createProject,
    getProjects,
    deleteProject,
    updateProject,
    getOneProject 
}
