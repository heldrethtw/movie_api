const express = require('express');
const { Movie, User} = require('../models.js');

const router = express.Router();    

router.get('/movies', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    } catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.post('/users', async (req, res) => {
   try {
    const newUser = User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
} catch(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
}
});



router.get('/search', async (req, res) => {
    try{
        const { title } = req.query;
        const results = await searchMovies(title);
        res.json(results);
    } catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/details/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const details = await fetchMovieDetails(id);
        res.json(details);
    }catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/movies/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const movies = await Movie.find({ Title: name });
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


router.put('/movies/:id/description', async (req, res) => {
    try{
        const { id } = req.params;
        const {newDescription} = req.body;
        await Movie.findByIdeAndUpdate(id, { Description: newDescription });
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});


router.get('/movies/genre/:genre/director/:director', async (req, res) => {
    try{
        const { genre, director } = req.params;
        const movies = await Movie.find({'Genre.Name': genre, 'Director.Name': director });
        res.json(movies);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-description/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { newDescription } = req.body;
        await Movie.findOneAndUpdate({_id: id}, { Description: newDescription });
        res.send('Movie description updated');
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-director-bio/:director', async (req, res) => {
    try{
        const { director } = req.params;
       const { newBio } = req.body;
       await Movie.updateOne({'Director.Name': director}, { 'Director.Bio': newBio });
        res.send('Director bio updated');
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('/users/:username/add-favorite', async (req, res) => {
    try{
        const { username } = req.params;
        const {movieID} = req.body;
        await User.findOneAndUpdate({ Username: username }, { $addToSet: { favoriteMovies: movieID } });
        res.send(`Favorite movie added for user ${username}`);
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.delete('/users/:username', async (req, res) => {
    try{
        const { username } = req.params;
        await User.findOneAndDelete({ Username: username });
        res.send(`User ${username} was deleted`);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

