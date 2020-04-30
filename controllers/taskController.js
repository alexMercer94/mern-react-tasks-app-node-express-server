const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create new task
exports.createTask = async (req, res) => {
    // Check if there are erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extract project and check accuracy
    try {
        const { project } = req.body;
        const proyecto = await Project.findById(project);
        if (!proyecto) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Check project belongs to the authenticated user
        if (proyecto.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No Autorizdo' });
        }

        // Create task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get tasks by project
exports.getTasks = async (req, res) => {
    try {
        // Extract project and check accuracy
        const { project } = req.body;
        const proyectExist = await Project.findById(project);
        if (!proyectExist) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Check project belongs to the authenticated user
        if (proyectExist.creator.toString() !== req.user.id) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Get task by project
        const tasks = await Task.find({ project });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        // Extract project and check accuracy
        const { project, name, state } = req.body;

        // Verify if task exist
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'No existe la tarea' });
        }

        const proyectExist = await Project.findById(project);

        //Check project belongs to the authenticated user
        if (proyectExist.creator.toString() !== req.user.id) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Create a new object with new data
        const newTask = {};

        if (name) newTask.name = name;
        if (state) newTask.state = state;

        // Save task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        // Extract project and check accuracy
        const { project } = req.body;

        // Verify if task exist
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'No existe la tarea' });
        }

        const proyectExist = await Project.findById(project);

        //Check project belongs to the authenticated user
        if (proyectExist.creator.toString() !== req.user.id) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Delete task
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
