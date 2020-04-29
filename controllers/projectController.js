const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    // Check if there are erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create project
        const project = new Project(req.body);
        // Guardar el projecto via WJT
        project.creator = req.user.id;
        // Save project
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get all project of acutal user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({ createdAt: -1 });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    // Check if there are erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract project's data
    const { name } = req.body;
    const newProject = {};
    if (name) {
        newProject.name = name;
    }

    try {
        // Check ID
        let project = await Project.findById(req.params.id);

        // Check if project exist
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // Verify project's creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No Autorizdo' });
        }
        // Update project
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        // Check ID
        let project = await Project.findById(req.params.id);

        // Check if project exist
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // Verify project's creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No Autorizdo' });
        }

        // Delete project
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Projecto Eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};
