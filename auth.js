import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from './models.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const authRoutes = express.Router();




authRoutes.post(
    '/users',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let hashedPassword = bcrypt.hashSync(req.body.Password, 12);

            const newUser = await User.create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            });



            const token = jwt.sign(
                { _id: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' });
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
            { _id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );
        res.json({ Username: req.user.Username, token });
    }
);

authRoutes.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-Password -Email');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user information.');
    }
});

authRoutes.post('/users/:username/movies/:movieId/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, movieId } = req.params;
    try {
        const user = await User.findOne({ Username: username });
        if (!user) {
            return res.status(400).send('User not found.');
        }
        if (!user.Favorites.includes(movieId)) {
            user.Favorites.push(movieId);
            await user.save();
            res.status(200).send('Favorite added.');
        } else {
            res.status(400).send('Movie already in favorites.');
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).send('Error adding favorite.');
    }
});

authRoutes.get('users/:username/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ Username: username }).populate('Favorites');
        if (!user) {
            return res.status(400).send('User not found.');
        }
        res.status(200).send(user.Favorites);
    } catch (error) {
        console.error('Error getting favorites:', error);
        res.status(500).send('Error getting favorites.');
    }
});

authRoutes.get('users/:username/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ Username: username }).populate('Favorites');
        if (!user) {
            return res.status(400).send('User not found.');
        }
        res.json(user.Favorites);
    } catch (error) {
        console.error('Error getting favorites:', error);
        res.status(500).send('Error getting favorites.');
    }
});

// Endpoint to update user profile
authRoutes.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username } = req.params;
    const { Password, ...updateData } = req.body; // Password is handled separately

    try {
        const user = await User.findOne({ Username: username });
        if (!user) {
            return res.status(400).send('User not found.');
        }
        if (Password) {
            const hashedPassword = await bcrypt.hash(Password, 12);
            user.Password = hashedPassword;
        }

        Object.keys(updateData).forEach((key) => {
            user[key] = updateData[key];
        });
        await user.save();
        res.status(200).send('User updated successfully.');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user.');
    }
});


export default authRoutes;