const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    // Review if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email & password
    const { email, password } = req.body;

    try {
        // Validate that user is registered
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Check user's password
        const passCorrect = await bcryptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Firmar JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600, // 1 hour
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// Get which user is authenticated
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};
