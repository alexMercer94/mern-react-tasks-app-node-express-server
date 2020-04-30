const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
const { check } = require('express-validator');

/**
 * Create a task
 * `api/tasks`
 */
router.post(
    '/',
    authMiddleware,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    taskController.createTask
);

/**
 * Get all taska by project
 */
router.get('/', authMiddleware, taskController.getTasks);

/**
 * Update task
 */
router.put('/:id', authMiddleware, taskController.updateTask);

/**
 * Delete a task
 */
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
