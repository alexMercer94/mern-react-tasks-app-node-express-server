// Routes for authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

/**
 * Create a user
 */
// api/auth
router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 carácteres.').isLength({ min: 6 })
    ],
    authController.authenticateUser
);

module.exports = router;
