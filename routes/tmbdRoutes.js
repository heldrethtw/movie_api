const { Router } = require('express');
const { searchMovies, fetchMovieDetails } = require('../tmbdApi.js');
const { Movie, User} = require('../models.js');

const router = Router();    


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
        const { movieID } = req.params;
        const details = await fetchMovieDetails(movieID);
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


router.get('/movies/genre/:genre', async (req, res) => {
    try{
        const { genre } = req.params;
        const movies = await Movie.find({'Genre.Name': genre });
        res.json(movies);
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
        res.send('Favorite movie added for user ${username}');
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

export default router;


