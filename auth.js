import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from '../models.js';
import config from '../config.js';

const authRoutes = express.Router();


authRoutes.post(
    '/users',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail(),
    ],

async(req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   try{
    let hashedPassword = bcrypt.hashSync(req.body.Password, 12);
    
    const newUser = await User.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    });

    const token = jwt.sign({ Username: newUser.Username }, 
        config.JWT_SECRET, { expiresIn: '7d' });

 
    res.status(201).json({ token, Username: newUser.Username });
} catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
}
}
);

authRoutes.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const token = jwt.sign(
            { Username: req.user.Username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ Username: req.user.Username, token });
    }
);

export default authRoutes;