import { Router } from 'express';
import { Movie, User, Genre, Director } from '../models.js';

const router = Router();

// Create a new movie
router.post('/movies', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something broke!');
    }
});

// Get a single movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Update a movie
router.put('/movies/:id', async (req, res) => {
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

// Change movie description
router.put('/movies/:id/description', async (req, res) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { $set: { Description: req.body.Description } },
            { new: true }
        );
        res.json(updatedMovie);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});



// Delete a movie
router.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.send('Movie deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a user by username
router.get('/users/:username', async (req, res) => {
    console.log('Requested username:', req.params.username)
    try {
        const user = await User.findOne({ Username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Update a user
router.put('/users/:username', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { Username: req.params.username },
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});
//add a movie to a user's favorites
router.put('/users/:username/add-favorite/:movieID', async (req, res) => {
    try{
        const updatedUser = await User.findOneAndUpdate(
            { Username: req.params.username },
            { $push: { Favorites: req.params.movieID } },
            { new: true }
        );
        if(!updatedUser){
            return res.status(404).send('Username not found');
        }
        res.json(updatedUser);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Delete a user
router.delete('/users/:username', async (req, res) => {
    try {
        await User.findOneAndDelete({ Username: req.params.username });
        res.send(`User ${req.params.username} deleted`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Create a new genre
router.post('/genres', async (req, res) => {
    try {
        const newGenre = new Genre(req.body);
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Get all genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Get a single genre by ID
router.get('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (genre) {
            res.json(genre);
        } else {
            res.status(404).send('Genre not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Update a genre
router.put('/genres/:id', async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedGenre);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Delete a genre
router.delete('/genres/:id', async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.send('Genre deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Create a new director
router.post('/directors', async (req, res) => {
    try {
        const newDirector = new Director(req.body);
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Get all directors
router.get('/directors', async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Get a single director by ID
router.get('/directors/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (director) {
            res.json(director);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Update a director
router.put('/directors/:id', async (req, res) => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDirector);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

// Delete a director
router.delete('/directors/:id', async (req, res) => {
    try {
        await Director.findByIdAndDelete(req.params.id);
        res.send('Director deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});

export default router;
