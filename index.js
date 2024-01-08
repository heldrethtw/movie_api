
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

const port = 3000;



app.get('/', (req, res) => {
    res.send('Welcome to The Donkey Archive!');
});

app.get('/api/movies', (req, res) => {
    res.json(topMovies);
});
app.get('/api/users', (req, res) => {
    res.json(topMovies);
});

app.get('/api/movies/:id', (req, res) => {
    const movieID = req.params.id;
    const movie = topMovies.find((movie) => movie.id === movieID);
    if (!movie) {
        res.status(404).json({
            error: 'Movie not found.'
        });
    } else {
        res.json(movie);
    }
});

app.get('/genres/:name', (req, res) => {
    const genreName = req.params.name;
    const genre = { name: genreName, description: 'Genre Description.' };
    if (!genre) {
        res.status(404).json({
            error: 'Genre not found.'
        });
    } else {
        res.json(genre);
    }
});

app.post('/user/:id/favorites/:movieID', (req, res) => {
    const movieID = req.params.id;
    const movie = req.params.movieID;
    if (!userFavorites[userId]) {
        userFavorites[userId] = [];
    }
    userFavorites[userId].push(movie);

    res.send('Movie ${movie} was added to favorites.');
});

app.get('/user/:id/favorites', (req, res) => {
    const userId = req.params.id;
    const favorites = userFavorites[userId] || [];
    res.json(userFavorites);
});

app.post('/user/register', (req, res) => {
    res.send('User registered.');
});

app.post('/user/login', (req, res) => {
    res.send('User logged in.');
});

app.post('/user/logout', (req, res) => {
    res.send('User logged out.');
});

app.put('/user/:id', (req, res) => {
    res.send('User info updated.');
});

app.delete('/user/:id', (req, res) => {
    res.send('User deleted.');
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log('Your app is listening on port ${port}.');
});