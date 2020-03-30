const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    // Review if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email & password
    const { email, password } = req.body;

    try {
        // Validate that user registered is unique
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Create new user
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Save user
        await user.save();

        // Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Firmar JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600 // 1 hour
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};
