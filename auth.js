import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from './models/schemas.js';
import dotenv from 'dotenv';
import tokenBlacklist from './models/tokenBlacklist.js';



dotenv.config();

import './passport.js';

export const authenticateJWT = passport.authenticate('jwt', { session: false });

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
                {
                    _id: newUser._id,
                    Role: User.Role
                },
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
            {
                _id: req.user._id,
                Role: User.Role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );
        res.json({ Username: req.user.Username, token });
    }
);

authRoutes.post('/logout', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        if (!decodedToken) {
            return res.status(400).send('Invalid token.');
        }
        const expiresAt = new Date(decodedToken.exp * 1000);
        await tokenBlacklist.create({
            token: token,
            expiresAt: expiresAt
        });
        res.status(200).json('Logged out successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging out.');
    }
});

authRoutes.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-Password -Email');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user information.');
    }
});

authRoutes.get('/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ Username: req.params.username }).select('Username Favorites');
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user information.');
    }
});

authRoutes.post('/users/:username/suggestions', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const { movieId } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { Username: req.params.username },
            { $push: { Suggestions: movieId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.status(200).send('Suggestion added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding suggestion.');
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

//endpoint to add genres and descriptions to a movie
authRoutes.put('/api/tmbd/movies/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    const { newGenres, newDescriptions } = req.body;

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    Descriptions: { $each: newDescriptions },
                    Genres: { $each: newGenres }
                }
            },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).send('Movie not found.');
        }
        res.json(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});


export default authRoutes;