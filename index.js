const e = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

let topMovies = [
    { title: "There Will Be Blood", director: "Paul Thomas Anderson", year: "2007" },
    { title: "Los abrazos rotos", director: "Pedro Almodóvar", year: "2009" },
    { title: "Amadeus", director: "Milos Forman", year: "1984" },
    { title: "1984", director: "Michael Radford", year: "1984" },
    { title: "The Big Lebowski", director: "Joel Coen", year: "1998" },
    { title: "Code Inconnu", director: "Michael Haneke", year: "2000" },
    { title: "The Shining", director: "Stanley Kubrick", year: "1980" },
    { title: "No Country for Old Men", director: "Ethan Coen, Joel Coen", year: "2007" },
    { title: "The Assassination of Jesse James by the Coward Robert Ford", director: "Andrew Dominik", year: "2007" },
    { title: "L'Aventura", director: "Michelangelo Antonioni", year: "1960" },
];

let suerfavorites = [];

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

const port = 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ${port}.');
});