import express from 'express';
import { router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User } from '../models.js';

const authRoutes = express.Router();

// Create a new user
router.post('/users',
    async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.Password, 10);

            const newUser = new User({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birth: req.body.Birth
            });
            await newUser.save();

            const token = jwt.sign(
                { Username: newUser.Username },
                process.env.JWT_SECRET,
                { expiresIn: '7d' });


            res.status(201).json({
                _id: newUser._id,
                Username: req.body.Username,
                Email: req.body.Email,
                Birth: req.body.Birth,
                token
            });



        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    }
);

// Log in
router.post('/login',
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