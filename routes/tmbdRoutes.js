const express = require('express');
const { searchMovies, fetchMovieDetails } = require('./tmdbApi');
const router = express.Router();    

router.get('/search', async (req, res, next) => {
    try{
        const { title } = req.query;
        const results = await searchMovies(title);
        res.json(results);
    } catch(err) {
        console.error(error.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/details/:id', async (req, res, next) => {
    try{
        const { movieID } = req.params;
        const details = await fetchMovieDetails(movieID);
        res.json(details);
    }catch(err) {
        console.error(error.stack);
        res.status(500).send('Something broke!');
    }
});