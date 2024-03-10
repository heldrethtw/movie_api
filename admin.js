import express from 'express';
import { User, Movie, Director, Genre } from './models/schemas.js';
import { authenticateJWT } from './auth.js';


const adminRouter = express.Router();


// middleware to check for admin role
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).send('Access denied. Admins only.');
    }
}

adminRouter.use(authenticateJWT, isAdmin);

// Get all users
adminRouter.get('/users', authenticateJWT,
    async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    });

// Delete a user
adminRouter.delete('/users/:username', authenticateJWT,
    async (req, res) => {
        try {
            await User.findOneAndDelete({ Username: req.params.username });
            res.send(`User ${req.params.username} deleted`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    });

// Delete a movie
adminRouter.delete('/movies/:id', authenticateJWT,
    async (req, res) => {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.send('Movie deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    });

// Delete a genre
adminRouter.delete('/genres/:id', authenticateJWT,
    async (req, res) => {
        try {
            await Genre.findByIdAndDelete(req.params.id);
            res.send('Genre deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    });

// Delete a director
adminRouter.delete('/directors/:id', authenticateJWT,
    async (req, res) => {
        try {
            await Director.findByIdAndDelete(req.params.id);
            res.send('Director deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    });

// Update a movie
adminRouter.put('/movies/:id', authenticateJWT,
    async (req, res) => {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(updatedMovie);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
    });

export default adminRouter;