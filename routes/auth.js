// Routes for authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

/**
 * Login
 */
// api/auth
router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 carácteres.').isLength({ min: 6 }),
    ],
    authController.authenticateUser
);

/**
 * Get user authenticated
 */
router.get('/', authMiddleware, authController.userAuthenticated);

module.exports = router;
