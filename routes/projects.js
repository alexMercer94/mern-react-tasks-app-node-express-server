const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const { check } = require('express-validator');

/**
 * Create projects
 */
// api/projects
router.post(
    '/',
    authMiddleware,
    [check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    projectController.createProject
);

/**
 * Get all projects
 */
router.get('/', authMiddleware, projectController.getProjects);

/**
 * Update project via id
 */
router.put(
    '/:id',
    authMiddleware,
    [check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    projectController.updateProject
);

/**
 * Delete project via id
 */
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
