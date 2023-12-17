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

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ${port}.');
});