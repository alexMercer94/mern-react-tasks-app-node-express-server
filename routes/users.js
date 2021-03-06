// Routes for create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Create a user
// api/users
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio')
            .not()
            .isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 carácteres.').isLength({ min: 6 })
    ],
    userController.createUser
);

module.exports = router;
