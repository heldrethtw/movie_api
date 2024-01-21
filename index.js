const mongoose = require('mongoose');
const Models = require('./models');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express');
require('dotenv').config();

const express = require('express');
 const morgan = require('morgan');
const connectDB = require('./db');
const tmbdRoutes = require('./routes/tmbdRoutes');
const app = express();
connectDB();

const port = 3000;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/tmbd', tmbdRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});